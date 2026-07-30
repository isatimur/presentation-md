/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Default base `/` suits dev and a standalone deploy. The gallery build passes
  // an absolute `--base=/studio/` (see `build:web`) so assets resolve when served
  // at `/studio` — a relative base breaks there under cleanUrls (no trailing slash).
  // The deck themes and shared layout templates live outside this package; allow
  // Vite's dev server to read them from the monorepo root.
  server: { fs: { allow: ["..", "../.."] } },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Belt-and-suspenders for Vercel: never try to resolve node:* into the
    // browser bundle (export's local image prefetch loads them dynamically).
    rollupOptions: {
      external: (id) => id === "node:path" || id === "node:fs" || id === "node:fs/promises" || id === "node:url",
    },
  },
  test: {
    // Unit tests live in test/; the Playwright e2e suite (e2e/) runs separately.
    include: ["test/**/*.test.ts"],
    // Process CSS so `*.css?raw` template imports return real content
    // (Vitest stubs CSS to an empty string by default).
    css: true,
  },
});
