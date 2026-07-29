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
];

function previewDeck(theme: string): string {
  return JSON.stringify({
    type: "deck",
    meta: { title: "Theme Preview", theme },
    slides: [
      {
        layout: "title",
        eyebrow: theme.replace(/-/g, " "),
        heading: "Your Deck Title",
        lead: "Typography, palette, and surface — pick visually before you commit.",
      },
    ],
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
