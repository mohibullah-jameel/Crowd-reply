import { http } from "@/lib/fetch-client";
import type {
  Task,
  TaskFilters,
  CreateTaskPayload,
  UpdateTaskPayload,
  PaginatedTasksResponse,
  BackendSuccessResponse,
  PaginationInfo,
} from "@/types";

function buildQueryString(filters?: TaskFilters): string {
  if (!filters) return "";

  const params = new URLSearchParams();

  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));
  if (filters.status) params.set("status", filters.status);
  if (filters.platform) params.set("platform", filters.platform);
  if (filters.minPrice !== undefined)
    params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.set("maxPrice", String(filters.maxPrice));

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export async function getTasks(
  filters?: TaskFilters,
  options?: { revalidate?: number; tags?: string[] }
): Promise<{
  tasks: Task[];
  pagination: PaginationInfo | null;
  error: string | null;
}> {
  const queryString = buildQueryString(filters);
  const result = await http.get<PaginatedTasksResponse>(
    `/api/tasks${queryString}`,
    {
      revalidate: options?.revalidate,
      tags: options?.tags ?? ["tasks"],
    }
  );

  if (!result.ok || !result.data) {
    return {
      tasks: [],
      pagination: null,
      error: result.error,
    };
  }

  return {
    tasks: result.data.data,
    pagination: result.data.pagination,
    error: null,
  };
}

export async function getTaskById(
  taskId: string,
  options?: { revalidate?: number; tags?: string[] }
): Promise<{
  task: Task | null;
  error: string | null;
}> {
  const result = await http.get<BackendSuccessResponse<Task>>(
    `/api/tasks/${taskId}`,
    {
      revalidate: options?.revalidate,
      tags: options?.tags ?? ["tasks", `task-${taskId}`],
    }
  );

  if (!result.ok || !result.data) {
    return {
      task: null,
      error: result.error,
    };
  }

  return {
    task: result.data.data,
    error: null,
  };
}

export async function createTask(payload: CreateTaskPayload): Promise<{
  task: Task | null;
  error: string | null;
}> {
  const result = await http.post<
    BackendSuccessResponse<Task>,
    CreateTaskPayload
  >("/api/tasks", payload, { cache: "no-store" });

  if (!result.ok || !result.data) {
    return {
      task: null,
      error: result.error,
    };
  }

  return {
    task: result.data.data,
    error: null,
  };
}

export async function updateTask(
  taskId: string,
  payload: UpdateTaskPayload
): Promise<{
  task: Task | null;
  error: string | null;
}> {
  const result = await http.put<
    BackendSuccessResponse<Task>,
    UpdateTaskPayload
  >(`/api/tasks/${taskId}`, payload, { cache: "no-store" });

  if (!result.ok || !result.data) {
    return {
      task: null,
      error: result.error,
    };
  }

  return {
    task: result.data.data,
    error: null,
  };
}
