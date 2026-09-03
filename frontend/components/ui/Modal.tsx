"use client";

import * as React from "react";
import { X } from "lucide-react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showClose?: boolean;
  closeOnOverlay?: boolean;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  showClose = true,
  closeOnOverlay = true,
}: ModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "kalakriti-modal-title" : undefined}
    >
      <div
        className="absolute inset-0 bg-deep-maroon/60 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        className={[
          "relative z-10 w-full",
          sizes[size],
          "overflow-hidden rounded-card",
          "border border-gold/40 bg-paper",
          "shadow-elevated",
        ].join(" ")}
      >
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div>
              {title && (
                <h2
                  id="kalakriti-modal-title"
                  className="font-display text-xl font-semibold text-maroon"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-1 text-sm text-muted">{description}</p>
              )}
            </div>

            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-full p-2 text-muted transition-colors hover:bg-parchment hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
