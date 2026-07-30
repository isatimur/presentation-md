/**
 * Deck/slide shape, mirroring `packages/core/deck.schema.json`.
 *
 * The schema in core is the single source of truth for *validation*; these
 * types describe the same shape for the exporter so it can map fields to
 * native slide shapes without re-parsing JSON. Validation stays in core
 * (`validateDeckJson`) and is run by callers (CLI / MCP / studio) before export.
 */

export type LayoutType =
  | "title"
  | "two-column"
  | "feature-grid"
  | "quote"
  | "data-table"
  | "stat-row"
  | "timeline"
  | "section"
  | "closing"
  | "image-hero"
  | "comparison"
  | "code";

export interface Card {
  icon?: string;
  title: string;
  body?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Step {
  title: string;
  body?: string;
}

export interface Cta {
  label?: string;
  href?: string;
}

export interface Slide {
  layout: LayoutType | string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  body?: string;
  /** two-column: pull-quote panel when no image. */
  aside?: string;
  /** two-column: asymmetric flex ratio. */
  ratio?: "1-1" | "2-1" | "1-2" | "3-2" | "2-3" | string;
  /** two-column: media/aside on the left. */
  reverse?: boolean;
  image?: string;
  imageAlt?: string;
  quote?: string;
  by?: string;
  number?: string;
  /** code layout: plain-text source snippet. */
  code?: string;
  language?: string;
  filename?: string;
  /** comparison: grow left or right column. */
  emphasis?: "left" | "right" | string;
  /** feature-grid: column count (2-4) or "bento". data-table: header labels. */
  columns?: number | string | string[];
  cards?: Card[];
  rows?: string[][];
  stats?: Stat[];
  steps?: Step[];
  cta?: Cta;
  /** Speaker notes (e.g. from PPTX import); not rendered on the slide. */
  notes?: string;
  /** comparison: column labels and body copy. */
  leftLabel?: string;
  rightLabel?: string;
  left?: string;
  right?: string;
  [key: string]: unknown;
}

export interface DeckMeta {
  title?: string;
  company?: string;
  description?: string;
  theme?: string;
}

export interface DeckJson {
  type: "deck";
  meta?: DeckMeta;
  slides: Slide[];
}
