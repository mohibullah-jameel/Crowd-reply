import { Request, Response } from 'express';
import { Task, STATUSES } from '../../models';

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, assignedTo, content, price } = req.body;
    const updateData: Record<string, unknown> = {};
    if (status !== undefined) {
      if (!STATUSES.includes(status)) {
        res.status(400).json({
          success: false,
          error: `Invalid status. Must be one of: ${STATUSES.join(', ')}`,
        });
        return;
      }
      updateData.status = status;
    }

    if (assignedTo !== undefined) {
      updateData.assignedTo = assignedTo;
    }

    if (content !== undefined) {
      updateData.content = content;
    }

    if (price !== undefined) {
      updateData.price = price;
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('assignedTo', 'name email');

    if (!task) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ success: false, error: err.message });
  }
};
