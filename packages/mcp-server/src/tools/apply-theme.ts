import { repairCraft } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";

export const applyThemeTool: ToolDefinition = {
  name: "apply_theme",
  description:
    "Re-theme an existing deck JSON — swap meta.theme while keeping slide copy. By default runs repairCraft so theme-honesty / craft floors clear in one hop (Studio My deck Use parity). Pass apply_safe_fixes:false for a pure theme swap.",
  inputSchema: {
    type: "object",
    properties: {
      json: { type: "string", description: "Deck JSON string" },
      target_theme: { type: "string", description: "Theme name to apply" },
      apply_safe_fixes: {
        type: "boolean",
        description:
          "When true (default), run repairCraft after the theme swap — beat inserts + field fixes for the new theme's honesty gates. Set false to only change meta.theme.",
      },
    },
    required: ["json", "target_theme"],
  },
  handler: async (input: Record<string, unknown>) => {
    const rawJson = input["json"] as string;
    const targetTheme = input["target_theme"] as string;
    const applyFixes = input["apply_safe_fixes"] !== false;

    let deck: Record<string, unknown>;
    try {
      deck = JSON.parse(rawJson) as Record<string, unknown>;
    } catch (err) {
      throw new Error(`Invalid JSON: ${(err as Error).message}`);
    }

    const meta = (deck["meta"] ?? {}) as Record<string, unknown>;
    meta["theme"] = targetTheme;
    deck["meta"] = meta;

    if (!applyFixes) {
      return { json: JSON.stringify(deck, null, 2), theme: targetTheme, fixes_applied: [] as string[] };
    }

    const { deck: repaired, fixes } = repairCraft(deck);
    return {
      json: JSON.stringify(repaired, null, 2),
      theme: targetTheme,
      fixes_applied: fixes,
    };
  },
};
