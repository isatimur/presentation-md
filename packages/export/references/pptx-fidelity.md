# PPTX export — fidelity notes

The exporter maps each structured deck slide to **native, editable** PowerPoint shapes
(text boxes, tables, rounded rectangles). It is intentionally *not* a pixel-perfect
screenshot of the HTML render — it trades exactness for editability. Known differences:

## Fonts
- Theme typography is a CSS stack (e.g. `'Montserrat', system-ui, sans-serif`). We use the
  first concrete family as the PowerPoint font face. If that font isn't installed on the
  viewer's machine, PowerPoint/Keynote substitutes a default — text reflows slightly.
- Generic keywords leading a stack fall back to `Arial`.
- Google Fonts are **not** embedded. Install the font, or accept substitution.

## Colors
- Solid hex maps directly. Translucent `rgba(...)` tokens (cardBg, border) are
  alpha-composited over the slide background to an opaque hex so cards/borders stay visible.
- CSS gradients and `color-mix(...)` are not represented — backgrounds export as the flat
  `bg` color.

## Layout
- Geometry uses `theme.geometry.slideWidth` (px → inches at 96dpi) at native 16:9.
- Long text uses PowerPoint "shrink to fit," so it stays inside its box rather than clipping.

## Content that isn't 1:1
- **Speaker notes:** `slide.notes` exports via PowerPoint's native notes pane
  (`addNotes`) and re-imports on `--from-pptx` / `import_pptx`. Notes are not
  shown on the HTML slide surface.
- **Images:** inline `data:` URIs embed directly. Remote `http(s)` URLs and local
  `file:` / filesystem paths are **prefetched** to data URIs by Studio, CLI
  (`presentation-md-render --format pptx`), and MCP `export_deck` / `renderDeckPptx`
  before export (`prefetchDeckImages`). Local reads are confined to
  `allowedRoots` (default: `process.cwd()`). Failed fetches / out-of-root paths
  still draw a captioned placeholder and emit a warning — nothing is dropped
  silently. Pass `prefetchImages: false` to `buildPptx` for an I/O-free exporter.
- **Icons:** FontAwesome glyphs aren't rendered; each feature-grid card shows a small accent
  marker in their place.
- **Craft layouts that *are* mapped:** `columns: "bento"` (hero + satellite cards),
  comparison `emphasis`, two-column `ratio`/`reverse`, image-hero bottom/side scrims, and
  code window chrome (traffic-light dots + filename). Geometry is native shapes, not a
  screenshot — expect editability over pixel parity.
- Every non-mappable field emits a warning (via `opts.onWarn` / `result.warnings`) — nothing
  is dropped silently.

## Opening the .pptx
- **PowerPoint:** opens natively, fully editable.
- **Keynote:** File → Open the `.pptx` (Keynote has no portable native format).
- **Google Slides:** File → Import slides / upload to Drive → opens as an editable Slides deck.

## Import (reverse direction)

`pptxToDeck` / CLI `--from-pptx` / MCP `import_pptx` extract text, tables, images, and notes,
then map onto best-fit layouts. This is not a visual clone — animations, masters, charts, and
EMF/WMF media are skipped with warnings. See
`skills/presentation-generator/references/pptx-import.md`.
