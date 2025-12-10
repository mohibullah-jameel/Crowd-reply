import type { Task } from "./task";

export interface BackendSuccessResponse<T> {
  success: true;
  data: T;
}

export interface BackendErrorResponse {
  success: false;
  error: string;
}

export type BackendResponse<T> =
  | BackendSuccessResponse<T>
  | BackendErrorResponse;

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedTasksResponse {
  success: true;
  data: Task[];
  pagination: PaginationInfo;
}

export function isBackendError<T>(
  response: BackendResponse<T>
): response is BackendErrorResponse {
  return !response.success;
}

export function isBackendSuccess<T>(
  response: BackendResponse<T>
): response is BackendSuccessResponse<T> {
  return response.success;
}
