import type { DeckJson } from "@presentation-md/export";
import { LAYOUTS } from "./deck.js";

const LAYOUT_NAMES = new Set<string>(LAYOUTS);
export const MAX_STUDIO_DECK_JSON_BYTES = 8 * 1024 * 1024;
export const MAX_STUDIO_DECK_SLIDES = 200;
export const MAX_STUDIO_DECK_COLLECTION_ITEMS = 20_000;
const COMMON_TEXT_FIELDS = [
  "heading",
  "quote",
  "eyebrow",
  "notes",
  "lead",
  "body",
  "aside",
  "ratio",
  "image",
  "imageAlt",
  "by",
  "number",
  "code",
  "language",
  "filename",
  "emphasis",
  "variant",
  "orientation",
  "leftLabel",
  "rightLabel",
  "left",
  "right",
  "chartType",
  "html",
  "tone",
  "value",
  "label",
] as const;
const OBJECT_ARRAY_FIELDS = ["cards", "stats", "items", "steps", "series", "actions"] as const;
const BOOLEAN_FIELDS = ["reverse", "showLegend", "showValues", "stacked"] as const;
const NUMBER_FIELDS = ["filled", "total", "cols", "pct"] as const;

function invalidOptionalFields(
  value: Record<string, unknown>,
  label: string,
  fields: readonly string[],
  expected: "string" | "number" | "boolean"
): string | null {
  for (const field of fields) {
    if (value[field] !== undefined && typeof value[field] !== expected) {
      return `${label}.${field} must be a ${expected}`;
    }
  }
  return null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Lightweight synchronous guard for Studio startup/import paths. The full JSON
 * schema still owns export validation; this prevents malformed persisted input
 * from reaching React/render paths that require slide objects and arrays.
 */
export function studioDeckError(value: unknown): string | null {
  if (!isRecord(value) || value.type !== "deck") {
    return 'expected an object with type: "deck"';
  }
  if (!Array.isArray(value.slides) || value.slides.length === 0) {
    return "expected at least one slide";
  }
  if (value.slides.length > MAX_STUDIO_DECK_SLIDES) {
    return `too many slides (max ${MAX_STUDIO_DECK_SLIDES})`;
  }
  if (value.meta !== undefined && !isRecord(value.meta)) {
    return "meta must be an object";
  }

  let nestedItems = 0;
  const addNestedItems = (count: number): string | null => {
    nestedItems += count;
    return nestedItems > MAX_STUDIO_DECK_COLLECTION_ITEMS
      ? `too many nested items (max ${MAX_STUDIO_DECK_COLLECTION_ITEMS})`
      : null;
  };

  for (let index = 0; index < value.slides.length; index += 1) {
    const slide = value.slides[index];
    const label = `slide ${index + 1}`;
    if (!isRecord(slide)) return `${label} must be an object`;
    if (typeof slide.layout !== "string" || !LAYOUT_NAMES.has(slide.layout)) {
      return `${label} has an unsupported layout`;
    }
    for (const field of COMMON_TEXT_FIELDS) {
      if (slide[field] !== undefined && typeof slide[field] !== "string") {
        return `${label}.${field} must be a string`;
      }
    }
    const invalidBoolean = invalidOptionalFields(slide, label, BOOLEAN_FIELDS, "boolean");
    if (invalidBoolean) return invalidBoolean;
    const invalidNumber = invalidOptionalFields(slide, label, NUMBER_FIELDS, "number");
    if (invalidNumber) return invalidNumber;
    for (const field of OBJECT_ARRAY_FIELDS) {
      const entries = slide[field];
      if (entries === undefined) continue;
      if (!Array.isArray(entries)) return `${label}.${field} must be an array`;
      const complexityError = addNestedItems(entries.length);
      if (complexityError) return complexityError;
      if (entries.some((entry) => !isRecord(entry))) {
        return `${label}.${field} entries must be objects`;
      }
    }
    if (slide.columns !== undefined) {
      const validColumns =
        typeof slide.columns === "string" ||
        typeof slide.columns === "number" ||
        (Array.isArray(slide.columns) &&
          slide.columns.every((column) => typeof column === "string"));
      if (!validColumns) return `${label}.columns must be a string, number, or array of strings`;
      if (Array.isArray(slide.columns)) {
        const complexityError = addNestedItems(slide.columns.length);
        if (complexityError) return complexityError;
      }
    }
    if (
      slide.categories !== undefined &&
      (!Array.isArray(slide.categories) ||
        slide.categories.some((category) => typeof category !== "string"))
    ) {
      return `${label}.categories must be an array of strings`;
    }
    if (Array.isArray(slide.categories)) {
      const complexityError = addNestedItems(slide.categories.length);
      if (complexityError) return complexityError;
    }
    if (slide.rows !== undefined) {
      if (!Array.isArray(slide.rows) || slide.rows.some((row) => !Array.isArray(row))) {
        return `${label}.rows must be an array of arrays`;
      }
      if (slide.rows.some((row) => row.some((cell: unknown) => typeof cell !== "string"))) {
        return `${label}.rows cells must be strings`;
      }
      const cellCount = slide.rows.reduce((total, row) => total + row.length, slide.rows.length);
      const complexityError = addNestedItems(cellCount);
      if (complexityError) return complexityError;
    }
    if (slide.cta !== undefined) {
      if (!isRecord(slide.cta)) return `${label}.cta must be an object`;
      const invalid = invalidOptionalFields(
        slide.cta,
        `${label}.cta`,
        ["label", "href", "style", "icon"],
        "string"
      );
      if (invalid) return invalid;
    }

    const nestedTextFields: Partial<Record<(typeof OBJECT_ARRAY_FIELDS)[number], readonly string[]>> = {
      cards: ["icon", "title", "body", "image", "imageAlt"],
      stats: ["value", "label"],
      items: ["rank", "label", "value"],
      steps: ["title", "body"],
      series: ["name"],
      actions: ["label", "href", "style", "icon"],
    };
    for (const field of OBJECT_ARRAY_FIELDS) {
      const entries = slide[field];
      if (!Array.isArray(entries)) continue;
      for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
        const entry = entries[entryIndex] as Record<string, unknown>;
        const entryLabel = `${label}.${field}[${entryIndex + 1}]`;
        const invalid = invalidOptionalFields(
          entry,
          entryLabel,
          nestedTextFields[field] ?? [],
          "string"
        );
        if (invalid) return invalid;
        if (
          field === "items" &&
          entry.widthPct !== undefined &&
          typeof entry.widthPct !== "number"
        ) {
          return `${entryLabel}.widthPct must be a number`;
        }
        if (
          field === "series" &&
          entry.values !== undefined &&
          (!Array.isArray(entry.values) ||
            entry.values.some((value) => typeof value !== "number"))
        ) {
          return `${entryLabel}.values must be an array of numbers`;
        }
        if (field === "series" && Array.isArray(entry.values)) {
          const complexityError = addNestedItems(entry.values.length);
          if (complexityError) return complexityError;
        }
      }
    }
  }

  return null;
}

export function parseStudioDeckJson(text: string): DeckJson {
  const byteLength =
    text.length > MAX_STUDIO_DECK_JSON_BYTES
      ? text.length
      : new TextEncoder().encode(text).byteLength;
  if (byteLength > MAX_STUDIO_DECK_JSON_BYTES) {
    throw new Error(
      `Deck JSON is too large (max ${MAX_STUDIO_DECK_JSON_BYTES / (1024 * 1024)} MiB)`
    );
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`);
  }
  const error = studioDeckError(parsed);
  if (error) throw new Error(`Not a Studio-safe deck: ${error}`);
  return parsed as DeckJson;
}
