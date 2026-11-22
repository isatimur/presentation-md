#!/usr/bin/env node
/**
 * Mirror packages/shared → presentation_md_render/templates and the bundled
 * core themes → presentation_md_render/themes, so the Python wheel carries the
 * templates and themes that renderer.py loads in its installed layout.
 * Run before `uv build` in packages/renderer-python. Both targets are gitignored.
 */
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = join(root, "packages/renderer-python/src/presentation_md_render");

const pairs = [
  [join(root, "packages/shared"), join(pkg, "templates")],
  [join(root, "packages/core/themes"), join(pkg, "themes")],
];

for (const [src, dest] of pairs) {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`synced ${src} → ${dest}`);
}
