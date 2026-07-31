# @presentation-md/core

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
