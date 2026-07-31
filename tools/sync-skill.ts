#!/usr/bin/env tsx
/**
 * sync-skill — copy canonical skill surfaces from packages/core →
 * skills/presentation-generator so the Claude plugin / repo skill stay
 * aligned with the published @presentation-md/core tarball.
 *
 * Syncs: SKILL.md, deck.schema.json, theme.schema.json, references/, scripts/
 * (scripts exclude node_modules / lockfiles — Playwright installs on first run).
 *
 * Run via: pnpm sync:skill
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const core = join(root, "packages", "core");
const skill = join(root, "skills", "presentation-generator");

const ROOT_FILES = ["SKILL.md", "deck.schema.json", "theme.schema.json"] as const;

function assertExists(path: string, label: string): void {
  if (!existsSync(path)) {
    throw new Error(`sync-skill: missing ${label} at ${path}`);
  }
}

function syncFile(name: string): void {
  const from = join(core, name);
  const to = join(skill, name);
  assertExists(from, name);
  writeFileSync(to, readFileSync(from));
  console.log(`  synced  ${name}`);
}

function syncDir(name: string, opts?: { exclude?: string[] }): void {
  const from = join(core, name);
  const to = join(skill, name);
  assertExists(from, name);
  mkdirSync(to, { recursive: true });
  const exclude = new Set(opts?.exclude ?? []);
  for (const entry of readdirSync(from)) {
    if (exclude.has(entry)) continue;
    const src = join(from, entry);
    const dest = join(to, entry);
    if (statSync(src).isDirectory()) {
      if (entry === "node_modules") continue;
      rmSync(dest, { recursive: true, force: true });
      cpSync(src, dest, { recursive: true });
    } else {
      if (entry === "package-lock.json") continue;
      writeFileSync(dest, readFileSync(src));
    }
    console.log(`  synced  ${name}/${entry}`);
  }
}

assertExists(core, "packages/core");
assertExists(skill, "skills/presentation-generator");

console.log("sync-skill › packages/core → skills/presentation-generator");
for (const file of ROOT_FILES) syncFile(file);
syncDir("references");
syncDir("scripts", { exclude: ["node_modules", "package-lock.json"] });
console.log("done.");
