# Stage 6 — Comprehension Test

Target: `docs/superpowers/specs/2026-11-23-template-theme-import-design.md`
Reviewer: `egm-comprehension` (fresh context, target document only).
FeatureRange: lines 1–504. DetailedRange: lines 505–870.

## What this proposes

**FeatureRange.** `import_brand_theme` gets a third input, `pptxPath`, and the
CLI gets `--from-pptx`. Given a company `.pptx` or `.potx`, it follows the
first slide master to its theme part and resolves the colour scheme through
the master's `p:clrMap`, so dark templates come out dark. It maps the colours
onto the 8 palette roles and runs the existing contrast pass. It reads the
Latin, East Asian (`ea`) and complex-script (`cs`) fonts, and lists Latin
fonts that are not on Google Fonts in `missingFonts`. It emits the same theme
package `import_brand_theme` already writes. If the scheme matches an Office
default, it samples the master's solid fills (`source: "master-fills"`).

It also adds a logo, stored in the theme manifest as `brand.logo`: a data URI
of at most 200 KB, plus a corner and a width. The logo is painted on every
content slide, in HTML by a `.slide::after` CSS rule fed by four CSS
variables, and in PPTX by a pptxgenjs slide master `PMD_BRAND`. Headings
reserve space for a top-corner logo. A new PPTX scorecard pass checks that no
text overlaps the logo. Skill text and the tool description steer the agent to
the template import, and Skill Doctor runs before and after the build to check
that it does. Out of scope: template layouts, writing onto the user's own
master, decorations, font files, and Google Slides and Keynote.

**DetailedRange.** One PR, in this order: a shared, hardened OOXML reader
pulled out of `extract.ts`, which also refuses `<!DOCTYPE`;
`template-brand.ts`; `mapTemplateToRoles` in core; a generated set of Google
Fonts families; schema and type changes (`brand`, `typography.scriptFonts`,
`meta.logo`); create-theme and CLI changes; CSS variables in all three
renderers; the PPTX master and header narrowing; a theme-aware
`scriptFontSlots`; MCP tool changes; skill and doc updates; a changeset; test
files 33–42; and the scorecard logo pass (file 43).

## How the existing system works, per this document

presentation-md turns decks into HTML through three renderers (Node, Python,
Studio) and exports PPTX through pptxgenjs, using a slide master it builds
itself.

*   **Themes.** A theme is a JSON manifest with an 8-role palette, typography
    (fonts loaded through `typography.googleFonts`) and geometry. Themes can
    `extends` one another, and 75 themes are bundled.
*   **Layouts.** There are 18 fixed layouts.
*   **Theme and slide import.** `import_brand_theme` builds a theme from a URL
    or a CSS file. It may need a headless browser, it runs a WCAG contrast
    pass (`ensureContrastSafe`), and it can scaffold a package. `import_pptx`
    reads slide content only, with ZIP limits and `fast-xml-parser`, and does
    not turn off DOCTYPE processing.
*   **PPTX script fonts.** They come from fixed Office defaults in
    `script-fonts.ts`.
*   **Shared CSS.** All three renderers fill `base.css` with mustache theme
    variables.
*   **Studio.** Studio keeps custom themes in memory. Share links with
    non-bundled themes fall back to `default-tech`.
*   **Checks.** A craft audit sees decks but not themes. A PPTX scorecard
    checks that text stays editable.
*   **Size.** The MCP server has 16 tools.

## Findings

| ID | Sev | Where | Problem | Fix |
|----|-----|-------|---------|-----|
| CO-1 | Major | CUJ 2 vs Office default detection | CUJ 2 wants `bg` from the navy band and `accent` from the orange bar. The algorithm takes `bg` only from `p:bg` and `accent` from the *largest* non-neutral fill, which is the band. `accent2`, `text`, `bg2` in master-fills mode are undefined. | Define the master-fills mapping for every role, or change CUJ 2. |
| CO-2 | Major | Logo size limits | Three rules conflict: candidates ≤ `MAX_MEDIA_BYTES` (10 MB); Decision 1 "larger raster is refused with a message"; file 3 "warning and skipped". | One cap (200 KB), one behaviour, everywhere. |
| CO-3 | Major | Logo drawing and alt text | Rendering says CSS pseudo-element with no alt; Decision 1 says `brand.name` is alt text and SVG is "drawn through `<img>`"; NFR says "CSS background or `<img>`". SVG safety argument is tied to `<img>`. | Settle on pseudo-element + `background-image`; restate SVG safety for CSS images; redefine `brand.name`. |
| CO-4 | Major | Response field names | `contrastAdjustments` vs `adjustments`; "keeps its current fields" names none. | List existing fields once (incl. `stillFailing`); use exact names. |
| CO-5 | Major | Skill Doctor acceptance | Unclear whether it blocks release, what happens after a failing run, what scale 0.5 is on, and what "fired" means for CUJ 3 (which should error). | State gating role, re-run rule, score range, per-CUJ "fired". |
| CO-6 | Major | Undefined components | Studio, share links, craft audit, the judge, presentation-md itself are never defined, yet Decision 1 and Alternative E depend on them. | Short glossary or links. |
| CO-N1 | Nit | Open Questions | Google Fonts lookup still "open" though files 7–8 choose it. | Move to Resolved. |
| CO-N2 | Nit | Logo width | "Smaller than a quarter of the slide": area or width? 21–24% or <4% wide passes selection then fails the schema. | Clamp or reject; make the measure explicit. |
| CO-N3 | Nit | Role mapping | "A visible step" undefined; no `accent2` fallback. | Give threshold and fallback. |
| CO-N4 | Nit | Colour transforms | Plan lists four; file 3 adds `satMod`. | Same list in both. |
| CO-N5 | Nit | Schema `maxLength` 273 000 | Matches neither 200 KB nor 200 KiB in base64. | Pick one and recompute, or defer to the decoded check. |
| CO-N6 | Nit | ZIP limits | Compressed 64 MB > uncompressed 50 MB reads like a typo. | Confirm or explain. |
| CO-N7 | Nit | Minor undefined terms | `font_mode`, `write: true`, theme package contents, `vibe`, Paste Brand, `EGM.md`, `render` package vs `renderer-node`, `name` rule, `scaffoldTheme` effect on URL/CSS, what `deckToPptxBuffer` takes today. | One clause each. |
| CO-N8 | Nit | HTML overlap | Only PPTX overlap is checked; bottom corners have no reserve. | State acceptance or add a check. |

No section was impossible to paraphrase, so there is no Blocker. CO-1 to CO-4
are internal contradictions to resolve before implementation.
