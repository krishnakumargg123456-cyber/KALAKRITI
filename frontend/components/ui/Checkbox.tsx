import * as React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, id, className = "", ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className={[
          "group flex cursor-pointer items-start gap-3 select-none",
          props.disabled ? "cursor-not-allowed opacity-60" : "",
          className,
        ].filter(Boolean).join(" ")}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />

          <span
            className={[
              "flex h-5 w-5 items-center justify-center rounded border",
              "border-border bg-paper",
              "transition-all duration-200",
              "peer-checked:border-maroon peer-checked:bg-maroon",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30",
            ].join(" ")}
          >
            <Check
              className="h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              strokeWidth={3}
              aria-hidden="true"
            />
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

Checkbox.displayName = "Checkbox";

export default Checkbox;
