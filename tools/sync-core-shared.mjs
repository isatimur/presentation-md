#!/usr/bin/env node
/**
 * Mirror packages/shared/theme-surfaces.json → packages/core/shared/ so the
 * published @presentation-md/core tarball resolves its theme-surface import
 * (a bare ../../shared path escapes the package root once installed from npm).
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "packages/shared/theme-surfaces.json");
const destDir = join(root, "packages/core/shared");
const dest = join(destDir, "theme-surfaces.json");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log(`synced ${src} → ${dest}`);
