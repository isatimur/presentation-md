# @presentation-md/mcp-server

## 1.31.1

### Patch Changes

- Updated dependencies [1a7764e]
  - @presentation-md/render@1.13.0

## 1.31.0

### Minor Changes

- 54f5d3c: MCP export_deck gains notes_txt / notes_vtt speaker-notes handouts (shared core helpers; Studio downloads re-export the same builders).

### Patch Changes

- Updated dependencies [54f5d3c]
  - @presentation-md/core@1.26.0
  - @presentation-md/create-theme@1.1.26
  - @presentation-md/export@1.23.26
  - @presentation-md/render@1.12.2

## 1.30.0

### Minor Changes

- 2d01abe: Universal Studio deep-links: every list_themes entry gets studio_url (`?example=` for stunning-25, `?theme=` otherwise); preview_themes returns studio_share_url (`?d=`) for the exact bake deck.

### Patch Changes

- Updated dependencies [2d01abe]
  - @presentation-md/core@1.25.0
  - @presentation-md/create-theme@1.1.25
  - @presentation-md/export@1.23.25
  - @presentation-md/render@1.12.1

## 1.29.1

### Patch Changes

- Updated dependencies [ce899cf]
  - @presentation-md/render@1.12.0

## 1.29.0

### Minor Changes

- 1e61cb2: Deck → Marp/md-slides **Markdown export** (`deckToMarkdown`): Studio Download Markdown, MCP/CLI `format: md`, round-trip with import_markdown / Paste MD / Open .md.

### Patch Changes

- Updated dependencies [1e61cb2]
  - @presentation-md/core@1.24.0
  - @presentation-md/render@1.11.0
  - @presentation-md/create-theme@1.1.24
  - @presentation-md/export@1.23.24

## 1.28.0

### Minor Changes

- 3e26a49: MCP `share_deck_link` encodes Deck JSON into a Studio `?d=` URL (same CompressionStream codec in `@presentation-md/core`) for editable agent→user handoff after scaffold/audit/theme.

### Patch Changes

- Updated dependencies [3e26a49]
- Updated dependencies [3c10303]
  - @presentation-md/core@1.23.0
  - @presentation-md/render@1.10.2
  - @presentation-md/create-theme@1.1.23
  - @presentation-md/export@1.23.23

## 1.27.2

### Patch Changes

- Updated dependencies [29639e3]
  - @presentation-md/render@1.10.1

## 1.27.1

### Patch Changes

- Updated dependencies [fb48c18]
  - @presentation-md/render@1.10.0

## 1.27.0

### Minor Changes

- e0731d9: MCP `preview_themes` accepts Deck JSON (`json` / mode `deck`) for Studio My deck restyle parity — content-true theme compares with optional `slide_index` PNGs.

### Patch Changes

- Updated dependencies [e0731d9]
  - @presentation-md/core@1.22.4
  - @presentation-md/create-theme@1.1.22
  - @presentation-md/export@1.23.22
  - @presentation-md/render@1.9.9

## 1.26.0

### Minor Changes

- 0608094: Studio **Copy link** shares a compressed `?d=` editable deck (hydrate on open) + Open Marp/md-slides `.md`; MCP `apply_theme` defaults to `repairCraft` (Studio My deck Use parity).

### Patch Changes

- Updated dependencies [0608094]
  - @presentation-md/core@1.22.3
  - @presentation-md/create-theme@1.1.21
  - @presentation-md/export@1.23.21
  - @presentation-md/render@1.9.8

## 1.25.2

### Patch Changes

- Updated dependencies [0e8e59c]
  - @presentation-md/core@1.22.2
  - @presentation-md/create-theme@1.1.20
  - @presentation-md/export@1.23.20
  - @presentation-md/render@1.9.7

## 1.25.1

### Patch Changes

- Updated dependencies [706e441]
  - @presentation-md/core@1.22.1
  - @presentation-md/create-theme@1.1.19
  - @presentation-md/export@1.23.19
  - @presentation-md/render@1.9.6

## 1.25.0

### Minor Changes

- a384de0: Add `scaffold_deck` MCP (layout-recipe skeletons), theme-honesty `repairCraft` expansions + Studio per-issue Insert beat buttons, and sync web badges to core@1.21.0 / mcp@1.24.0 / render@1.9.4.

### Patch Changes

- Updated dependencies [a384de0]
  - @presentation-md/core@1.22.0
  - @presentation-md/create-theme@1.1.18
  - @presentation-md/export@1.23.18
  - @presentation-md/render@1.9.5

