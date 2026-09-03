import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-maroon text-white hover:bg-[#4A1420] focus-visible:ring-maroon",
  secondary:
    "bg-gold text-white hover:bg-[#8B6F43] focus-visible:ring-gold",
  outline:
    "border border-gold bg-transparent text-maroon hover:bg-parchment focus-visible:ring-gold",
  ghost:
    "bg-transparent text-maroon hover:bg-parchment focus-visible:ring-maroon",
  danger:
    "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-700",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2",
          "rounded-card font-medium",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
