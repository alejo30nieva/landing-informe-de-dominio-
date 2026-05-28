"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-lg border bg-white px-4 py-2 text-[15px] text-ink-900 shadow-soft transition-colors",
          "placeholder:text-ink-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/30 focus-visible:border-brand-700",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid
            ? "border-danger focus-visible:border-danger focus-visible:ring-danger/30"
            : "border-ink-300",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
