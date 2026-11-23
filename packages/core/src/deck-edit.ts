/**
 * Slide-level reading and editing of Deck JSON, so an agent can change one
 * slide without resending or rewriting the whole deck. Pure functions: callers
 * validate the result (validateDeck) and decide where to write it.
 */
import { auditCraft } from "./craft-audit.js";
import { judgeDeckJson } from "./judge-deck-json.js";

type Json = Record<string, unknown>;

export interface DeckOutlineSlide {
  /** 1-based slide number. */
  n: number;
  layout: string;
  /** heading, else quote, else eyebrow; "" when the slide has none. */
  title: string;
  /** Language-aware word count of the slide's text (same count as judge_deck). */
  words: number;
  has_notes: boolean;
  /** Craft audit issues on this slide (deck-wide issues are in `deck_issues`). */
  issues: string[];
}

export interface DeckOutline {
  title: string;
  theme: string;
  lang: string;
  slide_count: number;
  slides: DeckOutlineSlide[];
  /** Craft audit issues that are not tied to one slide. */
  deck_issues: string[];
  /** Full JSON of the slides asked for with `include`, keyed by slide number. */
  slide_json?: Record<number, Json>;
}

function asSlides(deck: Json): Json[] {
  return Array.isArray(deck["slides"]) ? (deck["slides"] as Json[]) : [];
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

/** Compact per-slide view of a deck, plus full JSON for the slide numbers in `include`. */
export function deckOutline(deck: Json, include: number[] = []): DeckOutline {
  const slides = asSlides(deck);
  const meta = (deck["meta"] ?? {}) as Json;
  const words = (judgeDeckJson(deck).metrics["words_per_slide"] ?? []) as number[];
  const issues = auditCraft(deck as never);
  const outline: DeckOutline = {
    title: str(meta["title"]),
    theme: str(meta["theme"]),
    lang: str(meta["lang"]) || "en",
    slide_count: slides.length,
    slides: slides.map((s, i) => ({
      n: i + 1,
      layout: str(s["layout"]),
      title: str(s["heading"]) || str(s["quote"]) || str(s["eyebrow"]),
      words: words[i] ?? 0,
      has_notes: str(s["notes"]).trim() !== "",
      issues: issues.filter((x) => x.slide === i + 1).map((x) => x.message),
    })),
    deck_issues: issues.filter((x) => x.slide === undefined).map((x) => x.message),
  };
  const wanted = [...new Set(include)].filter((n) => Number.isInteger(n) && n >= 1 && n <= slides.length);
  if (wanted.length) {
    outline.slide_json = Object.fromEntries(wanted.map((n) => [n, slides[n - 1]!]));
  }
  return outline;
}

/**
 * One edit. Slide numbers are 1-based and refer to the deck as it is after the
 * operations before this one in the same batch.
 * - update_slide: merge `fields` into the slide; a `null` value removes the field.
 * - replace_slide: put `value` in place of the slide.
 * - insert_slide: insert `value` so it becomes slide `at` (slide_count + 1 appends).
 * - delete_slide / move_slide: remove the slide, or move it to position `to`.
 * - update_meta: merge `fields` into meta; `null` removes the field.
 */
export type DeckEditOp =
  | { op: "update_slide"; slide: number; fields: Json }
  | { op: "replace_slide"; slide: number; value: Json }
  | { op: "insert_slide"; at: number; value: Json }
  | { op: "delete_slide"; slide: number }
  | { op: "move_slide"; slide: number; to: number }
  | { op: "update_meta"; fields: Json };

export class DeckEditError extends Error {
  constructor(
    message: string,
    /** 0-based index of the failing operation in the batch. */
    readonly opIndex: number
  ) {
    super(`operation ${opIndex + 1}: ${message}`);
    this.name = "DeckEditError";
  }
}

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function isObject(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function merge(target: Json, fields: unknown, i: number): Json {
  if (!isObject(fields)) throw new DeckEditError("`fields` must be an object", i);
  const out: Json = { ...target };
  for (const [key, value] of Object.entries(fields)) {
    if (UNSAFE_KEYS.has(key)) throw new DeckEditError(`field name "${key}" is not allowed`, i);
    if (value === null) delete out[key];
    else out[key] = value;
  }
  return out;
}

function slideIndex(n: unknown, count: number, i: number, label = "slide"): number {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > count) {
    throw new DeckEditError(`\`${label}\` must be a slide number from 1 to ${count}, got ${JSON.stringify(n)}`, i);
  }
  return n - 1;
}

function slideValue(v: unknown, i: number): Json {
  if (!isObject(v)) throw new DeckEditError("`value` must be a slide object", i);
  if (typeof v["layout"] !== "string") throw new DeckEditError("`value.layout` is required", i);
  return JSON.parse(JSON.stringify(v)) as Json;
}

/**
 * Apply a batch of edits to a copy of `deck` and return it. Throws
 * DeckEditError (with the failing operation) and leaves `deck` untouched.
 */
export function applyDeckEdits(deck: Json, ops: unknown): { deck: Json; touched: number[] } {
  if (!Array.isArray(ops) || ops.length === 0) {
    throw new DeckEditError("`operations` must be a non-empty array", 0);
  }
  const next = JSON.parse(JSON.stringify(deck)) as Json;
  const slides = asSlides(next);
  next["slides"] = slides;
  // Track slides by object identity so `touched` reports final positions.
  const touchedObjs = new Set<Json>();

  ops.forEach((raw, i) => {
    if (!isObject(raw)) throw new DeckEditError("each operation must be an object", i);
    const op = raw as DeckEditOp;
    switch (op.op) {
      case "update_slide": {
        const at = slideIndex(op.slide, slides.length, i);
        slides[at] = merge(slides[at]!, op.fields, i);
        touchedObjs.add(slides[at]!);
        break;
      }
      case "replace_slide": {
        const at = slideIndex(op.slide, slides.length, i);
        slides[at] = slideValue(op.value, i);
        touchedObjs.add(slides[at]!);
        break;
      }
      case "insert_slide": {
        const at = slideIndex(op.at, slides.length + 1, i, "at");
        const value = slideValue(op.value, i);
        slides.splice(at, 0, value);
        touchedObjs.add(value);
        break;
      }
      case "delete_slide": {
        const at = slideIndex(op.slide, slides.length, i);
        const [removed] = slides.splice(at, 1);
        touchedObjs.delete(removed!);
        break;
      }
      case "move_slide": {
        const from = slideIndex(op.slide, slides.length, i);
        const to = slideIndex(op.to, slides.length, i, "to");
        const [moved] = slides.splice(from, 1);
        slides.splice(to, 0, moved!);
        touchedObjs.add(moved!);
        break;
      }
      case "update_meta": {
        next["meta"] = merge(isObject(next["meta"]) ? next["meta"] : {}, op.fields, i);
        break;
      }
      default:
        throw new DeckEditError(
          `unknown op ${JSON.stringify((raw as Json)["op"])} (expected update_slide | replace_slide | insert_slide | delete_slide | move_slide | update_meta)`,
          i
        );
    }
  });

  const touched = slides.flatMap((s, idx) => (touchedObjs.has(s) ? [idx + 1] : []));
  return { deck: next, touched };
}
