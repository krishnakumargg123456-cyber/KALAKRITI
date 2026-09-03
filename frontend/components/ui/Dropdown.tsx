"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  label?: string;
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function Dropdown({
  label,
  items,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "flex h-11 w-full items-center justify-between",
          "rounded-card border border-border bg-paper px-4",
          "text-left text-sm text-ink",
          "transition-all duration-300",
          "hover:border-gold",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
        ].join(" ")}
      >
        <span className={selectedItem ? "text-ink" : "text-muted"}>
          {selectedItem?.label ?? placeholder}
        </span>

        <ChevronDown
          className={[
            "h-4 w-4 text-muted transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-card border border-border bg-paper shadow-card"
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              role="option"
              aria-selected={item.value === value}
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;

                onChange?.(item.value);
                setOpen(false);
              }}
              className={[
                "block w-full px-4 py-3 text-left text-sm",
                "transition-colors",
                item.value === value
                  ? "bg-parchment font-medium text-maroon"
                  : "text-ink hover:bg-parchment",
                item.danger
                  ? "text-red-700 hover:bg-red-50"
                  : "",
                item.disabled
                  ? "cursor-not-allowed opacity-40"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
