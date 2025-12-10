import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable = false }: CardProps) {
  const Component = onClick ? "button" : "div";
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5",
        hoverable && "hover:shadow-lg hover:border-[var(--accent)]/30 transition-all",
        onClick && "w-full text-left cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>;
}

