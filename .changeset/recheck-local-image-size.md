---
"@presentation-md/export": patch
---

Recheck local image byte limits after reading to prevent stat/read races from bypassing prefetch size guards.
