---
"@presentation-md/export": minor
"@presentation-md/render": minor
"@presentation-md/mcp-server": minor
---

Add PPTX export: take any deck into PowerPoint, Keynote, and Google Slides.

- New `@presentation-md/export` package mapping each of the 9 structured
  layouts + theme roles to native, editable PowerPoint shapes (`deckToPptxBuffer` /
  `deckToPptxBlob` / `deckToPptxArrayBuffer`, isomorphic Node + browser).
- `render` CLI gains `--format pptx` (and a shared `renderDeckPptx` API). The
  resulting `.pptx` opens directly in PowerPoint and Keynote, and imports into
  Google Slides via File → Import.
- New `export_deck` MCP tool so agents can export decks to `.pptx` (or html).
