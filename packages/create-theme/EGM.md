# @presentation-md/create-theme

## Overview

Scaffolds a new presentation-md theme package. It ships the `create-presentation-md-theme` bin (`dist/index.js`) and the `src/template` Mustache files. It depends on `@presentation-md/core`, `commander`, and `mustache`. Playwright is installed on demand for the brand-URL fallback. Requires Node >= 22 [package.json].

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - CLI and library: `scaffoldTheme`, `extractBrand`, `buildThemeViewFromBrand`, `deriveNameFromUrl`. SSRF-guarded fetches of brand URLs; writes theme files to the output directory.

## Verification

- Run: `pnpm --filter @presentation-md/create-theme test`
