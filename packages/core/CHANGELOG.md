# @presentation-md/core

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
