"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { PaginationInfo } from "@/types";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  pagination: PaginationInfo;
}

export function Pagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { page, pages, total, limit } = pagination;

  if (pages <= 1) return null;

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/dashboard?${params.toString()}`);
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pageNumbers: (number | "...")[] = [];
    const maxVisible = 5;

    if (pages <= maxVisible) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(pages);
      } else if (page >= pages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = pages - 3; i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(page - 1);
        pageNumbers.push(page);
        pageNumbers.push(page + 1);
        pageNumbers.push("...");
        pageNumbers.push(pages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p className="text-sm text-[var(--muted)]">
        Showing{" "}
        <span className="font-medium text-[var(--foreground)]">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-medium text-[var(--foreground)]">{endItem}</span>{" "}
        of <span className="font-medium text-[var(--foreground)]">{total}</span>{" "}
        tasks
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>

        {getPageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-[var(--muted)]"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`min-w-[36px] h-9 px-3 rounded-lg border text-sm font-medium transition-colors ${
                page === pageNum
                  ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                  : "border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/50"
              }`}
            >
              {pageNum}
            </button>
          )
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => goToPage(page + 1)}
          disabled={page === pages}
          aria-label="Next page"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
