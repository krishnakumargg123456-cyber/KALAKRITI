import * as React from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
                ? `${selectId}-helper`
                : undefined
          }
          className={[
            "h-11 w-full rounded-card border bg-paper px-4",
            "text-sm text-ink outline-none transition-all duration-300",
            "border-border focus:border-gold focus:ring-2 focus:ring-gold/20",
            "disabled:cursor-not-allowed disabled:bg-parchment disabled:opacity-60",
            error
              ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
              : "",
            className,
          ].filter(Boolean).join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={`${selectId}-error`} className="text-sm text-red-700">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${selectId}-helper`} className="text-xs text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
