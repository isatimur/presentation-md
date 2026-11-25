# export/src

## Overview

The Deck JSON to `.pptx` exporter. `buildPptx` builds a PptxGenJS presentation from a deck and a resolved theme. Each slide goes to a native renderer chosen by its `layout`. The `deckToPptx*` helpers serialize the result for Node or the browser. The import path (`.pptx` to Deck JSON) lives in a child directory.

## Interface

- `buildPptx(deck, theme, opts?)` [index.ts:buildPptx] - returns `BuildResult { pptx, slideCount, warnings }`.
- `deckToPptxArrayBuffer`, `deckToPptxBuffer`, `deckToPptxBlob` [index.ts] - call `buildPptx`, then `pptx.write` with `arraybuffer`, `nodebuffer`, or `blob`.
- `PptxOptions` [index.ts:PptxOptions] - `onWarn`, `attribution` (default `true`), `prefetchImages` (default `false`), `prefetch`.
- `prefetchDeckImages(deck, opts?)` [prefetch-images.ts:prefetchDeckImages] - replaces slide `image` sources with `data:` URIs. Types `PrefetchImagesOptions` (`fetch`, `maxBytes`, `timeoutMs`, `resolveHostname`, `allowedRoots`, `readFile`) and `PrefetchImagesResult`. `__prefetchTestUtils` is test-only.
- Deck types re-exported from [deck-types.ts]: `DeckJson`, `DeckMeta`, `Slide`, `LayoutType`, `Card`, `Stat`, `RankedItem`, `Step`, `Cta`, `ChartSeries`.
- Internal modules (not re-exported from the package entry):
  - `renderSlide` and the `RENDERERS` map for 18 layouts [layouts.ts:renderSlide, RENDERERS].
  - `buildContext`, `ExportContext`, `ContextShapes`, `BuildContextMeta` [context.ts].
  - `resolveColor` [color.ts:resolveColor]; `parseFontFamily`, `isBoldWeight` [font.ts].
  - `OFFICE_FONTS`, `isOfficeFont` [office-fonts.ts] - the one list of fonts that ship with Office. The fidelity report uses it; `isOfficeFont` is re-exported from the `./import` subpath for create-theme.
  - `PptxGenJS` constructor shim and `Pptx*` types [pptx.ts].
- Child: [import](./import/EGM.md) - `.pptx` to Deck JSON (`pptxToDeck`, `extractPptx`, `mapExtractedToDeck`) and template brand reading (`extractTemplateBrand`), served as the `./import` subpath. That entry does not load pptxgenjs.
- Human docs: [package README](../README.md).

## Invariants

- `buildPptx` does no I/O unless `prefetchImages: true` [index.ts:PptxOptions, buildPptx].
- The exporter does not validate decks. Callers run `validateDeckJson` from core first [deck-types.ts header comment].
- The slide layout is 16:9: height = width x 9 / 16, width taken from `theme.geometry.slideWidth` (fallback 13.333 in) [context.ts:buildContext].
- An unknown `layout` falls back to the hero renderer and emits a warning [layouts.ts:renderSlide].
- Warnings get a `Slide N:` prefix while a slide renders, unless the message already has one [index.ts:buildPptx warn].
- The last slide gets the "Made with presentation-md" attribution link unless `attribution === false` [index.ts:buildPptx].
- `pptx.author` is always `"presentation-md"` [index.ts:buildPptx].
- Colors resolve to opaque 6-digit uppercase hex. Translucent colors are composited over the background. Unparseable values become `AAAAAA` [color.ts:resolveColor].
- A font stack becomes its first concrete family; generic keywords become `Arial` [font.ts:parseFontFamily].
- Prefetch limits: 8 MiB per image, 10 s per remote image, 5 redirects, 2 s DNS timeout [prefetch-images.ts:DEFAULT_MAX_BYTES, DEFAULT_REMOTE_TIMEOUT_MS, MAX_REMOTE_REDIRECTS, DNS_TIMEOUT_MS].
- Prefetch SSRF guard: only `http:`/`https:`. `localhost`, `.localhost`, `.local`, `.internal`, `.home.arpa`, and non-public IPs are refused. In Node, DNS answers are checked too [prefetch-images.ts:prefetchDeckImages, fetchRemoteImage].
- Local image reads stay inside `allowedRoots` (default `[process.cwd()]`), checked after `realpath`. Null bytes are refused [prefetch-images.ts:assertPathAllowed].
- A failed prefetch keeps the original `image` value and adds a warning; it never throws [prefetch-images.ts:prefetchDeckImages].

## Side Effects

- With `prefetchImages: true` only: network fetches of remote slide images (with DNS lookups in Node) and local file reads under `allowedRoots` [prefetch-images.ts:prefetchDeckImages].
- No disk writes. Callers write the serialized buffer or blob themselves.

## Verification

- Run: `pnpm --filter @presentation-md/export test`
