"use client";

import * as React from "react";
import { X } from "lucide-react";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right";
  width?: "sm" | "md" | "lg";
}

const widths = {
  sm: "w-full sm:max-w-sm",
  md: "w-full sm:max-w-md",
  lg: "w-full sm:max-w-lg",
};

export default function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  width = "md",
}: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const position = side === "right" ? "right-0" : "left-0";

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-deep-maroon/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={[
          "absolute top-0 h-full",
          position,
          widths[width],
          "flex flex-col",
          "border-gold/30 bg-paper shadow-elevated",
          side === "right" ? "border-l" : "border-r",
        ].join(" ")}
      >
        <div className="flex min-h-16 items-center justify-between border-b border-border px-5">
          {title && (
            <h2 className="font-display text-lg font-semibold text-maroon">
              {title}
            </h2>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="ml-auto rounded-full p-2 text-muted transition-colors hover:bg-parchment hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </aside>
    </div>
  );
}
