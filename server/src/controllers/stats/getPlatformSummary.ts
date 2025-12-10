import { Request, Response } from "express";
import { Task } from "../../models";

export const getPlatformSummary = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const summary = await Task.aggregate([
      {
        $group: {
          _id: "$platform",
          totalTasks: { $sum: 1 },
          publishedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "published"] }, 1, 0],
            },
          },
          totalPrice: {
            $sum: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          platform: "$_id",
          totalTasks: 1,
          publishedTasks: 1,
          totalPrice: { $round: ["$totalPrice", 2] },
        },
      },
      {
        $sort: { platform: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, error: err.message });
  }
};
