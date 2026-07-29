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

Every Slide has a "layout" and layout-specific fields. The nine layouts:

- title        { layout, eyebrow?, heading, lead? }
- section      { layout, number, eyebrow?, heading, lead? }        // number like "01"
- two-column   { layout, heading, body, image?, imageAlt? }        // image is an https URL, optional
- feature-grid { layout, heading, columns, cards }                 // columns: 2|3|4; cards: [{ icon?, title, body }] (icon = a Font Awesome class e.g. "fa-solid fa-bolt")
- data-table   { layout, eyebrow?, heading, columns, rows }        // columns: string[]; rows: string[][] (each row = one string per column)
- stat-row     { layout, heading, stats }                          // stats: [{ value, label }] — value like "98%", "$1.2M"
- timeline     { layout, heading, steps }                          // steps: [{ title, body }]
- quote        { layout, quote, by? }
- closing      { layout, eyebrow?, heading, lead?, cta? }          // cta: { label, href } (href = https URL)

Authoring rules:
- Open with a "title" slide and end with a "closing" slide.
- 6–10 slides total. Use a mix of layouts that fits the content — section dividers for chapters, stat-row for metrics, data-table for tabular data, timeline for roadmaps, quote for a punchy line.
- Keep text tight and presentation-grade: headings are short, leads are one line, card/stat bodies are a phrase, not a paragraph.
- Prefer concrete, specific content over filler. No lorem ipsum.
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
