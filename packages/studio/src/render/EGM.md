# render

## Overview

Browser-side deck rendering and the theme registry. `renderDeck.ts` is a fs-free port of the Node renderer. It bundles the shared Mustache layouts and base CSS at build time. `themes.ts` bundles every `theme.json` in the monorepo and resolves the `extends` chain in memory. `sandboxPreview.ts` makes deck HTML safe for script-less iframes. `themePreview.ts` holds URL and crop math for the pick-3 theme compare.

## Interface

- `renderDeckHtml(deck, theme)` returns a full HTML document string. [renderDeck.ts:renderDeckHtml]
- `prepareSandboxedPreviewHtml(html)`. Also used by `../../vite.config.ts:exportPdfApi`. [sandboxPreview.ts:prepareSandboxedPreviewHtml]
- `resolveTheme(name)` returns `ResolvedTheme`. [themes.ts:resolveTheme]
- `registerCustomTheme(manifest)`, `listCustomThemeNames()`. [themes.ts:registerCustomTheme]
- `listThemeNames()`, `listThemeSummaries()`, `listThemeShortlists()`, `findThemeShortlist(id)`, `themePassesBrowseFilter(theme, filter)`; types `ThemeSummary`, `ThemeShortlistSummary`. [themes.ts:listThemeSummaries]
- Re-exports from `@presentation-md/core/theme-browse`: `THEME_BROWSE_FILTERS`, `pickDiscoveryPreviewTrio`, type `ThemeBrowseFilterId`. [themes.ts:THEME_BROWSE_FILTERS, themes.ts:pickDiscoveryPreviewTrio]
- `themePreviewUrl(name)`, `COMPARE_LIMIT` = 3, `toggleCompareSlot(current, name)`. [themePreview.ts:themePreviewUrl, themePreview.ts:toggleCompareSlot]
- `PreviewCrop`, `PREVIEW_CROPS`, `PREVIEW_CROP_OFFSET_PX`, `PREVIEW_CROP_LABEL`, `PREVIEW_STRIP_START_PX`, `PREVIEW_STRIP_HEIGHT_PX`, `isPreviewCrop(value)`. [themePreview.ts:PREVIEW_CROP_OFFSET_PX]

## Invariants

- An unknown layout renders `<section class="slide"><h2>Unknown layout: ...</h2></section>`. It does not throw. [renderDeck.ts:renderDeckHtml]
- Link hrefs keep only `http`, `https`, `mailto`, and `tel` schemes. Other schemes become `#`. C0/C1 control characters are stripped first. [renderDeck.ts:sanitizeLink, renderDeck.ts:stripControls]
- Image URLs keep `http(s)` and `data:image/`. Other schemes become `""`. [renderDeck.ts:sanitizeImage]
- `tone` is applied as `data-tone` only when it matches `^[a-z0-9-]+$`. [renderDeck.ts:renderDeckHtml]
- The source deck is embedded as `<script type="application/json" id="pmd-deck">`, with `<` escaped as `<`. This is what makes downloaded HTML re-openable. [renderDeck.ts:embedDeckScript]
- `prepareSandboxedPreviewHtml` removes every `<script>` except `type="application/json"`. It injects CSS that hides presenter chrome (`.pmd-*`, `.nav-hint`). [sandboxPreview.ts:prepareSandboxedPreviewHtml]
- `resolveTheme` falls back to `default-tech` for unknown names. It walks `extends` with a cycle guard, and custom themes shadow bundled ones. Built-in default palette, typography, and geometry sit under the chain. [themes.ts:resolveTheme]
- `registerCustomTheme` throws if the manifest has no `name`. [themes.ts:registerCustomTheme]
- `listThemeShortlists` sorts popular shortlists first. [themes.ts:listThemeShortlists]
- `toggleCompareSlot` removes a present name. At `COMPARE_LIMIT` it drops the oldest slot. [themePreview.ts:toggleCompareSlot]
- `themePreviewUrl` uses the same origin on `/studio`, localhost, or presentation-md and vercel.app hosts. Other hosts use `https://presentation-md.vercel.app/previews/`. [themePreview.ts:themePreviewUrl]

## Side Effects

- `renderDeckHtml` mutates its input. It runs `sanitizeCustomHtml` on each `custom-html` slide's `html` in place. [renderDeck.ts:renderDeckHtml]
- Rendered HTML `@import`s Google Fonts when the theme lists `googleFonts`. The browser fetches them when it loads the HTML. [renderDeck.ts:buildGoogleFontsUrl]
- Build-time bundling via `import.meta.glob` of `../../../shared/layouts/*.html`, `../../../core/themes/*/theme.json`, `../../../themes/*/theme.json`, plus `?raw` imports of shared CSS and the document template. [renderDeck.ts:layoutModules, themes.ts:manifestModules]
- `registerCustomTheme` writes to the module-level `CUSTOM_REGISTRY` for the session. [themes.ts:CUSTOM_REGISTRY]
- `themePreviewUrl` reads `window.location`. [themePreview.ts:themePreviewUrl]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
