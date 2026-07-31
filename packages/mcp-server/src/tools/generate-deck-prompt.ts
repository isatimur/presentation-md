import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";
import { loadTheme } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";
import { resolveThemesDir } from "../lib/resolve-themes.js";

function getCoreRoot(): string {
  const require = createRequire(import.meta.url);
  const coreMain = require.resolve("@presentation-md/core");
  // coreMain points to dist/index.js; core root is two levels up from dist/
  return dirname(dirname(coreMain));
}

export const generateDeckPromptTool: ToolDefinition = {
  name: "generate_deck_prompt",
  description:
    "Build a system prompt with the active theme's palette and the deck schema reference, for an agent to produce a deck JSON spec.",
  inputSchema: {
    type: "object",
    properties: {
      theme: { type: "string", description: "Theme name to use (default: default-tech)" },
      intent: { type: "string", description: "What the deck should argue or show" }
    }
  },
  handler: async (input: Record<string, unknown>) => {
    const themeName = (input["theme"] as string | undefined) ?? "default-tech";
    const intent = (input["intent"] as string | undefined) ?? "";

    const coreRoot = getCoreRoot();
    const { themesDir, fallbackThemesDirs } = resolveThemesDir();

    const [theme, skill, deckSchemaReference, stunning25, themesMd] = await Promise.all([
      loadTheme(themeName, { themesDir, fallbackThemesDirs }),
      readFile(join(coreRoot, "SKILL.md"), "utf-8"),
      readFile(join(coreRoot, "references", "deck-schema.md"), "utf-8"),
      readFile(join(coreRoot, "references", "stunning-25.md"), "utf-8").catch(() => ""),
      readFile(join(coreRoot, "references", "themes.md"), "utf-8").catch(() => ""),
    ]);

    const craftMandate = [
      "CRAFT MANDATE (non-negotiable):",
      "- Prefer stunning-25 themes when the brief matches (see stunning_25_reference).",
      "- Include ≥1 image-hero for visual/investor/launch/brand decks (kinetic-wrapped wraps may use ranked/streak/metric/hero-stat instead).",
      "- Every comparison MUST set emphasis left|right; prefer non-1-1 two-column ratios; 5-card grids use columns:\"bento\".",
      "- Rankings / top-N → layout ranked-list (not custom-html bars). Mega wrap numbers → stat-row variant:\"hero\".",
      "- Day streaks → streak-grid. Circular KPI / percentile → metric-ring (not a plain stat chip).",
      "- Logo / customer walls → logo-wall. Year wraps (kinetic-wrapped) need tone on ≥3 slides.",
      "- Wrap / store / launch / investor closes → closing actions[] with solid + outline pills (cta alone is weak on stunning-25).",
      "- Every closing actions[] pill needs an icon (FA brands for social; rocket/download/calendar/book for CTAs) — PPTX maps icons to glyph prefixes.",
      "- Match atmosphere to the brief: loud/thin surfaces (coral, raw-grid, sakura, retro-windows, …) for punchy brand energy; paper/editorial themes (claude, soft-editorial, ft-editorial, vellum, paper-ink, heritage-editorial, broadsheet, …) for magazine quiet — both keep PPTX chrome as native shapes.",
      "- Paper honesty: prefer quote + comparison+emphasis + short literary leads; avoid soft corporate card stacks. Fiber grain is HTML-only — ship HTML (or say so) when paper tooth is the brand.",
      "- Pulse (kinetic-wrapped): set tone on ≥3 slides + a ranked/streak/metric/hero-stat beat — PPTX carries hard frames, soft blobs, and eyebrow chips (not mix-blend).",
      "- risograph-zine: prefer comparison+emphasis and a punchy quote — PPTX overprint is layered ovals, not true multiply.",
      "- candy-pop: set meta.company (or meta.marquee) so the yellow ticker brands the deck — never hardcode Jellybean; cards get hard ink borders in PPTX.",
      "- Add brief notes on 2–4 key slides.",
      "- Call audit_deck before shipping; fix warnings that mention asymmetry, image-hero, tone, emphasis, dual CTA, or closing icons.",
      "- Call judge_deck (t1→t2; t3 when stakes are high). Treat local_draft as a floor, not a ship grade.",
      "- Open the theme's structured gallery proof when listed in stunning-25 — match that ceiling, do not water down.",
    ].join("\n");

    return {
      theme: themeName,
      intent,
      craft_mandate: craftMandate,
      skill,
      deck_schema_reference: deckSchemaReference,
      themes_reference: themesMd || undefined,
      stunning_25_reference: stunning25 || undefined,
      palette: theme.palette as unknown as Record<string, string>,
      typography: theme.typography
    };
  }
};
