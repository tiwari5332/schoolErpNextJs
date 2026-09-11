// components/ui/input.tsx
"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
