---
"@presentation-md/core": patch
"@presentation-md/mcp-server": patch
---

Scaffolded decks now validate and render every slide.

- 8 of 21 recipes (pitch, sales, investor, launch, poster, hud, modernist, electric) failed schema validation: the timeline skeleton used `items` instead of `steps`.
- Three skeletons passed validation but rendered empty: data-table used `headers` (now `columns`), chart nested a `chart` object (now flat `chartType`, `categories`, `series`), and two-column used `left`/`right` (now `body` and `aside`).
- A test scaffolds every recipe, validates it, and fails on any slide field its layout does not render.
