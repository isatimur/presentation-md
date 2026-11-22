import { en } from "./messages/en.js";
import type { LocaleCode } from "./locales.js";
import type { PluralForms } from "./types.js";

/**
 * Every locale must define every English key with the same shape:
 * a string for a string, plural forms for plural forms. Typecheck fails otherwise.
 */
export type Catalog = {
  [K in keyof typeof en]: (typeof en)[K] extends string ? string : PluralForms;
};

/** Non-English catalogs are separate chunks, loaded on demand. */
const loaders: Record<Exclude<LocaleCode, "en">, () => Promise<Catalog>> = {
  zh: () => import("./messages/zh.js").then((m) => m.zh),
  es: () => import("./messages/es.js").then((m) => m.es),
  ar: () => import("./messages/ar.js").then((m) => m.ar),
  pt: () => import("./messages/pt.js").then((m) => m.pt),
  id: () => import("./messages/id.js").then((m) => m.id),
  fr: () => import("./messages/fr.js").then((m) => m.fr),
  ja: () => import("./messages/ja.js").then((m) => m.ja),
  ru: () => import("./messages/ru.js").then((m) => m.ru),
  de: () => import("./messages/de.js").then((m) => m.de),
};

export async function loadCatalog(code: LocaleCode): Promise<Catalog> {
  return code === "en" ? en : loaders[code]();
}

export const CATALOG_LOADERS = loaders;
