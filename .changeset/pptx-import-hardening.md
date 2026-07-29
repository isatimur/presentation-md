---
"@presentation-md/export": patch
"@presentation-md/mcp-server": patch
"@presentation-md/core": patch
"@presentation-md/render": patch
"@presentation-md/studio": patch
---

Harden PPTX import against review findings: correct assetsDir image refs,
enforce post-decompress zip size limits, realpath write containment, preserve
speaker notes, and reopen legacy psp-deck HTML embeds.
