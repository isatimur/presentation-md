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
- CSS gradients and `color-mix(...)` are approximated where feasible: a translucent
  `bg2` wash over `bg`, plus theme-specific title chrome (`bold-signal` orange panel,
  `creative-voltage` split field, `mat` woodglow oval). Exact CSS gradients are not
  reconstructed.

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
- **Icons:** FontAwesome glyphs aren't embedded. Each feature-grid card gets a craft
  accent marker: rounded chip (or circle for circle/dot icons) filled with `accent`,
  labeled with the icon's first letter when a class is present (e.g. `fa-bolt` → `B`).
- **Craft layouts that *are* mapped:** `columns: "bento"` (hero + satellite cards),
  comparison `emphasis`, two-column `ratio`/`reverse`, image-hero bottom/side scrims,
  code window chrome (traffic-light dots + filename), `ranked-list` bars, `logo-wall`
  tiles, `streak-grid` cells, `metric-ring` (full oval badge or native `blockArc` when
  `pct` is 1–99), and closing `actions[]`
  (solid + outline pills; `cta` remains an alias for the first action). Geometry is
  native shapes, not a screenshot — expect editability over pixel parity.
- Soft blob / mix-blend chrome is approximated in PPTX (not pixel-perfect): Pulse
  gets multi-oval soft blobs on hero/tone/body; risograph gets layered coral+blue
  overprint washes; candy-pop gets pink/blue blobs plus a yellow ticker strip with
  static marquee text from `meta.company` / `meta.title` / `meta.marquee` (not
  Jellybean-hardcoded) on title/closing; neon-noir gets magenta/cyan glow ovals;
  vaporwave gets horizon wash + pink sun; y2k-aero gets glossy bubble ovals;
  aurora-glass / glassmorphism get dual mist ovals; luxury-minimalist heroes get a
  gold hairline; crt-terminal gets phosphor scanlines; blueprint gets a light grid +
  reticle; brutalist-acid heroes get an acid offset block; aerospace-hud gets a HUD
  grid + reticle; swiss-typographic gets a modular grid + red left rail;
  ft-editorial gets a masthead bar + bottom rule; bauhaus heroes get red square +
  blue circle; fintech-clean / scandinavian get soft radial washes; art-deco heroes
  get a gold hairline + deco ring; botanical-luxe gets a gold hairline + leaf ring;
  genz-bento gets a hard border + corner blot; heritage-editorial gets quiet hairlines;
  developer-dark gets a title-bar + traffic lights; data-editorial gets an accent rule;
  dark-botanical gets bloom washes + a left rail;
  pastel-geometry gets a card wash + vertical pastel edge pills;
  8-bit-orbit gets scanlines + neon orbs + pixel HUD chips;
  neo-grid-bold gets a modular grid + lemon corner panel + hard frame;
  bold-poster gets an ink top bar + poster block;
  capsule gets pill/circle ornaments;
  cobalt-grid gets a cobalt paper grid + corner hatch;
  retro-arcade gets scanlines + neon top rail;
  brutalist-mono gets a dense mono grid + hard frame;
  creative-mode gets a hard shadow frame + stacked accent blocks;
  biennale-yellow gets a sun orb + top hairline;
  scatterbrain gets cork sticky notes + pin dots;
  split-pastel heroes get a split field + stacked pastel pills;
  coral gets a hatch frame + coral left wash;
  peoples-platform gets a cobalt top bar + amber stub + hard frame;
  raw-grid gets blush/sage bands + cross rules;
  retro-zine heroes get an offset green plate + cream card;
  sakura-chroma gets a chroma strip + stamp orbs on heroes;
  daisy-days gets pastel dots + daisy/pill ornaments;
  block-frame gets a hard frame + pastel offset blocks on heroes;
  editorial-tri-tone gets a butter split + burgundy wash;
  broadside gets a fire-orange rail + corner block;
  pink-script gets a soft pink wash + inset frame + hairline;
  retro-windows gets a Win95 title bar + window buttons;
  pin-and-paper gets legal-pad rules + red margin + pin;
  emerald-editorial gets masthead rules + inset frame;
  notebook-tabs gets pastel side tabs + binder holes;
  long-table gets speckles + outline pill + hairline;
  paper-ink gets crimson top/bottom rules;
  vintage-editorial heroes get a geometric ring + dots.
  True CSS `mix-blend-mode` / animated marquees remain HTML-only.
- Closing `actions[].icon` maps to a glyph prefix on PPTX pills (FA brands → letter/symbol).

- Every non-mappable field emits a warning (via `opts.onWarn` / `result.warnings`) — nothing
  is dropped silently.

## Opening the .pptx
- **PowerPoint:** opens natively, fully editable.
- **Keynote:** File → Open the `.pptx` (Keynote has no portable native format).
- **Google Slides:** File → Import slides / upload to Drive → opens as an editable Slides deck.

## Import (reverse direction)

`pptxToDeck` / CLI `--from-pptx` / MCP `import_pptx` / **Studio Open (.pptx)** extract text,
tables, images, and notes, then map onto best-fit layouts. The import path is
browser-safe when `assetsDir` is omitted (images become data URIs). This is not a
visual clone — animations, masters, charts, and EMF/WMF media are skipped with
warnings. See `skills/presentation-generator/references/pptx-import.md`.
