# @presentation-md/render

## 1.13.0

### Minor Changes

- 1a7764e: CLI `--format notes_txt` / `notes_vtt` exports speaker-notes handouts (MCP export_deck + Studio parity).

## 1.12.2

### Patch Changes

- Updated dependencies [54f5d3c]
  - @presentation-md/core@1.26.0
  - @presentation-md/export@1.23.26

## 1.12.1

### Patch Changes

- Updated dependencies [2d01abe]
  - @presentation-md/core@1.25.0
  - @presentation-md/export@1.23.25

## 1.12.0

### Minor Changes

- ce899cf: CLI craft loop: `--scaffold`, `--audit [--fix]`, and `--apply-theme` (MCP scaffold/audit/apply_theme parity for shell agents).

## 1.11.0

### Minor Changes

- 1e61cb2: Deck → Marp/md-slides **Markdown export** (`deckToMarkdown`): Studio Download Markdown, MCP/CLI `format: md`, round-trip with import_markdown / Paste MD / Open .md.

### Patch Changes

- Updated dependencies [1e61cb2]
  - @presentation-md/core@1.24.0
  - @presentation-md/export@1.23.24

## 1.10.2

### Patch Changes

- 3c10303: Studio Present mode gains an **Up next** slide peek beside speaker notes (Pitch-class dual pane). CLI `--preview-mode` error copy includes `deck`.
- Updated dependencies [3e26a49]
  - @presentation-md/core@1.23.0
  - @presentation-md/export@1.23.23

## 1.10.1

### Patch Changes

- 29639e3: Studio theme browser applies repairCraft on every theme pick (My deck Use / MCP apply_theme parity). Harden CLI --preview-compare PNG assertions against partial Chrome densify flakes on macOS CI.

## 1.10.0

### Minor Changes

- fb48c18: CLI `--preview-deck` + `--preview-slide` restyle your Deck JSON across `--preview-compare` themes (Studio/MCP My deck parity).

## 1.9.9

### Patch Changes

- Updated dependencies [e0731d9]
  - @presentation-md/core@1.22.4
  - @presentation-md/export@1.23.22

## 1.9.8

### Patch Changes

- Updated dependencies [0608094]
  - @presentation-md/core@1.22.3
  - @presentation-md/export@1.23.21

## 1.9.7

### Patch Changes

- Updated dependencies [0e8e59c]
  - @presentation-md/core@1.22.2
  - @presentation-md/export@1.23.20

## 1.9.6

### Patch Changes

- Updated dependencies [706e441]
  - @presentation-md/core@1.22.1
  - @presentation-md/export@1.23.19

## 1.9.5

### Patch Changes

- Updated dependencies [a384de0]
  - @presentation-md/core@1.22.0
  - @presentation-md/export@1.23.18

## 1.9.4

### Patch Changes

- Updated dependencies [129dbba]
  - @presentation-md/core@1.21.0
  - @presentation-md/export@1.23.17

## 1.9.3

### Patch Changes

- Updated dependencies [41bb08c]
  - @presentation-md/core@1.20.0
  - @presentation-md/export@1.23.16

## 1.9.2

### Patch Changes

- Updated dependencies [7b9976e]
  - @presentation-md/core@1.19.5
  - @presentation-md/export@1.23.15

## 1.9.1

### Patch Changes

- Updated dependencies [2390e2b]
  - @presentation-md/core@1.19.4
  - @presentation-md/export@1.23.14

## 1.9.0

### Minor Changes

- ab97a8f: CLI `--preview-compare` captures discovery PNGs via the shared Chrome isolate path with MCP `preview_themes` (title + bento + comparison); Studio pick-3 live compare shows a Title/Bento/Compare shot strip.

### Patch Changes

- Updated dependencies [ab97a8f]
  - @presentation-md/core@1.19.3
  - @presentation-md/export@1.23.13

## 1.8.1

### Patch Changes

- Updated dependencies [f7445a4]
  - @presentation-md/core@1.19.2
  - @presentation-md/export@1.23.12

## 1.8.0

### Minor Changes

- 05cf502: Wire vector PDF into MCP `export_deck` and CLI `--format pdf` (Chromium print via core export-pdf pipeline), plus `@page` 16:9 print sizing.

