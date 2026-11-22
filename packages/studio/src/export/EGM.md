# export

## Overview

All Studio file input and output. It downloads HTML, JSON, Markdown, notes, `.pptx`, and PDF. It opens Deck JSON, rendered HTML, Markdown, and `.pptx` files. Every import path ends in the Studio deck guard. PDF tries three paths in order: the local headless endpoint, client raster, then the print dialog.

## Interface

- Size limits: `MAX_STUDIO_TEXT_FILE_BYTES` (10 MiB), `MAX_STUDIO_PPTX_FILE_BYTES` (50 MiB), `MAX_STUDIO_PDF_HTML_BYTES` and `MAX_STUDIO_PDF_RESPONSE_BYTES` (64 MiB), `STUDIO_PDF_TIMEOUT_MS` (45 s). Re-exports `MAX_STUDIO_DECK_JSON_BYTES` from `../deckGuard.ts`. [downloads.ts:MAX_STUDIO_TEXT_FILE_BYTES]
- `assertStudioImportFileSize(file)`. [downloads.ts:assertStudioImportFileSize]
- Downloads: `downloadPptx` (returns `PptxDownloadResult { warnings }`), `downloadHtml`, `downloadJson`, `downloadMarkdown`, `downloadNotesTxt`, `downloadNotesVtt`, `downloadRecoveryText`. [downloads.ts:downloadPptx]
- PDF: `downloadPdf` (returns `PdfDownloadResult { mode }`, with `PdfDownloadMode` = `"headless" | "client" | "print"`), `fetchHeadlessPdfBlob`, `downloadPdfClientRaster`, `printDeckPdf`. [downloads.ts:downloadPdf]
- Imports: `parseDeckFile(filename, text, theme?)`, `parseDeckJson`, `extractDeckFromHtml`, `importMarkdownFile`, `importPptxFile`. [downloads.ts:parseDeckFile]
- Helpers: `deckMarkdown`, `prefetchDeckImages`. Re-exports `notesHandoutTxt`, `notesHandoutVtt`, `formatVttTime` from `@presentation-md/core`. [downloads.ts:deckMarkdown]

## Invariants

- Every import returns a deck that passed `parseStudioDeckJson`, including `.pptx` and Markdown results, which are re-serialised and re-checked. [downloads.ts:importPptxFile, downloads.ts:importMarkdownFile, downloads.ts:parseDeckJson]
- Text imports over 10 MiB throw. `.pptx` files over 50 MiB throw. [downloads.ts:assertStudioTextSize, downloads.ts:assertStudioImportFileSize]
- `parseDeckFile` routes by extension: `.htm(l)` to the embedded deck, `.md`/`.markdown` to Markdown, all else to JSON. [downloads.ts:parseDeckFile]
- `extractDeckFromHtml` reads only `#pmd-deck` or the legacy `#psp-deck`. It throws when neither exists. [downloads.ts:extractDeckJsonString, downloads.ts:extractDeckFromHtml]
- `fetchHeadlessPdfBlob` returns `null`, not an error, for oversize HTML, a non-OK status, an oversize body, an empty body, a non-PDF body, a timeout, or a fetch error. Without a PDF content type it needs the `%PDF` magic bytes. [downloads.ts:fetchHeadlessPdfBlob]
- `downloadPdf` order: headless, then client raster, then `printDeckPdf`. [downloads.ts:downloadPdf]
- `printDeckPdf` throws a "Pop-up blocked" error when `window.open` returns `null`. [downloads.ts:printDeckPdf]
- File names are lowercase `[a-z0-9-]` slugs of `meta.title`, `meta.company`, or `deck`. HTML downloads use `application/octet-stream` because Chromium blocks `text/html` blob downloads. [downloads.ts:safeName, downloads.ts:downloadHtml]
- Missing `meta.theme` resolves as `default-tech`. [downloads.ts:themeName]

## Side Effects

- Browser downloads through a temporary `<a download>` and `URL.createObjectURL`. The URL is revoked after 2 s. [downloads.ts:triggerDownload]
- `POST /api/export-pdf` with `text/html`. The endpoint lives in `../../vite.config.ts:exportPdfApi`. [downloads.ts:fetchHeadlessPdfBlob]
- Client raster mounts an off-screen 1920x1080 iframe, writes the HTML, and rasterises each `.slide` with lazy-loaded `html2canvas` into `pdf-lib` pages. [downloads.ts:downloadPdfClientRaster]
- `printDeckPdf` opens a `_blank` window, writes the HTML, and calls `print()` after 250 ms. [downloads.ts:printDeckPdf]
- Lazy imports of `@presentation-md/export` (`deckToPptxBlob`, `prefetchDeckImages`) and `@presentation-md/export/import` (`pptxToDeck`). PPTX export prefetches images over the network. [downloads.ts:downloadPptx, downloads.ts:importPptxFile]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
