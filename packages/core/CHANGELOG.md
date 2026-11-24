# @presentation-md/core

## 1.40.0

### Minor Changes

- c37aa82: Fix layouts that left most of the slide empty, and a set of rendering bugs found by reviewing all 75 themes.

  - Comparison, timeline, code, stat-row, ranked-list, logo-wall, streak-grid and metric-ring content now centres in the space under the heading instead of hugging the top. Feature-grid cards pin the icon to the top and the copy to the bottom. Body type is larger.
  - `--accent2` and `--bg2` were used 88 times but never defined. An undefined `var()` voids the whole declaration, so theme effects in about 37 surfaces never rendered, and ranked-list bars 2 and 3 had no fill. Both names are now aliases of `--accent-2` and `--bg-2`, and a test fails on any undefined variable.
  - New `--on-accent` colour, picked by contrast from the theme (`readableOn` in core, exported from `@presentation-md/core/color`). Buttons and the primary ranked bar use it, so text on light accents stays readable.
  - Metric-ring numbers scale to the ring and stay inside the stroke. Short ranked bars grow to fit their label and value.
  - The image-hero headline column was about 330px wide and set one word per line. It is now up to 920px.
  - Data-table slides show `lead`. Code windows are always a dark panel. Chart series 2 no longer paints black, and series 3+ no longer repeat series 1.

- e7a970e: Themes installed with `npm i @presentation-md/theme-<name>` now render. The renderer (CLI, `renderDeck`, `renderDeckPptx`, and the MCP tools that call them) looked only in core's two bundled themes and failed with `Theme not found`, although `--list-themes` listed the installed theme.

  - `loadTheme` also looks for `<dir>/theme-<name>/theme.json`, the npm package folder name.
  - New `npmThemeDirs(projectRoot)` in core returns the `node_modules/@presentation-md` and `@presentation-skill-pack` scope folders.
  - The renderer searches those folders in the current project after `themesDir` and the bundled themes.

- 9474709: Keep figures and eyebrows readable in themes with pastel accents.

  - New `accentInk` in core: the accent with its lightness moved away from the background until it reaches a contrast floor, hue kept. Renderers expose `--accent-ink` (3:1, for stat numbers, chart bars, streak cells and timeline dots) and `--accent-2-ink` (4.5:1, for eyebrows). Pastel accents stay pastel as fills.
  - vaporwave: the horizon line shows on title, section and closing slides only, so it no longer cuts through centred content.
  - risograph-zine: the blobs fade to 40% on content slides.
  - capsule: stat pills inset their text past the curved edge.

### Patch Changes

- de7d3cb: Scaffolded decks now validate and render every slide.

  - 8 of 21 recipes (pitch, sales, investor, launch, poster, hud, modernist, electric) failed schema validation: the timeline skeleton used `items` instead of `steps`.
  - Three skeletons passed validation but rendered empty: data-table used `headers` (now `columns`), chart nested a `chart` object (now flat `chartType`, `categories`, `series`), and two-column used `left`/`right` (now `body` and `aside`).
  - A test scaffolds every recipe, validates it, and fails on any slide field its layout does not render.

- d59d8fd: Fix theme decoration that covered slide content, and panels that pill themes clipped.

  - Decoration over content: coral's diagonal is a tint on content slides; cobalt-grid's corner triangle, cartesian's compass circles and scatterbrain's stickers stay off content slides; cartesian's axes and emerald-editorial's masthead rules sit in the slide padding; daisy-days' dots sit at the edges; block-frame's and bold-poster's title marks no longer touch copy.
  - Split covers: electric-studio, creative-voltage and split-pastel keep title and closing copy inside one panel. electric-studio's closing button has a pill.
  - Code windows, chart frames and two-column asides cap their corner radius, so pill themes (capsule, long-table) no longer clip axis labels and code.
  - Contrast: mat's logo tiles, aside, stat labels and chart; kinetic-wrapped's closing buttons, quote attribution and ring on toned slides; glassmorphism's bento hero; raw-grid's eyebrows; editorial-tri-tone's stat rules; vaporwave's ranked-bar labels.
  - neon-noir, vaporwave and kinetic-wrapped draw the metric ring in the accent.

