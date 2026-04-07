import { ReactNode } from "react"

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 p-12 text-center animate-in fade-in-50 duration-500 ${className}`}>
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
        {title}
      </h3>
      <p className="max-w-[400px] text-sm text-muted-foreground mb-8 text-pretty">
        {description}
      </p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  )
}
