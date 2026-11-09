import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftAddon, rightAddon, id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-brown-soft-800 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center rounded-xl border bg-white transition-all overflow-hidden shadow-2xs",
            error
              ? "border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200"
              : "border-beige-300 focus-within:border-rose-pastel-400 focus-within:ring-2 focus-within:ring-rose-pastel-200/60",
            disabled && "bg-cream-100 opacity-60 cursor-not-allowed"
          )}
        >
          {leftAddon && (
            <div className="pl-3.5 pr-2 text-brown-soft-400 flex items-center justify-center select-none text-sm font-medium">
              {leftAddon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full bg-transparent px-3.5 py-2.5 text-sm text-brown-soft-900 placeholder:text-brown-soft-400 focus:outline-hidden disabled:cursor-not-allowed",
              leftAddon && "pl-0",
              rightAddon && "pr-0",
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="pr-3.5 pl-2 text-brown-soft-400 flex items-center justify-center select-none text-sm font-medium">
              {rightAddon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-600 font-medium pl-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-brown-soft-600 pl-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