## 1.39.0

### Minor Changes

- 144bd0a: Slide-level reading and editing for agents.

  - MCP `outline_deck`: per-slide layout, title, word count, notes flag and craft-audit issues, plus full JSON of chosen slides (`include`).
  - MCP `edit_deck`: a batch of `update_slide` / `replace_slide` / `insert_slide` / `delete_slide` / `move_slide` / `update_meta` operations. Validates the result against the deck schema and saves nothing on failure. With `deck_path` it edits the file in place (atomic write, cwd only), so the agent never resends the whole deck. Returns the touched slides and their audit issues.
  - Core: `deckOutline`, `applyDeckEdits`, `DeckEditError`.

## 1.38.0

### Minor Changes

- a337a54: Judge flags now carry `params`, and `JUDGE_FLAG_MESSAGES` holds the English template for each flag id (`JudgeFlagId`). The English `detail` is unchanged. Studio uses the id to show judge flags in all 10 languages.

### Patch Changes

- c7357ed: `scripts/export-pdf.sh`: two PDF exports starting at once on a fresh install no longer crash with "Cannot find module …/playwright-core". The first-run Playwright install now writes a marker when it finishes, and an atomic lock makes other runs wait instead of using a half-installed `node_modules`.

## 1.37.0

### Minor Changes

- 996a146: Craft audit issues now carry a stable `code` and `params`. `CRAFT_ISSUE_MESSAGES` holds the English template for each code, and `fillCraftTemplate` fills it. The English `message` is unchanged, so agents and the CLI see the same text. Studio uses the code to show audit messages in all 10 languages.

## 1.36.0

### Minor Changes

- 629f438: Rendered decks show their presenter controls (nav hint, Edit, toolbar buttons, blackout/whiteout, help overlay, speaker window, timer cues) in the deck's language. Strings come from `shared/deck-chrome.json` (en, zh, es, ar, pt, id, fr, ja, ru, de; machine translations pending native review), picked by `meta.lang` with English fallback per key. New `@presentation-md/core/deck-chrome` subpath: `resolveDeckChrome`, `deckChromeJson`.

## 1.35.0

### Minor Changes

- 633450b: Decks in any language. New optional `meta.lang` (BCP 47, default `en`):

  - HTML sets `<html lang dir>`; Arabic, Hebrew, Persian, and Urdu render right to left.
  - Non-Latin scripts get Noto font fallbacks (CJK, Arabic, Hebrew, Devanagari, Bengali, Thai, Cyrillic/Greek/Vietnamese) added to the theme font stack and the Google Fonts URL.
  - PPTX text runs carry the deck language; right-to-left decks get paragraph RTL and mirrored left/right alignment.
  - Word-count gates (`judgeDeckJson`, HTML metrics) now count Cyrillic, Arabic, and other non-Latin words (previously zero) and CJK text without spaces (previously one word per paragraph). English counts are unchanged.
  - New `@presentation-md/core/deck-lang` subpath: `normalizeDeckLang`, `deckLangDir`, `scriptFallbackFonts`, `withFontFallback`, `countWords`.
  - The skill and `generate_deck_prompt` tell agents to write copy in the user's language and set `meta.lang`.

### Patch Changes

- 93767ae: Ship theme-surfaces.json inside the core package. The compiled theme-surface.js
  imported ../../shared/theme-surfaces.json, which resolves to the monorepo's
  packages/shared in-repo but escapes the package root when installed from npm,
  crashing every consumer (including npx @presentation-md/render) with
  ERR_MODULE_NOT_FOUND. The build now syncs the file into packages/core/shared
  (same pattern as renderer-node) and the import stays within the package.
- e36c0c4: - `deploy.sh` fails closed when `check-local-assets.mjs` is missing. Before, node's exit 1 for a missing script read as "no local assets" and single-file decks with broken local references deployed.
  - `layoutsPreviewSlideCount` derives from the layout list instead of hard-coded 11/13.
  - MCP `export_deck` lists the format aliases in its error; drop the unused `zod` dependency.
  - Legacy MCP stub no longer prints a stale tool count.

