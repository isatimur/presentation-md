# @presentation-md/studio

## 1.25.1

### Patch Changes

- Updated dependencies [2d01abe]
  - @presentation-md/core@1.25.0
  - @presentation-md/export@1.23.25

## 1.25.0

### Minor Changes

- 6b535e6: Studio horizontal densified filmstrip (one iframe), preview Fit/zoom controls, and speaker-notes handout TXT/VTT export.

## 1.24.1

### Patch Changes

- 90c0bf4: Studio **Copy Markdown** clipboard export (Marp round-trip beside Download Markdown) + refresh vs/frontend-slides copy for filmstrip, Paste Brand, Generate My deck, and 13 MCP tools.

## 1.24.0

### Minor Changes

- fd84042: Generate discover pick-3 defaults to **My deck restyle** (selected slide live across themes) with Craft proofs one toggle away — ThemeCompareTray parity so theme judgment is content-true before generate/scaffold.
- 05498f1: Studio **Paste Brand** panel: paste `:root` CSS → ephemeral session theme (contrast-safe extract + Apply with repairCraft) — MCP `import_brand_theme` / `--from-css` parity without scaffolding a package.

## 1.23.0

### Minor Changes

- 1e61cb2: Deck → Marp/md-slides **Markdown export** (`deckToMarkdown`): Studio Download Markdown, MCP/CLI `format: md`, round-trip with import_markdown / Paste MD / Open .md.

### Patch Changes

- Updated dependencies [1e61cb2]
  - @presentation-md/core@1.24.0
  - @presentation-md/export@1.23.24

## 1.22.0

### Minor Changes

- f4f4f8e: Studio SlideList **filmstrip thumbnails** — live scaled slide previews beside each row (lazy IntersectionObserver iframes via restyleSlideHtml), so navigation matches frontend-slides visual strip UX.

## 1.21.0

### Minor Changes

- af245a8: Studio SlideForm **Layout** morph keeps heading/notes/shared fields when switching layouts (title ↔ comparison ↔ quote bridge) — structured craft without rewriting the slide.
- 77fcc4c: Studio **Paste MD** panel converts Marp/md-slides outlines to Deck JSON without a file picker (Open .md / MCP import_markdown parity). Oversized Copy link no longer mis-shares a curated example URL.
- 3c10303: Studio Present mode gains an **Up next** slide peek beside speaker notes (Pitch-class dual pane). CLI `--preview-mode` error copy includes `deck`.
- feef0a0: Studio preview syncs selection both ways: list pick scrolls + outlines the slide; click a slide in the iframe to edit (PresentMode load race fixed).
- 85d2a32: Studio Undo/Redo for deck edits (theme pick, repairCraft, Generate, Paste MD, slide list) with coalesced form typing and ⌘Z / ⇧⌘Z shortcuts — makes aggressive craft gates safe.

### Patch Changes

- 3e26a49: MCP `share_deck_link` encodes Deck JSON into a Studio `?d=` URL (same CompressionStream codec in `@presentation-md/core`) for editable agent→user handoff after scaffold/audit/theme.
- Updated dependencies [3e26a49]
  - @presentation-md/core@1.23.0
  - @presentation-md/export@1.23.23

## 1.20.0

### Minor Changes

- 29639e3: Studio theme browser applies repairCraft on every theme pick (My deck Use / MCP apply_theme parity). Harden CLI --preview-compare PNG assertions against partial Chrome densify flakes on macOS CI.

## 1.19.1

### Patch Changes

- Updated dependencies [e0731d9]
  - @presentation-md/core@1.22.4
  - @presentation-md/export@1.23.22

## 1.19.0

### Minor Changes

- 0608094: Studio **Copy link** shares a compressed `?d=` editable deck (hydrate on open) + Open Marp/md-slides `.md`; MCP `apply_theme` defaults to `repairCraft` (Studio My deck Use parity).

### Patch Changes

- Updated dependencies [0608094]
  - @presentation-md/core@1.22.3
  - @presentation-md/export@1.23.21

## 1.18.0

### Minor Changes

- 0e8e59c: Studio pick-3 **My deck restyle** (selected slide live across themes; Use applies theme + craft repair) + sync web badges/JSON-LD to core@1.22.1 / mcp@1.25.1 / render@1.9.6.

### Patch Changes

- Updated dependencies [0e8e59c]
  - @presentation-md/core@1.22.2
  - @presentation-md/export@1.23.20

## 1.17.0

### Minor Changes

