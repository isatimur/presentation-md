---
"@presentation-md/export": patch
---

Stream PPTX zip inflate with per-chunk bounds + CRC32 (no eager checkCRC32 bomb).

Reject oversized archives before JSZip parse; verify CRC while streaming so zip-bomb limits stay effective.
