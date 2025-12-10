import type { Platform, Status } from "./common";
import type { User } from "./user";

export interface BaseTask {
  _id: string;
  content: string;
  platform: Platform;
  status: Status;
  assignedTo: User | null;
  price: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RedditTask extends BaseTask {
  platform: "reddit";
  threadUrl: string;
}

export interface YouTubeTask extends BaseTask {
  platform: "youtube";
  videoUrl: string;
}

export interface TrustpilotTask extends BaseTask {
  platform: "trustpilot";
  businessUrl: string;
  reviewTitle: string;
}

export type Task = RedditTask | YouTubeTask | TrustpilotTask;

export interface CreateRedditTaskPayload {
  platform: "reddit";
  content: string;
  threadUrl: string;
  price?: number;
  status?: Status;
  assignedTo?: string;
}

export interface CreateYouTubeTaskPayload {
  platform: "youtube";
  content: string;
  videoUrl: string;
  price?: number;
  status?: Status;
  assignedTo?: string;
}

export interface CreateTrustpilotTaskPayload {
  platform: "trustpilot";
  content: string;
  businessUrl: string;
  reviewTitle: string;
  price?: number;
  status?: Status;
  assignedTo?: string;
}

export type CreateTaskPayload =
  | CreateRedditTaskPayload
  | CreateYouTubeTaskPayload
  | CreateTrustpilotTaskPayload;

export interface UpdateTaskPayload {
  status?: Status;
  assignedTo?: string | null;
  content?: string;
  price?: number;
}

export interface TaskFilters {
  page?: number;
  limit?: number;
  status?: Status;
  platform?: Platform;
  minPrice?: number;
  maxPrice?: number;
}

export function isRedditTask(task: Task): task is RedditTask {
  return task.platform === "reddit";
}

export function isYouTubeTask(task: Task): task is YouTubeTask {
  return task.platform === "youtube";
}

export function isTrustpilotTask(task: Task): task is TrustpilotTask {
  return task.platform === "trustpilot";
}

export function getTaskPlatformUrl(task: Task): string | null {
  if (isRedditTask(task)) return task.threadUrl;
  if (isYouTubeTask(task)) return task.videoUrl;
  if (isTrustpilotTask(task)) return task.businessUrl;
  return null;
}
