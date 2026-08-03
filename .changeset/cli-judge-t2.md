---
"@presentation-md/render": minor
"@presentation-md/mcp-server": patch
---

CLI `--judge --judge-tier t2` (HTML metrics + screenshots).

Agents without MCP can gate G1–G5 before ship: render + `analyzeHtmlDeck` + optional Chrome shots (`--judge-shots-dir` / `--judge-skip-screenshots`). HTML metrics live in `@presentation-md/render`; MCP `judge_deck` imports the same source. t3 panel stays MCP-only.
