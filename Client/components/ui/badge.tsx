import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "platform" | "status";
  color?: string;
  bgColor?: string;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  color,
  bgColor,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        variant === "default" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
        color,
        bgColor,
        className
      )}
    >
      {children}
    </span>
  );
}

