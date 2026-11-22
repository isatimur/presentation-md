# @presentation-md/render

## Overview

Renders a deck JSON spec to a self-contained HTML deck, and exports PPTX and PDF. Ships the `presentation-md-render` CLI (`dist/cli.js`) and the HTML templates in `shared/`. The build syncs `shared/` with `tools/sync-render-shared.mjs`. It depends on `@presentation-md/core`, `@presentation-md/export`, `commander`, and `mustache`. Usage notes live in [./README.md](./README.md).

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - `renderDeck`, `renderDeckPptx`, `renderDeckPdf`, the CLI, headless Chrome screenshots, PDF export and deploys through core shell scripts, and bounded I/O caps.
- shared (unlinked): `base.css`, `surfaces.css`, `document.html`, `layouts/`, `theme-surfaces.json`. `renderDeck` reads these at render time.
- tests (unlinked): vitest suites.

## Verification

- Run: `pnpm --filter @presentation-md/render test`
