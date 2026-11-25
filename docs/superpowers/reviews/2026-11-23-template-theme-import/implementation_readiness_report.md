# Stage 9 — Implementation Readiness (DetailedRange, lines 505–end)

Reviewers: `egm-implementation-readiness`, `egm-codebase-details` (both
against `implementation-readiness-standard.md`), `egm-style`. Fresh context
each.

Verdict from both technical reviewers: **not ready** (fails the Zero-Decision
Rule). Paths, line hints (`index.ts:559`, `renderDeck.ts:302`,
`renderer.py:161`, `layouts.ts:830`) and ZIP limit values check out.

## Blockers

| ID | Reviewers | Finding | Fix |
|----|-----------|---------|-----|
| IR-B1 | IR, CD | `.slide::after` logo rule is overridden by `surfaces.css` (gradient surface for every imported theme). Same as DC-1. | Dedicated per-slide element, or a brand CSS block emitted after `surfacesCss` that knowingly replaces the decoration. Drop the "no document.html change" claim. |
| IR-B2 | IR, CD | Studio `resolveTheme` (`studio/src/render/themes.ts:163-191`) and Python `_load_theme` (`renderer.py:89-106`) drop `brand`; neither is in the file list. | Add both; one inheritance rule (last `brand` in the chain wins, whole) on `ResolvedTheme.brand`. |
| IR-B3 | IR | Scorecard logo pass can't be green: only 12 layouts use `renderHeaderBlock`; `closing` (`renderHero`), `section`, `two-column` aren't narrowed; bottom corners have no reserve anywhere. | Bottom reserve in every layout, or top corners only; list every PPTX function and HTML selector to change. |
| IR-B4 | IR, CD | `create-theme` has no dependency on `@presentation-md/export`. | Add `"@presentation-md/export": "workspace:*"`, lockfile; import only the `/import` subpath. |
| CD-B2 | CD | No Lab/ΔE helper in `core/src/color.ts`. | Add `rgbToLab`, `deltaE76` + tests. |
| CD-B4 | CD | Schema pattern checks only the prefix; loaders never validate; raw `{{{…}}}` into `<style>` → CSS/HTML injection. Same as DC-2. | Full-value regex in schema and again at render time in every renderer; malicious-`src` test. |

## Majors (merged)

| ID | Finding | Fix |
|----|---------|-----|
| R-1 | Logo height unknown; manifest has only `widthPct`. | Store `aspect` from `p:pic a:ext`; schema range. |
| R-2 | CSS variable contract undefined; "inline-end" wrong in RTL. | Exact variables and values; physical padding. |
| R-3 | `brandLogoCssVars` not importable by Studio (root index loads node:fs). | New fs-free subpath `@presentation-md/core/brand-logo`. |
| R-4 | "Byte-identical CSS" impossible if `base.css` gains the rule. | Append the logo block only when a logo exists (like `ATTRIBUTION_CSS`). |
| R-5 | `paintSlideChrome` wash and shapes cover the master logo; attribution text overlaps bottom corners; scorecard misses both. | Skip/clip wash; move attribution; shape-overlap check; one run with attribution. |
| R-6 | `rasterizeSvgImages` walks deck `image` keys only; the theme is already passed to `deckToPptxBuffer` (`index.ts:669`). | Exact wrapper call; delete the wrong sentence; scorecard uses PNG. |
| R-7 | Logo caps contradict (10 MB / 200 KB; skip vs refuse); `maxLength` 273 000 matches no definition; `widthPct` outside 4–20 unhandled. | Define KB; skip with warning; computed `maxLength`; clamp or skip. |
| R-8 | Palette rules open: `bg2` step, `accent2` distinctness and fallback, `text` in master-fills mode, `source` when no fills; CUJ 2 vs `p:bg`. | Numbers, `accent2 = accent` fallback, CUJ 2 aligned. |
| R-9 | Colour-transform formulas absent; core HSL helpers not exported fs-free. | Cite ECMA-376 or write formulas; `@presentation-md/core/color` subpath; expected-hex fixtures. |
| R-10 | Script fonts: major vs minor ambiguous; call sites unlisted; Arabic-script list narrower than `scriptFontSlots`. | Pick minor; list three call sites; reuse the switch. |
| R-11 | HTML font fallback not implementable: template hardcodes `system-ui`; child `googleFonts` replaces parent's. | Exact stack and which spec loads the fallback. |
| R-12 | Font names reach JSON through mustache unescaped (untrusted XML). | Set typography fields as objects after parse, or validate names. |
| R-13 | MCP response would carry ~270 KB of logo base64 via `theme`. | Redact `theme.brand.logo.src` in the response. |
| R-14 | Google Fonts source undecided; `fonts:update` script not in root `package.json`. | Name the source; add the script. |
| R-15 | Missing files: `export/src/deck-types.ts` (`DeckMeta.logo`), skill schema copies, `core/package.json` exports, root `package.json`, Studio/Python loaders, `scaffoldTheme` call sites (`create-theme/src/index.ts:306`, `import-brand-theme.ts:73`), `create-theme.test.ts`, `theme-view.test.ts`. | Add with rationale. |
| R-16 | Shared reader API: must be async; parser `isArray` lacks `sldMasterId`, `font`, `grpSp`; needs content types and media flag. | Full signature as proposed by CD-M14. |
| R-17 | `defineSlideMaster` may write a slide *layout*, not a master (unverified). | Verify; scorecard follows each slide's layout rel. |
| R-18 | Scorecard can't load a loose `logo-theme.json`. | Specify loading and per-corner variants. |
| R-19 | Undecided: `svgBlip` vs PNG blip, RTL corner, `office-safe` vs `scriptFonts`, DOCTYPE throw vs skip. | Decide each. |
| R-20 | Style: "no behaviour change" vs DOCTYPE rule; "every branch" with no coverage tool and only 2 of 3 Office schemes tested; tool sentence overclaims ("holds … logo"). | Calibrate as proposed. |

## Nits

`openOoxmlPackage` returns a Promise; Office hex table to include; "closest to a
corner" and "quarter of the slide" to define; `buildThemeManifest` `extras`
type; name drift (`buildThemeViewFromTemplate`, `renderDeck`); Python
`templates/` is gitignored, so "commit the output" is wrong and
`sync-core-shared.mjs` is irrelevant; Python `str.replace` breaks
triple-brace tokens; more `EGM.md` files to update; per-phase build gates;
missing tests (loader `brand` inheritance, Studio `resolveTheme`, DOCTYPE in
a theme part, generic `ea`/`cs` order, HTML reserve, logo + attribution,
`widthPct` clamp, `office-safe` interaction); `validate-deck.ts` needs no
change; `OFFICE_FONTS` reuse; `bytesToBase64`/`toBase64DataUri` reuse;
`p:sldSz` for positions; cross-package fixture builder path; stale line
hints and "today" references; `render` package name in the changeset.
