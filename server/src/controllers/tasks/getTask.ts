import { Request, Response } from 'express';
import { Task } from '../../models';

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');

    if (!task) {
      res.status(404).json({ success: false, error: 'Task not found' });
      return;
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, error: err.message });
  }
};
