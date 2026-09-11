// components/ui/dialog.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const DialogContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  active: boolean;
} | null>(null);

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const [mounted, setMounted] = useState(open);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActive(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setActive(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const setOpen = (value: boolean) => onOpenChange(value);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen, active }}>
      {mounted ? <>{children}</> : null}
    </DialogContext.Provider>
  );
}

export function DialogContent({
  className = "",
  overlayClassName = "",
  children,
  align = "center",
}: {
  className?: string;
  overlayClassName?: string;
  children: React.ReactNode;
  align?: "center" | "bottom-right";
}) {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;

  const isBottomRight = align === "bottom-right";
  const active = ctx.active;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-all duration-300 ease-out",
        isBottomRight
          ? "flex items-center justify-center sm:items-end sm:justify-end p-3.5 sm:p-6"
          : "flex items-center justify-center p-4",
        active
          ? "bg-black/50 backdrop-blur-sm opacity-100 pointer-events-auto"
          : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none",
        overlayClassName
      )}
      role="dialog"
      aria-modal="true"
      onClick={() => ctx.setOpen(false)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden shadow-2xl transition-all duration-300 ease-out border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transform-gpu",
          isBottomRight
            ? "max-w-sm sm:max-w-md rounded-2xl"
            : "max-w-lg rounded-3xl p-6",
          active
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 sm:translate-y-20 opacity-0 scale-95",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function DialogTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn("text-lg font-bold text-slate-900 dark:text-white", className)}>{children}</h2>;
}

export function DialogDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)}>{children}</p>;
}

export function DialogTrigger({ asChild = false, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = useContext(DialogContext);
  const handleClick = () => ctx?.setOpen(true);
  if (asChild) {
    return React.cloneElement(React.Children.only(children) as React.ReactElement<any>, {
      onClick: handleClick,
    } as any);
  }
  return (
    <button type="button" onClick={handleClick} className="inline-flex items-center">
      {children}
    </button>
  );
}

export function DialogClose({ children, className = "", onClick }: { children?: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }) {
  const ctx = useContext(DialogContext);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
    ctx?.setOpen(false);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "absolute top-3.5 right-3.5 z-30 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer pointer-events-auto",
        className
      )}
      aria-label="Close modal"
    >
      {children || "✕"}
    </button>
  );
}
