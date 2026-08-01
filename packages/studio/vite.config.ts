/// <reference types="vitest" />
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));
const shim = (name: string) => path.resolve(root, `src/shims/${name}`);
const previewsDir = path.resolve(root, "../../web/previews");

type ConnectRes = ServerResponse & {
  statusCode: number;
  setHeader: (k: string, v: string) => void;
  end: (chunk?: string | Buffer) => void;
};

/** Serve repo `web/previews` at `/previews` for local Vite + Playwright (no Vercel CDN). */
function serveRepoPreviews(): Plugin {
  const mount = (req: IncomingMessage, res: ConnectRes, next: () => void) => {
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
    res.statusCode = 200;
    res.setHeader("Content-Type", type);
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

/**
 * Local Studio PDF blob export — Chromium printToPDF (vector, selectable text,
 * same @page 16:9 as MCP/CLI). Static Vercel hosts skip this; Studio falls back
 * to client raster or the print dialog.
 */
function exportPdfApi(): Plugin {
  const handle = async (req: IncomingMessage, res: ConnectRes, next: () => void) => {
    const url = (req.url ?? "").split("?")[0] ?? "";
    if (url !== "/" && url !== "") return next();
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.end();
      return;
    }
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Allow", "POST, OPTIONS");
      res.end("POST HTML body to export PDF");
      return;
    }

    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const html = Buffer.concat(chunks).toString("utf8");
    if (!html.trim()) {
      res.statusCode = 400;
      res.end("Empty HTML body");
      return;
    }

    try {
      // Studio e2e already depends on @playwright/test (includes chromium).
      const { chromium } = await import("@playwright/test");

      const browser = await chromium.launch();
      try {
        const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
        // Prefer "load" over "networkidle" — Google Fonts / analytics keep connections
        // open and hang Studio Download PDF forever on real decks.
        await page.setContent(html, { waitUntil: "load", timeout: 60_000 });
        await page.addStyleTag({
          content: `@page { size: 1920px 1080px; margin: 0; }`,
        });
        await page.emulateMedia({ media: "print" });
        try {
          await page.evaluate(async () => {
            const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
            if (fonts?.ready) await fonts.ready;
          });
        } catch {
          /* ignore */
        }
        await new Promise((r) => setTimeout(r, 400));
        const pdf = await page.pdf({
          printBackground: true,
          preferCSSPageSize: true,
          width: "1920px",
          height: "1080px",
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Cache-Control", "no-store");
        res.end(Buffer.from(pdf));
      } finally {
        await browser.close();
      }
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(`PDF export failed: ${(err as Error).message}`);
    }
  };

  return {
    name: "export-pdf-api",
    configureServer(server) {
      server.middlewares.use("/api/export-pdf", handle as never);
    },
    configurePreviewServer(server) {
      server.middlewares.use("/api/export-pdf", handle as never);
    },
  };
}

export default defineConfig({
  plugins: [react(), serveRepoPreviews(), exportPdfApi()],
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
