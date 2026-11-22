---
"@presentation-md/core": patch
"@presentation-md/render": patch
"@presentation-md/mcp-server": patch
"@presentation-skill-pack/mcp-server": patch
---

- `deploy.sh` fails closed when `check-local-assets.mjs` is missing. Before, node's exit 1 for a missing script read as "no local assets" and single-file decks with broken local references deployed.
- `layoutsPreviewSlideCount` derives from the layout list instead of hard-coded 11/13.
- MCP `export_deck` lists the format aliases in its error; drop the unused `zod` dependency.
- Legacy MCP stub no longer prints a stale tool count.