## 1.34.0

### Minor Changes

- 96889d2: Rewrite the presentation-generator skill as a progressive vibe → preview → craft map so installers get frontend-slides-style load-on-demand clarity (scaffold_deck → studio_share_url first hop; schema encyclopedias only when crafting).

## 1.33.0

### Minor Changes

- 184e42e: Compete with Hallmark on agent-native deck craft: scaffold_deck returns studio_share_url (?d=) by default, skill ships four verbs + honest vs/hallmark positioning, CLI --scaffold prints Studio share.

## 1.32.2

### Patch Changes

- dcf871c: Reject oversized share tokens before base64 decoding or inflation.

## 1.32.1

### Patch Changes

- 8e16131: Reject single-file deploys that reference local assets through quoted or unquoted attributes, responsive image fields, poster fields, CSS URLs, or quoted CSS imports; bound asset inspection to 64 MiB; validate local input before invoking the Vercel CLI; and reject ambiguous multiple deploy targets.

## 1.32.0

### Minor Changes

- 677775c: Densify glass/grid PPTX chrome, closing action icon wells, and candy marquee branding; strengthen launch/investor dual-CTA craft + repair; Studio issues panel keeps the full PPTX warning list (pptx filter).

## 1.31.1

### Patch Changes

- 61530ed: CLI `--deploy` / MCP `deploy_deck` wrap core deploy.sh (opt-in confirm).

  Dry-run by default — agents must pass `--confirm-deploy` / `confirm:true` after human approval so remote Vercel is never thrashed accidentally; `--deploy-prod` / `prod` needs an extra confirm gate.

## 1.31.0

### Minor Changes

- 4a7a941: CLI `--list-themes` discovery parity (browse / studio_url / suggested_preview) + Present pace countdown (P).

  Shared `buildThemesDiscoveryList` powers MCP `list_themes` and CLI `--list-themes` / `--browse` / `--json`. Studio + exported HTML Present gain a P-cycled 5–30m pace timer with ahead/behind/over cues.

## 1.30.0

### Minor Changes

- 8056710: Stronger non-LLM density remorph: bullet-wall two-column → feature-grid + stat-row caps.

  Speaker remorph morphs clear bullet/numbered prose walls into feature-grid cards (then splits by existing caps); adds stat-row speaker caps. CLI/MCP remorph_density pick up the core change.

## 1.29.0

### Minor Changes

- 2a02ed4: CLI `--judge` t0/t1 + Present whiteout (W).

  Extract shared `judgeDeckJson` into core for MCP/CLI structural parity; Present gains W whiteout (mutually exclusive with blackout).

## 1.28.0

### Minor Changes

- bf6d00d: Studio security hardening: sandboxed preview, PDF network policy, share inflate bounds, resilient autosave.

  Bound share-deck inflate/encode bytes; block private PDF subresources (CLI/MCP/Studio); Studio gains deckGuard, async ownership, recovery autosave, lazy Present/Generate, and 38 e2e races.

## 1.27.0

### Minor Changes

- 9d3c5a5: Non-LLM structural density remorph (`remorphDensity`) + Present blackout/timer + CLI `--share-link`.

  `audit_deck remorph_density` / CLI `--remorph-density` / Studio Speaker·Reading density buttons split crowded lists or promote notes; Present gains B blackout + T elapsed timer; CLI `--share-link` prints Studio `?d=` URLs.

- a784e9e: CLI `--generate-prompt` + Present digit jump / blackout e2e.

  Extract shared `buildGenerateDeckPrompt` into core (MCP + CLI), wire CLI one-shot craft prompt export, and Present 1–9 / Home / End jump with blackout + timer coverage.

## 1.26.0

### Minor Changes

- 54f5d3c: MCP export_deck gains notes_txt / notes_vtt speaker-notes handouts (shared core helpers; Studio downloads re-export the same builders).

## 1.25.0

### Minor Changes

