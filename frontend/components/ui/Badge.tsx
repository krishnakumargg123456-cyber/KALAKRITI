import * as React from "react";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "maroon" | "gold" | "green" | "brown" | "neutral";
  size?: "sm" | "md";
}

const variants = {
  maroon: "bg-maroon/10 text-maroon border-maroon/20",
  gold: "bg-gold/15 text-brown border-gold/30",
  green: "bg-heritage/10 text-heritage border-heritage/20",
  brown: "bg-brown/10 text-brown border-brown/20",
  neutral: "bg-parchment text-muted border-border",
};

const sizes = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  variant = "maroon",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border font-medium",
        variants[variant],
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
