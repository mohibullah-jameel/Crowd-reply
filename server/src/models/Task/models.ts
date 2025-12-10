import mongoose, { Schema, Model } from "mongoose";
import { taskSchema } from "./schema";
import {
  ITaskDocument,
  IRedditCommentTaskDocument,
  IYouTubeCommentTaskDocument,
  ITrustpilotReviewTaskDocument,
} from "./types";

export const Task: Model<ITaskDocument> = mongoose.model<ITaskDocument>(
  "Task",
  taskSchema
);

export const RedditCommentTask = Task.discriminator<IRedditCommentTaskDocument>(
  "reddit",
  new Schema<IRedditCommentTaskDocument>({
    threadUrl: {
      type: String,
      required: [true, "Thread URL is required for Reddit tasks"],
      trim: true,
    },
  })
);

export const YouTubeCommentTask =
  Task.discriminator<IYouTubeCommentTaskDocument>(
    "youtube",
    new Schema<IYouTubeCommentTaskDocument>({
      videoUrl: {
        type: String,
        required: [true, "Video URL is required for YouTube tasks"],
        trim: true,
      },
    })
  );

export const TrustpilotReviewTask =
  Task.discriminator<ITrustpilotReviewTaskDocument>(
    "trustpilot",
    new Schema<ITrustpilotReviewTaskDocument>({
      businessUrl: {
        type: String,
        required: [true, "Business URL is required for Trustpilot tasks"],
        trim: true,
      },
      reviewTitle: {
        type: String,
        required: [true, "Review title is required for Trustpilot tasks"],
        trim: true,
      },
    })
  );