- 2d01abe: Universal Studio deep-links: every list_themes entry gets studio_url (`?example=` for stunning-25, `?theme=` otherwise); preview_themes returns studio_share_url (`?d=`) for the exact bake deck.

## 1.24.0

### Minor Changes

- 1e61cb2: Deck → Marp/md-slides **Markdown export** (`deckToMarkdown`): Studio Download Markdown, MCP/CLI `format: md`, round-trip with import_markdown / Paste MD / Open .md.

## 1.23.0

### Minor Changes

- 3e26a49: MCP `share_deck_link` encodes Deck JSON into a Studio `?d=` URL (same CompressionStream codec in `@presentation-md/core`) for editable agent→user handoff after scaffold/audit/theme.

## 1.22.4

### Patch Changes

- e0731d9: MCP `preview_themes` accepts Deck JSON (`json` / mode `deck`) for Studio My deck restyle parity — content-true theme compares with optional `slide_index` PNGs.

## 1.22.3

### Patch Changes

- 0608094: Studio **Copy link** shares a compressed `?d=` editable deck (hydrate on open) + Open Marp/md-slides `.md`; MCP `apply_theme` defaults to `repairCraft` (Studio My deck Use parity).

## 1.22.2

### Patch Changes

- 0e8e59c: Studio pick-3 **My deck restyle** (selected slide live across themes; Use applies theme + craft repair) + sync web badges/JSON-LD to core@1.22.1 / mcp@1.25.1 / render@1.9.6.

## 1.22.1

### Patch Changes

- 706e441: Studio Download PDF blob (headless Chromium locally, client raster on static hosts) + Generate Land scaffold recipes (MCP scaffold_deck parity).

## 1.22.0

### Minor Changes

- a384de0: Add `scaffold_deck` MCP (layout-recipe skeletons), theme-honesty `repairCraft` expansions + Studio per-issue Insert beat buttons, and sync web badges to core@1.21.0 / mcp@1.24.0 / render@1.9.4.

## 1.21.0

### Minor Changes

- 129dbba: Extend `repairCraft` with safe beat inserts (image-hero, comparison, data, logo-wall, wrap tones/ranked/streak, cadence) + Studio Generate auto-repair; `judge_deck` t2/t3 attaches inline slide PNGs by default.

## 1.20.0

### Minor Changes

- 41bb08c: Craft `repairCraft` + MCP `audit_deck` `apply_safe_fixes` (returns repaired JSON) and Studio **Apply safe fixes** / **Print / PDF** — agents clear structural craft in one hop; Studio closes the browser PDF gap via the same `@page` 16:9 print CSS as MCP/CLI.

## 1.19.5

### Patch Changes

- 7b9976e: Densify Studio Title/Bento/Compare shot strips to one shared iframe per theme (scroll-crop), including Example open-gated mounts; skill/MCP/vs copy keep pace.

## 1.19.4

### Patch Changes

- 2390e2b: Studio Example featured trio shows Title/Bento/Compare shot strip (parity with pick-3 + Generate) and a Compare 3 themes bridge into the live theme tray; skill/MCP discovery copy matches.

## 1.19.3

### Patch Changes

- ab97a8f: CLI `--preview-compare` captures discovery PNGs via the shared Chrome isolate path with MCP `preview_themes` (title + bento + comparison); Studio pick-3 live compare shows a Title/Bento/Compare shot strip.

## 1.19.2

### Patch Changes

- f7445a4: preview_themes returns inline PNG screenshots as MCP image content by default (title + comparison in layouts mode) so vision agents can compare themes in-chat — show-don't-tell vs frontend-slides path-only previews.

## 1.19.1

### Patch Changes

- 05cf502: Wire vector PDF into MCP `export_deck` and CLI `--format pdf` (Chromium print via core export-pdf pipeline), plus `@page` 16:9 print sizing.

## 1.19.0

### Minor Changes

- 031f94b: Shared pickDiscoveryPreviewTrio (safe/bold/wildcard) powers MCP list_themes suggested_preview, Studio Compare 3, and Generate mood pick-3 — frontend-slides-style discovery mix from schema themes.

## 1.18.0

### Minor Changes

