import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
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
        "flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border-2 border-dashed border-beige-300 bg-cream-50/60 max-w-lg mx-auto w-full",
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-cream-200 border border-beige-300 flex items-center justify-center text-brown-soft-600 mb-4 shadow-2xs">
          {icon}
        </div>
      )}
      <h3 className="text-base md:text-lg font-bold text-brown-soft-900 mb-1.5">{title}</h3>
      <p className="text-xs md:text-sm text-brown-soft-600 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}

