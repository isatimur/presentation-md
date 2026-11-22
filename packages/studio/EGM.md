# @presentation-md/studio

## Overview

A browser editor for presentation-md decks. It is a static Vite and React SPA. Rendering and `.pptx` export run in the browser. The local Vite dev and preview servers add a `/api/export-pdf` endpoint that prints PDF with headless Chromium. The package root holds the build, dev-server, and e2e config. See [README.md](./README.md) for features and deploy steps.

## Interface

- App source: [src](./src/EGM.md).
- `vite.config.ts` plugins: [vite.config.ts:defineConfig]
  - `exportPdfApi()`: mounts `POST /api/export-pdf` on dev and preview servers. [vite.config.ts:exportPdfApi]
  - `serveRepoPreviews()`: serves repo `web/previews` at `/previews` on the dev server. [vite.config.ts:serveRepoPreviews]
  - `includeStudioIcons()`: emits `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` from `../../web` at build. [vite.config.ts:includeStudioIcons]
- Aliases `node:fs`, `node:fs/promises`, `node:path`, `node:url`, `node:net`, `node:dns/promises` to `src/shims/*`. [vite.config.ts:resolve.alias]
- Build output `dist/`, relative `base: "./"`, manual chunks `theme-catalog`, `deck-runtime`, `presentation-core`, `react-vendor`. [vite.config.ts:manualChunks]
- Scripts: `dev`, `build`, `build:web` (to `../../web/studio`, base `/studio/`), `preview`, `test` (vitest), `test:e2e` (playwright), `lint`, `typecheck`. [package.json:scripts]
- `playwright.config.ts`: e2e from `./e2e` against `pnpm build && pnpm preview --port 4317`. [playwright.config.ts:defineConfig]

## Invariants

- `/api/export-pdf` returns 403 for a cross-origin request, 405 for methods other than POST and OPTIONS, 415 for a non-`text/html` body, 429 past 2 concurrent exports, 413 over 64 MiB, 400 for an empty body, and 500 on a render failure. [vite.config.ts:exportPdfApi]
- PDF HTML passes `prepareSandboxedPreviewHtml` before `page.setContent`. Every subresource request goes through `guardPdfSubresourceRoute`. Errors abort the request (fail closed). [vite.config.ts:exportPdfApi]
- PDF page size is 1920x1080 with zero margin. It waits for `load`, not `networkidle`. [vite.config.ts:exportPdfApi]
- `/previews` rejects paths with `..` and paths that resolve outside `web/previews`. [vite.config.ts:serveRepoPreviews]
- The browser bundle never keeps a bare `node:*` import. The listed modules are aliased to shims. [vite.config.ts:resolve.alias]
- Unit tests include only `test/**/*.test.ts`, with `css: true` so `?raw` CSS imports return content. [vite.config.ts:test]
- `server.fs.allow` is `["..", "../.."]`, so the dev server can read shared layouts and themes from the monorepo. [vite.config.ts:server]

## Side Effects

- Headless Chromium launch per PDF request through `@playwright/test`, closed in `finally`. [vite.config.ts:exportPdfApi]
- Outbound requests from Chromium for public subresources only, such as Google Fonts. [vite.config.ts:exportPdfApi]
- Disk reads: `web/previews/*` on the dev server, and site icons from `../../web` at build. [vite.config.ts:serveRepoPreviews, vite.config.ts:includeStudioIcons]
- `build:web` writes into `../../web/studio` with `--emptyOutDir`. [package.json:scripts]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
- E2E: `pnpm --filter @presentation-md/studio test:e2e`
