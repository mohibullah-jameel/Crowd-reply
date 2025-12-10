import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          variant === "primary" &&
            "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] focus:ring-[var(--accent)]",
          variant === "secondary" &&
            "border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--border)] focus:ring-[var(--border)]",
          variant === "ghost" &&
            "hover:bg-[var(--border)] focus:ring-[var(--border)]",
          variant === "destructive" &&
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
          // Sizes
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-5 py-2.5 text-base",
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

