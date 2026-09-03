"use client";

import * as React from "react";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface ToastProps {
  open: boolean;
  message: string;
  title?: string;
  variant?: ToastVariant;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle2,
  error: TriangleAlert,
  warning: TriangleAlert,
  info: Info,
};

const styles = {
  success: "border-heritage/30 bg-paper text-heritage",
  error: "border-maroon/30 bg-paper text-maroon",
  warning: "border-gold/40 bg-paper text-brown",
  info: "border-border bg-paper text-ink",
};

export default function Toast({
  open,
  message,
  title,
  variant = "info",
  onClose,
  duration = 4000,
}: ToastProps) {
  React.useEffect(() => {
    if (!open || duration <= 0) return;

    const timer = window.setTimeout(onClose, duration);

    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const Icon = icons[variant];

  return (
    <div
      className="fixed right-4 top-4 z-[60] w-[calc(100%-2rem)] max-w-sm"
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          "flex items-start gap-3 rounded-card border p-4",
          "shadow-elevated",
          styles[variant],
        ].join(" ")}
      >
        <Icon
          className="mt-0.5 h-5 w-5 shrink-0"
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          {title && (
            <p className="font-medium">
              {title}
            </p>
          )}

          <p className={title ? "mt-1 text-sm opacity-80" : "text-sm"}>
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="shrink-0 rounded-full p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