## 1.24.0

### Minor Changes

- 129dbba: Extend `repairCraft` with safe beat inserts (image-hero, comparison, data, logo-wall, wrap tones/ranked/streak, cadence) + Studio Generate auto-repair; `judge_deck` t2/t3 attaches inline slide PNGs by default.

### Patch Changes

- Updated dependencies [129dbba]
  - @presentation-md/core@1.21.0
  - @presentation-md/create-theme@1.1.17
  - @presentation-md/export@1.23.17
  - @presentation-md/render@1.9.4

## 1.23.0

### Minor Changes

- 41bb08c: Craft `repairCraft` + MCP `audit_deck` `apply_safe_fixes` (returns repaired JSON) and Studio **Apply safe fixes** / **Print / PDF** — agents clear structural craft in one hop; Studio closes the browser PDF gap via the same `@page` 16:9 print CSS as MCP/CLI.

### Patch Changes

- Updated dependencies [41bb08c]
  - @presentation-md/core@1.20.0
  - @presentation-md/create-theme@1.1.16
  - @presentation-md/export@1.23.16
  - @presentation-md/render@1.9.3

## 1.22.2

### Patch Changes

- 7b9976e: Densify Studio Title/Bento/Compare shot strips to one shared iframe per theme (scroll-crop), including Example open-gated mounts; skill/MCP/vs copy keep pace.
- Updated dependencies [7b9976e]
  - @presentation-md/core@1.19.5
  - @presentation-md/create-theme@1.1.15
  - @presentation-md/export@1.23.15
  - @presentation-md/render@1.9.2

## 1.22.1

### Patch Changes

- 2390e2b: Studio Example featured trio shows Title/Bento/Compare shot strip (parity with pick-3 + Generate) and a Compare 3 themes bridge into the live theme tray; skill/MCP discovery copy matches.
- Updated dependencies [2390e2b]
  - @presentation-md/core@1.19.4
  - @presentation-md/create-theme@1.1.14
  - @presentation-md/export@1.23.14
  - @presentation-md/render@1.9.1

## 1.22.0

### Minor Changes

- ab97a8f: CLI `--preview-compare` captures discovery PNGs via the shared Chrome isolate path with MCP `preview_themes` (title + bento + comparison); Studio pick-3 live compare shows a Title/Bento/Compare shot strip.

### Patch Changes

- Updated dependencies [ab97a8f]
  - @presentation-md/render@1.9.0
  - @presentation-md/core@1.19.3
  - @presentation-md/create-theme@1.1.13
  - @presentation-md/export@1.23.13

## 1.21.0

### Minor Changes

- f7445a4: preview_themes returns inline PNG screenshots as MCP image content by default (title + comparison in layouts mode) so vision agents can compare themes in-chat — show-don't-tell vs frontend-slides path-only previews.

### Patch Changes

- Updated dependencies [f7445a4]
  - @presentation-md/core@1.19.2
  - @presentation-md/create-theme@1.1.12
  - @presentation-md/export@1.23.12
  - @presentation-md/render@1.8.1

## 1.20.0

### Minor Changes

- 05cf502: Wire vector PDF into MCP `export_deck` and CLI `--format pdf` (Chromium print via core export-pdf pipeline), plus `@page` 16:9 print sizing.

### Patch Changes

- Updated dependencies [05cf502]
  - @presentation-md/render@1.8.0
  - @presentation-md/core@1.19.1
  - @presentation-md/create-theme@1.1.11
  - @presentation-md/export@1.23.11

## 1.19.0

### Minor Changes

- 031f94b: Shared pickDiscoveryPreviewTrio (safe/bold/wildcard) powers MCP list_themes suggested_preview, Studio Compare 3, and Generate mood pick-3 — frontend-slides-style discovery mix from schema themes.

### Patch Changes

- Updated dependencies [031f94b]
  - @presentation-md/core@1.19.0
  - @presentation-md/create-theme@1.1.10
  - @presentation-md/export@1.23.10
  - @presentation-md/render@1.7.6

## 1.18.0

### Minor Changes

- f24cf7e: list_themes gains site/Studio mood-browse chip parity (`browse` + `include_browse_filters`) so agents offer the same discovery chips as the gallery.

## 1.17.0

### Minor Changes

- 539425a: preview_themes returns file_url, compare_summary (mood/swatches/vibe), proof deep-links, and layout bake list — agent DX without inline PNGs.

### Patch Changes

- Updated dependencies [9d22c98]
  - @presentation-md/core@1.18.0
  - @presentation-md/create-theme@1.1.9
  - @presentation-md/export@1.23.9
  - @presentation-md/render@1.7.5

