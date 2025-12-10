import { Request, Response } from 'express';
import {
  RedditCommentTask,
  YouTubeCommentTask,
  TrustpilotReviewTask,
  PLATFORMS,
} from '../../models';


export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { platform, content, threadUrl, videoUrl, businessUrl, reviewTitle, ...rest } = req.body;

    if (!platform || !PLATFORMS.includes(platform)) {
      res.status(400).json({
        success: false,
        error: `Invalid platform. Must be one of: ${PLATFORMS.join(', ')}`,
      });
      return;
    }

    let task;

    switch (platform) {
      case 'reddit':
        if (!threadUrl) {
          res.status(400).json({ success: false, error: 'threadUrl is required for Reddit tasks' });
          return;
        }
        task = await RedditCommentTask.create({ platform, content, threadUrl, ...rest });
        break;

      case 'youtube':
        if (!videoUrl) {
          res.status(400).json({ success: false, error: 'videoUrl is required for YouTube tasks' });
          return;
        }
        task = await YouTubeCommentTask.create({ platform, content, videoUrl, ...rest });
        break;

      case 'trustpilot':
        if (!businessUrl || !reviewTitle) {
          res.status(400).json({
            success: false,
            error: 'businessUrl and reviewTitle are required for Trustpilot tasks',
          });
          return;
        }
        task = await TrustpilotReviewTask.create({ platform, content, businessUrl, reviewTitle, ...rest });
        break;

      default:
        res.status(400).json({ success: false, error: 'Invalid platform' });
        return;
    }

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ success: false, error: err.message });
  }
};
