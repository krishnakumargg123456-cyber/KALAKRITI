export const SUPPORTED_LOCALES = [
  "en",
  "hi",
  "bn",
  "gu",
  "mr",
  "pa",
  "ta",
  "te",
  "kn",
  "ml",
  "or",
  "as",
  "ne",
  "ks",
  "kok",
  "mai",
  "sa",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  mr: "मराठी",
  pa: "ਪੰਜਾਬੀ",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  or: "ଓଡ଼ିଆ",
  as: "অসমীয়া",
  ne: "नेपाली",
  ks: "कॉशुर / کٲشُر",
  kok: "कोंकणी",
  mai: "मैथिली",
  sa: "संस्कृतम्",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  gu: "Gujarati",
  mr: "Marathi",
  pa: "Punjabi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  or: "Odia",
  as: "Assamese",
  ne: "Nepali",
  ks: "Kashmiri",
  kok: "Konkani",
  mai: "Maithili",
  sa: "Sanskrit",
};

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