## 1.16.0

### Minor Changes

- 9ddc04b: `list_themes` returns proof deep-links (`preview_url`, `studio_url`, `gallery_url`) via shared stunning-25 discovery helpers — agents open proofs in one hop vs path-only vibe text.

### Patch Changes

- 976a9b6: Sell craft gates in audit_deck / generate_deck_prompt descriptions and wire custom-html recipes into the one-shot prompt.
- Updated dependencies [976a9b6]
- Updated dependencies [9ddc04b]
  - @presentation-md/core@1.17.0
  - @presentation-md/create-theme@1.1.8
  - @presentation-md/export@1.23.8
  - @presentation-md/render@1.7.4

## 1.15.1

### Patch Changes

- Updated dependencies [976c2a4]
  - @presentation-md/core@1.16.5
  - @presentation-md/create-theme@1.1.7
  - @presentation-md/export@1.23.7
  - @presentation-md/render@1.7.3

## 1.15.0

### Minor Changes

- e653c9e: Generate modal gains Title/Bento/Compare live crops (parity with theme tray); Example browser shows a live featured trio + theme swatches; `preview_themes` auto-defaults pick-3 (≥2 themes) to layouts mode; flagship Deck JSON leads with title → feature-grid → comparison for Studio crop alignment; site + skill copy densify show-don't-tell vs frontend-slides.

### Patch Changes

- Updated dependencies [e653c9e]
  - @presentation-md/core@1.16.4
  - @presentation-md/create-theme@1.1.6
  - @presentation-md/export@1.23.6
  - @presentation-md/render@1.7.2

## 1.14.7

### Patch Changes

- 5c27794: Share canonical title/layouts theme-preview decks between CLI `--preview-compare` and MCP `preview_themes` (incl. kinetic-wrapped craft).
- Updated dependencies [5c27794]
  - @presentation-md/render@1.7.1

## 1.14.6

### Patch Changes

- Updated dependencies [50a7c3b]
- Updated dependencies [e341b5f]
  - @presentation-md/render@1.7.0
  - @presentation-md/core@1.16.3
  - @presentation-md/create-theme@1.1.5
  - @presentation-md/export@1.23.5

## 1.14.5

### Patch Changes

- c527f9f: generate_deck_prompt accepts density (speaker/reading) and injects a density lock into the craft mandate — parity with Studio Generate.

## 1.14.4

### Patch Changes

- 8de2f80: Studio pick-3 compare + Generate visual discover; one-shot craft bar; preview_themes layouts_recommended; list_themes discovery_hint; Cloth sheen/tilt deepen — beat frontend-slides progressive discovery.
- Updated dependencies [8de2f80]
  - @presentation-md/core@1.16.2
  - @presentation-md/create-theme@1.1.4
  - @presentation-md/export@1.23.4
  - @presentation-md/render@1.6.36

## 1.14.3

### Patch Changes

- c3f9ca7: Popular shortlist discovery UX: mark flagship shortlists, sort them first in MCP list_themes + Studio, and add speaker/reading density to Studio generate — beats frontend-slides template-popularity browse with structured themes.
- Updated dependencies [c3f9ca7]
  - @presentation-md/core@1.16.1
  - @presentation-md/create-theme@1.1.3
  - @presentation-md/export@1.23.3
  - @presentation-md/render@1.6.35

## 1.14.2

### Patch Changes

- Updated dependencies [42881e7]
  - @presentation-md/render@1.6.34

## 1.14.1

### Patch Changes

- Updated dependencies [4043229]
  - @presentation-md/render@1.6.33

## 1.14.0

### Minor Changes

- 2c0a7dc: Ship PDF/deploy scripts in published core, sync Claude plugin skill + deck schema from core, document markdown craft heuristics, and harden MCP write paths with shared cwd containment + export/render tests.

### Patch Changes

- Updated dependencies [2c0a7dc]
  - @presentation-md/core@1.16.0
  - @presentation-md/create-theme@1.1.2
  - @presentation-md/export@1.23.2
  - @presentation-md/render@1.6.32

## 1.13.1

### Patch Changes

- 764e3b8: Isolate each `.slide` into a mini HTML before headless Chrome capture in deck-design-judge `render_slides.sh` (parity with MCP screenshot-slides), with unit tests for the isolate helper.
- Updated dependencies [1630a4e]
  - @presentation-md/core@1.15.0
  - @presentation-md/create-theme@1.1.1
  - @presentation-md/export@1.23.1
  - @presentation-md/render@1.6.31

