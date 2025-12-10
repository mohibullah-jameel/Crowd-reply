import type { Platform, Status } from "@/types";

export const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; color: string; bgColor: string }
> = {
  reddit: {
    label: "Reddit",
    color: "text-[#ff4500]",
    bgColor: "bg-[#ff4500]/10",
  },
  youtube: {
    label: "YouTube",
    color: "text-[#ff0000]",
    bgColor: "bg-[#ff0000]/10",
  },
  trustpilot: {
    label: "Trustpilot",
    color: "text-[#00b67a]",
    bgColor: "bg-[#00b67a]/10",
  },
};

export const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bgColor: string }
> = {
  draft: {
    label: "Draft",
    color: "text-gray-600 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-800",
  },
  assigned: {
    label: "Assigned",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  submitted: {
    label: "Submitted",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
  },
  published: {
    label: "Published",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
};

export const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "reddit", label: "Reddit" },
  { value: "youtube", label: "YouTube" },
  { value: "trustpilot", label: "Trustpilot" },
];

export const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "assigned", label: "Assigned" },
  { value: "submitted", label: "Submitted" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
];

export const PLATFORM_FILTER_OPTIONS: {
  value: Platform | "";
  label: string;
}[] = [{ value: "", label: "All Platforms" }, ...PLATFORM_OPTIONS];

export const STATUS_FILTER_OPTIONS: { value: Status | ""; label: string }[] = [
  { value: "", label: "All Statuses" },
  ...STATUS_OPTIONS,
];

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;
