// components/ui/label.tsx
"use client";

import React from "react";

export function Label({ htmlFor, className = "", children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
}