### Patch Changes

- Updated dependencies [05cf502]
  - @presentation-md/core@1.19.1
  - @presentation-md/export@1.23.11

## 1.7.6

### Patch Changes

- Updated dependencies [031f94b]
  - @presentation-md/core@1.19.0
  - @presentation-md/export@1.23.10

## 1.7.5

### Patch Changes

- Updated dependencies [9d22c98]
  - @presentation-md/core@1.18.0
  - @presentation-md/export@1.23.9

## 1.7.4

### Patch Changes

- Updated dependencies [976a9b6]
- Updated dependencies [9ddc04b]
  - @presentation-md/core@1.17.0
  - @presentation-md/export@1.23.8

## 1.7.3

### Patch Changes

- Updated dependencies [976c2a4]
  - @presentation-md/core@1.16.5
  - @presentation-md/export@1.23.7

## 1.7.2

### Patch Changes

- Updated dependencies [e653c9e]
  - @presentation-md/core@1.16.4
  - @presentation-md/export@1.23.6

## 1.7.1

### Patch Changes

- 5c27794: Share canonical title/layouts theme-preview decks between CLI `--preview-compare` and MCP `preview_themes` (incl. kinetic-wrapped craft).

## 1.7.0

### Minor Changes

- 50a7c3b: CLI `--preview-compare` writes 1–3 multi-layout craft theme previews (pick-3 discovery without MCP).

### Patch Changes

- Updated dependencies [e341b5f]
  - @presentation-md/core@1.16.3
  - @presentation-md/export@1.23.5

## 1.6.36

### Patch Changes

- Updated dependencies [8de2f80]
  - @presentation-md/core@1.16.2
  - @presentation-md/export@1.23.4

## 1.6.35

### Patch Changes

- Updated dependencies [c3f9ca7]
  - @presentation-md/core@1.16.1
  - @presentation-md/export@1.23.3

## 1.6.34

### Patch Changes

- 42881e7: Cover `--from-pptx --assets-dir` in CLI tests and document the flag in the render README.

## 1.6.33

### Patch Changes

- 4043229: Export `buildProgram` for hermetic CLI tests; document `--from-md`; cover list/validate/theme/format/from-pptx/from-md/stdin flags.

## 1.6.32

### Patch Changes

- Updated dependencies [2c0a7dc]
  - @presentation-md/core@1.16.0
  - @presentation-md/export@1.23.2

## 1.6.31

### Patch Changes

- Updated dependencies [1630a4e]
  - @presentation-md/core@1.15.0
  - @presentation-md/export@1.23.1

## 1.6.30

### Patch Changes

- Updated dependencies [e6b54be]
  - @presentation-md/core@1.14.0
  - @presentation-md/export@1.23.0

## 1.6.29

### Patch Changes

- Updated dependencies [059c89f]
  - @presentation-md/core@1.13.2
  - @presentation-md/export@1.22.1

## 1.6.28

### Patch Changes

- 58c81f2: Map ft-editorial cards to broadsheet top accent rules in PPTX (HTML border-top peers of quiet-luxe / biennale), and clarify literary left-rule peers stay paper-ink / editorial-serif / vintage-editorial only.
- Updated dependencies [58c81f2]
- Updated dependencies [d6ca564]
  - @presentation-md/export@1.22.0
  - @presentation-md/core@1.13.1

## 1.6.27

### Patch Changes

- a8e8c0a: Map editorial-serif and vintage-editorial cards to literary left accent rules (HTML + PPTX peers of paper-ink).
- Updated dependencies [a8e8c0a]
- Updated dependencies [8a839a8]
  - @presentation-md/export@1.21.0
  - @presentation-md/core@1.13.0

## 1.6.26

### Patch Changes

- Updated dependencies [f512620]
- Updated dependencies [772dcc9]
  - @presentation-md/core@1.12.4
  - @presentation-md/export@1.20.5

## 1.6.25

### Patch Changes

- Updated dependencies [a5985a3]
- Updated dependencies [ffc72f5]
  - @presentation-md/core@1.12.3
  - @presentation-md/export@1.20.4

## 1.6.24

### Patch Changes

