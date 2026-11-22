/**
 * Language for the presenter chrome inside rendered decks (nav hint, Edit,
 * blackout, help overlay, speaker window). The catalog lives in
 * packages/shared/deck-chrome.json so all three renderers share one source.
 * Pure and browser-safe.
 */

/** `{ en: {...}, ja: {...}, … }` — `en` is complete; others may miss keys. */
export type DeckChromeCatalog = Record<string, Record<string, string>>;

/**
 * Strings for `lang` (BCP 47): the catalog for its primary subtag, with every
 * missing key filled from English. Unknown languages get English.
 */
export function resolveDeckChrome(
  catalog: DeckChromeCatalog,
  lang: string
): Record<string, string> {
  const en = catalog["en"] ?? {};
  const primary = lang.split("-")[0]!.toLowerCase();
  const local = primary === "en" ? {} : (catalog[primary] ?? {});
  const out: Record<string, string> = { ...en };
  for (const [key, value] of Object.entries(local)) {
    if (key in en && typeof value === "string" && value.trim()) out[key] = value;
  }
  return out;
}

/** JSON for a `<script type="application/json">` block; `<` escaped so it cannot close the tag. */
export function deckChromeJson(strings: Record<string, string>): string {
  return JSON.stringify(strings).replace(/</g, "\\u003c");
}
