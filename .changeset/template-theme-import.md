---
"@presentation-md/core": minor
"@presentation-md/export": minor
"@presentation-md/create-theme": minor
"@presentation-md/mcp-server": minor
---

Theme from a PowerPoint template.

- `import_brand_theme` takes a new source, `pptxPath` (`.pptx` or `.potx`), and `allowOfficeDefault`. The CLI gains `create-presentation-md-theme --from-pptx <file>` and `--allow-office-default`. The theme takes its colours from the template's colour scheme (through the master's colour map) and its fonts from the font scheme. A template that keeps an Office default scheme is not written unless allowed. The response adds `fonts`, `warnings`, `logo` (metadata only) and `scheme`.
- create-theme no longer writes a font that Google Fonts does not have into `googleFonts`, for every source. The brand family stays first in the font stack, followed by the base theme's family. Google Fonts specs use `+` for spaces.
- Slide import (`import_pptx`) refuses any XML part that contains a DOCTYPE.
- `@presentation-md/export/import` exports `extractTemplateBrand`, `TemplateBrand`, `isOfficeFont` and `MAX_TEMPLATE_ZIP_ENTRIES`. `@presentation-md/core` exports `rgbToHsl` and the `RGB` and `HSL` types, and `mapPaletteToRoles` accepts optional `bg2` and `accent2`.
- `@presentation-md/create-theme` now depends on `@presentation-md/export`.
