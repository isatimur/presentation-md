# @presentation-md/mcp-server

## 1.1.3

### Patch Changes

- Updated dependencies [61cb2b0]
  - @presentation-md/export@1.3.0
  - @presentation-md/render@1.2.2

## 1.1.2

### Patch Changes

- Updated dependencies [0e5274f]
- Updated dependencies [42bee0e]
  - @presentation-md/render@1.2.1
  - @presentation-md/export@1.2.0

## 1.1.1

### Patch Changes

- 4dbb572: Ship image-hero storytelling motion, denser asymmetric bento/ratio craft, and package the shared layout CSS inside `@presentation-md/render` so npm consumers get the same craft ceiling as the site proofs.
- Updated dependencies [4dbb572]
  - @presentation-md/render@1.2.0

## 1.1.0

### Minor Changes

- Add `code` layout, asymmetric two-column/comparison/bento craft, and `preview_themes` multi-layout mode.

### Patch Changes

- Updated dependencies
  - @presentation-md/core@1.1.0
  - @presentation-md/render@1.1.0
  - @presentation-md/export@1.1.0
  - @presentation-md/create-theme@1.0.1

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Minor Changes

- a3f8544: Add PPTX export: take any deck into PowerPoint, Keynote, and Google Slides.

  - New `@presentation-md/export` package mapping each of the 9 structured
    layouts + theme roles to native, editable PowerPoint shapes (`deckToPptxBuffer` /
    `deckToPptxBlob` / `deckToPptxArrayBuffer`, isomorphic Node + browser).
  - `render` CLI gains `--format pptx` (and a shared `renderDeckPptx` API). The
    resulting `.pptx` opens directly in PowerPoint and Keynote, and imports into
    Google Slides via File → Import.
  - New `export_deck` MCP tool so agents can export decks to `.pptx` (or html).

- e9b8afd: Add PPTX → Deck JSON import (round-trip with existing export).

  - `extractPptx` / `mapExtractedToDeck` / `pptxToDeck` via `@presentation-md/export/import`
  - CLI: `presentation-md-render --from-pptx <file>`
  - MCP: `import_pptx` tool (path or base64, cwd-contained)
  - Skill docs: `references/pptx-import.md`

### Patch Changes

- 4dfb90b: Harden PPTX import against review findings: correct assetsDir image refs,
  enforce post-decompress zip size limits, realpath write containment, preserve
  speaker notes, and reopen legacy psp-deck HTML embeds.
- e9b8afd: Skill craft upgrade inspired by frontend-slides: honest 9-layout schema alignment,
  theme selection index + show-don't-tell discovery, real MCP tool table (and matching
  README/marketing copy), install SKILL sync, and keyboard / reduced-motion / entrance
  motion in the shared HTML renderer.
- Updated dependencies [e4b502e]
- Updated dependencies [a3f8544]
- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/render@1.0.0
  - @presentation-md/export@1.0.0
  - @presentation-md/core@1.0.0
  - @presentation-md/create-theme@1.0.0

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.

### Patch Changes

- Updated dependencies [d8d2fb0]
  - @presentation-md/core@0.2.0
  - @presentation-md/render@0.2.0
