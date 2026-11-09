import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-rose-pastel-500 hover:bg-rose-pastel-600 active:bg-rose-pastel-600 text-white shadow-sm border border-rose-pastel-600/30",
  secondary:
    "bg-cream-200 hover:bg-beige-200 text-brown-soft-800 border border-beige-300 active:bg-beige-300 shadow-2xs",
  outline:
    "bg-transparent hover:bg-cream-100 text-brown-soft-800 border border-beige-300 active:bg-cream-200",
  ghost:
    "bg-transparent hover:bg-cream-200 text-brown-soft-800 active:bg-beige-200",
  danger:
    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm border border-red-700/30",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl font-medium",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-pastel-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === "lg" ? "md" : "sm"} className={variant === "primary" || variant === "danger" ? "text-white" : "text-rose-pastel-500"} />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