- 706e441: Studio Download PDF blob (headless Chromium locally, client raster on static hosts) + Generate Land scaffold recipes (MCP scaffold_deck parity).

### Patch Changes

- Updated dependencies [706e441]
  - @presentation-md/core@1.22.1
  - @presentation-md/export@1.23.19

## 1.16.0

### Minor Changes

- a384de0: Add `scaffold_deck` MCP (layout-recipe skeletons), theme-honesty `repairCraft` expansions + Studio per-issue Insert beat buttons, and sync web badges to core@1.21.0 / mcp@1.24.0 / render@1.9.4.

### Patch Changes

- Updated dependencies [a384de0]
  - @presentation-md/core@1.22.0
  - @presentation-md/export@1.23.18

## 1.15.0

### Minor Changes

- 129dbba: Extend `repairCraft` with safe beat inserts (image-hero, comparison, data, logo-wall, wrap tones/ranked/streak, cadence) + Studio Generate auto-repair; `judge_deck` t2/t3 attaches inline slide PNGs by default.

### Patch Changes

- Updated dependencies [129dbba]
  - @presentation-md/core@1.21.0
  - @presentation-md/export@1.23.17

## 1.14.0

### Minor Changes

- 41bb08c: Craft `repairCraft` + MCP `audit_deck` `apply_safe_fixes` (returns repaired JSON) and Studio **Apply safe fixes** / **Print / PDF** — agents clear structural craft in one hop; Studio closes the browser PDF gap via the same `@page` 16:9 print CSS as MCP/CLI.

### Patch Changes

- Updated dependencies [41bb08c]
  - @presentation-md/core@1.20.0
  - @presentation-md/export@1.23.16

## 1.13.0

### Minor Changes

- 7b9976e: Densify Studio Title/Bento/Compare shot strips to one shared iframe per theme (scroll-crop), including Example open-gated mounts; skill/MCP/vs copy keep pace.

### Patch Changes

- Updated dependencies [7b9976e]
  - @presentation-md/core@1.19.5
  - @presentation-md/export@1.23.15

## 1.12.0

### Minor Changes

- 2390e2b: Studio Example featured trio shows Title/Bento/Compare shot strip (parity with pick-3 + Generate) and a Compare 3 themes bridge into the live theme tray; skill/MCP discovery copy matches.

### Patch Changes

- Updated dependencies [2390e2b]
  - @presentation-md/core@1.19.4
  - @presentation-md/export@1.23.14

## 1.11.0

### Minor Changes

- ab97a8f: CLI `--preview-compare` captures discovery PNGs via the shared Chrome isolate path with MCP `preview_themes` (title + bento + comparison); Studio pick-3 live compare shows a Title/Bento/Compare shot strip.

### Patch Changes

- Updated dependencies [ab97a8f]
  - @presentation-md/core@1.19.3
  - @presentation-md/export@1.23.13

## 1.10.2

### Patch Changes

- Updated dependencies [f7445a4]
  - @presentation-md/core@1.19.2
  - @presentation-md/export@1.23.12

## 1.10.1

### Patch Changes

- Updated dependencies [05cf502]
  - @presentation-md/core@1.19.1
  - @presentation-md/export@1.23.11

## 1.10.0

### Minor Changes

- 031f94b: Shared pickDiscoveryPreviewTrio (safe/bold/wildcard) powers MCP list_themes suggested_preview, Studio Compare 3, and Generate mood pick-3 — frontend-slides-style discovery mix from schema themes.

### Patch Changes

- Updated dependencies [031f94b]
  - @presentation-md/core@1.19.0
  - @presentation-md/export@1.23.10

## 1.9.0

### Minor Changes

- 9441e8b: Theme browser + Generate modal mood chips match the site gallery browse bar (Popular / Dark / Light / Editorial / Neon / …).

### Patch Changes

- Updated dependencies [9d22c98]
  - @presentation-md/core@1.18.0
  - @presentation-md/export@1.23.9

## 1.8.0

### Minor Changes

- 7d24bf5: Local Vite/Playwright serves repo `web/previews` (no Vercel CDN); Example featured trio gains Title/Bento/Compare crop parity with Generate + theme tray.

### Patch Changes

- 976a9b6: Add custom-html insert presets (split / big number / stamps / type explosion) in the slide editor.
- Updated dependencies [976a9b6]
- Updated dependencies [9ddc04b]
  - @presentation-md/core@1.17.0
  - @presentation-md/export@1.23.8

## 1.7.0

### Minor Changes

