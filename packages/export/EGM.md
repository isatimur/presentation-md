# @presentation-md/export

## Overview

The PowerPoint round-trip package. The main entry (`.` -> `dist/index.js`) exports Deck JSON to editable `.pptx`. The `./import` subpath (`dist/import/index.js`) imports `.pptx` back into Deck JSON. It depends on `@presentation-md/core` (theme types, deck validation), `pptxgenjs`, `jszip`, and `fast-xml-parser` [package.json]. Human docs: [README](./README.md).

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - exporter: `buildPptx`, `deckToPptxArrayBuffer`, `deckToPptxBuffer`, `deckToPptxBlob`, `prefetchDeckImages`, and Deck types. Does no I/O unless image prefetch is on.
  - src/import: [./src/import/EGM.md](./src/import/EGM.md) - importer: `pptxToDeck`, `extractPptx`, `mapExtractedToDeck`, with zip-bomb limits and core deck validation.

## Verification

- Run: `pnpm --filter @presentation-md/export test`
