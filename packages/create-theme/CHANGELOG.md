# @presentation-md/create-theme

## 1.1.34

### Patch Changes

- Updated dependencies [61530ed]
  - @presentation-md/core@1.31.1

## 1.1.33

### Patch Changes

- Updated dependencies [4a7a941]
  - @presentation-md/core@1.31.0

## 1.1.32

### Patch Changes

- Updated dependencies [8056710]
  - @presentation-md/core@1.30.0

## 1.1.31

### Patch Changes

- Updated dependencies [2a02ed4]
  - @presentation-md/core@1.29.0

## 1.1.30

### Patch Changes

- 51e69e3: Align brand CSS fetch SSRF checks with shared public-address policy.

  Block localhost/internal hostnames and non-global unicast IPs before DNS/fetch, matching Studio/PDF network policy.

## 1.1.29

### Patch Changes

- 69778f3: Dispose Playwright redirect responses in brand-extract route guard.

  Fail-closed redirect hops now dispose intermediate responses before abort/fetch to avoid leaked handles.

## 1.1.28

### Patch Changes

- Updated dependencies [bf6d00d]
  - @presentation-md/core@1.28.0

## 1.1.27

### Patch Changes

- Updated dependencies [9d3c5a5]
- Updated dependencies [a784e9e]
  - @presentation-md/core@1.27.0

## 1.1.26

### Patch Changes

- Updated dependencies [54f5d3c]
  - @presentation-md/core@1.26.0

## 1.1.25

### Patch Changes

- Updated dependencies [2d01abe]
  - @presentation-md/core@1.25.0

## 1.1.24

### Patch Changes

- Updated dependencies [1e61cb2]
  - @presentation-md/core@1.24.0

## 1.1.23

### Patch Changes

- Updated dependencies [3e26a49]
  - @presentation-md/core@1.23.0

## 1.1.22

### Patch Changes

- Updated dependencies [e0731d9]
  - @presentation-md/core@1.22.4

## 1.1.21

### Patch Changes

- Updated dependencies [0608094]
  - @presentation-md/core@1.22.3

## 1.1.20

### Patch Changes

- Updated dependencies [0e8e59c]
  - @presentation-md/core@1.22.2

## 1.1.19

### Patch Changes

- Updated dependencies [706e441]
  - @presentation-md/core@1.22.1

## 1.1.18

### Patch Changes

- Updated dependencies [a384de0]
  - @presentation-md/core@1.22.0

## 1.1.17

### Patch Changes

- Updated dependencies [129dbba]
  - @presentation-md/core@1.21.0

## 1.1.16

### Patch Changes

- Updated dependencies [41bb08c]
  - @presentation-md/core@1.20.0

## 1.1.15

### Patch Changes

- Updated dependencies [7b9976e]
  - @presentation-md/core@1.19.5

## 1.1.14

### Patch Changes

- Updated dependencies [2390e2b]
  - @presentation-md/core@1.19.4

## 1.1.13

### Patch Changes

- Updated dependencies [ab97a8f]
  - @presentation-md/core@1.19.3

## 1.1.12

### Patch Changes

- Updated dependencies [f7445a4]
  - @presentation-md/core@1.19.2

## 1.1.11

### Patch Changes

- Updated dependencies [05cf502]
  - @presentation-md/core@1.19.1

## 1.1.10

### Patch Changes

- Updated dependencies [031f94b]
  - @presentation-md/core@1.19.0

## 1.1.9

### Patch Changes

- Updated dependencies [9d22c98]
  - @presentation-md/core@1.18.0

## 1.1.8

### Patch Changes

- Updated dependencies [976a9b6]
- Updated dependencies [9ddc04b]
  - @presentation-md/core@1.17.0

## 1.1.7

### Patch Changes

- Updated dependencies [976c2a4]
  - @presentation-md/core@1.16.5

## 1.1.6

### Patch Changes

- Updated dependencies [e653c9e]
  - @presentation-md/core@1.16.4

## 1.1.5

### Patch Changes

- Updated dependencies [e341b5f]
  - @presentation-md/core@1.16.3

## 1.1.4

### Patch Changes

- Updated dependencies [8de2f80]
  - @presentation-md/core@1.16.2

## 1.1.3

### Patch Changes

- Updated dependencies [c3f9ca7]
  - @presentation-md/core@1.16.1

## 1.1.2

### Patch Changes

- 2c0a7dc: Ship PDF/deploy scripts in published core, sync Claude plugin skill + deck schema from core, document markdown craft heuristics, and harden MCP write paths with shared cwd containment + export/render tests.
- Updated dependencies [2c0a7dc]
  - @presentation-md/core@1.16.0

## 1.1.1

### Patch Changes

- Updated dependencies [1630a4e]
  - @presentation-md/core@1.15.0

## 1.1.0

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

## 1.0.36

### Patch Changes

- Updated dependencies [059c89f]
  - @presentation-md/core@1.13.2

## 1.0.35

### Patch Changes

- Updated dependencies [d6ca564]
  - @presentation-md/core@1.13.1

## 1.0.34

### Patch Changes

