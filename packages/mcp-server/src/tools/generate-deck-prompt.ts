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

    const [theme, skill, deckSchemaReference, stunning25, themesMd, antiSlop, layoutRecipes] =
      await Promise.all([
      loadTheme(themeName, { themesDir, fallbackThemesDirs }),
      readFile(join(coreRoot, "SKILL.md"), "utf-8"),
      readFile(join(coreRoot, "references", "deck-schema.md"), "utf-8"),
      readFile(join(coreRoot, "references", "stunning-25.md"), "utf-8").catch(() => ""),
      readFile(join(coreRoot, "references", "themes.md"), "utf-8").catch(() => ""),
      readFile(join(coreRoot, "references", "anti-slop-bans.md"), "utf-8").catch(() => ""),
      readFile(join(coreRoot, "references", "layout-recipes.md"), "utf-8").catch(() => ""),
    ]);

    const craftMandate = [
      "CRAFT MANDATE (non-negotiable — beat Gamma / Beautiful.ai / md-slides / frontend-slides / Claude Design canvas on first glance):",
      "- Prefer stunning-25 themes when the brief matches (see stunning_25_reference). Open that structured proof and match density — do not invent a watered-down palette.",
      "- Ban Inter-only / purple-on-white / cream-terracotta defaults unless the chosen theme owns them (see anti_slop_reference).",
      "- Match a layout_recipes_reference slide map (pitch / launch / wrap / neon / poster / paper / hud / modernist / hard-bento / glass / electric / briefing / quiet-luxe / soft-product / playful / neon-tech / data-editorial / scatterbrain) before freehanding layouts.",
      "- Include ≥1 image-hero for visual/investor/launch/brand decks (kinetic-wrapped wraps may use ranked/streak/metric/hero-stat instead).",
      "- Force asymmetry early: every comparison MUST set emphasis left|right; prefer non-1-1 two-column ratios; 5-card grids use columns:\"bento\".",
      "- Rankings / top-N → layout ranked-list (not custom-html bars). Mega wrap numbers → stat-row variant:\"hero\".",
      "- Day streaks → streak-grid. Circular KPI / percentile → metric-ring (not a plain stat chip).",
      "- Logo / customer walls → logo-wall. Year wraps (kinetic-wrapped) need tone on ≥3 slides.",
      "- Wrap / store / launch / investor closes → closing actions[] with solid + outline pills (cta alone is weak on stunning-25).",
      "- Every closing actions[] pill needs an icon (FA brands for social; rocket/download/calendar/book for CTAs) — PPTX maps icons to glyph prefixes.",
      "- Match atmosphere to the brief: loud/thin surfaces (coral, raw-grid, sakura, retro-windows, stencil-tablet, retro-zine, daisy-days, block-frame, creative-mode, capsule, scatterbrain, 8-bit-orbit, cobalt-grid, peoples-platform, bold-signal, broadside, genz-bento, bauhaus, neo-grid-bold, bold-poster, creative-voltage, electric-studio, studio, brutalist-mono, …) for punchy brand energy; neon/vapor/y2k/retro-arcade for cinematic night; aerospace-hud / crt-terminal / blueprint for instrument/tech; aurora-glass / glassmorphism for frosted product; paper/editorial themes (claude, soft-editorial, heritage-editorial, emerald-editorial, vintage-editorial, pink-script, ft-editorial, vellum, paper-ink, long-table, broadsheet, biennale-yellow, pastel-dreamy, editorial-serif, …) for magazine quiet — PPTX keeps washes, double mastheads, dual insets, hero-gated candy/pills/corner blots, always-on loud frames/offset-shadow strips/multi-layer arcade shadows/Win95 bevels/cobalt grid+hatch/plates/tablets, hard-border cards (genz/acid/bauhaus/neo-grid/bold-poster/raw-grid/voltage/Pulse/electric/studio/grove/cartesian/vintage/serif/botanical/glass/crt/mono/signal), neon rim/scanlines/horizon glow/soft aero shadows, mat woodglow+cream rim, HUD reticles/telemetry, and broadside fire rail as native shapes.",
      "- Paper honesty: prefer quote + comparison+emphasis + short literary leads; avoid soft corporate card stacks. Fiber grain is HTML-only — ship HTML (or say so) when paper tooth is the brand. vintage-editorial / editorial-serif keep hard/hairline card strokes in PPTX; paper-ink keeps a crimson left accent rule.",
      "- Loud honesty: stencil-tablet / retro-zine / daisy-days / block-frame / creative-mode / sakura-chroma / capsule / scatterbrain / 8-bit-orbit / retro-windows / cobalt-grid / genz-bento / bauhaus / neo-grid-bold / bold-poster / raw-grid / creative-voltage / electric-studio / studio / brutalist-mono expect hard frames + offset-shadow strips (or multi-layer arcade / Win95 bevel / cobalt grid+hatch chrome) and hard-border cards on every slide (pills/tape/blocks/chroma may stay hero-gated) — don't invent custom-html stickers for atmosphere.",
      "- Atmosphere honesty: neon-noir / vaporwave / y2k-aero / retro-arcade expect cyan/pink rims, rain/arcade scanlines or horizon glow, soft aero shadow stubs, plus a cinematic image-hero or punchy quote — don't flatten into SaaS grids.",
      "- Poster honesty: coral / peoples-platform / bold-signal / broadside expect hard poster frames + hard-border cards (bold-signal accent rims) and a bold beat (image-hero, comparison, quote, or punchy stats). mat wants a mid-century beat (quote / image-hero / comparison / punchy stats) with woodglow + cream rim chrome.",
      "- HUD honesty: aerospace-hud / crt-terminal / blueprint expect instrument chrome plus a data beat (chart / data-table / stat-row / ranked-list / timeline / metric-ring) — don't flatten into soft marketing grids.",
      "- Glass honesty: aurora-glass / glassmorphism expect a frosted product beat (image-hero / quote / stats) — PPTX keeps glass rims (not true blur).",
      "- Modernist honesty: bauhaus / swiss-typographic / art-deco expect geometry + hard type plus a modernist beat (quote / image-hero / comparison / icon feature-grid).",
      "- Briefing honesty: signal expects quiet dual-surface chrome + an editorial beat (quote / image-hero / comparison / stats); PPTX keeps briefing frames and border-hairline cards.",
      "- Quiet-luxe honesty: luxury-minimalist expects top-rule cards + a restrained luxury beat (quote / image-hero / comparison) — not soft SaaS stacks; long-table keeps dashed rust supper cards under paper honesty.",
      "- Soft-product honesty: corporate / fintech-clean expect a clean product beat (stat-row / comparison / feature-grid / chart); PPTX keeps accent-hairline cards.",
      "- Playful honesty: playful / split-pastel expect a soft-bento beat (feature-grid / image-hero / stats / quote); PPTX keeps plump coral/ink card rims.",
      "- Neon-tech honesty: default-tech / developer-dark expect a tech product beat (code / feature-grid / chart / comparison / stats); PPTX keeps neon/terminal card rims.",
      "- Data-editorial honesty: data-editorial expects a reported data beat (chart / data-table / stat-row / ranked-list / timeline); PPTX keeps ink card hairlines.",
      "- Pulse (kinetic-wrapped): set tone on ≥3 slides + a ranked/streak/metric/hero-stat beat — PPTX carries hard frames, soft blobs, eyebrow chips, and 3pt accent card borders (not mix-blend).",
      "- risograph-zine: prefer comparison+emphasis and a punchy quote — PPTX overprint is layered ovals, not true multiply; cards get hard ink strokes.",
      "- candy-pop: set meta.company (or meta.marquee) so the yellow ticker brands the deck — never hardcode Jellybean; cards get hard ink borders in PPTX.",
      "- Add brief notes on 2–4 key slides.",
      "- Call audit_deck before shipping; fix warnings that mention asymmetry, image-hero, tone, emphasis, dual CTA, closing icons, atmosphere, poster, mat, cobalt-grid, HUD/tech, bauhaus, genz-bento, glass, electric-studio, brutalist-mono, cartesian, signal, quiet-luxe, soft-product, playful, neon-tech, data-editorial, scatterbrain, or magazine beats.",
      "- Call judge_deck (t1→t2; t3 when stakes are high). Treat local_draft as a floor, not a ship grade. Schema-valid ≠ shippable.",
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
      anti_slop_reference: antiSlop || undefined,
      layout_recipes_reference: layoutRecipes || undefined,
      palette: theme.palette as unknown as Record<string, string>,
      typography: theme.typography
    };
  }
};
