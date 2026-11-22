# @presentation-skill-pack/mcp-server

## 0.2.2

### Patch Changes

- e36c0c4: - `deploy.sh` fails closed when `check-local-assets.mjs` is missing. Before, node's exit 1 for a missing script read as "no local assets" and single-file decks with broken local references deployed.
  - `layoutsPreviewSlideCount` derives from the layout list instead of hard-coded 11/13.
  - MCP `export_deck` lists the format aliases in its error; drop the unused `zod` dependency.
  - Legacy MCP stub no longer prints a stale tool count.
- Updated dependencies [e36c0c4]
  - @presentation-md/mcp-server@1.34.2

## 0.2.1

### Patch Changes

- 50be775: Honest top-rule card notes on biennale/luxury READMEs; bump legacy MCP stub dependency to @presentation-md/mcp-server ^1.12.0.

## 0.2.0

### Minor Changes

- 2b5f521: Publish a deprecated redirect stub for `@presentation-skill-pack/mcp-server` that warns and starts `@presentation-md/mcp-server` (11 tools).

### Patch Changes

- Updated dependencies [f512620]
- Updated dependencies [2b5f521]
  - @presentation-md/mcp-server@1.10.5