- e57e02b: Generate modal defaults live Title/Bento/Compare discover on; theme pick-3 auto-enables live when the tray hits 3 — show-don't-tell without an extra click vs frontend-slides galleries.

### Patch Changes

- c197f45: Lead the four leftover stunning-25 flagships (gridsystems, ledgerline, hygge, pulse-wrapped) with title → feature-grid → comparison so Studio crop deep-links and Example live trio stay aligned — Deck JSON only, no HTML regen.
- Updated dependencies [976c2a4]
  - @presentation-md/core@1.16.5
  - @presentation-md/export@1.23.7

## 1.6.1

### Patch Changes

- e653c9e: Generate modal gains Title/Bento/Compare live crops (parity with theme tray); Example browser shows a live featured trio + theme swatches; `preview_themes` auto-defaults pick-3 (≥2 themes) to layouts mode; flagship Deck JSON leads with title → feature-grid → comparison for Studio crop alignment; site + skill copy densify show-don't-tell vs frontend-slides.
- Updated dependencies [e653c9e]
  - @presentation-md/core@1.16.4
  - @presentation-md/export@1.23.6

## 1.6.0

### Minor Changes

- e3ba1f2: Studio pick-3 live compare gains Title/Bento/Compare crops; Generate modal live discover iframes; HTML download uses cached preview + Source menu z-index above audit (e2e-stable).

### Patch Changes

- Updated dependencies [e341b5f]
  - @presentation-md/core@1.16.3
  - @presentation-md/export@1.23.5

## 1.5.4

### Patch Changes

- Updated dependencies [8de2f80]
  - @presentation-md/core@1.16.2
  - @presentation-md/export@1.23.4

## 1.5.3

### Patch Changes

- Updated dependencies [c3f9ca7]
  - @presentation-md/core@1.16.1
  - @presentation-md/export@1.23.3

## 1.5.2

### Patch Changes

- Updated dependencies [2c0a7dc]
  - @presentation-md/core@1.16.0
  - @presentation-md/export@1.23.2

## 1.5.1

### Patch Changes

- Updated dependencies [1630a4e]
  - @presentation-md/core@1.15.0
  - @presentation-md/export@1.23.1

## 1.5.0

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

## 1.4.8

### Patch Changes

- Updated dependencies [059c89f]
  - @presentation-md/core@1.13.2
  - @presentation-md/export@1.22.1

## 1.4.7

### Patch Changes

- d6ca564: preview_themes accepts shortlist ids for Theme Discovery; sync FT/biennale top-rule honesty across skill, MCP craft mandate, and Studio.
- Updated dependencies [58c81f2]
- Updated dependencies [d6ca564]
  - @presentation-md/export@1.22.0
  - @presentation-md/core@1.13.1

## 1.4.6

### Patch Changes

- 2b42e2a: list_themes shortlist/mood/query filters + shortlists catalog; inject theme shortlists into generate_deck_prompt for intelligent defaults; sync literary left-rule honesty.
- Updated dependencies [a8e8c0a]
- Updated dependencies [8a839a8]
  - @presentation-md/export@1.21.0
  - @presentation-md/core@1.13.0

## 1.4.5

### Patch Changes

- f512620: Add neon-tech, data-editorial, and scatterbrain layout recipes; sync craft-mandate recipe lists and paper-ink left-rule honesty across skill, MCP, and Studio.
- Updated dependencies [f512620]
- Updated dependencies [772dcc9]
  - @presentation-md/core@1.12.4
  - @presentation-md/export@1.20.5

## 1.4.4

### Patch Changes

- a5985a3: Gate soft-product, playful, neon-tech, scatterbrain, and data-editorial craft beats; extend paper honesty to scandinavian and PPTX thin-peer card strokes.
- Updated dependencies [a5985a3]
- Updated dependencies [ffc72f5]
  - @presentation-md/core@1.12.3
  - @presentation-md/export@1.20.4

## 1.4.3

### Patch Changes

- 079c760: Gate signal briefing and luxury-minimalist quiet-luxe craft; extend skill/MCP/Studio honesty and layout recipes (no web deploy).
- Updated dependencies [079c760]
- Updated dependencies [fadff85]
- Updated dependencies [d28fc27]
  - @presentation-md/core@1.12.2
  - @presentation-md/export@1.20.3

## 1.4.2

### Patch Changes

- Updated dependencies [74ce065]
  - @presentation-md/export@1.20.2

## 1.4.1

### Patch Changes

