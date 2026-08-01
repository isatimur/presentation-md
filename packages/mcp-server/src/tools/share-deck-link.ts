import { studioShareLink, encodeShareDeck, isShareDeck } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";

const DEFAULT_ORIGIN = "https://presentation-md.vercel.app";

export const shareDeckLinkTool: ToolDefinition = {
  name: "share_deck_link",
  description:
    "Encode Deck JSON into a shareable Studio URL (`?d=d1.` compressed token) that hydrates the editable deck on open — agent handoff after scaffold_deck / apply_theme / audit_deck. Same codec as Studio Copy link. Oversized decks error; use export_deck / write JSON instead.",
  inputSchema: {
    type: "object",
    properties: {
      json: {
        type: "object",
        description: "Deck JSON object (type:deck + slides). Same shape as render_deck / scaffold_deck.",
      },
      origin: {
        type: "string",
        description: `Studio origin for absolute URL (default ${DEFAULT_ORIGIN}). Use http://localhost:5173 for local Vite.`,
      },
      pathname: {
        type: "string",
        description: "Studio pathname (default /studio/). Local Vite often uses /.",
      },
      relative: {
        type: "boolean",
        description: "When true, return pathname+query only (no origin).",
      },
      include_token: {
        type: "boolean",
        description: "When true, also return the raw d1. token.",
      },
    },
    required: ["json"],
  },
  handler: async (input: Record<string, unknown>) => {
    const deck = input["json"];
    if (!isShareDeck(deck)) {
      throw new Error("json must be a Deck object with type:\"deck\" and a non-empty slides array");
    }
    const origin =
      typeof input["origin"] === "string" && input["origin"].trim()
        ? input["origin"].trim()
        : DEFAULT_ORIGIN;
    const pathname =
      typeof input["pathname"] === "string" && input["pathname"].trim()
        ? input["pathname"].trim()
        : "/studio/";
    const relative = input["relative"] === true;
    const includeToken = input["include_token"] === true;

    const studio_url = await studioShareLink(deck, { origin, pathname, relative });
    const result: Record<string, unknown> = {
      studio_url,
      hint: "Open the URL in Studio to edit live — same ?d= hydrate as Copy link. Pass to the user after craft gates.",
    };
    if (includeToken) {
      result["token"] = await encodeShareDeck(deck);
    }
    return result;
  },
};
