import { DEFAULT_LOCALE, type Locale } from "./locales";
import { messages as englishMessages } from "./messages/en";
import { messages as hindiMessages } from "./messages/hi";
import { messages as bengaliMessages } from "./messages/bn";
import { messages as gujaratiMessages } from "./messages/gu";
import { messages as marathiMessages } from "./messages/mr";
import { messages as punjabiMessages } from "./messages/pa";
import { messages as tamilMessages } from "./messages/ta";
import { messages as teluguMessages } from "./messages/te";
import { messages as kannadaMessages } from "./messages/kn";
import { messages as malayalamMessages } from "./messages/ml";
import { messages as odiaMessages } from "./messages/or";
import { messages as assameseMessages } from "./messages/as";
import { messages as nepaliMessages } from "./messages/ne";
import { messages as kashmiriMessages } from "./messages/ks";
import { messages as konkaniMessages } from "./messages/kok";
import { messages as maithiliMessages } from "./messages/mai";
import { messages as sanskritMessages } from "./messages/sa";

type Stringify<T> = {
  [K in keyof T]: T[K] extends object ? Stringify<T[K]> : string;
};

export type TranslationMessages = Stringify<typeof englishMessages>;

const messageLoaders: Record<
  Locale,
  () => Promise<{ messages: TranslationMessages }>
> = {
  en: async () => ({
    messages: englishMessages,
  }),

  hi: async () => ({
    messages: hindiMessages,
  }),

  bn: async () => ({ messages: bengaliMessages }),

  gu: async () => ({ messages: gujaratiMessages }),

  mr: async () => ({ messages: marathiMessages }),

  pa: async () => ({ messages: punjabiMessages }),

  ta: async () => ({ messages: tamilMessages }),

  te: async () => ({ messages: teluguMessages }),

  kn: async () => ({ messages: kannadaMessages }),

  ml: async () => ({ messages: malayalamMessages }),

  or: async () => ({ messages: odiaMessages }),

  as: async () => ({ messages: assameseMessages }),

  ne: async () => ({ messages: nepaliMessages }),

  ks: async () => ({ messages: kashmiriMessages }),

  kok: async () => ({ messages: konkaniMessages }),

  mai: async () => ({ messages: maithiliMessages }),

  sa: async () => ({ messages: sanskritMessages }),
};

export async function getMessages(
  locale: Locale = DEFAULT_LOCALE,
): Promise<TranslationMessages> {
  const loader = messageLoaders[locale] ?? messageLoaders[DEFAULT_LOCALE];
  const result = await loader();

  return result.messages;
}