- d1749c0: Add modernist honesty (swiss / art-deco / bauhaus) to Studio generate craft mandate.
- Updated dependencies [d1749c0]
  - @presentation-md/core@1.12.1
  - @presentation-md/export@1.20.1

## 1.4.0

### Minor Changes

- 7d0a0e6: Raise Studio generate craft mandate to match MCP honesty (recipes, HUD/glass/loud hard-card peers).

### Patch Changes

- Updated dependencies [7d0a0e6]
- Updated dependencies [c37edbe]
- Updated dependencies [0264b50]
  - @presentation-md/core@1.12.0
  - @presentation-md/export@1.20.0

## 1.3.18

### Patch Changes

- Updated dependencies [2a8d979]
- Updated dependencies [92387aa]
  - @presentation-md/core@1.11.0
  - @presentation-md/export@1.19.0

## 1.3.17

### Patch Changes

- Updated dependencies [8fd4189]
- Updated dependencies [fb22ade]
  - @presentation-md/core@1.10.0
  - @presentation-md/export@1.18.0

## 1.3.16

### Patch Changes

- Updated dependencies [ad33c66]
- Updated dependencies [eeea009]
  - @presentation-md/core@1.9.0
  - @presentation-md/export@1.17.0

## 1.3.15

### Patch Changes

- Updated dependencies [f5d51a8]
- Updated dependencies [5b33db9]
  - @presentation-md/export@1.16.3
  - @presentation-md/core@1.8.7

## 1.3.14

### Patch Changes

- Updated dependencies [854321c]
  - @presentation-md/export@1.16.2

## 1.3.13

### Patch Changes

- Updated dependencies [68cc6a6]
- Updated dependencies [6fcf4db]
  - @presentation-md/export@1.16.1
  - @presentation-md/core@1.8.6

## 1.3.12

### Patch Changes

- Updated dependencies [05d8c04]
- Updated dependencies [44b46db]
  - @presentation-md/export@1.16.0
  - @presentation-md/core@1.8.5

## 1.3.11

### Patch Changes

- Updated dependencies [e7c5f4e]
- Updated dependencies [bc3f18f]
  - @presentation-md/export@1.15.0
  - @presentation-md/core@1.8.4

## 1.3.10

### Patch Changes

- d6d8191: Collapse Studio mobile secondary actions into More, and polish audit panel as a fixed bottom sheet on narrow viewports.
- Updated dependencies [e3cd10d]
- Updated dependencies [9274c8c]
  - @presentation-md/export@1.14.0
  - @presentation-md/core@1.8.3

## 1.3.9

### Patch Changes

- Updated dependencies [054408d]
- Updated dependencies [d922258]
  - @presentation-md/export@1.13.2
  - @presentation-md/core@1.8.2

## 1.3.8

### Patch Changes

- Updated dependencies [5dbbe2f]
  - @presentation-md/export@1.13.1
  - @presentation-md/core@1.8.1

## 1.3.7

### Patch Changes

- Updated dependencies [3019e5f]
  - @presentation-md/core@1.8.0
  - @presentation-md/export@1.13.0

## 1.3.6

### Patch Changes

- 9a043b3: Deepen PPTX chrome for aerospace-hud, blueprint, crt-terminal, bold-signal, mat, and brutalist-acid; denser vellum/paper-ink ornaments; upgrade soft-editorial/vellum/paper-ink proof decks; fix Studio Vite node:\* externals that blank-screened the SPA; add craft-audit e2e.
- Updated dependencies [9a043b3]
  - @presentation-md/export@1.12.2

## 1.3.5

### Patch Changes

- Updated dependencies [a200fcb]
- Updated dependencies [83d16c1]
  - @presentation-md/export@1.12.1
  - @presentation-md/core@1.7.5

## 1.3.4

### Patch Changes

- Updated dependencies [e67f07e]
- Updated dependencies [d1a8408]
  - @presentation-md/export@1.12.0
  - @presentation-md/core@1.7.4

## 1.3.2

### Patch Changes

- 582e094: Riso print-beat craft gate + skill/MCP Pulse/riso/candy guidance; Studio live craft badge on Audit craft as you edit.
- Updated dependencies [582e094]
- Updated dependencies [c9e59f2]
  - @presentation-md/core@1.7.3
  - @presentation-md/export@1.11.1

## 1.3.1

### Patch Changes