- 9d22c98: Share site mood-browse chip helpers (`THEME_BROWSE_FILTERS` / `themeMatchesBrowseFilter`) for Studio parity with the gallery toolbar.

## 1.17.0

### Minor Changes

- 9ddc04b: `list_themes` returns proof deep-links (`preview_url`, `studio_url`, `gallery_url`) via shared stunning-25 discovery helpers — agents open proofs in one hop vs path-only vibe text.

### Patch Changes

- 976a9b6: Add custom-html craft recipes + fix one-shot anti-slop list so agents get freeform energy without abandoning schema.

## 1.16.5

### Patch Changes

- 976c2a4: Document Studio Generate live-by-default and pick-3 auto-live discovery so skill agents match the show-don't-tell bar vs frontend-slides.

## 1.16.4

### Patch Changes

- e653c9e: Generate modal gains Title/Bento/Compare live crops (parity with theme tray); Example browser shows a live featured trio + theme swatches; `preview_themes` auto-defaults pick-3 (≥2 themes) to layouts mode; flagship Deck JSON leads with title → feature-grid → comparison for Studio crop alignment; site + skill copy densify show-don't-tell vs frontend-slides.

## 1.16.3

### Patch Changes

- e341b5f: Document CLI `--preview-compare` pick-3 craft bake alongside `preview_themes` in the skill tool table.

## 1.16.2

### Patch Changes

- 8de2f80: Studio pick-3 compare + Generate visual discover; one-shot craft bar; preview_themes layouts_recommended; list_themes discovery_hint; Cloth sheen/tilt deepen — beat frontend-slides progressive discovery.

## 1.16.1

### Patch Changes

- c3f9ca7: Popular shortlist discovery UX: mark flagship shortlists, sort them first in MCP list_themes + Studio, and add speaker/reading density to Studio generate — beats frontend-slides template-popularity browse with structured themes.

## 1.16.0

### Minor Changes

- 2c0a7dc: Ship PDF/deploy scripts in published core, sync Claude plugin skill + deck schema from core, document markdown craft heuristics, and harden MCP write paths with shared cwd containment + export/render tests.

## 1.15.0

### Minor Changes

- 1630a4e: Expand Theme Discovery shortlists to cover the full catalog (28 shortlists / 75 themes) with seven new use-case sets for previously orphan loud, arts, couture, archival, and Win95 themes.

## 1.14.0

### Minor Changes

- e6b54be: Theme Discovery APIs + Studio shortlists, denser botanical PPTX chrome, and light/dark create-theme extends.

  - core: public `theme-discovery` loaders/helpers + integrity tests; expand shortlists (paper-literary, soft-pastel, mid-century-mat, hud-blueprint, y2k-arcade, workshop-scatter, glass-voltage, parchment-quiet) to cover 56 themes
  - mcp: list/preview/generate_deck_prompt consume core discovery (single source of truth)
  - studio: shortlist chips in theme browser + Generate modal
  - export: always-on botanical-luxe frame/shadow + denser dark-botanical bloom/shadow (skip mix-blend)
  - create-theme: light scaffolds/imports extend `claude`, dark extend `default-tech` (avoid neon surface inheritance)

## 1.13.2

### Patch Changes

- 059c89f: Raise present-mode craft floors (notes / dual-CTA / long-deck data beats) in the skill + MCP mandate, and lock gallery example decks behind a zero-warning auditCraft regression.

## 1.13.1

### Patch Changes

- d6ca564: preview_themes accepts shortlist ids for Theme Discovery; sync FT/biennale top-rule honesty across skill, MCP craft mandate, and Studio.

## 1.13.0

### Minor Changes

- 8a839a8: Gate loud/hard-card and botanical themes in auditCraft; count timeline as a long-deck data beat; extend literary left-rule paper honesty.

## 1.12.4

### Patch Changes

- f512620: Add neon-tech, data-editorial, and scatterbrain layout recipes; sync craft-mandate recipe lists and paper-ink left-rule honesty across skill, MCP, and Studio.

## 1.12.3

### Patch Changes

