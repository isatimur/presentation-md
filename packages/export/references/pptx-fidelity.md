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
  `bg2` wash over `bg`, plus theme-specific title chrome (`bold-signal` orange panel +
  body blot/stub, `creative-voltage` split field, `mat` denser woodglow + cream rim + hairlines). Exact CSS
  gradients are not reconstructed.

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
-   Soft blob / mix-blend chrome is approximated in PPTX (not pixel-perfect): Pulse
  gets hard frames + offset shadow strips, multi-oval soft blobs, tone-matched
  secondary/tertiary washes, a hard corner square on body slides, and **eyebrow
  chips** (filled accent/tone pills with tight tracking — not plain accent2 text);
  risograph
  gets kraft frames, coral offset shadow, misregistered coral/blue overprint
  layers, and hero ink speckles; candy-pop gets a hard candy frame, pink/blue
  washes, an outlined blue ornament circle, a butter blot, body pink drop-shadow,
  plus a yellow ticker strip with static marquee text from `meta.company` /
  `meta.title` / `meta.marquee` (custom units still append the brand token; not
  Jellybean-hardcoded) on title/closing,
  and **card-level hard ink borders** (~2.5–2.75pt) with plump radius on
  feature-grid / bento / comparison / logo-wall / aside cards;
  neon-noir gets magenta/cyan glow ovals + cyan rim + rain scanlines + always-on floor cyan inset + accent2 card rims;
  vaporwave gets horizon wash + pink sun + vertical grid stubs + horizon glow line + accent rim;
  y2k-aero gets glossy bubble ovals + soft accent rim + soft shadow stub + plump card radius;
  aurora-glass / glassmorphism get dual mist ovals + glass frames + frosted inner plate + specular top hairline + soft floor shadow; luxury-minimalist gets a gold hairline on heroes and a quiet border on body slides; crt-terminal gets phosphor wash + denser scanlines + bezel;
  blueprint gets a light grid + dual reticles + outer frame + square accent card hairlines;   brutalist-acid gets a
  hard acid frame + accent offset shadow (heroes also get an offset plate) + square accent card strokes; aerospace-hud gets a denser HUD
  grid + reticle crosshair + orange telemetry stub + square accent card hairlines; swiss-typographic gets a denser modular grid + thicker red left rail + quiet outer hairline + square card strokes;
  fintech-clean / scandinavian get soft radial washes + clean frames + accent/ink card hairlines; art-deco gets a denser gold frame + always-on top hairline (heroes also get a dual deco ring) + square gold card strokes;   botanical-luxe gets a gold hairline frame + soft shadow stub + leaf ring + wash (always-on);
  genz-bento gets a hard border + offset shadow strips + corner blot + accent chip + plump hard-border cards with hard offsets;
  heritage-editorial gets quiet hairlines + mid stub;
  developer-dark gets a title-bar + traffic lights + terminal-border card hairlines; data-editorial gets an accent rule + hard frame + ink card hairlines;
  dark-botanical gets denser bloom washes + soft shadow stub + left rail;
  pastel-geometry gets an outer sky matte ring + soft shadow + vertical pastel edge pills + plump card radius;
  8-bit-orbit gets scanlines + neon orbs + dual yellow/pink offset-shadow strips + accent frame + always-on pixel HUD chips;
  neo-grid-bold gets a denser modular grid + larger lemon corner panel + L registration marks + hard 3pt frame + accent offset shadow + square hard-border cards;
  bold-poster gets a hard frame + accent-tinted offset shadow + thicker ink top bar (poster block on heroes, quiet stub on body) + square hard-border cards;
  capsule gets plump frame + hard ink offset shadow + denser pastel blots + hero-gated coral pill/lime circles + plump cards with soft ink offsets;
  cobalt-grid gets a denser cobalt paper grid + diagonal corner hatch + L registration marks + outer frame + square cobalt card strokes;
  retro-arcade gets denser scanlines + dual magenta/cyan top rail + neon orbs + cyan rim + floor glow + cyan card rims;
  brutalist-mono gets a denser mono grid + hard 3pt frame + ink offset shadow;
  creative-mode gets a hard frame + ink offset shadow on every slide + hero-gated stacked accent blocks + square hard-border cards with hard offsets;
  creative-voltage gets a hard accent frame + neon offset shadow on every slide (heroes also get the blue/dark split + voltage orb) + square neon card strokes;
  kinetic-wrapped cards get 3pt accent hard borders (square);
  biennale-yellow gets denser sun orbs + quiet indigo frame + top hairline + coral stub + top-rule cards;
  scatterbrain gets denser cork washes + rules + ink offset + sticky notes + pins + always-on tape strip + ink sticky-card offsets;
  split-pastel gets dual pastel corner washes (heroes also get a split field + stacked pastel pills) + soft plump card hairlines;
  coral gets a denser hatch frame + bg2 diagonal split + coral left wash + square hard-border cards;
  peoples-platform gets a thicker cobalt top bar + amber stub + hard 6pt frame + denser ink speckles + square hard-border cards with red offsets;
  raw-grid gets blush/sage bands + thicker cross rules + ink corner blot + hard 3pt frame + ink offset shadow + square hard-border cards with hard offsets;
  retro-zine gets a hard frame + offset green plate + cream card on every slide + square hard-border cards;
  sakura-chroma gets a hard frame + accent-tinted offset shadow on every slide + chroma strip/stamp orbs on heroes + hard-border cards;
  daisy-days gets hard frame + charcoal offset shadow + pastel dots + daisy/pill ornaments on every slide + plump hard-border cards;
  block-frame gets a hard frame + ink offset shadow on every slide + pastel offset blocks on heroes + square hard-border cards with hard offsets;
  editorial-tri-tone gets a butter split + burgundy wash + hard 3pt frame + hero accent blot + square hard-border cards;
  broadside gets a thicker fire-orange rail + larger corner blast + hard ink frame + always-on top stub + square hard-border cards;
  pink-script gets dual inset frames + always-on accent hairline + hero-gated wash;
  retro-windows gets Win95 beveled chrome (white/black outer bevel + inset hilite/shade) + denser CRT scanlines + navy gradient title bar + larger window buttons;
  pin-and-paper gets legal-pad rules + red margin + pin;
  emerald-editorial gets masthead rules + inset frame;
  notebook-tabs gets a dark mat frame + pastel side tabs + binder holes + left margin rule;
  long-table gets dense speckles + rust border + hero-gated outline pill/hairline + plump dashed rust cards;
  paper-ink gets quiet frame + crimson top/bottom rules + hero-gated corner blot/drop-cap stub;
  vintage-editorial heroes get a geometric ring + dots;
  studio gets acid hairline rails + hard frame (heroes also get an acid accent block);
  grove gets a monograph inset frame + top hairline + coral stub + accent2 hairline;
  stencil-tablet gets a hard frame + earth tablet blocks on every slide + plump hard-border cards;
  cartesian gets draft axes + concentric rings;
  monochrome gets ledger frame + hairlines;
  blue-professional gets a soft wash band + accent stub + clean frame;
  broadsheet gets a newsprint masthead + quiet frame + double bottom rules + accent stub;
  editorial-forest gets a forest inset frame + dual hairlines + blush orb;
  signal gets a quiet briefing border + hairline + outline square + gold stub + quiet border card hairlines;
  pastel-dreamy gets denser soft cloud ovals + plump inset frame + soft shadow stub + plump soft-plum card hairlines;
  vellum gets a soft colorfield wash + teal/chartreuse orbs;
  editorial-serif gets an accent rule + deco ring + bottom stub;
  soft-editorial gets sage wash + hero-gated blush/lemon/lilac candy + plump inset frame (~28px) + soft shadow stub + plump card radius;
  heritage-editorial gets parchment wash ovals + terracotta hairlines;
  emerald-editorial gets true double masthead rules + dual inset frame;
  vintage-editorial gets a quiet outer border on all slides + hero geo ring/dots;
  pink-script gets dual inset frames + always-on accent hairline + hero-gated wash;
  claude (warm-paper) gets a soft coral corner wash + accent2 mist + quiet inset frame + accent stub + paper-border card hairlines;
  default-tech gets dual neon corner blooms (accent + accent2) + quiet neon inset frame + accent-rim cards;
  playful gets denser soft blots + candy square + plump soft frame + coral-rim cards;
  corporate gets a clean accent stub + soft top wash + quiet border frame + accent-hairline cards;
  electric-studio gets a hard frame + white/blue hero split with black rail (content slides get a full-height accent left rail + top stub on heroes);
  bold-signal gets a soft shadow stub + rounded frame + orange blot/stub (heroes also get the focal panel) + plump accent-rim cards;
  mat gets denser woodglow radials + cream inset rim + accent hairlines (heroes also get a mid-century accent block) + square dark card strokes;
  electric-studio / studio / grove / cartesian / botanical-luxe / dark-botanical cards get square hairline strokes;
  aurora-glass / glassmorphism cards get frosted white/glass rims (plump);
  crt-terminal / brutalist-mono cards get square accent/ink strokes;
  emerald-editorial / pink-script / vellum / broadsheet / editorial-forest / monochrome cards get square ink/accent strokes;
  paper-ink / editorial-serif / vintage-editorial cards get a literary left accent rule
  (crimson/ink rail — no full box stroke); heritage / pin-and-paper / emerald keep full box hairlines
  (HTML does not use literary left rails on those peers);
  soft-editorial / pin-and-paper / notebook-tabs / heritage-editorial cards get theme-native hairlines with soft radii;
  long-table cards get dashed rust rims (plump); signal cards get quiet briefing border hairlines;
  luxury-minimalist / biennale-yellow / ft-editorial cards get top-rule hairlines (no full box stroke;
  FT ink ~2pt masthead rule matching broadsheet-rule border-top);
  blue-professional / pastel-geometry cards get theme-native hairlines;
  claude / corporate / fintech-clean / scandinavian cards get paper/clean hairlines with theme radii;
  default-tech / developer-dark cards get neon/terminal rims; playful / split-pastel / pastel-dreamy get soft plump rims;
  data-editorial / scatterbrain / risograph-zine cards get ink hairlines (riso hard 2pt).
  Quiet HTML paper fiber grain (editorial / parchment themes) is not drawn in PPTX —
  ship HTML when the tooth is the brand. True CSS `mix-blend-mode` / animated marquees
  remain HTML-only.
- Closing `actions[].icon` maps to a left icon-well chip on PPTX pills (FA brands → glyph/letter), not just a text prefix.

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
