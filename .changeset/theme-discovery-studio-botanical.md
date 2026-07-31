---
"@presentation-md/core": minor
"@presentation-md/mcp-server": minor
"@presentation-md/studio": minor
"@presentation-md/export": minor
"@presentation-md/create-theme": minor
"@presentation-md/theme-botanical-luxe": patch
"@presentation-md/theme-dark-botanical": patch
---

Theme Discovery APIs + Studio shortlists, denser botanical PPTX chrome, and light/dark create-theme extends.

- core: public `theme-discovery` loaders/helpers + integrity tests; expand shortlists (paper-literary, soft-pastel, mid-century-mat, hud-blueprint, y2k-arcade, workshop-scatter, glass-voltage, parchment-quiet) to cover 56 themes
- mcp: list/preview/generate_deck_prompt consume core discovery (single source of truth)
- studio: shortlist chips in theme browser + Generate modal
- export: always-on botanical-luxe frame/shadow + denser dark-botanical bloom/shadow (skip mix-blend)
- create-theme: light scaffolds/imports extend `claude`, dark extend `default-tech` (avoid neon surface inheritance)
