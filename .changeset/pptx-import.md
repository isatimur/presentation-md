---
"@presentation-md/export": minor
"@presentation-md/render": minor
"@presentation-md/mcp-server": minor
---

Add PPTX → Deck JSON import (round-trip with existing export).

- `extractPptx` / `mapExtractedToDeck` / `pptxToDeck` via `@presentation-md/export/import`
- CLI: `presentation-md-render --from-pptx <file>`
- MCP: `import_pptx` tool (path or base64, cwd-contained)
- Skill docs: `references/pptx-import.md`
