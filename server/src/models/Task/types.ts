import { Document, Types } from "mongoose";

export const PLATFORMS = ["reddit", "youtube", "trustpilot"] as const;
export const STATUSES = [
  "draft",
  "assigned",
  "submitted",
  "published",
  "cancelled",
] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Status = (typeof STATUSES)[number];

export interface ITask {
  content: string;
  platform: Platform;
  status: Status;
  assignedTo: Types.ObjectId | null;
  price: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskDocument extends ITask, Document {}

export interface IRedditCommentTask extends ITask {
  platform: "reddit";
  threadUrl: string;
}

export interface IYouTubeCommentTask extends ITask {
  platform: "youtube";
  videoUrl: string;
}

export interface ITrustpilotReviewTask extends ITask {
  platform: "trustpilot";
  businessUrl: string;
  reviewTitle: string;
}

export interface IRedditCommentTaskDocument
  extends IRedditCommentTask,
    Document {}
export interface IYouTubeCommentTaskDocument
  extends IYouTubeCommentTask,
    Document {}
export interface ITrustpilotReviewTaskDocument
  extends ITrustpilotReviewTask,
    Document {}
