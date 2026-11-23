import { deckOutline } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";
import { readDeckSource } from "../lib/deck-source.js";

export const outlineDeckTool: ToolDefinition = {
  name: "outline_deck",
  description:
    "Read a deck slide by slide without loading all of it: per slide the number, layout, title, word count, whether it has speaker notes, and its craft-audit issues, plus deck-wide issues. Pass `include` to also get the full JSON of chosen slides. Use it before edit_deck so you only read and rewrite the slides you change. Pass `deck_path` (a deck JSON file in the working directory) to avoid resending the deck.",
  inputSchema: {
    type: "object",
    properties: {
      deck_path: { type: "string", description: "Path to a deck JSON file within the current working directory" },
      json: { type: "string", description: "Deck JSON string (alternative to deck_path)" },
      include: {
        type: "array",
        items: { type: "integer", minimum: 1 },
        description: "1-based slide numbers whose full JSON to return in slide_json",
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const { deck } = await readDeckSource(input);
    const include = Array.isArray(input["include"]) ? (input["include"] as number[]) : [];
    return deckOutline(deck, include);
  },
};
