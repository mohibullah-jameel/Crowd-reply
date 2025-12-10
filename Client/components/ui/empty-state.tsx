import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-12 text-center",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 mx-auto text-[var(--muted)] mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-[var(--muted)] mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}

