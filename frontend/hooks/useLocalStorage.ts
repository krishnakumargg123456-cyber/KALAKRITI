"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((current: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);

      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch {
      // Ignore malformed local storage values.
    }
  }, [key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage quota/privacy errors.
    }
  }, [key, value]);

  const updateValue = (
    next: T | ((current: T) => T)
  ) => {
    setValue((current) =>
      typeof next === "function"
        ? (next as (current: T) => T)(current)
        : next
    );
  };

  return [value, updateValue];
}
