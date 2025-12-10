"use client";

import { useState } from "react";
import type { Task } from "@/types";
import { TaskCard } from "./task-card";
import { TaskDetailModal } from "./task-detail-modal";
import { EmptyState } from "@/components/ui/empty-state";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        }
        title="No tasks found"
        description="Try adjusting your filters or create a new task."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onClick={setSelectedTask} />
        ))}
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
}