## 1.13.0

### Minor Changes

- e6b54be: Theme Discovery APIs + Studio shortlists, denser botanical PPTX chrome, and light/dark create-theme extends.

  - core: public `theme-discovery` loaders/helpers + integrity tests; expand shortlists (paper-literary, soft-pastel, mid-century-mat, hud-blueprint, y2k-arcade, workshop-scatter, glass-voltage, parchment-quiet) to cover 56 themes
  - mcp: list/preview/generate_deck_prompt consume core discovery (single source of truth)
  - studio: shortlist chips in theme browser + Generate modal
  - export: always-on botanical-luxe frame/shadow + denser dark-botanical bloom/shadow (skip mix-blend)
  - create-theme: light scaffolds/imports extend `claude`, dark extend `default-tech` (avoid neon surface inheritance)

### Patch Changes

- Updated dependencies [e6b54be]
  - @presentation-md/core@1.14.0
  - @presentation-md/export@1.23.0
  - @presentation-md/create-theme@1.1.0
  - @presentation-md/render@1.6.30

## 1.12.1

### Patch Changes

- 059c89f: Raise present-mode craft floors (notes / dual-CTA / long-deck data beats) in the skill + MCP mandate, and lock gallery example decks behind a zero-warning auditCraft regression.
- Updated dependencies [059c89f]
  - @presentation-md/core@1.13.2
  - @presentation-md/create-theme@1.0.36
  - @presentation-md/export@1.22.1
  - @presentation-md/render@1.6.29

## 1.12.0

### Minor Changes

- d6ca564: preview_themes accepts shortlist ids for Theme Discovery; sync FT/biennale top-rule honesty across skill, MCP craft mandate, and Studio.

### Patch Changes

- Updated dependencies [58c81f2]
- Updated dependencies [d6ca564]
  - @presentation-md/export@1.22.0
  - @presentation-md/render@1.6.28
  - @presentation-md/core@1.13.1
  - @presentation-md/create-theme@1.0.35

## 1.11.0

### Minor Changes

- 2b42e2a: list_themes shortlist/mood/query filters + shortlists catalog; inject theme shortlists into generate_deck_prompt for intelligent defaults; sync literary left-rule honesty.

### Patch Changes

- Updated dependencies [a8e8c0a]
- Updated dependencies [8a839a8]
  - @presentation-md/export@1.21.0
  - @presentation-md/render@1.6.27
  - @presentation-md/core@1.13.0
  - @presentation-md/create-theme@1.0.34

## 1.10.5

### Patch Changes

- f512620: Add neon-tech, data-editorial, and scatterbrain layout recipes; sync craft-mandate recipe lists and paper-ink left-rule honesty across skill, MCP, and Studio.
- 2b5f521: Publish a deprecated redirect stub for `@presentation-skill-pack/mcp-server` that warns and starts `@presentation-md/mcp-server` (11 tools).
- Updated dependencies [f512620]
- Updated dependencies [772dcc9]
  - @presentation-md/core@1.12.4
  - @presentation-md/export@1.20.5
  - @presentation-md/create-theme@1.0.33
  - @presentation-md/render@1.6.26

## 1.10.4

### Patch Changes

- a5985a3: Gate soft-product, playful, neon-tech, scatterbrain, and data-editorial craft beats; extend paper honesty to scandinavian and PPTX thin-peer card strokes.
- Updated dependencies [a5985a3]
- Updated dependencies [ffc72f5]
  - @presentation-md/core@1.12.3
  - @presentation-md/export@1.20.4
  - @presentation-md/create-theme@1.0.32
  - @presentation-md/render@1.6.25

## 1.10.3

### Patch Changes

- 079c760: Gate signal briefing and luxury-minimalist quiet-luxe craft; extend skill/MCP/Studio honesty and layout recipes (no web deploy).
- d28fc27: Document and test the full 11-tool MCP registry; migrate adapters off the legacy 5-tool `@presentation-skill-pack/mcp-server` package.
- Updated dependencies [079c760]
- Updated dependencies [fadff85]
- Updated dependencies [d28fc27]
  - @presentation-md/core@1.12.2
  - @presentation-md/export@1.20.3
  - @presentation-md/create-theme@1.0.31
  - @presentation-md/render@1.6.24

## 1.10.2

### Patch Changes

- Updated dependencies [74ce065]
  - @presentation-md/export@1.20.2
  - @presentation-md/render@1.6.23

## 1.10.1

### Patch Changes

