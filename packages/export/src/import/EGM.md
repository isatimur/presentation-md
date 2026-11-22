# export/src/import

## Overview

The PPTX import path. It turns a `.pptx` buffer into presentation-md Deck JSON in two stages. `extractPptx` parses the OOXML zip into an intermediate `ExtractedPresentation`. `mapExtractedToDeck` infers a layout for each slide and validates the result. The package exposes this directory as the `@presentation-md/export/import` subpath (see `../../package.json` `exports`).

## Interface

- `pptxToDeck(input, opts?)` [index.ts:pptxToDeck] - runs extract then map. Returns `{ deck, extracted, warnings }`; warnings from both stages are concatenated.
- `extractPptx(input, opts?)` [extract.ts:extractPptx] - parses slides, titles, text, the largest table, images, speaker notes, and core metadata. Returns `{ extracted, warnings }`.
- `mapExtractedToDeck(extracted, opts?)` [map.ts:mapExtractedToDeck] - maps each `ExtractedSlide` to a `Slide` and returns `{ deck, warnings }`. Layout inference in [map.ts:mapSlide] checks in this order: table with 2+ rows -> `data-table`; `QUOTE_RE` or quoted heading -> `quote`; `looksLikeStats` -> `stat-row`; `looksLikeSteps` -> `timeline`; `looksLikeCards` -> `feature-grid`; last slide matching `CTA_RE` -> `closing`; sparse first slide -> `title`; empty later slide -> `section`; otherwise `two-column` (with image when present).
- `MAX_COMPRESSED_BYTES`, `assertZipArchiveSafe` [zip-limits.ts] - re-exported from the subpath entry. Internal: `MAX_UNCOMPRESSED_BYTES`, `MAX_ZIP_ENTRIES`, `MAX_MEDIA_BYTES`, `assertZipEntrySafe`.
- Types [types.ts]: `ExtractedImage`, `ExtractedSlide`, `ExtractedPresentation`, `ExtractOptions` (`onWarn`), `MapOptions` (`theme`, `assetsDir`, `onWarn`), `ImportOptions`.
- Internal byte helpers [bytes.ts]: `bytesToUtf8`, `bytesToBase64` (browser- and Node-safe).

## Invariants

- Zip-bomb limits: compressed input at most 64 MiB, declared and actual uncompressed total at most 50 MiB, at most 200 entries, each `ppt/media/` entry at most 10 MiB. Breaches throw [zip-limits.ts:assertZipArchiveSafe, assertZipEntrySafe].
- Limits apply to both declared sizes (central directory) and actual streamed bytes, chunk by chunk [extract.ts:extractPptx readBytes].
- JSZip loads with `checkCRC32: false`; CRC32 is checked per entry while streaming. A mismatch throws `CRC32 mismatch` [extract.ts:extractPptx, updateCrc32, declaredCrc32].
- A PPTX with no slides throws `No slides found in PPTX` [extract.ts:extractPptx].
- External slide, image, and notes relationships are skipped with a warning, never fetched [extract.ts:extractPptx].
- Only one table per slide is kept (the largest); extra tables produce a warning [extract.ts:extractPptx].
- Only the first image per slide is used; extra images produce a warning. EMF/WMF images are skipped [map.ts:mapExtractedToDeck, imageToRef, SKIP_IMAGE_TYPES].
- `meta.theme` defaults to `"claude"` when `opts.theme` is unset [map.ts:mapExtractedToDeck].
- The mapped deck must pass `validateDeckJson` from `@presentation-md/core/validate-deck`; otherwise it throws `Mapped deck failed validation` [map.ts:mapExtractedToDeck].
- Recoverable problems go to the `warnings` array and the optional `onWarn` callback, not to exceptions [extract.ts:extractPptx warn].

## Side Effects

- Disk write: when `MapOptions.assetsDir` is set, images are written there (`mkdir -p`, `writeFile`) and the deck references a cwd-relative POSIX path. Without `assetsDir`, images become inline `data:` URIs and nothing is written [map.ts:imageToRef, assetsRelativePath].
- No network access.

## Verification

- Run: `pnpm --filter @presentation-md/export test`
