---
"@presentation-md/export": minor
---

PPTX script fonts for non-Latin decks. pptxgenjs writes the theme font into the East Asian (`ea`) and complex-script (`cs`) run slots too, and theme fonts are mostly Latin-only, so PowerPoint had to guess a font for Arabic, Hebrew, Persian, Thai, Chinese, Japanese and Korean text. Exports now set those slots to the font Office's own default theme uses for the script (Arial for Arabic/Hebrew/Persian, Tahoma for Thai, Yu Gothic, DengXian / Microsoft JhengHei, Malgun Gothic). The Latin slot keeps the theme font. Decks in Latin-script languages are unchanged.
