import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: React.ReactNode;
}

const variantStyles = {
  info: {
    container: "bg-cream-100 border-beige-300 text-brown-soft-800",
    icon: <Info className="w-5 h-5 text-rose-pastel-500 shrink-0" />,
  },
  success: {
    container: "bg-emerald-50 border-emerald-200 text-emerald-900",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-900",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-900",
    icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
  },
};

export function Alert({
  className,
  variant = "info",
  title,
  children,
  icon,
  ...props
}: AlertProps) {
  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3.5 p-4 rounded-xl border text-sm shadow-2xs",
        current.container,
        className
      )}
      {...props}
    >
      {icon ?? current.icon}
      <div className="space-y-1">
        {title && <h5 className="font-semibold text-sm leading-tight">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}

