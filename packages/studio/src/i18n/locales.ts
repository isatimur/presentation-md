/**
 * Studio UI languages: the ten most-used languages on the web
 * (Internet World Stats, "Top Ten Languages Used in the Web").
 * Add or remove a language here and in ./catalogs.ts; the parity test does the rest.
 */
export const LOCALES = [
  { code: "en", endonym: "English", dir: "ltr", deckLang: "en" },
  { code: "zh", endonym: "简体中文", dir: "ltr", deckLang: "zh" },
  { code: "es", endonym: "Español", dir: "ltr", deckLang: "es" },
  { code: "ar", endonym: "العربية", dir: "rtl", deckLang: "ar" },
  { code: "pt", endonym: "Português (Brasil)", dir: "ltr", deckLang: "pt-BR" },
  { code: "id", endonym: "Bahasa Indonesia", dir: "ltr", deckLang: "id" },
  { code: "fr", endonym: "Français", dir: "ltr", deckLang: "fr" },
  { code: "ja", endonym: "日本語", dir: "ltr", deckLang: "ja" },
  { code: "ru", endonym: "Русский", dir: "ltr", deckLang: "ru" },
  { code: "de", endonym: "Deutsch", dir: "ltr", deckLang: "de" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export type LocaleInfo = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: LocaleCode = "en";

export function localeInfo(code: LocaleCode): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/** Map any BCP 47 tag (en-GB, pt-PT, zh-Hans-CN) to a supported UI locale, or null. */
export function matchLocale(tag: string | null | undefined): LocaleCode | null {
  if (!tag) return null;
  const primary = tag.trim().toLowerCase().split(/[-_]/)[0];
  const hit = LOCALES.find((l) => l.code === primary);
  return hit ? hit.code : null;
}
