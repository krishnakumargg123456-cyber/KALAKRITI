"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-paper text-muted transition-colors hover:border-gold hover:text-maroon disabled:pointer-events-none disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((pageNumber) => {
        const active = pageNumber === page;

        return (
          <button
            key={pageNumber}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={[
              "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm transition-colors",
              active
                ? "border-maroon bg-maroon text-white"
                : "border-border bg-paper text-muted hover:border-gold hover:text-maroon",
            ].join(" ")}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-paper text-muted transition-colors hover:border-gold hover:text-maroon disabled:pointer-events-none disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
