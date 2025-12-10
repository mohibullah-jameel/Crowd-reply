"use client";

import { useState } from "react";
import type { Task, PaginationInfo, PlatformSummary } from "@/types";
import { PlatformStats } from "@/components/stats";
import { TaskFilters, TaskList, TaskForm } from "@/components/task";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/error-alert";

interface DashboardClientProps {
  tasks: Task[];
  pagination: PaginationInfo | null;
  stats: PlatformSummary[];
  error: string | null;
}

export function DashboardClient({
  tasks,
  pagination,
  stats,
  error,
}: DashboardClientProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-[var(--muted)] mt-1">
              Manage your tasks across all platforms
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            size="lg"
            className="shadow-lg shadow-[var(--accent)]/25"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Task
          </Button>
        </div>

        <section className="mb-8">
          <PlatformStats stats={stats} />
        </section>

        {error && (
          <ErrorAlert
            message={`Error loading tasks: ${error}`}
            className="mb-6"
          />
        )}

        <section className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold">Tasks</h2>
            <TaskFilters />
          </div>
        </section>

        <section>
          <TaskList tasks={tasks} />

          {pagination && <Pagination pagination={pagination} />}
        </section>
      </div>

      <TaskForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </div>
  );
}
