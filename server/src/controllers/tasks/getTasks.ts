import { Request, Response } from "express";
import { Task, Platform, Status, PLATFORMS, STATUSES } from "../../models";

interface TaskFilters {
  status?: Status;
  platform?: Platform;
  price?: number | { $gte?: number; $lte?: number };
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, platform, minPrice, maxPrice, page, limit } = req.query;
    const filters: TaskFilters = {};

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(
      100,
      Math.max(1, parseInt(limit as string) || 10)
    );
    const skip = (pageNum - 1) * limitNum;

    if (status && typeof status === "string") {
      if (STATUSES.includes(status as Status)) {
        filters.status = status as Status;
      }
    }

    if (platform && typeof platform === "string") {
      if (PLATFORMS.includes(platform as Platform)) {
        filters.platform = platform as Platform;
      }
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.$gte = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        filters.price.$lte = parseFloat(maxPrice as string);
      }
    }

    const total = await Task.countDocuments(filters);

    const tasks = await Task.find(filters)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, error: err.message });
  }
};
