# Brand-Aware Style Generation from URL or CSS

## Problem

Building a deck that matches an existing product/brand today means manually copying hex codes
into `create-theme`'s interactive prompts. Competitor `frontend-slides` has an open, unimplemented
feature request (issue #79) proposing exactly this: point at a URL or CSS file, extract `:root`
variables and font declarations, and generate a matching theme. No implementation exists upstream.

## Goal

Ship this well — not just parity with the proposal, but something that actually works on real
marketing sites, most of which don't expose CSS custom properties at `:root` (Tailwind/CSS-in-JS
compile variable names away). And don't ship a feature that can silently produce an illegible
deck — this repo's own SKILL.md calls low-contrast text an "AI-slop tell."

## Non-goals

- Full pixel-based dominant-color clustering from a rendered screenshot (approach C considered,
  rejected for v1 — meaningfully more code and a new image-processing dependency for marginal
  gain over the computed-style fallback).
- Parsing arbitrary design-system formats (Figma tokens, Style Dictionary, etc.) — CSS only.
- Multi-page brand analysis (crawling beyond the one URL given).

## Architecture

Three packages, split along the existing browser/Node boundary already implicit in the codebase:

### `packages/core` (pure, no new dependencies)

`packages/core` is imported by `packages/studio`, which Vite-bundles for the browser — so it must
stay dependency-free and I/O-free. New pure functions, exported alongside the existing
`validateThemeJson`/`loadTheme`:

- `parseCssVariables(css: string): Record<string, string>` — regex-based extraction of `:root {
  --color-*, --brand-*, --primary*, --accent*, --bg*, --text* ... }` declarations. Same
  lightweight-regex philosophy as `deck-design-judge/scripts/deck_metrics.py` (documented
  edge cases over a full CSS parser dependency).
- `parseFontDeclarations(css: string): { heading?: string; body?: string }` — best-effort
  `font-family` extraction from `body`/`h1`-`h6`/heading-class selectors.
- `mapPaletteToRoles(candidates: BrandColorCandidates): Palette` — maps whatever was found
  (however partial) onto the 8 semantic roles (`bg`, `bg2`, `text`, `muted`, `accent`, `accent2`,
  `cardBg`, `border`), deriving unset roles as tints/shades of what *was* found.
- `ensureContrastSafe(fg: string, bg: string, minRatio = 4.5): { color: string; adjusted: boolean
  }` — WCAG luminance/contrast formula (ported from `deck_metrics.py`'s `luminance`/`contrast`,
  ~15 lines, no dependency). If below threshold, steps the foreground toward black or white
  (whichever increases contrast) in HSL-lightness increments until it clears the bar or the step
  would move lightness more than 40 percentage points from the original — whichever comes first.
  At that cap, falls back to a safe neutral ink/paper value and reports `adjusted: true` so the
  caller can disclose it — never silently ships an illegible pairing.

### `packages/create-theme` (Node-only orchestration; already zero other-package dependents)

Currently depends only on `commander` + `mustache`. Add the extraction pipeline here, not in
`core`, because it needs a Playwright fallback:

1. Input is a URL or a local CSS file path.
2. **Static pass**: fetch the URL's HTML, resolve `<link rel="stylesheet">` hrefs, fetch each
   stylesheet, run `parseCssVariables` + `parseFontDeclarations` across all of them (CSS file
   input skips straight to this step, no fetch). https/http only, 10s timeout, 5MB response cap,
   max 5 redirects.
3. **Fallback** (URL input only, when the static pass finds no usable color or font): launch
   headless Chromium via Playwright — installed on-demand at first use into
   `packages/create-theme`'s own `node_modules`, the same pattern already shipped in
   `skills/presentation-generator/scripts/export-pdf.sh` (not a hard dependency, so `npm install`
   stays light for users who never touch this feature). Navigate to the URL, evaluate
   `getComputedStyle` on `body`, the first heading, and the first button-like element for
   `background-color`/`color`/`font-family`.
4. If both passes come up empty, fail with a clear error — never write a garbage theme.
5. Run `mapPaletteToRoles` then `ensureContrastSafe` on every fg/bg pair that must be legible
   (text/bg, text/cardBg).
6. Feed the resulting `ThemeView` into the *existing* Mustache template pipeline (same one
   `collectView` feeds today) — output is a real scaffolded theme package (`theme.json`,
   `package.json`, `pyproject.toml`, `README.md`), not a special-cased one-off file.

New CLI flags on the existing `create-theme` command: `--from-url <url>` / `--from-css <path>`,
which bypass the interactive `collectView` prompts entirely. `--name` still optional, defaulting
to the URL's hostname with dots replaced by hyphens and any leading `www-` stripped (e.g.
`https://acme.com` → `acme-com`; `https://www.acme.io` → `acme-io`) — run through the same
`validateThemeName`/`NAME_RE` (`^[a-z][a-z0-9-]*$`) the CLI already enforces, so an invalid
resulting slug fails the same way a bad interactive answer would. A CSS-file input with no
`--name` requires the flag explicitly (no hostname to derive from).

Report to the terminal: extraction source (`static` or `computed-fallback`), and a line per
contrast adjustment made (e.g. `text on bg adjusted from #6b6b6b to #3a3a3a to clear WCAG AA`).

### `packages/mcp-server`

New tool `import_brand_theme`, input `{ url?: string, cssPath?: string, name?: string, write?:
boolean }` (exactly one of `url`/`cssPath` required). Depends on `create-theme` (already a
workspace package, already Node-only — safe). Calls the same extraction pipeline. Returns the
generated theme manifest JSON plus the same plain-language report (source + contrast
adjustments) in the tool response. When `write: true`, also scaffolds the full package to disk via
the same code path the CLI uses; defaults to `false` so an agent can inspect before persisting,
consistent with `render_deck` returning HTML directly rather than writing files.

## Data flow

```
URL or CSS file
  │
  ▼
static pass (fetch + parseCssVariables + parseFontDeclarations)
  │
  ├─ found ≥1 color or font ──────────────────────────┐
  │                                                    │
  no (URL only)                                        │
  ▼                                                    │
computed-style fallback (Playwright, on-demand install) │
  │                                                    │
  ├─ found nothing ──▶ fail with clear error            │
  │                                                    │
  ▼                                                    ▼
mapPaletteToRoles → ensureContrastSafe (per required pair)
  │
  ▼
ThemeView → existing Mustache template pipeline → scaffolded theme package
```

## Testing

- `packages/core`: unit tests for `parseCssVariables` (fixtures: `--color-*` vars present,
  `--brand-*` vars present, none present), `parseFontDeclarations`, `mapPaletteToRoles`, and
  `ensureContrastSafe` (assert output ratio ≥ 4.5 for a range of below-threshold input pairs, and
  that already-safe pairs pass through unchanged).
- `packages/create-theme`: the Playwright fallback is tested against a bundled local fixture HTML
  file navigated via a `file://` URL — fully offline, no network dependency in CI. Static-pass
  test uses a fixture CSS file. CLI smoke test: `create-theme --from-css fixture.css --name
  test-brand` produces a `theme.json` that passes `validateThemeJson`.
- `packages/mcp-server`: tool-level test asserting the response shape and that `write: false`
  (default) doesn't touch the filesystem.

## Open risk, disclosed not hidden

Brand colors chosen for a website (which controls its own layout, spacing, contrast context) don't
always translate cleanly to a slide deck's 8-role system — `ensureContrastSafe`'s job is to catch
the worst cases, not to guarantee the output looks exactly like the source brand. The CLI/MCP
report always states when and how much adjustment happened, so the result is inspectable rather
than a black box.
