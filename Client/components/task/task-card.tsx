"use client";

import type { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PLATFORM_CONFIG, STATUS_CONFIG } from "@/lib/constants";
import { formatDate, formatPrice, truncateText } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const platform = PLATFORM_CONFIG[task.platform];
  const status = STATUS_CONFIG[task.status];

  return (
    <Card hoverable onClick={() => onClick(task)} className="group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge color={platform.color} bgColor={platform.bgColor}>
            {platform.label}
          </Badge>
          <Badge color={status.color} bgColor={status.bgColor}>
            {status.label}
          </Badge>
        </div>
        <span className="text-sm font-semibold text-[var(--accent)]">
          {formatPrice(task.price)}
        </span>
      </div>

      <p className="text-sm text-[var(--foreground)] mb-3 leading-relaxed">
        {truncateText(task.content)}
      </p>

      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>Created {formatDate(task.createdAt)}</span>
        {task.assignedTo && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {task.assignedTo.name}
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--border)] opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-[var(--accent)] flex items-center gap-1">
          Click to view details
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Card>
  );
}
