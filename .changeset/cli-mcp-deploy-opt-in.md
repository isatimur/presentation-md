---
"@presentation-md/render": minor
"@presentation-md/mcp-server": minor
"@presentation-md/core": patch
---

CLI `--deploy` / MCP `deploy_deck` wrap core deploy.sh (opt-in confirm).

Dry-run by default — agents must pass `--confirm-deploy` / `confirm:true` after human approval so remote Vercel is never thrashed accidentally; `--deploy-prod` / `prod` needs an extra confirm gate.
