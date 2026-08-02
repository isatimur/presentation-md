/// <reference types="vitest" />
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { prepareSandboxedPreviewHtml } from "./src/render/sandboxPreview.js";
import {
  createConcurrencyLimiter,
  isAllowedPdfRequestOrigin,
  isPdfHtmlContentType,
  MAX_PDF_HTML_BYTES,
  PdfHtmlBodyTooLargeError,
  readBoundedPdfHtmlBody,
} from "./src/server/pdfNetworkPolicy.js";
import { guardPdfSubresourceRoute } from "./src/server/pdfRouteGuard.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const shim = (name: string) => path.resolve(root, `src/shims/${name}`);
const previewsDir = path.resolve(root, "../../web/previews");
const siteAssetsDir = path.resolve(root, "../../web");
const STUDIO_ICON_FILES = ["favicon.svg", "favicon-32.png", "apple-touch-icon.png"] as const;

type ConnectRes = ServerResponse & {
  statusCode: number;
  setHeader: (k: string, v: string) => void;
  end: (chunk?: string | Buffer) => void;
};

/** Include the shared site icons in both standalone and `/studio/` builds. */
function includeStudioIcons(): Plugin {
  return {
    name: "include-studio-icons",
    apply: "build",
    buildStart() {
      for (const fileName of STUDIO_ICON_FILES) {
        this.emitFile({
          type: "asset",
          fileName,
          source: fs.readFileSync(path.join(siteAssetsDir, fileName)),
        });
      }
    },
  };
}

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
  const limiter = createConcurrencyLimiter(2);
  const handle = async (req: IncomingMessage, res: ConnectRes, next: () => void) => {
    const url = (req.url ?? "").split("?")[0] ?? "";
    if (url !== "/" && url !== "") return next();
    const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
    if (!isAllowedPdfRequestOrigin(origin, req.headers.host)) {
      res.statusCode = 403;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Cross-origin PDF export is not allowed");
      return;
    }
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
      }
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
    const contentType =
      typeof req.headers["content-type"] === "string" ? req.headers["content-type"] : undefined;
    if (!isPdfHtmlContentType(contentType)) {
      res.statusCode = 415;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Content-Type must be text/html");
      return;
    }

    const release = limiter.tryAcquire();
    if (!release) {
      res.statusCode = 429;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Retry-After", "1");
      res.end("Too many concurrent PDF exports");
      return;
    }

    try {
      let html: string;
      try {
        html = await readBoundedPdfHtmlBody(req);
      } catch (error) {
        if (error instanceof PdfHtmlBodyTooLargeError) {
          res.statusCode = 413;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(`PDF HTML body too large (max ${MAX_PDF_HTML_BYTES} bytes)`);
          return;
        }
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end(`Could not read PDF HTML body: ${(error as Error).message}`);
        return;
      }
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
          const decisions = new Map<string, Promise<boolean>>();
          await page.route("**/*", async (route) => {
            try {
              await guardPdfSubresourceRoute(route, decisions);
            } catch {
              try {
                await route.abort("blockedbyclient");
              } catch {
                // The page or request may already be gone; fail closed either way.
              }
            }
          });
          // Prefer "load" over "networkidle" — Google Fonts / analytics keep connections
          // open and hang Studio Download PDF forever on real decks.
          await page.setContent(prepareSandboxedPreviewHtml(html), {
            waitUntil: "load",
            timeout: 60_000,
          });
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
    } finally {
      release();
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
  plugins: [react(), serveRepoPreviews(), exportPdfApi(), includeStudioIcons()],
  // Keep standalone output relocatable; the gallery build explicitly overrides
  // this with `--base=/studio/` because cleanUrls may omit the trailing slash.
  base: "./",
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
      { find: /^node:net$/, replacement: shim("node-net.ts") },
      { find: /^node:dns\/promises$/, replacement: shim("node-dns.ts") },
    ],
  },
  server: { fs: { allow: ["..", "../.."] } },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Keep the frequently edited Studio shell separate from stable renderer,
        // catalog, and framework code. All are required at startup today, but
        // separate chunks download in parallel and can be cached independently.
        manualChunks(id) {
          const pathId = id.replace(/\\/g, "/");
          if (/\/packages\/(?:core\/themes|themes)\/[^/]+\/theme\.json/.test(pathId)) {
            return "theme-catalog";
          }
          if (pathId.includes("/packages/shared/")) return "deck-runtime";
          if (pathId.includes("/packages/core/")) return "presentation-core";
          if (
            pathId.includes("/node_modules/.pnpm/react@") ||
            pathId.includes("/node_modules/.pnpm/react-dom@") ||
            pathId.includes("/node_modules/.pnpm/scheduler@")
          ) {
            return "react-vendor";
          }
        },
      },
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
