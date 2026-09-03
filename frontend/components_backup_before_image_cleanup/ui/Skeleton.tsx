import * as React from "react";

export type SkeletonProps =
  React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({
  className = "",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse rounded-md bg-parchment",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={["space-y-2", className].join(" ")}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={[
            "h-3",
            index === lines - 1 ? "w-2/3" : "w-full",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-card border border-border bg-paper",
        className,
      ].join(" ")}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-2/3" />
        <SkeletonText lines={2} />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}
