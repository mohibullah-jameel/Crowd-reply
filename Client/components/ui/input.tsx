import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg",
            "focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]",
            "transition-colors placeholder:text-[var(--muted)]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

