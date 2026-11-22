# @presentation-md/core scripts (`scripts`)

## Overview

These scripts ship with the package for agents and users. They export a deck HTML file to a vector PDF and deploy a deck to Vercel. Two helper modules guard these flows: one checks for local asset references, one limits what the PDF renderer can load. The `scripts/package.json` holds runtime-only dependencies (Playwright). It is private and not part of the published library API.

## Interface

- [export-pdf.sh] `export-pdf.sh <deck.html> [output.pdf]` renders a deck to PDF. The default output is the input path with `.pdf`.
- [export-pdf.mjs] `export-pdf.mjs <input.html> <output.pdf>` drives headless Chromium with `page.pdf` at 1920x1080.
- [deploy.sh] `deploy.sh <deck.html | deck-dir/> [--prod]` deploys a deck with the Vercel CLI and prints the URL.
- [check-local-assets.mjs:hasLocalAssetReference], [check-local-assets.mjs:MAX_DEPLOY_HTML_BYTES] detect local `src`, `srcset`, `href`, `poster`, CSS `url()`, and `@import` references.
- [pdf-security.mjs:createPdfRouteGuard], [pdf-security.mjs:isPublicNetworkAddress], [pdf-security.mjs:isAllowedPublicHttpUrl], [pdf-security.mjs:isAllowedPdfFileUrl] form the Playwright route guard.
- [package.json] declares the `playwright` runtime dependency for `export-pdf.sh`.

## Invariants

- [check-local-assets.mjs] uses inverted exit codes: 0 means a local reference exists, 1 means none, 2 means it could not inspect the file. It refuses files above `MAX_DEPLOY_HTML_BYTES` (64 MiB) with exit 2. [deploy.sh] depends on these exact codes.
- [deploy.sh] refuses a single-file deck that has local asset references. It also refuses when the asset check exits with anything other than 0 or 1.
- [deploy.sh] makes a preview deployment by default. `--prod` is opt-in. It accepts exactly one target. It does not start an interactive login; it exits when `vercel whoami` fails.
- [export-pdf.mjs] disables page JavaScript (`javaScriptEnabled: false`) and sends every request through [pdf-security.mjs:createPdfRouteGuard].
- [pdf-security.mjs:createPdfRouteGuard] aborts `script` requests. It allows `data:`, `blob:`, and `about:` URLs. It allows `file:` URLs only inside the real directory of the input file. It allows `http:` and `https:` only to public addresses, with at most 5 redirect hops (`MAX_REDIRECT_HOPS`), each hop checked again.
- [pdf-security.mjs:isAllowedPublicHttpUrl] rejects `localhost`, `.local`, `.internal`, `.home.arpa`, and private, loopback, and reserved IP ranges. A DNS lookup times out after 2 s (`DNS_TIMEOUT_MS`) and counts as not allowed.
- [export-pdf.mjs] counts `slide` class tokens and PDF pages. It prints a warning on a mismatch and does not fail.

## Side Effects

- [deploy.sh] runs `npx --yes vercel deploy`. This is a public network action. For a single file it copies the deck to a `mktemp -d` directory as `index.html` and removes that directory on exit.
- [export-pdf.sh] runs `npm install` into `scripts/node_modules` on the first run. It runs `playwright install chromium` on each run. It creates the output directory and writes the PDF.
- [export-pdf.mjs] launches Chromium, reads the input HTML, writes the output PDF, and reads the PDF back to count pages.
- [pdf-security.mjs:isAllowedPublicHttpUrl] performs DNS lookups through `node:dns/promises`. [pdf-security.mjs:createPdfRouteGuard] fetches allowed remote resources through `route.fetch`.
- [check-local-assets.mjs] reads the input HTML file and writes errors to stderr.

## Verification

- Run: `pnpm --filter @presentation-md/core test` (includes `tests/deploy-script.test.ts` and `tests/pdf-security.test.ts`)
