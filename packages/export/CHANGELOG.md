# @presentation-md/export

## 1.3.5

### Patch Changes

- 855f8a7: Expand dual-surface PPTX emphasis fills for loud craft themes (candy-pop, vaporwave, neon-noir, retro-arcade, genz-bento, y2k-aero, bauhaus, creative-mode, bold-poster) so comparison/bento heroes match HTML AA inks.

## 1.3.4

### Patch Changes

- e0f70bd: Align dual-surface cardBg with HTML craft (bold-signal orange → tinted dark, creative-voltage opaque navy), raise mat/soft-editorial muted AA on tint washes, lift PPTX craft (icon letter markers, gradient/title chrome, cardMuted + accent emphasis fills), and promote Studio on vs pages + homepage.
- 9cd4658: Expand dual-surface PPTX emphasis fills (studio, acid, daisy mint, raw-grid, broadside, and more) so accent comparison/bento heroes match HTML craft ink.
- bc744bf: Make PPTX import browser-safe (TextDecoder/base64 helpers, dynamic node:fs) so Studio can open .pptx files in the hosted workbench.

## 1.3.3

### Patch Changes

- Updated dependencies [9bb1dba]
  - @presentation-md/core@1.1.2

## 1.3.2

### Patch Changes

- 545ccd8: Round-trip speaker notes through PPTX export (`addNotes`) and Studio; raise package engines to Node 22+.
- Updated dependencies [545ccd8]
  - @presentation-md/core@1.1.1

## 1.3.1

### Patch Changes

- 23e3a1f: Prefetch local file:/ paths for PPTX embeds (with allowedRoots confinement); raise neon/vapor/loud comparison and feature-grid AA contrast.

## 1.3.0

### Minor Changes

- 61cb2b0: Prefetch remote http(s) slide images before PPTX export so CLI/MCP embeds match Studio; raise comparison/feature-grid contrast on loud accent fills.

## 1.2.0

### Minor Changes

- 42bee0e: Raise PPTX craft fidelity for asymmetric layouts: bento feature-grids, comparison emphasis, image-hero scrims, and code window chrome so exports keep more of the HTML craft ceiling.

## 1.1.0

### Minor Changes

- Add `code` layout, asymmetric two-column/comparison/bento craft, and `preview_themes` multi-layout mode.

### Patch Changes

- Updated dependencies
  - @presentation-md/core@1.1.0

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
- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/core@1.0.0
