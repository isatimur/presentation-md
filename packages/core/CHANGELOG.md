# @presentation-md/core

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
