# renderer-node src

## Overview

The Node renderer. `index.ts` turns a deck JSON spec into a self-contained HTML deck from the `shared/` templates and a theme, and wraps PPTX and PDF export. `cli.ts` is the `presentation-md-render` CLI. The other files cover PDF export, screenshots, HTML metrics, theme preview decks, deploys, and bounded child process I/O.

## Interface

- [index.ts:renderDeck] `(deckJson, opts?: RenderOptions) => Promise<string>`. [index.ts:RenderOptions] has `themesDir`, `extraCss`, `attribution`, `embedSource`.
- [index.ts:renderDeckPptx] `(deckJson, opts?: PptxRenderOptions) => Promise<Buffer>`, built on `deckToPptxBuffer` from `@presentation-md/export`.
- [index.ts:renderDeckPdf] `(deckJson, opts?) => Promise<Buffer>`.
- [index.ts:getBundledThemesDir] returns the themes dir of `@presentation-md/core`.
- [index.ts:validateDeckJson] re-export from `@presentation-md/core`. [index.ts] also re-exports the public symbols of the files below.
- [pdf.ts:htmlStringToPdfBuffer], [pdf.ts:htmlFileToPdfBuffer], [pdf.ts:readPdfOutputBounded], [pdf.ts:resolveExportPdfScript], [pdf.ts:DEFAULT_PDF_EXPORT_TIMEOUT_MS] (180000), [pdf.ts:MAX_PDF_HTML_BYTES] (64 MiB), [pdf.ts:MAX_PDF_OUTPUT_BYTES] (128 MiB).
- [screenshot-slides.ts:screenshotSlides], [screenshot-slides.ts:findChrome], [screenshot-slides.ts:which], [screenshot-slides.ts:extractSlideChunks], [screenshot-slides.ts:isolateSlideHtml], [screenshot-slides.ts:ShotMeta], [screenshot-slides.ts:ScreenshotResult].
- [html-metrics.ts:analyzeHtmlDeck] `(html, tokensCss?) => { metrics, flags }` and [html-metrics.ts:MetricFlag].
- [theme-preview-deck.ts:buildTitlePreviewDeck], [theme-preview-deck.ts:buildLayoutsPreviewDeck], [theme-preview-deck.ts:layoutsPreviewLayoutNames], [theme-preview-deck.ts:layoutsPreviewSlideCount], [theme-preview-deck.ts:discoverySlideIndices], [theme-preview-deck.ts:parsePreviewCompareThemes], [theme-preview-deck.ts:LAYOUTS_PREVIEW_LAYOUTS], [theme-preview-deck.ts:DISCOVERY_SHOT_W] (960), [theme-preview-deck.ts:DISCOVERY_SHOT_H] (540), [theme-preview-deck.ts:PreviewMode].
- [deploy.ts:deployDeck], [deploy.ts:resolveDeployScript], [deploy.ts:DeployDeckOptions], [deploy.ts:DeployDeckResult], [deploy.ts:DEFAULT_DEPLOY_TIMEOUT_MS] (300000).
- [bounded-input.ts:readUtf8FileBounded], [bounded-input.ts:readUtf8StreamBounded], [bounded-input.ts:MAX_CLI_TEXT_INPUT_BYTES] (10 MiB).
- [process-output.ts:BoundedProcessOutput], [process-output.ts:childOutputMaxBytes], [process-output.ts:DEFAULT_CHILD_OUTPUT_MAX_BYTES] (1 MiB). [process-tree.ts:killProcessTree].
- [cli.ts:buildProgram] returns the commander program `presentation-md-render`. Main flags: `-o/--output`, `-f/--format`, `-t/--theme`, `--from-pptx`, `--from-md`, `--list-themes`, `--scaffold`, `--audit`, `--fix`, `--apply-theme`, `--share-link`, `--generate-prompt`, `--preview-compare`, `--judge`, `--judge-tier`, `--deploy`, `--confirm-deploy`, `--deploy-prod`, `--validate`.

## Invariants

- [index.ts:renderDeck] and [index.ts:renderDeckPptx] throw `Deck JSON is invalid` when validation fails. [index.ts:structuralValidateDeckJson] is the fallback check: `type === "deck"`, non-empty `slides`, and each `layout` in [index.ts:VALID_LAYOUTS].
- [index.ts:sanitizeLink] allows only `http`, `https`, `mailto`, `tel` (else `#`). [index.ts:sanitizeImage] allows only `data:image/*`, `http`, `https`. `custom-html` slides pass `sanitizeCustomHtml` from core. [index.ts:embedDeckScript] escapes `<` to block `</script>` breakout.
- [index.ts:renderDeck] adds the attribution footer unless `attribution === false`, and embeds the deck source unless `embedSource === false`.
- [pdf.ts:assertPdfHtmlSize] and [pdf.ts:readPdfOutputBounded] enforce the PDF input and output caps. [pdf.ts:pdfExportTimeoutMs] throws on a bad `PRESENTATION_MD_PDF_TIMEOUT_MS`.
- [screenshot-slides.ts:screenshotSlides] returns `{ok:false, chrome_missing:true}` with no writes when no Chrome is found. Defaults: 1600x900, at most 40 slides. [screenshot-slides.ts:screenshotTimeoutMs] defaults to 25000 ms.
- [deploy.ts:deployDeck] is a dry run unless `confirm === true`, and refuses `prod` unless `confirmProd === true`. [deploy.ts:runDeployScript] needs a `Deployed -> https://...` line on stdout.
- [bounded-input.ts:readUtf8FileBounded] and [bounded-input.ts:readUtf8StreamBounded] throw above the byte cap. [process-output.ts:BoundedProcessOutput] throws when child output exceeds its cap. Every child process is killed by [process-tree.ts:killProcessTree] on timeout or output overflow.
- [cli.ts:buildProgram] rejects an unknown `--format`, a `--judge-tier` other than `t0`/`t1`/`t2`, and a non-`.pptx` `--from-pptx`, with exit code 1.

## Side Effects

- [index.ts:renderDeck] reads `shared/base.css`, `shared/surfaces.css`, `shared/document.html`, and `shared/layouts/<layout>.html`, plus theme files through `loadTheme`.
- [index.ts:renderDeckPptx] calls `deckToPptxBuffer` with `prefetchImages: true` (remote images are fetched inside `@presentation-md/export`).
- [pdf.ts:runExportPdf] spawns `bash` on core `scripts/export-pdf.sh` in a `pmd-pdf-*` temp dir, removed in `finally`.
- [screenshot-slides.ts:runChrome] spawns headless Chrome once per slide. [screenshot-slides.ts:screenshotSlides] writes `deck.html`, `slide-NN.html`, and PNGs to `shotsDir`, and removes its `pmd-chrome-profile-*` dir. [screenshot-slides.ts:which] spawns `which`.
- [deploy.ts:deployDeck] spawns `bash` on core `scripts/deploy.sh` with the parent environment when confirmed.
- [cli.ts:buildProgram] reads stdin or input files, writes output files, prints to stdout/stderr, and calls `process.exit`.
- Env reads: `PRESENTATION_MD_PDF_TIMEOUT_MS`, `PRESENTATION_MD_CHROME_PATH`, `PRESENTATION_MD_SCREENSHOT_TIMEOUT_MS`, `PRESENTATION_MD_DEPLOY_TIMEOUT_MS`, `PRESENTATION_MD_CHILD_OUTPUT_MAX_BYTES`.
- [html-metrics.ts:analyzeHtmlDeck] and [theme-preview-deck.ts] None (pure).

## Verification

- Run: `pnpm --filter @presentation-md/render test`
