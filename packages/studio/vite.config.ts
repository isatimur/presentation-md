/// <reference types="vitest" />
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));
const shim = (name: string) => path.resolve(root, `src/shims/${name}`);
const previewsDir = path.resolve(root, "../../web/previews");

/** Serve repo `web/previews` at `/previews` for local Vite + Playwright (no Vercel CDN). */
function serveRepoPreviews(): Plugin {
  const mount = (req: { url?: string }, res: NodeJS.WritableStream & {
    statusCode?: number;
    setHeader?: (k: string, v: string) => void;
  }, next: () => void) => {
    const raw = (req.url ?? "").split("?")[0] ?? "";
    const rel = decodeURIComponent(raw.replace(/^\//, ""));
    if (!rel || rel.includes("..")) return next();
    const file = path.resolve(previewsDir, rel);
    if (!file.startsWith(previewsDir) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      return next();
    }
    const ext = path.extname(file).toLowerCase();
    const type =
      ext === ".html"
        ? "text/html; charset=utf-8"
        : ext === ".css"
          ? "text/css; charset=utf-8"
          : ext === ".js"
            ? "text/javascript; charset=utf-8"
            : "application/octet-stream";
    if (typeof res.statusCode === "number" || "statusCode" in res) {
      (res as { statusCode: number }).statusCode = 200;
    }
    res.setHeader?.("Content-Type", type);
    fs.createReadStream(file).pipe(res);
  };
  return {
    name: "serve-repo-previews",
    configureServer(server) {
      // Connect middleware — typed loosely so tsc --noEmit on the app stays happy.
      server.middlewares.use("/previews", mount as never);
    },
    configurePreviewServer(server) {
      server.middlewares.use("/previews", mount as never);
    },
  };
}

export default defineConfig({
  plugins: [react(), serveRepoPreviews()],
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
