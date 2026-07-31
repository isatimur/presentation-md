#!/usr/bin/env tsx
/**
 * Regenerate a subset of structured gallery HTML after deck JSON edits.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "../packages/renderer-node/dist/index.js";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CORE_THEMES = new Set(["claude", "default-tech"]);

const decks = process.argv.slice(2);
if (!decks.length) {
  console.error("Usage: tsx tools/regen-structured-subset.ts <slug>...");
  process.exit(1);
}

const outDir = join(root, "web/examples/structured");
await mkdir(outDir, { recursive: true });

for (const name of decks) {
  const raw = await readFile(join(root, "examples/decks", `${name}.json`), "utf-8");
  const deck = JSON.parse(raw) as { meta?: { theme?: string } };
  const theme = deck.meta?.theme ?? "default-tech";
  const themesDir = CORE_THEMES.has(theme)
    ? join(root, "packages/core/themes")
    : join(root, "packages/themes");
  const html = await renderDeck(raw, { themesDir });
  await writeFile(join(outDir, `${name}.html`), html, "utf-8");
  console.log(`wrote ${name} (${theme})`);
}
