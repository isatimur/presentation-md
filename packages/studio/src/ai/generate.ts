import type { DeckJson } from "@presentation-md/export";
import { parseDeckJson } from "../export/downloads.js";

/**
 * In-browser deck generation. Two paths, both from a single source of truth
 * (the schema prompt below):
 *   1. `generateDeck` — call the Anthropic Messages API directly with the user's
 *      own key (BYO key, nothing leaves the browser except the request to Anthropic).
 *   2. `buildAgentPrompt` — a copy-paste prompt for driving generation from an
 *      agent (Claude Code, Cursor, …) that already has the skill installed.
 */

export const GEN_MODELS = [
  { id: "claude-opus-4-8", label: "Opus 4.8 — most capable" },
  { id: "claude-sonnet-4-6", label: "Sonnet 4.6 — faster, cheaper" },
  { id: "claude-haiku-4-5", label: "Haiku 4.5 — fastest" },
] as const;

export type GenModelId = (typeof GEN_MODELS)[number]["id"];

/** The deck schema, written for a model. Shared by both generate paths. */
const SCHEMA_PROMPT = `You author slide decks as a single JSON object matching this schema — the "Deck JSON" spec used by presentation-md.

Top level:
{ "type": "deck",
  "meta": { "title": string, "company"?: string, "description"?: string, "theme": string },
  "slides": Slide[] }

Every Slide has a "layout" and layout-specific fields. Optional on every slide: "notes"?: string (speaker notes — shown in Studio present mode and exported to PPTX notes pane; not rendered on the HTML slide face).

The eighteen layouts:

- title        { layout, eyebrow?, heading, lead? }
- section      { layout, number, eyebrow?, heading, lead? }        // number like "01"
- two-column   { layout, heading, body?, image?, imageAlt?, aside?, ratio?: "1-1"|"2-1"|"1-2"|"3-2"|"2-3", reverse? }
- image-hero   { layout, eyebrow?, heading, lead?, image, imageAlt? }  // full-bleed photo with caption overlay
- comparison   { layout, eyebrow?, heading?, leftLabel?, left, rightLabel?, right, emphasis?: "left"|"right" }
- feature-grid { layout, heading, columns, cards }                 // columns: 2|3|4|"bento"; cards: [{ icon?, title, body }]
- data-table   { layout, eyebrow?, heading, columns, rows }        // columns: string[]; rows: string[][] (each row = one string per column)
- stat-row     { layout, heading, lead?, variant?: "default"|"hero", stats }  // hero = mega-number wrap beat
- ranked-list  { layout, eyebrow?, heading?, lead?, items }        // items: [{ rank?, label, value?, widthPct? }] — prefer over custom-html bars
- logo-wall    { layout, eyebrow?, heading?, lead?, columns?, cards } // cards: [{ title, image?, imageAlt?, icon?, body? }]
- streak-grid  { layout, eyebrow?, heading?, lead?, filled, total?, cols?, body? } // Pulse day-streak cells
- metric-ring  { layout, eyebrow?, heading?, value, label?, pct?, lead?, body? } // circular KPI (pct 100 = badge ring; 1–99 = arc)
- chart        { layout, eyebrow?, heading?, lead?, chartType?, categories?, series, showLegend?, showValues?, stacked? }
               // chartType: bar|horizontal-bar|line|area|pie|donut; series: [{ name?, values: number[] }]
- timeline     { layout, heading, steps }                          // steps: [{ title, body }]
- quote        { layout, quote, by? }
- code         { layout, eyebrow?, heading?, lead?, code, language?, filename? }  // plain-text snippet in a window chrome
- custom-html  { layout, eyebrow?, heading?, lead?, html }         // sanitized one-off art; prefer schema layouts first
- closing      { layout, eyebrow?, heading, lead?, actions?: [{ label, href?, style?, icon? }], cta?: { label, href } }
               // prefer actions[] for dual share pills (solid + outline) with icon on every pill; cta is alias for actions[0]

Optional on every slide: "tone"?: "default"|"lime"|"magenta"|"cyan"|"orange"|"violet" — required craft for kinetic-wrapped year wraps.

Authoring rules:
- Open with a "title" slide and end with a "closing" slide.
- 6–10 slides total. Use a mix of layouts that fits the content — section dividers for chapters, stat-row for KPIs, ranked-list for rankings, chart for trends/composition, data-table for tabular data, timeline for roadmaps, quote for a punchy line.
- Keep text tight and presentation-grade: headings are short, leads are one line, card/stat bodies are a phrase, not a paragraph.
- Prefer concrete, specific content over filler. No lorem ipsum.
- Craft (required when the layout supports it):
  - comparison: always set "emphasis" to "left" or "right" — never leave the default balanced look.
  - two-column: prefer a non-1-1 "ratio" ("2-1", "1-2", "3-2", or "2-3") unless the content is truly equal weight; use "reverse" when the image/aside should lead.
  - feature-grid with 5 cards: set columns to "bento" so one hero card dominates.
  - Include at least one "image-hero" when the brief implies a visual product, place, or atmosphere.
  - Prefer "chart" over stuffing trend data into a data-table when the shape of the series is the point.
  - Year-wrap / kinetic-wrapped: use tone on ≥3 slides, stat-row variant:"hero" for mega numbers, ranked-list for top-N bars, streak-grid for day streaks, metric-ring for percentile KPIs, closing actions[] with icons for dual share pills. PPTX renders eyebrow chips + hard frames.
  - candy-pop: set meta.company (or meta.marquee) so the yellow ticker brands the deck — never hardcode Jellybean; PPTX cards get hard ink borders.
  - risograph-zine: prefer comparison+emphasis and a punchy quote for print-shop energy.
  - Match atmosphere to the brief: loud/thin surfaces (coral, raw-grid, sakura, retro-windows, …) for punchy brand energy; paper/editorial themes (claude, soft-editorial, ft-editorial, vellum, paper-ink, heritage-editorial, broadsheet, …) for magazine quiet — prefer quote + comparison+emphasis + short literary leads; fiber grain is HTML-only.
  - PPTX approximates theme chrome as native shapes; reserve custom-html for art PPTX cannot keep.
  - Closing dual asks: stunning / wrap / launch / investor decks prefer actions[] with solid + outline pills and an icon on every pill (cta alone is weak).
  - Add brief "notes" on 2–4 key slides (talking points for the presenter).
- Only emit fields defined above. Do not invent new layouts or fields.`;

