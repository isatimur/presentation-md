# packages

## Overview

The pnpm workspace packages of presentation-md (`pnpm-workspace.yaml` lists
`packages/*` and `packages/themes/*`). `core` holds the schemas, theme loader,
craft audit, and the source copy of the skill. The renderers, the exporter, the
MCP server, the theme scaffolder, the installer, and Studio all depend on
`core`.

## Subdirectories & Boundaries

- core: [./core/EGM.md](./core/EGM.md) - `@presentation-md/core`. Validates
  Deck JSON and theme manifests, loads themes, audits and repairs craft,
  scaffolds decks, converts Markdown, encodes share links. Ships `SKILL.md`,
  `references/`, two bundled themes, and the PDF and deploy scripts.
- create-theme: [./create-theme/EGM.md](./create-theme/EGM.md) -
  `create-presentation-md-theme` CLI. Scaffolds a theme package from prompts,
  a CSS file, or a brand URL (SSRF-guarded fetch, optional Playwright fallback).
- export: [./export/EGM.md](./export/EGM.md) - `@presentation-md/export`.
  Deck JSON to editable `.pptx` (PptxGenJS) and `.pptx` to Deck JSON
  (`./import`).
- install: [./install/EGM.md](./install/EGM.md) - `presentation-md-install`
  CLI. Runs the matching `adapters/<host>/install.{sh,ps1}`.
- mcp-server: [./mcp-server/EGM.md](./mcp-server/EGM.md) -
  `@presentation-md/mcp-server`. 14 MCP tools over stdio. Every file write is
  checked against the working directory.
- mcp-server-legacy: [./mcp-server-legacy/EGM.md](./mcp-server-legacy/EGM.md) -
  deprecated `@presentation-skill-pack/mcp-server` stub that warns and spawns
  the current server.
- renderer-node: [./renderer-node/EGM.md](./renderer-node/EGM.md) -
  `@presentation-md/render`. Deck JSON to self-contained HTML, plus PPTX, PDF,
  screenshots, HTML metrics, previews, and deploy. Ships the
  `presentation-md-render` CLI.
- renderer-python: [./renderer-python/EGM.md](./renderer-python/EGM.md) -
  `presentation-md-render` Python package. Smaller HTML renderer (12 layouts).
- studio: [./studio/EGM.md](./studio/EGM.md) - `@presentation-md/studio`.
  Browser editor (React + Vite): edit, present, generate with the user's
  Anthropic key, share links, export PPTX/PDF. `build:web` writes
  `../../web/studio`.
- shared (no code contract): `base.css`, `surfaces.css`, `document.html`,
  `layouts/`, and `theme-surfaces.json`. Build steps copy these into
  `core/shared` (`tools/sync-core-shared.mjs`) and `renderer-node/shared`
  (`tools/sync-render-shared.mjs`).
- themes (no code contract): 73 theme packages, each a `theme.json` manifest
  plus package metadata.
