import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          className={[
            "min-h-28 w-full rounded-card border bg-paper px-4 py-3",
            "resize-y text-sm text-ink placeholder:text-muted",
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
          <p id={`${textareaId}-error`} className="text-sm text-red-700">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="text-xs text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