- a5985a3: Gate soft-product, playful, neon-tech, scatterbrain, and data-editorial craft beats; extend paper honesty to scandinavian and PPTX thin-peer card strokes.

## 1.12.2

### Patch Changes

- 079c760: Gate signal briefing and luxury-minimalist quiet-luxe craft; extend skill/MCP/Studio honesty and layout recipes (no web deploy).
- d28fc27: Document and test the full 11-tool MCP registry; migrate adapters off the legacy 5-tool `@presentation-skill-pack/mcp-server` package.

## 1.12.1

### Patch Changes

- d1749c0: Add swiss-typographic / art-deco modernist craft gates and honesty.

## 1.12.0

### Minor Changes

- 7d0a0e6: Add glass/electric/mono/cartesian craft gates; modernist/hard-bento/glass/electric layout recipes; extend loud + glass honesty.

## 1.11.0

### Minor Changes

- 2a8d979: Add HUD/tech, bauhaus, and genz-bento craft gates; extend loud honesty for hard-border cards; add HUD layout recipe.

## 1.10.0

### Minor Changes

- 8fd4189: Extend craft gates and honesty for mat mid-century, cobalt-grid data, biennale/pastel magazine, and retro-arcade atmosphere beats; densify leftover theme guidance in skill + layout recipes.

## 1.9.0

### Minor Changes

- ad33c66: Raise craft gates for pink-script/long-table magazine beats plus neon atmosphere and poster theme bold-beat warnings; ship layout-recipes reference for agents.

## 1.8.7

### Patch Changes

- 5b33db9: Extend loud honesty craft guidance for capsule / scatterbrain / 8-bit-orbit / retro-windows PPTX offset-shadow and bevel chrome.

## 1.8.6

### Patch Changes

- 6fcf4db: Extend loud honesty craft guidance for always-on PPTX offset-shadow strips on block-frame / creative-mode / sakura-chroma (and peers).

## 1.8.5

### Patch Changes

- 44b46db: Add loud honesty craft guidance for always-on stencil/retro-zine/daisy PPTX frames and plates.

## 1.8.4

### Patch Changes

- bc3f18f: Extend paper craft guidance for capsule / long-table / paper-ink hero-gated PPTX ornaments and magazine cadence.

## 1.8.3

### Patch Changes

- 9274c8c: Raise skill + MCP craft bar for paper/editorial magazine cadence and Claude Design rivalry; tighten anti-slop enforcement.

## 1.8.2

### Patch Changes

- d922258: Raise the default craft bar in the skill (stunning-25 first, asymmetry, audit/judge) and tighten anti-slop bans for cream/purple defaults.

## 1.8.1

### Patch Changes

- 5dbbe2f: Densify bauhaus/art-deco/playful/corporate/pastel-dreamy/editorial-serif/default-tech PPTX chrome and spell out Studio/MCP/PPTX advantages vs one-off HTML slide tools in the skill.

## 1.8.0

### Minor Changes

- 3019e5f: Split theme types from theme-loader and add browser-safe core subpath exports so Studio no longer pulls node:fs theme-loader into its bundle; embed deck/theme schemas as JSON imports; densify electric-studio / studio / grove / monochrome / blue-professional / aurora-glass / glassmorphism / luxury-minimalist / fintech-clean / scandinavian / heritage-editorial / data-editorial PPTX chrome.

## 1.7.5

### Patch Changes

- 83d16c1: Paper/editorial craft honesty for agents: magazine beat gate in auditCraft, skill + MCP mandates that balance loud/thin chrome with quiet paper themes, and grain HTML-only guidance.

## 1.7.4

### Patch Changes

- d1a8408: Quieter HTML paper grain for soft-editorial / warm-paper / broadsheet; skill + MCP/Studio guidance for Pulse chips and candy card borders.

## 1.7.3

### Patch Changes

- 582e094: Riso print-beat craft gate + skill/MCP Pulse/riso/candy guidance; Studio live craft badge on Audit craft as you edit.

## 1.7.2

### Patch Changes

- 1941cf9: Document that every theme package now gets native PPTX surface-chrome approximations, and steer agents toward loud/thin themes instead of custom-html for brand atmosphere.

