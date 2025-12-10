"use server";

import { revalidatePath } from "next/cache";
import { createTask, updateTask } from "@/services";
import type { CreateTaskPayload, UpdateTaskPayload, Task } from "@/types";

export interface ActionResult {
  success: boolean;
  task: Task | null;
  error: string | null;
}


export async function createTaskAction(
  payload: CreateTaskPayload
): Promise<ActionResult> {
  const { task, error } = await createTask(payload);

  if (error || !task) {
    return {
      success: false,
      task: null,
      error: error ?? "Failed to create task",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    task,
    error: null,
  };
}


export async function updateTaskAction(
  taskId: string,
  payload: UpdateTaskPayload
): Promise<ActionResult> {
  const { task, error } = await updateTask(taskId, payload);

  if (error || !task) {
    return {
      success: false,
      task: null,
      error: error ?? "Failed to update task",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    task,
    error: null,
  };
}

