import * as React from "react";

export interface OrnamentalFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "gold" | "maroon";
}

export default function OrnamentalFrame({
  children,
  variant = "gold",
  className = "",
  ...props
}: OrnamentalFrameProps) {
  const borderColor =
    variant === "gold"
      ? "border-gold"
      : "border-maroon";

  const ornamentColor =
    variant === "gold"
      ? "text-gold"
      : "text-maroon";

  return (
    <div
      className={[
        "relative border p-5 md:p-7",
        borderColor,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute -left-2 -top-2 font-serif text-lg leading-none",
          ornamentColor,
        ].join(" ")}
      >
        ?
      </span>

      <span
        aria-hidden="true"
        className={[
          "absolute -right-2 -top-2 font-serif text-lg leading-none",
          ornamentColor,
        ].join(" ")}
      >
        ?
      </span>

      <span
        aria-hidden="true"
        className={[
          "absolute -bottom-2 -left-2 font-serif text-lg leading-none",
          ornamentColor,
        ].join(" ")}
      >
        ?
      </span>

      <span
        aria-hidden="true"
        className={[
          "absolute -bottom-2 -right-2 font-serif text-lg leading-none",
          ornamentColor,
        ].join(" ")}
      >
        ?
      </span>

      {children}
    </div>
  );
}