- d1749c0: Add modernist honesty for bauhaus / swiss / art-deco in generate_deck_prompt.
- Updated dependencies [d1749c0]
  - @presentation-md/core@1.12.1
  - @presentation-md/create-theme@1.0.30
  - @presentation-md/export@1.20.1
  - @presentation-md/render@1.6.22

## 1.10.0

### Minor Changes

- 7d0a0e6: Extend generate_deck_prompt for glass honesty, expanded hard-card loud peers, and new layout recipe families.

### Patch Changes

- Updated dependencies [7d0a0e6]
- Updated dependencies [c37edbe]
- Updated dependencies [0264b50]
  - @presentation-md/core@1.12.0
  - @presentation-md/export@1.20.0
  - @presentation-md/create-theme@1.0.29
  - @presentation-md/render@1.6.21

## 1.9.0

### Minor Changes

- 2a8d979: Extend generate_deck_prompt craft mandate for HUD honesty and hard-card loud peers.

### Patch Changes

- Updated dependencies [2a8d979]
- Updated dependencies [92387aa]
  - @presentation-md/core@1.11.0
  - @presentation-md/export@1.19.0
  - @presentation-md/create-theme@1.0.28
  - @presentation-md/render@1.6.20

## 1.8.0

### Minor Changes

- 8fd4189: Extend generate_deck_prompt craft mandate for mat / cobalt-grid / biennale / pastel / retro-arcade honesty and denser PPTX chrome expectations.

### Patch Changes

- Updated dependencies [8fd4189]
- Updated dependencies [fb22ade]
  - @presentation-md/core@1.10.0
  - @presentation-md/export@1.18.0
  - @presentation-md/create-theme@1.0.27
  - @presentation-md/render@1.6.19

## 1.7.0

### Minor Changes

- ad33c66: Inject layout recipes + atmosphere/poster honesty into generate_deck_prompt craft mandate.

### Patch Changes

- Updated dependencies [ad33c66]
- Updated dependencies [eeea009]
  - @presentation-md/core@1.9.0
  - @presentation-md/export@1.17.0
  - @presentation-md/create-theme@1.0.26
  - @presentation-md/render@1.6.18

## 1.6.19

### Patch Changes

- 5b33db9: Extend loud honesty craft guidance for capsule / scatterbrain / 8-bit-orbit / retro-windows PPTX offset-shadow and bevel chrome.
- Updated dependencies [f5d51a8]
- Updated dependencies [5b33db9]
  - @presentation-md/export@1.16.3
  - @presentation-md/core@1.8.7
  - @presentation-md/render@1.6.17
  - @presentation-md/create-theme@1.0.25

## 1.6.18

### Patch Changes

- Updated dependencies [854321c]
  - @presentation-md/export@1.16.2
  - @presentation-md/render@1.6.16

## 1.6.17

### Patch Changes

- 6fcf4db: Extend loud honesty craft guidance for always-on PPTX offset-shadow strips on block-frame / creative-mode / sakura-chroma (and peers).
- Updated dependencies [68cc6a6]
- Updated dependencies [6fcf4db]
  - @presentation-md/export@1.16.1
  - @presentation-md/core@1.8.6
  - @presentation-md/render@1.6.15
  - @presentation-md/create-theme@1.0.24

## 1.6.16

### Patch Changes

- 44b46db: Add loud honesty craft guidance for always-on stencil/retro-zine/daisy PPTX frames and plates.
- Updated dependencies [05d8c04]
- Updated dependencies [44b46db]
  - @presentation-md/export@1.16.0
  - @presentation-md/core@1.8.5
  - @presentation-md/render@1.6.14
  - @presentation-md/create-theme@1.0.23

## 1.6.15

### Patch Changes

- bc3f18f: Extend paper craft guidance for capsule / long-table / paper-ink hero-gated PPTX ornaments and magazine cadence.
- Updated dependencies [e7c5f4e]
- Updated dependencies [bc3f18f]
  - @presentation-md/export@1.15.0
  - @presentation-md/core@1.8.4
  - @presentation-md/render@1.6.13
  - @presentation-md/create-theme@1.0.22

## 1.6.14

### Patch Changes

- 9274c8c: Raise skill + MCP craft bar for paper/editorial magazine cadence and Claude Design rivalry; tighten anti-slop enforcement.
- Updated dependencies [e3cd10d]
- Updated dependencies [9274c8c]
  - @presentation-md/export@1.14.0
  - @presentation-md/core@1.8.3
  - @presentation-md/render@1.6.12
  - @presentation-md/create-theme@1.0.21

