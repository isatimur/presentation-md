import { buildGenerateDeckPrompt } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";
import { resolveThemesDir } from "../lib/resolve-themes.js";

export const generateDeckPromptTool: ToolDefinition = {
  name: "generate_deck_prompt",
  description:
    "Build a one-shot craft system prompt (theme palette + anti-slop + layout recipes + custom-html recipes + shortlists) so the first Deck JSON already clears audit/judge gates — beat frontend-slides vibe drafts. Optional density locks speaker-led vs reading-first (matches Studio Generate). Mentions remorph_density for post-draft structural density fixes.",
  inputSchema: {
    type: "object",
    properties: {
      theme: { type: "string", description: "Theme name to use (default: default-tech)" },
      intent: { type: "string", description: "What the deck should argue or show" },
      density: {
        type: "string",
        enum: ["speaker", "reading"],
        description:
          'Deck density lock. "speaker" (default) = one idea per slide, large type. "reading" = self-contained slides for async/board packs.',
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const { themesDir, fallbackThemesDirs } = resolveThemesDir();
    return buildGenerateDeckPrompt({
      theme: typeof input["theme"] === "string" ? input["theme"] : undefined,
      intent: typeof input["intent"] === "string" ? input["intent"] : undefined,
      density: input["density"] === "reading" ? "reading" : "speaker",
      themesDir,
      fallbackThemesDirs,
    });
  },
};
