# mcp-server lib

## Overview

Shared helpers for the MCP tools: path checks against the working directory, theme dir lookup, rich results with inline images, and re-exports from `@presentation-md/render`.

## Interface

- [cwd-path.ts:assertWritablePathInCwd] `(relPath, label)` returns the real path of a write target inside `process.cwd()`.
- [cwd-path.ts:assertExistingPathInCwd] `(relPath, label)` returns the real path of an existing path inside `process.cwd()`.
- [resolve-themes.ts:resolveThemesDir] returns `{ themesDir, fallbackThemesDirs? }`.
- [rich-result.ts:McpImagePayload], [rich-result.ts:RichToolResult], [rich-result.ts:richToolResult], [rich-result.ts:isRichToolResult].
- [rich-result.ts:MAX_MCP_INLINE_IMAGE_BYTES] is 8 MiB. [rich-result.ts:isMcpInlineImageSizeAllowed] and [rich-result.ts:encodeMcpInlineImage] enforce it.
- [html-metrics.ts] re-exports `analyzeHtmlDeck` and `MetricFlag` from `@presentation-md/render`.
- [screenshot-slides.ts] re-exports `extractSlideChunks`, `findChrome`, `isolateSlideHtml`, `screenshotSlides`, `ShotMeta`, `ScreenshotResult` from `@presentation-md/render`.

## Invariants

- [cwd-path.ts:assertWritablePathInCwd] resolves the nearest existing ancestor and throws `must be within the current working directory` when the real path escapes the cwd. It throws `not found` when no ancestor exists.
- [cwd-path.ts:assertExistingPathInCwd] throws `not found` when `realpath` fails and `must be within` when the path escapes the cwd.
- [rich-result.ts:isMcpInlineImageSizeAllowed] accepts only safe positive integers up to 8 MiB. [rich-result.ts:encodeMcpInlineImage] returns `null` above the cap.
- [rich-result.ts:isRichToolResult] requires the marker `__pmd_rich: true`.

## Side Effects

- [cwd-path.ts:assertWritablePathInCwd] and [cwd-path.ts:assertExistingPathInCwd] call `realpath` (read only).
- [resolve-themes.ts:resolveThemesDir] calls `existsSync` on monorepo `packages/themes` paths relative to the module and the cwd.
- [rich-result.ts] None (pure functions).

## Verification

- Run: `pnpm --filter @presentation-md/mcp-server test`
