import { Request, Response } from 'express';
import { User } from '../../models';

export const getTestUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ email: 'test@example.com' });

    if (!user) {
      res.status(404).json({ success: false, error: 'Test user not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, error: err.message });
  }
};
