"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/locales";

import {
  getStoredLocale,
  setStoredLocale,
} from "@/lib/i18n/storage";

import {
  getMessages,
  type TranslationMessages,
} from "@/lib/i18n";

import { messages as englishMessages } from "@/lib/i18n/messages/en";

type I18nContextValue = {
  locale: Locale;
  messages: TranslationMessages;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({
  children,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [messages, setMessages] =
    useState<TranslationMessages>(englishMessages);

  useEffect(() => {
    const storedLocale = getStoredLocale();
    setLocaleState(storedLocale);

    getMessages(storedLocale).then(setMessages);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    setStoredLocale(nextLocale);

    getMessages(nextLocale).then(setMessages);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      setLocale,
    }),
    [locale, messages, setLocale],
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