## 1.7.1

### Patch Changes

- 7aa0385: Stronger dual-CTA / closing-icon craft gates (including stunning-25 single-CTA), Studio jump-to-slide from audit issues, MCP craft mandate for action icons, and stunning-25 example closing icons.

## 1.7.0

### Minor Changes

- 2bd5d7e: Dense PPTX chrome for swiss/FT/bauhaus/fintech/scandi/art-deco/botanical themes; candy marquee brands from meta.company/title/marquee (not Jellybean-hardcoded).

### Patch Changes

- 2bd5d7e: Craft-audit slide indices, candy-pop brand gate, social closing icon hint; Studio audit panel severity filters; MCP craft mandate for candy marquee.
- dfa2b5a: PPTX chrome approximations for genz-bento, heritage-editorial, developer-dark, data-editorial, and dark-botanical; candy marquee brand honesty in SKILL.

## 1.6.1

### Patch Changes

- 8027a0e: Shared data-beat craft gate in auditCraft; aerospace-hud PPTX grid/reticle chrome.

## 1.6.0

### Minor Changes

- c7ce9a5: Extract shared `auditCraft` into `@presentation-md/core` so Studio Audit and MCP `audit_deck` share one craft-gate source.

### Patch Changes

- 96d87eb: Closing action icons in PPTX, aurora/glass/luxe chrome, candy ticker text, and dual-CTA auditCraft for launch closes.
- d58fa5a: PPTX chrome for neon-noir / vaporwave / y2k-aero; broaden dual-CTA craft mandate for launch/investor closes.

## 1.5.0

### Minor Changes

- 40d506a: Markdown→deck maps streak-grid, metric-ring, logo-wall, and dual closing actions; Studio adds Audit craft button.

## 1.4.1

### Patch Changes

- 2e00f07: Harden wrap audit/judge gates, fix agent layout-count recipes, native PPTX metric-ring blockArc, and bring stunning-25 proofs up to notes/logo-wall craft ceilings.

## 1.4.0

### Minor Changes

- 932ace2: Add streak-grid + metric-ring layouts and closing actions[] for Pulse share pills; wire Studio/export/MCP and close gallery leftovers.

## 1.3.0

### Minor Changes

- b1f2b74: Add logo-wall layout for customer/partner marks; fix export prefer-const lint.
- 1fb09b1: Add ranked-list layout and stat-row hero mega-stat for wrap decks; Studio tone editing; Pulse gallery parity.

### Patch Changes

- 9463f80: Align PPTX timeline with horizontal HTML rail; add orientation vertical process option.

## 1.2.1

### Patch Changes

- dc54af0: judge_deck T2/T3: HTML metrics + Chrome screenshots; document harness `#__shot` for per-slide capture

## 1.2.0

### Minor Changes

- de75364: Add chart + custom-html layouts, Markdown→Deck JSON bridge, judge_deck MCP, and Pulse multi-hue craft.

## 1.1.2

### Patch Changes

- 9bb1dba: Require asymmetric craft and speaker notes in agent authoring docs (deck-schema + SKILL) so MCP `generate_deck_prompt` matches Studio generate rules.

## 1.1.1

### Patch Changes

- 545ccd8: Round-trip speaker notes through PPTX export (`addNotes`) and Studio; raise package engines to Node 22+.

## 1.1.0

### Minor Changes

- Add `code` layout, asymmetric two-column/comparison/bento craft, and `preview_themes` multi-layout mode.

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Minor Changes

- e9b8afd: Skill craft upgrade inspired by frontend-slides: honest 9-layout schema alignment,
  theme selection index + show-don't-tell discovery, real MCP tool table (and matching
  README/marketing copy), install SKILL sync, and keyboard / reduced-motion / entrance
  motion in the shared HTML renderer.

### Patch Changes

- 4dfb90b: Harden PPTX import against review findings: correct assetsDir image refs,
  enforce post-decompress zip size limits, realpath write containment, preserve
  speaker notes, and reopen legacy psp-deck HTML embeds.

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.
