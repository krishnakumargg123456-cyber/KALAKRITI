"use client";

import * as React from "react";

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

export default function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? items[0]?.value ?? ""
  );

  const activeValue = value ?? internalValue;

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <div className="w-full">
      <div
        role="tablist"
        className="flex overflow-x-auto border-b border-border"
      >
        {items.map((item) => {
          const active = item.value === activeValue;

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={item.disabled}
              onClick={() => handleChange(item.value)}
              className={[
                "relative shrink-0 px-4 py-3 text-sm font-medium",
                "transition-colors duration-200",
                active
                  ? "text-maroon"
                  : "text-muted hover:text-maroon",
                item.disabled
                  ? "cursor-not-allowed opacity-40"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}

              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      {children}
    </div>
  );
}

export interface TabPanelProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

export function TabPanel({
  value,
  activeValue,
  children,
}: TabPanelProps) {
  if (value !== activeValue) return null;

  return (
    <div
      role="tabpanel"
      className="pt-5"
    >
      {children}
    </div>
  );
}
