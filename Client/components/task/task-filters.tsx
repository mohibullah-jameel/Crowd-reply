"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Platform, Status } from "@/types";
import {
  PLATFORM_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "@/lib/constants";

export function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPlatform = searchParams.get("platform") ?? "";
  const currentStatus = searchParams.get("status") ?? "";

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");

      router.push(`/dashboard?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = () => {
    router.push("/dashboard");
  };

  const hasActiveFilters = currentPlatform || currentStatus;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <select
          value={currentPlatform}
          onChange={(e) => updateFilters("platform", e.target.value)}
          className="appearance-none bg-[var(--card-bg)] border border-[var(--border)] rounded-lg px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer hover:border-[var(--accent)]/50 transition-colors"
        >
          {PLATFORM_FILTER_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div className="relative">
        <select
          value={currentStatus}
          onChange={(e) => updateFilters("status", e.target.value)}
          className="appearance-none bg-[var(--card-bg)] border border-[var(--border)] rounded-lg px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer hover:border-[var(--accent)]/50 transition-colors"
        >
          {STATUS_FILTER_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear filters
        </button>
      )}
    </div>
  );
}
