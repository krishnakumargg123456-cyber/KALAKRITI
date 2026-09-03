import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={[
            "h-11 w-full rounded-card border bg-paper px-4",
            "text-sm text-ink placeholder:text-muted",
            "outline-none transition-all duration-300",
            "border-border focus:border-gold focus:ring-2 focus:ring-gold/20",
            "disabled:cursor-not-allowed disabled:bg-parchment disabled:opacity-60",
            error
              ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
              : "",
            className,
          ].filter(Boolean).join(" ")}
          {...props}
        />

        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-700">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
