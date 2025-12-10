"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Platform, Status, CreateTaskPayload } from "@/types";
import { createTaskAction } from "@/actions/task-actions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ErrorAlert } from "@/components/ui/error-alert";
import { PLATFORM_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskForm({ isOpen, onClose }: TaskFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [platform, setPlatform] = useState<Platform>("reddit");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("2.50");
  const [status, setStatus] = useState<Status>("draft");

  const [threadUrl, setThreadUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setPlatform("reddit");
    setContent("");
    setPrice("2.50");
    setStatus("draft");
    setThreadUrl("");
    setVideoUrl("");
    setBusinessUrl("");
    setReviewTitle("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let payload: CreateTaskPayload;

    const basePayload = {
      content: content.trim(),
      price: parseFloat(price) || 2.5,
      status,
    };

    switch (platform) {
      case "reddit":
        if (!threadUrl.trim()) {
          setError("Thread URL is required for Reddit tasks");
          return;
        }
        payload = {
          ...basePayload,
          platform: "reddit",
          threadUrl: threadUrl.trim(),
        };
        break;

      case "youtube":
        if (!videoUrl.trim()) {
          setError("Video URL is required for YouTube tasks");
          return;
        }
        payload = {
          ...basePayload,
          platform: "youtube",
          videoUrl: videoUrl.trim(),
        };
        break;

      case "trustpilot":
        if (!businessUrl.trim() || !reviewTitle.trim()) {
          setError(
            "Business URL and Review Title are required for Trustpilot tasks"
          );
          return;
        }
        payload = {
          ...basePayload,
          platform: "trustpilot",
          businessUrl: businessUrl.trim(),
          reviewTitle: reviewTitle.trim(),
        };
        break;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    startTransition(async () => {
      const result = await createTaskAction(payload);

      if (!result.success) {
        setError(result.error ?? "Failed to create task");
        return;
      }

      router.refresh();
      handleClose();
    });
  };

  const platformSelectOptions = PLATFORM_OPTIONS.map((p) => ({
    value: p.value,
    label: p.label,
  }));

  const statusSelectOptions = STATUS_OPTIONS.filter(
    (s) => s.value !== "cancelled"
  ).map((s) => ({
    value: s.value,
    label: s.label,
  }));

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader onClose={handleClose}>
        <h2 className="text-xl font-bold">Create New Task</h2>
      </ModalHeader>

      <form onSubmit={handleSubmit}>
        <ModalBody>
          {error && <ErrorAlert message={error} className="mb-4" />}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Platform</label>
            <div className="flex gap-2">
              {PLATFORM_OPTIONS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPlatform(p.value)}
                  className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    platform === p.value
                      ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                      : "border-[var(--border)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <Textarea
              id="content"
              label="Content *"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the task content..."
              rows={4}
              required
            />
          </div>

          {platform === "reddit" && (
            <div className="mb-4">
              <Input
                id="threadUrl"
                label="Thread URL *"
                type="url"
                value={threadUrl}
                onChange={(e) => setThreadUrl(e.target.value)}
                placeholder="https://reddit.com/r/example/comments/..."
                required
              />
            </div>
          )}

          {platform === "youtube" && (
            <div className="mb-4">
              <Input
                id="videoUrl"
                label="Video URL *"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                required
              />
            </div>
          )}

          {platform === "trustpilot" && (
            <>
              <div className="mb-4">
                <Input
                  id="reviewTitle"
                  label="Review Title *"
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Great Service!"
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  id="businessUrl"
                  label="Business URL *"
                  type="url"
                  value={businessUrl}
                  onChange={(e) => setBusinessUrl(e.target.value)}
                  placeholder="https://trustpilot.com/review/..."
                  required
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              id="price"
              label="Price ($)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
            />
            <Select
              id="status"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              options={statusSelectOptions}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
