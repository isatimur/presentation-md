#!/usr/bin/env tsx
/**
 * Generate one-slide theme preview HTML for the marketing site (web/previews/).
 * Run: pnpm exec tsx tools/generate-web-previews.ts
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "../packages/renderer-node/dist/index.js";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const outDir = join(root, "web/previews");

const CORE_THEMES = ["claude", "default-tech"];
const PACKAGED_THEMES = [
  "corporate",
  "playful",
  "luxury-minimalist",
  "retro-arcade",
  "editorial-serif",
  "brutalist-mono",
  "pastel-dreamy",
  "aurora-glass",
  "ft-editorial",
  "genz-bento",
  "crt-terminal",
  "swiss-typographic",
  "candy-pop",
  "aerospace-hud",
  "brutalist-acid",
  "bauhaus",
  "y2k-aero",
  "risograph-zine",
  "neon-noir",
  "vaporwave",
  "botanical-luxe",
  "heritage-editorial",
  "fintech-clean",
  "developer-dark",
  "data-editorial",
  "scandinavian",
  "art-deco",
  "kinetic-wrapped",
  "blueprint",
  "glassmorphism",
  "broadsheet",
  "soft-editorial",
  "editorial-forest",
  "pin-and-paper",
  "vellum",
  "neo-grid-bold",
  "editorial-tri-tone",
  "creative-mode",
  "broadside",
  "bold-signal",
  "notebook-tabs",
  "creative-voltage",
  "signal",
  "electric-studio",
  "dark-botanical",
  "pastel-geometry",
  "split-pastel",
  "vintage-editorial",
  "paper-ink",
  "biennale-yellow",
  "bold-poster",
  "coral",
  "emerald-editorial",
  "sakura-chroma",
  "pink-script",
  "block-frame",
  "capsule",
  "cobalt-grid",
  "8-bit-orbit",
  "studio",
  "grove",
  "scatterbrain",
  "peoples-platform",
  "retro-windows",
  "raw-grid",
  "long-table",
  "mat",
  "stencil-tablet",
  "cartesian",
  "monochrome",
  "blue-professional",
  "daisy-days",
  "retro-zine",
];

function previewDeck(theme: string): string {
  const craftThemes = new Set([
    "soft-editorial",
    "mat",
    "bold-signal",
    "creative-voltage",
    "electric-studio",
    "studio",
    "emerald-editorial",
    "grove",
    "signal",
    "daisy-days",
    // Loud / dual-surface craft — show comparison + bento emphasis
    "candy-pop",
    "vaporwave",
    "neon-noir",
    "retro-arcade",
    "genz-bento",
    "y2k-aero",
    "bauhaus",
    "creative-mode",
    "bold-poster",
    "brutalist-acid",
    "raw-grid",
    "broadside",
    "neo-grid-bold",
    "block-frame",
    "retro-zine",
  ]);
  const slides: Array<Record<string, unknown>> = [
    {
      layout: "title",
      eyebrow: theme.replace(/-/g, " "),
      heading: "Your Deck Title",
      lead: "Typography, palette, and surface — pick visually before you commit.",
    },
  ];
  if (craftThemes.has(theme)) {
    slides.push(
      {
        layout: "feature-grid",
        eyebrow: "Craft",
        heading: "Cards that clear contrast",
        columns: "bento",
        cards: [
          { icon: "fa-solid fa-bolt", title: "Hero tile", body: "Asymmetric bento energy with readable body copy." },
          { icon: "fa-solid fa-layer-group", title: "Surface", body: "Tint washes stay AA." },
          { icon: "fa-solid fa-palette", title: "Palette", body: "Roles that export to PPTX." },
          { icon: "fa-solid fa-table", title: "Structure", body: "Schema-validated layouts." },
          { icon: "fa-solid fa-check", title: "Proof", body: "What the gallery actually ships." },
        ],
      },
      {
        layout: "comparison",
        heading: "Before vs after",
        leftLabel: "Soft whisper",
        left: "Muted that fails on tint washes.",
        rightLabel: "Clear signal",
        right: "Body copy that survives cream cards and accent fills.",
        emphasis: "right",
      }
    );
  }
  return JSON.stringify({
    type: "deck",
    meta: { title: "Theme Preview", theme },
    slides,
  });
}

async function main(): Promise<void> {
  await mkdir(outDir, { recursive: true });

  for (const theme of CORE_THEMES) {
    const html = await renderDeck(previewDeck(theme), {
      themesDir: join(root, "packages/core/themes"),
    });
    await writeFile(join(outDir, `${theme}.html`), html, "utf-8");
    console.log("wrote", theme);
  }

  for (const theme of PACKAGED_THEMES) {
    const html = await renderDeck(previewDeck(theme), {
      themesDir: join(root, "packages/themes"),
    });
    await writeFile(join(outDir, `${theme}.html`), html, "utf-8");
    console.log("wrote", theme);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