- 1941cf9: Document that every theme package now gets native PPTX surface-chrome approximations, and steer agents toward loud/thin themes instead of custom-html for brand atmosphere.
- Updated dependencies [a481a33]
- Updated dependencies [1941cf9]
- Updated dependencies [2f8f516]
  - @presentation-md/export@1.11.0
  - @presentation-md/core@1.7.2

## 1.3.0

### Minor Changes

- 7aa0385: Stronger dual-CTA / closing-icon craft gates (including stunning-25 single-CTA), Studio jump-to-slide from audit issues, MCP craft mandate for action icons, and stunning-25 example closing icons.

### Patch Changes

- Updated dependencies [7aa0385]
- Updated dependencies [9f935f0]
  - @presentation-md/core@1.7.1
  - @presentation-md/export@1.10.1

## 1.2.0

### Minor Changes

- 2bd5d7e: Craft-audit slide indices, candy-pop brand gate, social closing icon hint; Studio audit panel severity filters; MCP craft mandate for candy marquee.

### Patch Changes

- Updated dependencies [2bd5d7e]
- Updated dependencies [2bd5d7e]
- Updated dependencies [dfa2b5a]
  - @presentation-md/core@1.7.0
  - @presentation-md/export@1.10.0

## 1.1.7

### Patch Changes

- Updated dependencies [8027a0e]
  - @presentation-md/core@1.6.1
  - @presentation-md/export@1.9.1

## 1.1.6

### Patch Changes

- c7ce9a5: Extract shared `auditCraft` into `@presentation-md/core` so Studio Audit and MCP `audit_deck` share one craft-gate source.
- 090d2c6: Studio audit/PPTX issues panel; CRT/blueprint/acid PPTX surface chrome.
- Updated dependencies [96d87eb]
- Updated dependencies [d58fa5a]
- Updated dependencies [c7ce9a5]
- Updated dependencies [c7ce9a5]
- Updated dependencies [090d2c6]
  - @presentation-md/export@1.9.0
  - @presentation-md/core@1.6.0

## 1.1.5

### Patch Changes

- 027dcea: Add Audit craft toolbar button with browser-side craft gates.
  - @presentation-md/export@1.8.1

## 1.1.4

### Patch Changes

- Updated dependencies [2e00f07]
  - @presentation-md/export@1.8.0

## 1.1.3

### Patch Changes

- Updated dependencies [932ace2]
  - @presentation-md/export@1.7.0

## 1.1.2

### Patch Changes

- Updated dependencies [b48ff58]
- Updated dependencies [b1f2b74]
- Updated dependencies [1fb09b1]
- Updated dependencies [9463f80]
  - @presentation-md/export@1.6.0

## 1.1.1

### Patch Changes

- Updated dependencies [46e081e]
  - @presentation-md/export@1.5.0

## 1.1.0

### Minor Changes

- de75364: Add chart + custom-html layouts, Markdown→Deck JSON bridge, judge_deck MCP, and Pulse multi-hue craft.

### Patch Changes

- Updated dependencies [de75364]
  - @presentation-md/export@1.4.0

## 1.0.10

### Patch Changes

- Updated dependencies [517fd38]
  - @presentation-md/export@1.3.7

## 1.0.9

### Patch Changes

- Updated dependencies [c166225]
  - @presentation-md/export@1.3.6

## 1.0.8

### Patch Changes

- Updated dependencies [855f8a7]
  - @presentation-md/export@1.3.5

## 1.0.7

### Patch Changes

- Updated dependencies [e0f70bd]
- Updated dependencies [9cd4658]
- Updated dependencies [bc744bf]
  - @presentation-md/export@1.3.4

## 1.0.6

### Patch Changes

- @presentation-md/export@1.3.3

## 1.0.5

### Patch Changes

- Updated dependencies [545ccd8]
  - @presentation-md/export@1.3.2

## 1.0.4

### Patch Changes

- Updated dependencies [23e3a1f]
  - @presentation-md/export@1.3.1

## 1.0.3

### Patch Changes

- Updated dependencies [61cb2b0]
  - @presentation-md/export@1.3.0

## 1.0.2

### Patch Changes

- Updated dependencies [42bee0e]
  - @presentation-md/export@1.2.0

## 1.0.1

### Patch Changes

- Updated dependencies
  - @presentation-md/export@1.1.0

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Patch Changes

- 4dfb90b: Harden PPTX import against review findings: correct assetsDir image refs,
  enforce post-decompress zip size limits, realpath write containment, preserve
  speaker notes, and reopen legacy psp-deck HTML embeds.
- Updated dependencies [a3f8544]
- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/export@1.0.0