- Updated dependencies [079c760]
- Updated dependencies [fadff85]
- Updated dependencies [d28fc27]
  - @presentation-md/core@1.12.2
  - @presentation-md/export@1.20.3

## 1.6.23

### Patch Changes

- Updated dependencies [74ce065]
  - @presentation-md/export@1.20.2

## 1.6.22

### Patch Changes

- Updated dependencies [d1749c0]
  - @presentation-md/core@1.12.1
  - @presentation-md/export@1.20.1

## 1.6.21

### Patch Changes

- Updated dependencies [7d0a0e6]
- Updated dependencies [c37edbe]
- Updated dependencies [0264b50]
  - @presentation-md/core@1.12.0
  - @presentation-md/export@1.20.0

## 1.6.20

### Patch Changes

- Updated dependencies [2a8d979]
- Updated dependencies [92387aa]
  - @presentation-md/core@1.11.0
  - @presentation-md/export@1.19.0

## 1.6.19

### Patch Changes

- Updated dependencies [8fd4189]
- Updated dependencies [fb22ade]
  - @presentation-md/core@1.10.0
  - @presentation-md/export@1.18.0

## 1.6.18

### Patch Changes

- Updated dependencies [ad33c66]
- Updated dependencies [eeea009]
  - @presentation-md/core@1.9.0
  - @presentation-md/export@1.17.0

## 1.6.17

### Patch Changes

- Updated dependencies [f5d51a8]
- Updated dependencies [5b33db9]
  - @presentation-md/export@1.16.3
  - @presentation-md/core@1.8.7

## 1.6.16

### Patch Changes

- Updated dependencies [854321c]
  - @presentation-md/export@1.16.2

## 1.6.15

### Patch Changes

- Updated dependencies [68cc6a6]
- Updated dependencies [6fcf4db]
  - @presentation-md/export@1.16.1
  - @presentation-md/core@1.8.6

## 1.6.14

### Patch Changes

- Updated dependencies [05d8c04]
- Updated dependencies [44b46db]
  - @presentation-md/export@1.16.0
  - @presentation-md/core@1.8.5

## 1.6.13

### Patch Changes

- Updated dependencies [e7c5f4e]
- Updated dependencies [bc3f18f]
  - @presentation-md/export@1.15.0
  - @presentation-md/core@1.8.4

## 1.6.12

### Patch Changes

- Updated dependencies [e3cd10d]
- Updated dependencies [9274c8c]
  - @presentation-md/export@1.14.0
  - @presentation-md/core@1.8.3

## 1.6.11

### Patch Changes

- Updated dependencies [054408d]
- Updated dependencies [d922258]
  - @presentation-md/export@1.13.2
  - @presentation-md/core@1.8.2

## 1.6.10

### Patch Changes

- Updated dependencies [5dbbe2f]
  - @presentation-md/export@1.13.1
  - @presentation-md/core@1.8.1

## 1.6.9

### Patch Changes

- Updated dependencies [3019e5f]
  - @presentation-md/core@1.8.0
  - @presentation-md/export@1.13.0

## 1.6.8

### Patch Changes

- Updated dependencies [9a043b3]
  - @presentation-md/export@1.12.2

## 1.6.7

### Patch Changes

- c17dfbf: Quiet HTML paper fiber grain across editorial / parchment theme surfaces (vellum, heritage, pin-and-paper, paper-ink, FT, and peers). PPTX still approximates rules/washes only — grain stays HTML-only.
- Updated dependencies [a200fcb]
- Updated dependencies [83d16c1]
  - @presentation-md/export@1.12.1
  - @presentation-md/core@1.7.5

## 1.6.6

### Patch Changes

- d1a8408: Quieter HTML paper grain for soft-editorial / warm-paper / broadsheet; skill + MCP/Studio guidance for Pulse chips and candy card borders.
- Updated dependencies [e67f07e]
- Updated dependencies [d1a8408]
  - @presentation-md/export@1.12.0
  - @presentation-md/core@1.7.4

## 1.6.5

### Patch Changes

- Updated dependencies [582e094]
- Updated dependencies [c9e59f2]
  - @presentation-md/core@1.7.3
  - @presentation-md/export@1.11.1

## 1.6.4

### Patch Changes

