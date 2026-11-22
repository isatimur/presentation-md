/**
 * Deck language helpers shared by the renderers, the exporter, and the craft gates.
 * Pure and browser-safe (no node: imports) so Studio can use the same rules.
 */

export type TextDir = "ltr" | "rtl";

/** Primary language subtags written right to left. */
const RTL_LANGS = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv", "ckb"]);

/** Loose BCP 47 shape: primary subtag plus optional script/region/variant subtags. */
const LANG_TAG = /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/;

/**
 * Return a safe BCP 47 tag for `meta.lang`, or "en" when missing or malformed.
 * The value lands in an HTML attribute, so anything outside the tag shape is dropped.
 */
export function normalizeDeckLang(raw: unknown): string {
  if (typeof raw !== "string") return "en";
  const trimmed = raw.trim();
  if (!LANG_TAG.test(trimmed)) return "en";
  try {
    return Intl.getCanonicalLocales(trimmed)[0] ?? "en";
  } catch {
    return "en";
  }
}

function primary(lang: string): string {
  return lang.split("-")[0]!.toLowerCase();
}

export function deckLangDir(lang: string): TextDir {
  return RTL_LANGS.has(primary(lang)) ? "rtl" : "ltr";
}

interface ScriptFonts {
  /** Family names to add to CSS font stacks. */
  families: string[];
  /** Google Fonts css2 family specs (same format as theme `googleFonts`). */
  googleFonts: string[];
}

const NOTO = {
  sc: { family: "Noto Sans SC", spec: "Noto+Sans+SC:wght@400;700" },
  tc: { family: "Noto Sans TC", spec: "Noto+Sans+TC:wght@400;700" },
  jp: { family: "Noto Sans JP", spec: "Noto+Sans+JP:wght@400;700" },
  kr: { family: "Noto Sans KR", spec: "Noto+Sans+KR:wght@400;700" },
  arabic: { family: "Noto Sans Arabic", spec: "Noto+Sans+Arabic:wght@400;700" },
  hebrew: { family: "Noto Sans Hebrew", spec: "Noto+Sans+Hebrew:wght@400;700" },
  devanagari: { family: "Noto Sans Devanagari", spec: "Noto+Sans+Devanagari:wght@400;700" },
  bengali: { family: "Noto Sans Bengali", spec: "Noto+Sans+Bengali:wght@400;700" },
  thai: { family: "Noto Sans Thai", spec: "Noto+Sans+Thai:wght@400;700" },
  // Latin + Cyrillic + Greek + Vietnamese coverage for themes whose fonts are Latin-only.
  sans: { family: "Noto Sans", spec: "Noto+Sans:wght@400;700" },
} as const;

type NotoKey = keyof typeof NOTO;

function notoFor(lang: string): NotoKey[] {
  const tag = lang.toLowerCase();
  const p = primary(lang);
  switch (p) {
    case "zh":
      return /-(hant|tw|hk|mo)\b/.test(tag) ? ["tc"] : ["sc"];
    case "ja":
      return ["jp"];
    case "ko":
      return ["kr"];
    case "ar":
    case "fa":
    case "ur":
      return ["arabic"];
    case "he":
    case "yi":
      return ["hebrew"];
    case "hi":
    case "mr":
    case "ne":
      return ["devanagari"];
    case "bn":
      return ["bengali"];
    case "th":
      return ["thai"];
    case "ru":
    case "uk":
    case "bg":
    case "sr":
    case "mk":
    case "be":
    case "kk":
    case "el":
    case "vi":
      return ["sans"];
    default:
      return [];
  }
}

/** Noto fallbacks for scripts that theme fonts (mostly Latin-only) do not cover. */
export function scriptFallbackFonts(lang: string): ScriptFonts {
  const keys = notoFor(lang);
  return {
    families: keys.map((k) => NOTO[k].family),
    googleFonts: keys.map((k) => NOTO[k].spec),
  };
}

const GENERIC = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong",
]);

/**
 * Insert fallback families into a CSS font stack, just before the first generic
 * family, so theme fonts keep priority and the generic stays last.
 */
export function withFontFallback(stack: string, families: string[]): string {
  if (families.length === 0) return stack;
  const parts = stack.split(",").map((p) => p.trim()).filter(Boolean);
  const quoted = families.map((f) => `'${f}'`);
  const genericAt = parts.findIndex((p) => GENERIC.has(p.replace(/['"]/g, "").toLowerCase()));
  const at = genericAt === -1 ? parts.length : genericAt;
  return [...parts.slice(0, at), ...quoted, ...parts.slice(at)].join(", ");
}

type SegmenterLike = {
  segment(input: string): Iterable<{ isWordLike?: boolean }>;
};

const segmenters = new Map<string, SegmenterLike | null>();

function segmenterFor(lang: string): SegmenterLike | null {
  if (segmenters.has(lang)) return segmenters.get(lang)!;
  const Ctor = (Intl as unknown as { Segmenter?: new (l: string, o: object) => SegmenterLike })
    .Segmenter;
  let seg: SegmenterLike | null = null;
  if (Ctor) {
    try {
      seg = new Ctor(lang, { granularity: "word" });
    } catch {
      seg = null;
    }
  }
  segmenters.set(lang, seg);
  return seg;
}

const LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;

const CJK_RUN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu;

/**
 * Count words in any script.
 * - Spaced scripts (Latin, Cyrillic, Arabic, …): whitespace tokens that contain a
 *   letter or digit. Same as the old count for English, and the same rule as
 *   deck_metrics.py, so the TypeScript and Python judges agree.
 * - CJK runs (no spaces): Intl.Segmenter word segments, else one word per two characters.
 */
export function countWords(text: string, lang = "en"): number {
  if (!text.trim()) return 0;
  const runs = text.match(CJK_RUN) ?? [];
  const spaced = text
    .replace(CJK_RUN, " ")
    .split(/\s+/)
    .filter((w) => LETTER_OR_DIGIT.test(w)).length;
  if (runs.length === 0) return spaced;

  const seg = segmenterFor(normalizeDeckLang(lang));
  let cjk = 0;
  for (const run of runs) {
    if (seg) {
      for (const part of seg.segment(run)) if (part.isWordLike) cjk++;
    } else {
      cjk += Math.ceil(run.length / 2);
    }
  }
  return spaced + cjk;
}
