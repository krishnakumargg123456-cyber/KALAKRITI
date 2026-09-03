"use client";

import * as React from "react";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({
  content,
  children,
}: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-deepMaroon px-3 py-1.5 text-xs text-white opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}

        <span className="absolute left-1/2 top-full -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-deepMaroon" />
      </span>
    </span>
  );
}