- Updated dependencies [a481a33]
- Updated dependencies [1941cf9]
- Updated dependencies [2f8f516]
  - @presentation-md/export@1.11.0
  - @presentation-md/core@1.7.2

## 1.6.3

### Patch Changes

- Updated dependencies [7aa0385]
- Updated dependencies [9f935f0]
  - @presentation-md/core@1.7.1
  - @presentation-md/export@1.10.1

## 1.6.2

### Patch Changes

- 2bd5d7e: Dense PPTX chrome for swiss/FT/bauhaus/fintech/scandi/art-deco/botanical themes; candy marquee brands from meta.company/title/marquee (not Jellybean-hardcoded).
- Updated dependencies [2bd5d7e]
- Updated dependencies [2bd5d7e]
- Updated dependencies [dfa2b5a]
  - @presentation-md/core@1.7.0
  - @presentation-md/export@1.10.0

## 1.6.1

### Patch Changes

- Updated dependencies [8027a0e]
  - @presentation-md/core@1.6.1
  - @presentation-md/export@1.9.1

## 1.6.0

### Minor Changes

- c7ce9a5: PPTX soft-blob / overprint approximations for Pulse, risograph, and candy-pop; HTML candy marquee + stronger riso multiply; stunning-25 dual-CTA closings.

### Patch Changes

- Updated dependencies [96d87eb]
- Updated dependencies [d58fa5a]
- Updated dependencies [c7ce9a5]
- Updated dependencies [c7ce9a5]
- Updated dependencies [090d2c6]
  - @presentation-md/export@1.9.0
  - @presentation-md/core@1.6.0

## 1.5.2

### Patch Changes

- Updated dependencies [40d506a]
  - @presentation-md/core@1.5.0
  - @presentation-md/export@1.8.1

## 1.5.1

### Patch Changes

- Updated dependencies [2e00f07]
  - @presentation-md/core@1.4.1
  - @presentation-md/export@1.8.0

## 1.5.0

### Minor Changes

- 932ace2: Add streak-grid + metric-ring layouts and closing actions[] for Pulse share pills; wire Studio/export/MCP and close gallery leftovers.

### Patch Changes

- Updated dependencies [932ace2]
  - @presentation-md/core@1.4.0
  - @presentation-md/export@1.7.0

## 1.4.0

### Minor Changes

- b1f2b74: Add logo-wall layout for customer/partner marks; fix export prefer-const lint.
- 1fb09b1: Add ranked-list layout and stat-row hero mega-stat for wrap decks; Studio tone editing; Pulse gallery parity.

### Patch Changes

- b48ff58: Deepen stunning-25 body chrome; improve PPTX icons/timeline; local_draft T3 when panel keys missing.
- 9463f80: Align PPTX timeline with horizontal HTML rail; add orientation vertical process option.
- Updated dependencies [b48ff58]
- Updated dependencies [b1f2b74]
- Updated dependencies [1fb09b1]
- Updated dependencies [9463f80]
  - @presentation-md/export@1.6.0
  - @presentation-md/core@1.3.0

## 1.3.1

### Patch Changes

- dc54af0: judge_deck T2/T3: HTML metrics + Chrome screenshots; document harness `#__shot` for per-slide capture
- abe9cd4: Pulse wrapped-block soft blobs, tone-field craft, and gallery-closer structured proof
- Updated dependencies [dc54af0]
- Updated dependencies [46e081e]
  - @presentation-md/core@1.2.1
  - @presentation-md/export@1.5.0

## 1.3.0

### Minor Changes

- de75364: Add chart + custom-html layouts, Markdown→Deck JSON bridge, judge_deck MCP, and Pulse multi-hue craft.

### Patch Changes

- Updated dependencies [de75364]
  - @presentation-md/core@1.2.0
  - @presentation-md/export@1.4.0

## 1.2.11

### Patch Changes

- b114335: Punch kinetic-wrapped toward Pulse craft — brighter muted, louder acid borders, lime title/closing fields.
- 517fd38: Align luxury-minimalist with Solstice ultra-luxury craft (nocturnal stage, cream type, gold hairlines) and PPTX emphasis fills.
- Updated dependencies [517fd38]
  - @presentation-md/export@1.3.7