## 1.6.13

### Patch Changes

- 00efbcb: Strengthen generate_deck_prompt craft mandate with rivalry bar and anti-slop reference so agents default to stunning, on-brand decks.
- Updated dependencies [054408d]
- Updated dependencies [d922258]
  - @presentation-md/export@1.13.2
  - @presentation-md/core@1.8.2
  - @presentation-md/render@1.6.11
  - @presentation-md/create-theme@1.0.20

## 1.6.12

### Patch Changes

- Updated dependencies [5dbbe2f]
  - @presentation-md/export@1.13.1
  - @presentation-md/core@1.8.1
  - @presentation-md/render@1.6.10
  - @presentation-md/create-theme@1.0.19

## 1.6.11

### Patch Changes

- Updated dependencies [3019e5f]
  - @presentation-md/core@1.8.0
  - @presentation-md/export@1.13.0
  - @presentation-md/create-theme@1.0.18
  - @presentation-md/render@1.6.9

## 1.6.10

### Patch Changes

- Updated dependencies [9a043b3]
  - @presentation-md/export@1.12.2
  - @presentation-md/render@1.6.8

## 1.6.9

### Patch Changes

- 83d16c1: Paper/editorial craft honesty for agents: magazine beat gate in auditCraft, skill + MCP mandates that balance loud/thin chrome with quiet paper themes, and grain HTML-only guidance.
- Updated dependencies [a200fcb]
- Updated dependencies [c17dfbf]
- Updated dependencies [83d16c1]
  - @presentation-md/export@1.12.1
  - @presentation-md/render@1.6.7
  - @presentation-md/core@1.7.5
  - @presentation-md/create-theme@1.0.17

## 1.6.8

### Patch Changes

- d1a8408: Quieter HTML paper grain for soft-editorial / warm-paper / broadsheet; skill + MCP/Studio guidance for Pulse chips and candy card borders.
- Updated dependencies [e67f07e]
- Updated dependencies [d1a8408]
  - @presentation-md/export@1.12.0
  - @presentation-md/render@1.6.6
  - @presentation-md/core@1.7.4
  - @presentation-md/create-theme@1.0.16

## 1.6.7

### Patch Changes

- 582e094: Riso print-beat craft gate + skill/MCP Pulse/riso/candy guidance; Studio live craft badge on Audit craft as you edit.
- Updated dependencies [582e094]
- Updated dependencies [c9e59f2]
  - @presentation-md/core@1.7.3
  - @presentation-md/export@1.11.1
  - @presentation-md/create-theme@1.0.15
  - @presentation-md/render@1.6.5

## 1.6.6

### Patch Changes

- 1941cf9: Document that every theme package now gets native PPTX surface-chrome approximations, and steer agents toward loud/thin themes instead of custom-html for brand atmosphere.
- Updated dependencies [a481a33]
- Updated dependencies [1941cf9]
- Updated dependencies [2f8f516]
  - @presentation-md/export@1.11.0
  - @presentation-md/core@1.7.2
  - @presentation-md/render@1.6.4
  - @presentation-md/create-theme@1.0.14

## 1.6.5

### Patch Changes

- 7aa0385: Stronger dual-CTA / closing-icon craft gates (including stunning-25 single-CTA), Studio jump-to-slide from audit issues, MCP craft mandate for action icons, and stunning-25 example closing icons.
- Updated dependencies [7aa0385]
- Updated dependencies [9f935f0]
  - @presentation-md/core@1.7.1
  - @presentation-md/export@1.10.1
  - @presentation-md/create-theme@1.0.13
  - @presentation-md/render@1.6.3

## 1.6.4

### Patch Changes

- 2bd5d7e: Craft-audit slide indices, candy-pop brand gate, social closing icon hint; Studio audit panel severity filters; MCP craft mandate for candy marquee.
- Updated dependencies [2bd5d7e]
- Updated dependencies [2bd5d7e]
- Updated dependencies [dfa2b5a]
  - @presentation-md/core@1.7.0
  - @presentation-md/export@1.10.0
  - @presentation-md/render@1.6.2
  - @presentation-md/create-theme@1.0.12

## 1.6.3

### Patch Changes

- 8027a0e: Shared data-beat craft gate in auditCraft; aerospace-hud PPTX grid/reticle chrome.
- Updated dependencies [8027a0e]
  - @presentation-md/core@1.6.1
  - @presentation-md/export@1.9.1
  - @presentation-md/create-theme@1.0.11
  - @presentation-md/render@1.6.1

## 1.6.2

### Patch Changes

