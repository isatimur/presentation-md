# @presentation-md/install

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

## 0.1.2

### Patch Changes

- Copilot adapter now uses sentinel sections (`<!-- BEGIN presentation-md -->`) so multiple skill packs can coexist in the same `.github/copilot-instructions.md` without overwriting each other.

## 0.1.1

### Patch Changes

- Add GitHub Copilot adapter: `npx @presentation-md/install copilot` writes `.github/copilot-instructions.md` in the current project and optionally registers the MCP server in `.vscode/mcp.json`.

## 0.2.0

### Minor Changes

- d8d2fb0: Initial release of presentation-md v0.1.0.

  Turn rough notes into a polished, self-contained HTML slide deck for any AI agent.
  Includes dual-language renderers (Node + Python), MCP server, 5 themes, 5 adapters,
  installer CLI, and interactive theme scaffolder.

### Patch Changes

- Updated dependencies [d8d2fb0]
  - @presentation-md/core@0.2.0
