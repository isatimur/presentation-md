#!/usr/bin/env tsx
/**
 * update-google-fonts — refresh the bundled Google Fonts family list that
 * create-theme uses to classify brand fonts (google | office | unavailable).
 *
 * Fetches https://fonts.google.com/metadata/fonts, strips the leading `)]}'`
 * line, reads familyMetadataList[].family, sorts, and rewrites
 * packages/create-theme/src/google-font-families.ts.
 *
 * Run via: pnpm fonts:update   (not run in CI; commit the result)
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_URL = "https://fonts.google.com/metadata/fonts";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const target = join(__dirname, "..", "packages", "create-theme", "src", "google-font-families.ts");

function fail(reason: string): never {
  process.stderr.write(`Google Fonts metadata format changed: ${reason}\n`);
  process.exit(1);
}

async function main(): Promise<void> {
  const res = await fetch(SOURCE_URL, { headers: { accept: "application/json" } });
  if (!res.ok) {
    process.stderr.write(`Could not fetch ${SOURCE_URL}: HTTP ${res.status}\n`);
    process.exit(1);
  }
  const raw = await res.text();
  const body = raw.startsWith(")]}'") ? raw.slice(raw.indexOf("\n") + 1) : raw;

  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch (err) {
    fail(`response is not JSON (${(err as Error).message})`);
  }
  if (!data || typeof data !== "object") fail("top level is not an object");
  const list = (data as { familyMetadataList?: unknown }).familyMetadataList;
  if (!Array.isArray(list)) fail("familyMetadataList is not an array");
  if (list.length < 1000) fail(`familyMetadataList has only ${list.length} entries`);

  const families = new Set<string>();
  for (const item of list) {
    const family = (item as { family?: unknown } | null)?.family;
    if (typeof family !== "string" || !family.trim()) fail("an entry has no string 'family'");
    families.add(family.trim().toLowerCase());
  }
  const sorted = [...families].sort();
  const date = new Date().toISOString().slice(0, 10);

  const lines = [
    "/**",
    " * Google Fonts family names, lower-cased. Generated; do not edit by hand.",
    ` * Generator: tools/update-google-fonts.ts (pnpm fonts:update)`,
    ` * Source: ${SOURCE_URL}`,
    ` * Generated: ${date} (${sorted.length} families)`,
    " */",
    "export const GOOGLE_FONT_FAMILIES: ReadonlySet<string> = new Set([",
    ...sorted.map((f) => `  ${JSON.stringify(f)},`),
    "]);",
    "",
  ];
  writeFileSync(target, lines.join("\n"), "utf-8");
  process.stdout.write(`Wrote ${sorted.length} families to ${target}\n`);
}

main().catch((err: unknown) => {
  process.stderr.write(`update-google-fonts failed: ${(err as Error).message}\n`);
  process.exit(1);
});
