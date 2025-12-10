import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

