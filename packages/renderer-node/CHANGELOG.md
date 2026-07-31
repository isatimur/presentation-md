# @presentation-md/render

## 1.2.10

### Patch Changes

- Updated dependencies [c166225]
  - @presentation-md/export@1.3.6

## 1.2.9

### Patch Changes

- Updated dependencies [855f8a7]
  - @presentation-md/export@1.3.5

## 1.2.8

### Patch Changes

- e0f70bd: Align dual-surface cardBg with HTML craft (bold-signal orange → tinted dark, creative-voltage opaque navy), raise mat/soft-editorial muted AA on tint washes, lift PPTX craft (icon letter markers, gradient/title chrome, cardMuted + accent emphasis fills), and promote Studio on vs pages + homepage.
- Updated dependencies [e0f70bd]
- Updated dependencies [9cd4658]
- Updated dependencies [bc744bf]
  - @presentation-md/export@1.3.4

## 1.2.7

### Patch Changes

- Updated dependencies [9bb1dba]
  - @presentation-md/core@1.1.2
  - @presentation-md/export@1.3.3

## 1.2.6

### Patch Changes

- 700c2d3: Raise muted role AA against slide backgrounds, card surfaces, and accent@18% tints across editorial and loud themes; add mat dual-surface card muted overrides and creative-voltage lead contrast.

## 1.2.5

### Patch Changes

- c2f4354: Raise remaining loud-surface comparison/feature-grid AA contrast (mat, pastel, soft-bento, acid/studio lime fills, and missing bento hero ink/white overrides).

## 1.2.4

### Patch Changes

- Updated dependencies [545ccd8]
  - @presentation-md/export@1.3.2
  - @presentation-md/core@1.1.1

## 1.2.3

### Patch Changes

- 23e3a1f: Prefetch local file:/ paths for PPTX embeds (with allowedRoots confinement); raise neon/vapor/loud comparison and feature-grid AA contrast.
- Updated dependencies [23e3a1f]
  - @presentation-md/export@1.3.1

## 1.2.2

### Patch Changes

- 61cb2b0: Prefetch remote http(s) slide images before PPTX export so CLI/MCP embeds match Studio; raise comparison/feature-grid contrast on loud accent fills.
- Updated dependencies [61cb2b0]
  - @presentation-md/export@1.3.0

## 1.2.1

### Patch Changes

- 0e5274f: Soften remaining loud surface ornaments on content slides (notebook tabs, long-table, mat, soft-editorial) so chrome doesn't sit on copy.
- Updated dependencies [42bee0e]
  - @presentation-md/export@1.2.0

## 1.2.0

### Minor Changes

- 4dbb572: Ship image-hero storytelling motion, denser asymmetric bento/ratio craft, and package the shared layout CSS inside `@presentation-md/render` so npm consumers get the same craft ceiling as the site proofs.

## 1.1.0

### Minor Changes

- Add `code` layout, asymmetric two-column/comparison/bento craft, and `preview_themes` multi-layout mode.

### Patch Changes

- Updated dependencies
  - @presentation-md/core@1.1.0
  - @presentation-md/export@1.1.0

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Minor Changes

- e4b502e: Embed the source Deck JSON in rendered HTML so created presentations are editable.

  Every rendered deck now includes a `<script type="application/json" id="pmd-deck">`
  carrying its source spec (opt out with `embedSource: false`). This lets a created
  `.html` be reopened and edited (e.g. in the studio) and re-rendered identically.
  CLI (`render`) and the MCP `render_deck`/`export_deck` tools inherit this automatically.

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

- e9b8afd: Skill craft upgrade inspired by frontend-slides: honest 9-layout schema alignment,
  theme selection index + show-don't-tell discovery, real MCP tool table (and matching
  README/marketing copy), install SKILL sync, and keyboard / reduced-motion / entrance
  motion in the shared HTML renderer.

### Patch Changes

- 4dfb90b: Harden PPTX import against review findings: correct assetsDir image refs,
  enforce post-decompress zip size limits, realpath write containment, preserve
  speaker notes, and reopen legacy psp-deck HTML embeds.
- Updated dependencies [a3f8544]
- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/export@1.0.0
  - @presentation-md/core@1.0.0

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.

### Patch Changes

- Updated dependencies [d8d2fb0]
  - @presentation-md/core@0.2.0
