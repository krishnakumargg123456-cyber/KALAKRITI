"use client";

import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  type Locale,
} from "./locales";

const LOCALE_STORAGE_KEY = "kalakriti-locale";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return storedLocale && isSupportedLocale(storedLocale)
    ? storedLocale
    : DEFAULT_LOCALE;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function clearStoredLocale(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LOCALE_STORAGE_KEY);
}
