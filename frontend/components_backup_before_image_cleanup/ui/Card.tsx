import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
}

const variants = {
  default: "border border-border bg-paper shadow-soft",
  outlined: "border border-gold/50 bg-transparent",
  elevated: "border border-border bg-paper shadow-card",
};

export default function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={["rounded-card", variants[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({
  className = "",
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={["border-b border-border px-5 py-4", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({
  className = "",
  children,
  ...props
}: CardContentProps) {
  return (
    <div
      className={["px-5 py-5", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({
  className = "",
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={["border-t border-border px-5 py-4", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