function buildUserBrief(brief: string, theme: string): string {
  return `Create a deck for the following brief. Set meta.theme to "${theme}".

Brief:
${brief.trim()}`;
}

/** The full prompt to hand to an agent that has the skill installed. */
export function buildAgentPrompt(brief: string, theme: string): string {
  return `${SCHEMA_PROMPT}

${buildUserBrief(brief, theme)}

Respond with ONLY the JSON object — no prose, no markdown fences.`;
}

/** Strip accidental ```json fences and locate the JSON object in a text response. */
function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = (fenced?.[1] ?? text).trim();
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return body;
  return body.slice(start, end + 1);
}

export interface GenerateArgs {
  apiKey: string;
  model: GenModelId;
  brief: string;
  theme: string;
  signal?: AbortSignal;
}

/**
 * Generate a deck by calling the Anthropic Messages API from the browser. Uses
 * the official SDK (lazy-loaded so it stays out of the initial bundle, like the
 * pptx exporter). `dangerouslyAllowBrowser` is required for a keyless-backend
 * SPA where the user supplies their own key.
 */
export async function generateDeck(args: GenerateArgs): Promise<DeckJson> {
  const { apiKey, model, brief, theme, signal } = args;
  if (!brief.trim()) throw new Error("Describe your deck first.");
  if (!apiKey.trim()) throw new Error("Enter your Anthropic API key.");

  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: apiKey.trim(), dangerouslyAllowBrowser: true });

  const message = await client.messages.create(
    {
      model,
      max_tokens: 8000,
      system: SCHEMA_PROMPT,
      messages: [
        {
          role: "user",
          content: `${buildUserBrief(brief, theme)}\n\nRespond with ONLY the JSON object — no prose, no markdown fences.`,
        },
      ],
    },
    { signal }
  );

  const text = message.content.map((b) => (b.type === "text" ? b.text : "")).join("");

  if (!text.trim()) throw new Error("The model returned an empty response. Try again.");

  let deck: DeckJson;
  try {
    deck = parseDeckJson(extractJson(text));
  } catch (err) {
    throw new Error(`Couldn't parse the generated deck: ${(err as Error).message}`);
  }

  // Force the chosen theme even if the model set something else.
  deck.meta = { ...deck.meta, theme };
  return deck;
}
