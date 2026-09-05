"use client";

import { LOCALE_LABELS, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";
import { useI18n } from "@/lib/i18n/context";

type LanguageSelectorProps = {
  className?: string;
};

export default function LanguageSelector({
  className = "",
}: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();

  return (
    <label className={`inline-flex items-center ${className}`}>
      <span className="sr-only">Language</span>

      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="border-b border-[#641f20]/25 bg-transparent px-1 py-2 text-sm font-medium text-[#641f20] outline-none transition hover:border-[#c9a45c] focus:border-[#c9a45c]"
        aria-label="Select language"
      >
        {SUPPORTED_LOCALES.map((supportedLocale) => (
          <option key={supportedLocale} value={supportedLocale}>
            {LOCALE_LABELS[supportedLocale]}
          </option>
        ))}
      </select>
    </label>
  );
}
