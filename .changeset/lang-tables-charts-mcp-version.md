---
"@presentation-md/export": patch
"@presentation-md/mcp-server": patch
"@presentation-md/render": patch
---

- PPTX tables and charts carry the deck language (`meta.lang`) like text boxes already did; table cells mirror left/right alignment in right-to-left decks.
- The MCP server reports its package version in the handshake instead of a hard-coded `1.0.0`.
