---
"@presentation-md/export": patch
"@presentation-md/mcp-server": patch
"@presentation-md/render": patch
---

Preflight PPTX compressed-size limits on CLI/MCP import paths + CRC extract tests.

`assertZipArchiveSafe` runs before read/base64 decode; export tests cover streamed CRC mismatch and media size gates.