- 96d87eb: Closing action icons in PPTX, aurora/glass/luxe chrome, candy ticker text, and dual-CTA auditCraft for launch closes.
- d58fa5a: PPTX chrome for neon-noir / vaporwave / y2k-aero; broaden dual-CTA craft mandate for launch/investor closes.
- c7ce9a5: Extract shared `auditCraft` into `@presentation-md/core` so Studio Audit and MCP `audit_deck` share one craft-gate source.
- Updated dependencies [96d87eb]
- Updated dependencies [d58fa5a]
- Updated dependencies [c7ce9a5]
- Updated dependencies [c7ce9a5]
- Updated dependencies [090d2c6]
  - @presentation-md/export@1.9.0
  - @presentation-md/core@1.6.0
  - @presentation-md/render@1.6.0
  - @presentation-md/create-theme@1.0.10

## 1.6.1

### Patch Changes

- 40d506a: Markdown→deck maps streak-grid, metric-ring, logo-wall, and dual closing actions; Studio adds Audit craft button.
- Updated dependencies [40d506a]
  - @presentation-md/core@1.5.0
  - @presentation-md/create-theme@1.0.9
  - @presentation-md/export@1.8.1
  - @presentation-md/render@1.5.2

## 1.6.0

### Minor Changes

- 2e00f07: Harden wrap audit/judge gates, fix agent layout-count recipes, native PPTX metric-ring blockArc, and bring stunning-25 proofs up to notes/logo-wall craft ceilings.

### Patch Changes

- Updated dependencies [2e00f07]
  - @presentation-md/core@1.4.1
  - @presentation-md/export@1.8.0
  - @presentation-md/create-theme@1.0.8
  - @presentation-md/render@1.5.1

## 1.5.0

### Minor Changes

- 932ace2: Add streak-grid + metric-ring layouts and closing actions[] for Pulse share pills; wire Studio/export/MCP and close gallery leftovers.

### Patch Changes

- Updated dependencies [932ace2]
  - @presentation-md/core@1.4.0
  - @presentation-md/export@1.7.0
  - @presentation-md/render@1.5.0
  - @presentation-md/create-theme@1.0.7

## 1.4.1

### Patch Changes

- 09eba35: Tighten generate_deck_prompt craft mandate for ranked-list, hero stats, tone, and judge_deck.

## 1.4.0

### Minor Changes

- b48ff58: Deepen stunning-25 body chrome; improve PPTX icons/timeline; local_draft T3 when panel keys missing.
- 1fb09b1: Add ranked-list layout and stat-row hero mega-stat for wrap decks; Studio tone editing; Pulse gallery parity.

### Patch Changes

- b1f2b74: Add logo-wall layout for customer/partner marks; fix export prefer-const lint.
- Updated dependencies [b48ff58]
- Updated dependencies [b1f2b74]
- Updated dependencies [1fb09b1]
- Updated dependencies [9463f80]
  - @presentation-md/export@1.6.0
  - @presentation-md/render@1.4.0
  - @presentation-md/core@1.3.0
  - @presentation-md/create-theme@1.0.6

## 1.3.0

### Minor Changes

- dc54af0: judge_deck T2/T3: HTML metrics + Chrome screenshots; document harness `#__shot` for per-slide capture

### Patch Changes

- Updated dependencies [dc54af0]
- Updated dependencies [46e081e]
- Updated dependencies [abe9cd4]
  - @presentation-md/render@1.3.1
  - @presentation-md/core@1.2.1
  - @presentation-md/export@1.5.0
  - @presentation-md/create-theme@1.0.5

## 1.2.0

### Minor Changes

- de75364: Add chart + custom-html layouts, Markdown→Deck JSON bridge, judge_deck MCP, and Pulse multi-hue craft.

### Patch Changes

- Updated dependencies [de75364]
  - @presentation-md/core@1.2.0
  - @presentation-md/render@1.3.0
  - @presentation-md/export@1.4.0
  - @presentation-md/create-theme@1.0.4

## 1.1.12

### Patch Changes

- 502992c: Tighten audit_deck craft warnings and inject stunning-25 craft mandate into generate_deck_prompt.
- Updated dependencies [b114335]
- Updated dependencies [517fd38]
  - @presentation-md/render@1.2.11
  - @presentation-md/export@1.3.7

## 1.1.11

### Patch Changes

- Updated dependencies [c166225]
  - @presentation-md/export@1.3.6
  - @presentation-md/render@1.2.10

## 1.1.10

### Patch Changes

