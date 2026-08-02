---
"@presentation-md/render": patch
"@presentation-md/mcp-server": patch
---

Isolate headless Chrome screenshot runs with a temp `--user-data-dir`.

Avoids profile lock / state bleed across concurrent slide shots (judge_deck t2/t3 + preview_themes).
