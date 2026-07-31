/// <reference types="vitest" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));
const shim = (name: string) => path.resolve(root, `src/shims/${name}`);

export default defineConfig({
  plugins: [react()],
  // Default base `/` suits dev and a standalone deploy. The gallery build passes
  // an absolute `--base=/studio/` (see `build:web`) so assets resolve when served
  // at `/studio` — a relative base breaks there under cleanUrls (no trailing slash).
  // The deck themes and shared layout templates live outside this package; allow
  // Vite's dev server to read them from the monorepo root.
  resolve: {
    // Never leave bare `import "node:*"` in the browser bundle (Vite `external`
    // does that and blank-screens Studio). Alias to lightweight shims instead —
    // local-file PPTX prefetch stays Node/CLI-only.
    alias: [
      { find: /^node:fs\/promises$/, replacement: shim("node-fs.ts") },
      { find: /^node:fs$/, replacement: shim("node-fs.ts") },
      { find: /^node:path$/, replacement: shim("node-path.ts") },
      { find: /^node:url$/, replacement: shim("node-url.ts") },
    ],
  },
  server: { fs: { allow: ["..", "../.."] } },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  test: {
    // Unit tests live in test/; the Playwright e2e suite (e2e/) runs separately.
    include: ["test/**/*.test.ts"],
    // Process CSS so `*.css?raw` template imports return real content
    // (Vitest stubs CSS to an empty string by default).
    css: true,
  },
});
