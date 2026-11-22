# skills/presentation-generator/scripts

## Overview
Helper scripts that ship with the `presentation-generator` skill. They export
an HTML deck to a vector PDF and deploy a deck to Vercel. This folder is a
mirror of `packages/core/scripts`. Edit the core copy, then run
`pnpm sync:skill` ([tools/sync-skill.ts:syncDir]).

## Interface
- `bash export-pdf.sh <deck.html> [output.pdf]`: default output is `<deck>.pdf`. [export-pdf.sh:OUTPUT]
- `node export-pdf.mjs <input.html> <output.pdf>`: the Playwright worker that `export-pdf.sh` calls. [export-pdf.mjs:inputPath]
- `bash deploy.sh <deck.html | deck-dir/> [--prod]`: prints `Deployed -> <url>`. [deploy.sh:PROD], [deploy.sh:URL]
- `node check-local-assets.mjs <deck.html>`: exit 0 when the HTML references local files, 1 when not, 2 on error. Exports `hasLocalAssetReference`, `MAX_DEPLOY_HTML_BYTES`. [check-local-assets.mjs:hasLocalAssetReference]
- `pdf-security.mjs` exports `createPdfRouteGuard`, `isAllowedPublicHttpUrl`, `isAllowedPdfFileUrl`, `isPublicNetworkAddress`. [pdf-security.mjs:createPdfRouteGuard]
- `package.json` declares the runtime-only `playwright` dependency. [package.json:dependencies]

## Invariants
- The six files in `SCRIPT_FILES` must stay byte-identical to `packages/core/scripts`. A test enforces this. `package-lock.json` is local only; `sync-skill.ts` skips it. [packages/core/tests/skill-sync.test.ts:SCRIPT_FILES], [tools/sync-skill.ts:syncDir]
- PDF export runs with JavaScript disabled. The route guard aborts all script requests. [export-pdf.mjs:javaScriptEnabled], [pdf-security.mjs:createPdfRouteGuard]
- `file:` requests must resolve (after `realpath`) inside the deck's folder. [pdf-security.mjs:isAllowedPdfFileUrl]
- HTTP(S) requests must resolve only to public addresses. Private, loopback, link-local, and `.local`/`.internal` hosts are refused. Redirects are re-checked, up to 5 hops. DNS times out after 2 s. [pdf-security.mjs:isPublicNetworkAddress], [pdf-security.mjs:MAX_REDIRECT_HOPS], [pdf-security.mjs:DNS_TIMEOUT_MS]
- Any guard error fails closed (the request is aborted). [export-pdf.mjs:page.route]
- A slide is counted by the exact class token `slide`. A page count that differs from the slide count prints a warning; it does not fail. [export-pdf.mjs:expectedSlides]
- `deploy.sh` makes a preview deployment unless `--prod` is passed. [deploy.sh:PROD]
- `deploy.sh` refuses a single-file deck that references local assets, and refuses when the asset check errors. [deploy.sh:check-local-assets.mjs]
- `deploy.sh` never runs an interactive Vercel login. It exits when `vercel whoami` fails. [deploy.sh:whoami]
- `check-local-assets.mjs` refuses HTML above 64 MiB. [check-local-assets.mjs:MAX_DEPLOY_HTML_BYTES]

## Side Effects
- `export-pdf.sh` runs `npm install` into this folder on first use and runs `playwright install chromium` every time. [export-pdf.sh:npm install]
- `export-pdf.mjs` launches headless Chromium, may fetch public HTTP(S) assets, and writes the PDF. [export-pdf.mjs:page.pdf]
- `deploy.sh` runs `npx vercel deploy`, which publishes the deck to a public URL. It copies a single file to a `mktemp -d` folder and deletes it on exit. [deploy.sh:VERCEL_ARGS], [deploy.sh:cleanup]

## Verification
- Run: `pnpm test` (runs `packages/core/tests/pdf-security.test.ts` and `packages/core/tests/skill-sync.test.ts`)
