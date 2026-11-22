/**
 * Studio i18n: a tiny store with typed keys, {placeholder} interpolation,
 * CLDR plurals (Intl.PluralRules), and lazy-loaded catalogs.
 *
 * `t()` works outside React (status strings, thrown errors); components call
 * `useI18n()` so they re-render when the locale changes.
 */
import { useSyncExternalStore } from "react";
import { en, type MessageKey } from "./messages/en.js";
import { loadCatalog, type Catalog } from "./catalogs.js";
import { DEFAULT_LOCALE, localeInfo, matchLocale, type LocaleCode } from "./locales.js";
import type { Message, PluralForms } from "./types.js";

export { LOCALES, localeInfo, matchLocale } from "./locales.js";
export type { LocaleCode, LocaleInfo } from "./locales.js";
export type { MessageKey } from "./messages/en.js";

export const LOCALE_STORAGE_KEY = "pmd-studio-locale";

type Vars = Record<string, string | number>;

let current: LocaleCode = DEFAULT_LOCALE;
let catalog: Catalog = en;
let version = 0;
const listeners = new Set<() => void>();

function notify(): void {
  version++;
  for (const l of listeners) l();
}

/**
 * Format one message for a locale: pick the CLDR plural form from vars.count,
 * then fill {placeholders}. Numbers are formatted with Intl.NumberFormat.
 */
export function formatMessage(locale: string, message: Message, vars?: Vars): string {
  let text: string;
  if (typeof message === "string") {
    text = message;
  } else {
    const count = typeof vars?.["count"] === "number" ? (vars["count"] as number) : 0;
    const category = new Intl.PluralRules(locale).select(count) as keyof PluralForms;
    text = message[category] ?? message.other;
  }
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (whole, name: string) => {
    if (!(name in vars)) return whole;
    const v = vars[name]!;
    return typeof v === "number" ? new Intl.NumberFormat(locale).format(v) : v;
  });
}

function resolve(message: Message | undefined, vars?: Vars): string | undefined {
  return message === undefined ? undefined : formatMessage(current, message, vars);
}

/** Translate `key` in the current locale; falls back to English, then to the key. */
export function t(key: MessageKey, vars?: Vars): string {
  return (
    resolve(catalog[key] as Message | undefined, vars) ??
    resolve(en[key] as Message, vars) ??
    key
  );
}

export function getLocale(): LocaleCode {
  return current;
}

function applyDocument(code: LocaleCode): void {
  if (typeof document === "undefined") return;
  const info = localeInfo(code);
  document.documentElement.lang = code;
  document.documentElement.dir = info.dir;
}

/** Switch locale: loads the catalog, persists the choice, updates <html lang dir>. */
export async function setLocale(code: LocaleCode, opts: { persist?: boolean } = {}): Promise<void> {
  const next = await loadCatalog(code);
  current = code;
  catalog = next;
  applyDocument(code);
  if (opts.persist !== false) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      /* storage unavailable */
    }
  }
  notify();
}

/** Order: ?lang= → saved choice → browser languages → English. */
export function detectLocale(env?: {
  search?: string;
  stored?: string | null;
  languages?: readonly string[];
}): LocaleCode {
  const search = env?.search ?? (typeof location !== "undefined" ? location.search : "");
  const fromQuery = matchLocale(new URLSearchParams(search).get("lang"));
  if (fromQuery) return fromQuery;

  let stored = env?.stored;
  if (stored === undefined) {
    try {
      stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      stored = null;
    }
  }
  const fromStore = matchLocale(stored);
  if (fromStore) return fromStore;

  const languages =
    env?.languages ?? (typeof navigator !== "undefined" ? navigator.languages ?? [] : []);
  for (const tag of languages) {
    const hit = matchLocale(tag);
    if (hit) return hit;
  }
  return DEFAULT_LOCALE;
}

/** Load the detected locale before first render so there is no English flash. */
export async function initI18n(): Promise<void> {
  const code = detectLocale();
  try {
    await setLocale(code, { persist: false });
  } catch {
    await setLocale(DEFAULT_LOCALE, { persist: false });
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React binding: re-renders the caller when the locale changes. */
export function useI18n(): {
  t: typeof t;
  locale: LocaleCode;
  setLocale: typeof setLocale;
} {
  useSyncExternalStore(subscribe, () => version, () => version);
  return { t, locale: current, setLocale };
}
