# export/src/import

## Overview

The PPTX import path. It turns a `.pptx` buffer into presentation-md Deck JSON in two stages. `extractPptx` parses the OOXML zip into an intermediate `ExtractedPresentation`. `mapExtractedToDeck` infers a layout for each slide and validates the result. The package exposes this directory as the `@presentation-md/export/import` subpath (see `../../package.json` `exports`).

## Interface

- `pptxToDeck(input, opts?)` [index.ts:pptxToDeck] - runs extract then map. Returns `{ deck, extracted, warnings }`; warnings from both stages are concatenated.
- `extractPptx(input, opts?)` [extract.ts:extractPptx] - parses slides, titles, text, the largest table, images, speaker notes, and core metadata. Returns `{ extracted, warnings }`.
- `mapExtractedToDeck(extracted, opts?)` [map.ts:mapExtractedToDeck] - maps each `ExtractedSlide` to a `Slide` and returns `{ deck, warnings }`. Layout inference in [map.ts:mapSlide] checks in this order: table with 2+ rows -> `data-table`; `QUOTE_RE` or quoted heading -> `quote`; `looksLikeStats` -> `stat-row`; `looksLikeSteps` -> `timeline`; `looksLikeCards` -> `feature-grid`; last slide matching `CTA_RE` -> `closing`; sparse first slide -> `title`; empty later slide -> `section`; otherwise `two-column` (with image when present).
- `extractTemplateBrand(bytes, { fileName? })` [template-brand.ts:extractTemplateBrand] - reads a `.pptx`/`.potx` template: the first slide master's theme part (colour scheme, font scheme), its `p:clrMap`, Office-default and built-in scheme detection, and logo metadata (no image bytes). Returns a `TemplateBrand`. Holds `OFFICE_ACCENT_TABLES`, `BUILT_IN_SCHEME_NAMES` and the exact warning strings.
- `openOoxmlPackage(bytes, { maxEntries })` [package-reader.ts:openOoxmlPackage] - the shared bounded ZIP reader used by `extractPptx` and `extractTemplateBrand`: `partNames`, `readXml`, `readText`, `readBytes`, `partSize`, `rels`, `contentType`, `warnings`. Also `asArray`, `relIdFromSldId`, `resolveRelTarget`. Internal (not re-exported from the subpath entry).
- `isOfficeFont` [../office-fonts.ts] - re-exported from the subpath entry for create-theme's font classes.
- `MAX_COMPRESSED_BYTES`, `MAX_TEMPLATE_ZIP_ENTRIES`, `assertZipArchiveSafe` [zip-limits.ts] - re-exported from the subpath entry. Internal: `MAX_UNCOMPRESSED_BYTES`, `MAX_ZIP_ENTRIES`, `MAX_MEDIA_BYTES`, `assertZipEntrySafe` (takes an optional `maxEntries`).
- Types [types.ts]: `ExtractedImage`, `ExtractedSlide`, `ExtractedPresentation`, `ExtractOptions` (`onWarn`), `MapOptions` (`theme`, `assetsDir`, `onWarn`), `ImportOptions`, `TemplateBrand`, `SchemeColorKey`, `ClrMapTarget`, `OfficeDefaultLabel`, `LogoCorner`.
- Internal byte helpers [bytes.ts]: `bytesToUtf8`, `bytesToBase64` (browser- and Node-safe).

## Invariants

- Zip-bomb limits: compressed input at most 64 MiB, declared and actual uncompressed total at most 50 MiB, each `ppt/media/` entry at most 10 MiB. Breaches throw [zip-limits.ts:assertZipArchiveSafe, assertZipEntrySafe].
- The entry cap is per caller: slide import 200 (`MAX_ZIP_ENTRIES`), template import 2,000 (`MAX_TEMPLATE_ZIP_ENTRIES`). The message is `PPTX has too many entries (>N)` [zip-limits.ts:assertZipEntrySafe, package-reader.ts:openOoxmlPackage].
- Limits apply to both declared sizes (central directory) and actual streamed bytes, chunk by chunk [package-reader.ts:openOoxmlPackage inflate].
- JSZip loads with `checkCRC32: false`; CRC32 is checked per entry while streaming. A mismatch throws `CRC32 mismatch` [package-reader.ts:openOoxmlPackage, updateCrc32, declaredCrc32].
- Any XML part that contains `<!DOCTYPE` is refused before parsing: `<part> contains a DOCTYPE; PowerPoint files never need one.` This applies to slide import and template import [package-reader.ts:readText].
- Template import: a missing master throws `No slide master in <file>`; a missing theme part throws `No theme part for the first slide master in <file>` (`the template` when no file name is given). A template with zero slides is valid [template-brand.ts:extractTemplateBrand].
- Office default: `accent1` equals a table's `accent1` and at least 5 of 6 accents match [template-brand.ts:officeDefaultFor].
- Logo candidates are top-level `p:pic` elements on the master no wider than a quarter of the slide; the one nearest a corner wins; grouped pictures are skipped with a warning [template-brand.ts:readLogo].
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
