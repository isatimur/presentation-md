---
"@presentation-md/export": patch
---

PPTX shapes now match the HTML more closely. Square frames, rules and washes no longer come out with PowerPoint's default rounded corners, and shapes meant to have no outline no longer get a 1 pt line (pptxgenjs dropped `rectRadius: 0` and `line.width: 0`). Themes with a flat HTML background skip the bg→bg2 wash panel. Chart value labels show 1.8 as 1.8, not 2.
