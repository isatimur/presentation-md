# @presentation-md/studio

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
