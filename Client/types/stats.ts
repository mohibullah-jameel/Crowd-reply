import type { Platform } from "./common";

export interface PlatformSummary {
  platform: Platform;
  totalTasks: number;
  publishedTasks: number;
  totalPrice: number;
}
