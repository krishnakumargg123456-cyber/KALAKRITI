import * as React from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id ?? generatedId;

    return (
      <label
        htmlFor={radioId}
        className={[
          "group flex cursor-pointer items-start gap-3",
          "select-none",
          props.disabled ? "cursor-not-allowed opacity-60" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className="peer sr-only"
            {...props}
          />

          <span
            className={[
              "flex h-5 w-5 items-center justify-center rounded-full border",
              "border-border bg-paper",
              "transition-all duration-200",
              "peer-checked:border-maroon",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30",
            ].join(" ")}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-maroon opacity-0 transition-opacity peer-checked:opacity-100" />
          </span>
        </span>

        {(label || description) && (
          <span className="space-y-0.5">
            {label && (
              <span className="block text-sm font-medium text-ink">
                {label}
              </span>
            )}

            {description && (
              <span className="block text-xs text-muted">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