- Updated dependencies [8a839a8]
  - @presentation-md/core@1.13.0

## 1.0.33

### Patch Changes

- Updated dependencies [f512620]
  - @presentation-md/core@1.12.4

## 1.0.32

### Patch Changes

- Updated dependencies [a5985a3]
  - @presentation-md/core@1.12.3

## 1.0.31

### Patch Changes

- Updated dependencies [079c760]
- Updated dependencies [d28fc27]
  - @presentation-md/core@1.12.2

## 1.0.30

### Patch Changes

- Updated dependencies [d1749c0]
  - @presentation-md/core@1.12.1

## 1.0.29

### Patch Changes

- Updated dependencies [7d0a0e6]
  - @presentation-md/core@1.12.0

## 1.0.28

### Patch Changes

- Updated dependencies [2a8d979]
  - @presentation-md/core@1.11.0

## 1.0.27

### Patch Changes

- Updated dependencies [8fd4189]
  - @presentation-md/core@1.10.0

## 1.0.26

### Patch Changes

- Updated dependencies [ad33c66]
  - @presentation-md/core@1.9.0

## 1.0.25

### Patch Changes

- Updated dependencies [5b33db9]
  - @presentation-md/core@1.8.7

## 1.0.24

### Patch Changes

- Updated dependencies [6fcf4db]
  - @presentation-md/core@1.8.6

## 1.0.23

### Patch Changes

- Updated dependencies [44b46db]
  - @presentation-md/core@1.8.5

## 1.0.22

### Patch Changes

- Updated dependencies [bc3f18f]
  - @presentation-md/core@1.8.4

## 1.0.21

### Patch Changes

- Updated dependencies [9274c8c]
  - @presentation-md/core@1.8.3

## 1.0.20

### Patch Changes

- Updated dependencies [d922258]
  - @presentation-md/core@1.8.2

## 1.0.19

### Patch Changes

- Updated dependencies [5dbbe2f]
  - @presentation-md/core@1.8.1

## 1.0.18

### Patch Changes

- Updated dependencies [3019e5f]
  - @presentation-md/core@1.8.0

## 1.0.17

### Patch Changes

- Updated dependencies [83d16c1]
  - @presentation-md/core@1.7.5

## 1.0.16

### Patch Changes

- Updated dependencies [d1a8408]
  - @presentation-md/core@1.7.4

## 1.0.15

### Patch Changes

- Updated dependencies [582e094]
  - @presentation-md/core@1.7.3

## 1.0.14

### Patch Changes

- Updated dependencies [1941cf9]
  - @presentation-md/core@1.7.2

## 1.0.13

### Patch Changes

- Updated dependencies [7aa0385]
  - @presentation-md/core@1.7.1

## 1.0.12

### Patch Changes

- Updated dependencies [2bd5d7e]
- Updated dependencies [2bd5d7e]
- Updated dependencies [dfa2b5a]
  - @presentation-md/core@1.7.0

## 1.0.11

### Patch Changes

- Updated dependencies [8027a0e]
  - @presentation-md/core@1.6.1

## 1.0.10

### Patch Changes

- Updated dependencies [96d87eb]
- Updated dependencies [d58fa5a]
- Updated dependencies [c7ce9a5]
  - @presentation-md/core@1.6.0

## 1.0.9

### Patch Changes

- Updated dependencies [40d506a]
  - @presentation-md/core@1.5.0

## 1.0.8

### Patch Changes

- Updated dependencies [2e00f07]
  - @presentation-md/core@1.4.1

## 1.0.7

### Patch Changes

- Updated dependencies [932ace2]
  - @presentation-md/core@1.4.0

## 1.0.6

### Patch Changes

- Updated dependencies [b1f2b74]
- Updated dependencies [1fb09b1]
- Updated dependencies [9463f80]
  - @presentation-md/core@1.3.0

## 1.0.5

### Patch Changes

- Updated dependencies [dc54af0]
  - @presentation-md/core@1.2.1

## 1.0.4

### Patch Changes

- Updated dependencies [de75364]
  - @presentation-md/core@1.2.0

## 1.0.3

### Patch Changes

- Updated dependencies [9bb1dba]
  - @presentation-md/core@1.1.2

## 1.0.2

### Patch Changes

- 545ccd8: Round-trip speaker notes through PPTX export (`addNotes`) and Studio; raise package engines to Node 22+.
- Updated dependencies [545ccd8]
  - @presentation-md/core@1.1.1

## 1.0.1

### Patch Changes

- Updated dependencies
  - @presentation-md/core@1.1.0

## 1.0.0

### Major Changes

- e9b8afd: Rename the pack from presentation-skill-pack to presentation-md to match the GitHub repo.

  Breaking: npm scope is now `@presentation-md/*`, CLIs are `presentation-md-*` /
  `create-presentation-md-theme`, PyPI packages are `presentation-md-*`, and the site
  hostname is `presentation-md.vercel.app`.

### Patch Changes

- Updated dependencies [4dfb90b]
- Updated dependencies [e9b8afd]
- Updated dependencies [e9b8afd]
  - @presentation-md/core@1.0.0

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.
