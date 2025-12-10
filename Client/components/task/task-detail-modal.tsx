"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Task, Status } from "@/types";
import {
  isRedditTask,
  isYouTubeTask,
  isTrustpilotTask,
  getTaskPlatformUrl,
} from "@/types";
import { updateTaskAction } from "@/actions/task-actions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ErrorAlert } from "@/components/ui/error-alert";
import {
  PLATFORM_CONFIG,
  STATUS_CONFIG,
  STATUS_OPTIONS,
} from "@/lib/constants";
import { formatDateTime, formatPrice } from "@/lib/utils";

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<Status>(task.status);
  const [editContent, setEditContent] = useState(task.content);
  const [editPrice, setEditPrice] = useState(task.price.toString());

  const platform = PLATFORM_CONFIG[task.platform];
  const status = STATUS_CONFIG[task.status];
  const platformUrl = getTaskPlatformUrl(task);

  const handleSave = () => {
    setError(null);

    if (!editContent.trim()) {
      setError("Content is required");
      return;
    }

    const price = parseFloat(editPrice);
    if (isNaN(price) || price < 0) {
      setError("Price must be a valid positive number");
      return;
    }

    startTransition(async () => {
      const result = await updateTaskAction(task._id, {
        status: editStatus,
        content: editContent.trim(),
        price,
      });

      if (!result.success) {
        setError(result.error ?? "Failed to update task");
        return;
      }

      setIsEditing(false);
      router.refresh();
      onClose();
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditStatus(task.status);
    setEditContent(task.content);
    setEditPrice(task.price.toString());
    setError(null);
  };

  const statusOptions = STATUS_OPTIONS.map((s) => ({
    value: s.value,
    label: s.label,
  }));

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>
        <Badge
          color={platform.color}
          bgColor={platform.bgColor}
          className="text-sm font-semibold"
        >
          {platform.label}
        </Badge>
        {!isEditing && (
          <Badge color={status.color} bgColor={status.bgColor}>
            {status.label}
          </Badge>
        )}
        {isEditing && (
          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            Editing
          </Badge>
        )}
      </ModalHeader>

      <ModalBody>
        {error && <ErrorAlert message={error} className="mb-4" />}

        {isEditing ? (
          <>
            <div className="mb-4">
              <Select
                id="edit-status"
                label="Status"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as Status)}
                options={statusOptions}
              />
            </div>

            <div className="mb-4">
              <Textarea
                id="edit-content"
                label="Content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
              />
            </div>

            <div className="mb-6">
              <Input
                id="edit-price"
                label="Price ($)"
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                Content
              </h3>
              <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                {task.content}
              </p>
            </div>

            {isRedditTask(task) && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                  Thread URL
                </h3>
                <a
                  href={task.threadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline break-all"
                >
                  {task.threadUrl}
                </a>
              </div>
            )}

            {isYouTubeTask(task) && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                  Video URL
                </h3>
                <a
                  href={task.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline break-all"
                >
                  {task.videoUrl}
                </a>
              </div>
            )}

            {isTrustpilotTask(task) && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                    Review Title
                  </h3>
                  <p className="text-[var(--foreground)] font-medium">
                    {task.reviewTitle}
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                    Business URL
                  </h3>
                  <a
                    href={task.businessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline break-all"
                  >
                    {task.businessUrl}
                  </a>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--background)] rounded-lg p-4">
                <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                  Price
                </h4>
                <p className="text-xl font-bold text-[var(--accent)]">
                  {formatPrice(task.price)}
                </p>
              </div>
              <div className="bg-[var(--background)] rounded-lg p-4">
                <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                  Assigned To
                </h4>
                <p className="text-[var(--foreground)] font-medium">
                  {task.assignedTo ? task.assignedTo.name : "Unassigned"}
                </p>
                {task.assignedTo && (
                  <p className="text-xs text-[var(--muted)]">
                    {task.assignedTo.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                  Created
                </h4>
                <p className="text-[var(--foreground)]">
                  {formatDateTime(task.createdAt)}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                  Updated
                </h4>
                <p className="text-[var(--foreground)]">
                  {formatDateTime(task.updatedAt)}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                  Published
                </h4>
                <p className="text-[var(--foreground)]">
                  {formatDateTime(task.publishedAt)}
                </p>
              </div>
            </div>
          </>
        )}
      </ModalBody>

      <ModalFooter className="justify-between">
        <span className="text-xs text-[var(--muted)] font-mono">
          ID: {task._id}
        </span>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={handleCancelEdit}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} isLoading={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </Button>
              {platformUrl && (
                <a
                  href={platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Open Link
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}
