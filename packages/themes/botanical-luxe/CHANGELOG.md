# @presentation-md/theme-botanical-luxe

## 1.0.2

### Patch Changes

- e6b54be: Theme Discovery APIs + Studio shortlists, denser botanical PPTX chrome, and light/dark create-theme extends.

  - core: public `theme-discovery` loaders/helpers + integrity tests; expand shortlists (paper-literary, soft-pastel, mid-century-mat, hud-blueprint, y2k-arcade, workshop-scatter, glass-voltage, parchment-quiet) to cover 56 themes
  - mcp: list/preview/generate_deck_prompt consume core discovery (single source of truth)
  - studio: shortlist chips in theme browser + Generate modal
  - export: always-on botanical-luxe frame/shadow + denser dark-botanical bloom/shadow (skip mix-blend)
  - create-theme: light scaffolds/imports extend `claude`, dark extend `default-tech` (avoid neon surface inheritance)

## 1.0.1

### Patch Changes

- 700c2d3: Raise muted role AA against slide backgrounds, card surfaces, and accent@18% tints across editorial and loud themes; add mat dual-surface card muted overrides and creative-voltage lead contrast.

## 1.0.0

### Major Changes

- Initial release of the `botanical-luxe` theme for presentation-md.