## 1.2.10

### Patch Changes

- Updated dependencies [c166225]
  - @presentation-md/export@1.3.6

## 1.2.9

### Patch Changes

- Updated dependencies [855f8a7]
  - @presentation-md/export@1.3.5

## 1.2.8

### Patch Changes

- e0f70bd: Align dual-surface cardBg with HTML craft (bold-signal orange → tinted dark, creative-voltage opaque navy), raise mat/soft-editorial muted AA on tint washes, lift PPTX craft (icon letter markers, gradient/title chrome, cardMuted + accent emphasis fills), and promote Studio on vs pages + homepage.
- Updated dependencies [e0f70bd]
- Updated dependencies [9cd4658]
- Updated dependencies [bc744bf]
  - @presentation-md/export@1.3.4

## 1.2.7

### Patch Changes

- Updated dependencies [9bb1dba]
  - @presentation-md/core@1.1.2
  - @presentation-md/export@1.3.3

## 1.2.6

### Patch Changes

- 700c2d3: Raise muted role AA against slide backgrounds, card surfaces, and accent@18% tints across editorial and loud themes; add mat dual-surface card muted overrides and creative-voltage lead contrast.

## 1.2.5

### Patch Changes

- c2f4354: Raise remaining loud-surface comparison/feature-grid AA contrast (mat, pastel, soft-bento, acid/studio lime fills, and missing bento hero ink/white overrides).

## 1.2.4

### Patch Changes

- Updated dependencies [545ccd8]
  - @presentation-md/export@1.3.2
  - @presentation-md/core@1.1.1

## 1.2.3

### Patch Changes

- 23e3a1f: Prefetch local file:/ paths for PPTX embeds (with allowedRoots confinement); raise neon/vapor/loud comparison and feature-grid AA contrast.
- Updated dependencies [23e3a1f]
  - @presentation-md/export@1.3.1

## 1.2.2

### Patch Changes

- 61cb2b0: Prefetch remote http(s) slide images before PPTX export so CLI/MCP embeds match Studio; raise comparison/feature-grid contrast on loud accent fills.
- Updated dependencies [61cb2b0]
  - @presentation-md/export@1.3.0

## 1.2.1

### Patch Changes

- 0e5274f: Soften remaining loud surface ornaments on content slides (notebook tabs, long-table, mat, soft-editorial) so chrome doesn't sit on copy.
- Updated dependencies [42bee0e]
  - @presentation-md/export@1.2.0

## 1.2.0

### Minor Changes

- 4dbb572: Ship image-hero storytelling motion, denser asymmetric bento/ratio craft, and package the shared layout CSS inside `@presentation-md/render` so npm consumers get the same craft ceiling as the site proofs.

## 1.1.0

### Minor Changes

- Add `code` layout, asymmetric two-column/comparison/bento craft, and `preview_themes` multi-layout mode.

### Patch Changes

- Updated dependencies
  - @presentation-md/core@1.1.0
  - @presentation-md/export@1.1.0

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Minor Changes

- e4b502e: Embed the source Deck JSON in rendered HTML so created presentations are editable.

  Every rendered deck now includes a `<script type="application/json" id="pmd-deck">`
  carrying its source spec (opt out with `embedSource: false`). This lets a created
  `.html` be reopened and edited (e.g. in the studio) and re-rendered identically.
  CLI (`render`) and the MCP `render_deck`/`export_deck` tools inherit this automatically.

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

- e9b8afd: Skill craft upgrade inspired by frontend-slides: honest 9-layout schema alignment,
  theme selection index + show-don't-tell discovery, real MCP tool table (and matching
  README/marketing copy), install SKILL sync, and keyboard / reduced-motion / entrance
  motion in the shared HTML renderer.

### Patch Changes

- 4dfb90b: Harden PPTX import against review findings: correct assetsDir image refs,
  enforce post-decompress zip size limits, realpath write containment, preserve
  speaker notes, and reopen legacy psp-deck HTML embeds.
- Updated dependencies [a3f8544]
- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/export@1.0.0
  - @presentation-md/core@1.0.0

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.

### Patch Changes

- Updated dependencies [d8d2fb0]
  - @presentation-md/core@0.2.0
