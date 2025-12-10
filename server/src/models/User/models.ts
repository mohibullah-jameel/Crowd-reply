import mongoose, { Model } from 'mongoose';
import { userSchema } from './schema';
import { IUserDocument } from './types';

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

// Default test user credentials
export const DEFAULT_USER = {
  name: 'Test User',
  email: 'test@example.com',
};

// Seed default user (call on app startup)
export const seedDefaultUser = async (): Promise<IUserDocument> => {
  let user = await User.findOne({ email: DEFAULT_USER.email });
  
  if (!user) {
    user = await User.create(DEFAULT_USER);
    console.log('✅ Default test user created:', user.email);
  }
  
  return user;
};

