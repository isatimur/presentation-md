#!/usr/bin/env node
/**
 * Mirror packages/shared → packages/renderer-node/shared so the published
 * @presentation-md/render tarball includes layout CSS / Mustache templates.
 */
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "packages/shared");
const dest = join(root, "packages/renderer-node/shared");

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`synced ${src} → ${dest}`);
