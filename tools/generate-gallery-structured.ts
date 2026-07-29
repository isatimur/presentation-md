#!/usr/bin/env tsx
/**
 * Render the five flagship gallery decks from structured Deck JSON.
 * Run: pnpm exec tsx tools/generate-gallery-structured.ts
 *
 * Sources:  examples/decks/*.json
 * Output:   web/examples/structured/*.html
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "../packages/renderer-node/dist/index.js";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const decksDir = join(root, "examples/decks");
const outDir = join(root, "web/examples/structured");

const CORE_THEMES = new Set(["claude", "default-tech"]);

const FLAGSHIPS = [
  "novaspark-pitch",
  "meridian-sales",
  "bounce-launch",
  "solstice-update",
  "retronet-demo",
] as const;

async function main(): Promise<void> {
  await mkdir(outDir, { recursive: true });

  for (const name of FLAGSHIPS) {
    const raw = await readFile(join(decksDir, `${name}.json`), "utf-8");
    const deck = JSON.parse(raw) as { meta?: { theme?: string } };
    const theme = deck.meta?.theme ?? "default-tech";
    const themesDir = CORE_THEMES.has(theme)
      ? join(root, "packages/core/themes")
      : join(root, "packages/themes");

    const html = await renderDeck(raw, { themesDir });
    const outPath = join(outDir, `${name}.html`);
    await writeFile(outPath, html, "utf-8");
    console.log(`wrote ${name} (${theme}) → ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
