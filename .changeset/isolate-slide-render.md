---
"@presentation-md/mcp-server": patch
"@presentation-md/install": patch
---

Isolate each `.slide` into a mini HTML before headless Chrome capture in deck-design-judge `render_slides.sh` (parity with MCP screenshot-slides), with unit tests for the isolate helper.