- Updated dependencies [855f8a7]
  - @presentation-md/export@1.3.5
  - @presentation-md/render@1.2.9

## 1.1.9

### Patch Changes

- Updated dependencies [e0f70bd]
- Updated dependencies [9cd4658]
- Updated dependencies [bc744bf]
  - @presentation-md/render@1.2.8
  - @presentation-md/export@1.3.4

## 1.1.8

### Patch Changes

- 9bb1dba: Require asymmetric craft and speaker notes in agent authoring docs (deck-schema + SKILL) so MCP `generate_deck_prompt` matches Studio generate rules.
- Updated dependencies [9bb1dba]
  - @presentation-md/core@1.1.2
  - @presentation-md/create-theme@1.0.3
  - @presentation-md/export@1.3.3
  - @presentation-md/render@1.2.7

## 1.1.7

### Patch Changes

- Updated dependencies [700c2d3]
  - @presentation-md/render@1.2.6

## 1.1.6

### Patch Changes

- Updated dependencies [c2f4354]
  - @presentation-md/render@1.2.5

## 1.1.5

### Patch Changes

- Updated dependencies [545ccd8]
  - @presentation-md/export@1.3.2
  - @presentation-md/core@1.1.1
  - @presentation-md/create-theme@1.0.2
  - @presentation-md/render@1.2.4

## 1.1.4

### Patch Changes

- Updated dependencies [23e3a1f]
  - @presentation-md/export@1.3.1
  - @presentation-md/render@1.2.3

## 1.1.3

### Patch Changes

- Updated dependencies [61cb2b0]
  - @presentation-md/export@1.3.0
  - @presentation-md/render@1.2.2

## 1.1.2

### Patch Changes

- Updated dependencies [0e5274f]
- Updated dependencies [42bee0e]
  - @presentation-md/render@1.2.1
  - @presentation-md/export@1.2.0

## 1.1.1

### Patch Changes

- 4dbb572: Ship image-hero storytelling motion, denser asymmetric bento/ratio craft, and package the shared layout CSS inside `@presentation-md/render` so npm consumers get the same craft ceiling as the site proofs.
- Updated dependencies [4dbb572]
  - @presentation-md/render@1.2.0

## 1.1.0

### Minor Changes

- Add `code` layout, asymmetric two-column/comparison/bento craft, and `preview_themes` multi-layout mode.

### Patch Changes

- Updated dependencies
  - @presentation-md/core@1.1.0
  - @presentation-md/render@1.1.0
  - @presentation-md/export@1.1.0
  - @presentation-md/create-theme@1.0.1

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Minor Changes

- a3f8544: Add PPTX export: take any deck into PowerPoint, Keynote, and Google Slides.

  - New `@presentation-md/export` package mapping each of the 9 structured
    layouts + theme roles to native, editable PowerPoint shapes (`deckToPptxBuffer` /
    `deckToPptxBlob` / `deckToPptxArrayBuffer`, isomorphic Node + browser).
  - `render` CLI gains `--format pptx` (and a shared `renderDeckPptx` API). The
    resulting `.pptx` opens directly in PowerPoint and Keynote, and imports into
    Google Slides via File → Import.
  - New `export_deck` MCP tool so agents can export decks to `.pptx` (or html).

- e9b8afd: Add PPTX → Deck JSON import (round-trip with existing export).

  - `extractPptx` / `mapExtractedToDeck` / `pptxToDeck` via `@presentation-md/export/import`
  - CLI: `presentation-md-render --from-pptx <file>`
  - MCP: `import_pptx` tool (path or base64, cwd-contained)
  - Skill docs: `references/pptx-import.md`

### Patch Changes

- 4dfb90b: Harden PPTX import against review findings: correct assetsDir image refs,
  enforce post-decompress zip size limits, realpath write containment, preserve
  speaker notes, and reopen legacy psp-deck HTML embeds.
- e9b8afd: Skill craft upgrade inspired by frontend-slides: honest 9-layout schema alignment,
  theme selection index + show-don't-tell discovery, real MCP tool table (and matching
  README/marketing copy), install SKILL sync, and keyboard / reduced-motion / entrance
  motion in the shared HTML renderer.
- Updated dependencies [e4b502e]
- Updated dependencies [a3f8544]
- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/render@1.0.0
  - @presentation-md/export@1.0.0
  - @presentation-md/core@1.0.0
  - @presentation-md/create-theme@1.0.0

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.

### Patch Changes

- Updated dependencies [d8d2fb0]
  - @presentation-md/core@0.2.0
  - @presentation-md/render@0.2.0
