# adapters/claude-code

## Overview
Installs the `presentation-generator` skill into Claude Code. In `full` mode it
also installs `deck-design-judge` and registers the `presentation-md` MCP
server. Human notes: [README.md](./README.md).

## Interface
- `PMD_CORE_DIR=<path> bash install.sh [full|lite]` (default `full`). [install.sh:MODE]
- `$env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]`. [install.ps1:param]

## Invariants
- `PMD_CORE_DIR` must be set, or the script exits. [install.sh:PMD_CORE_DIR], [install.ps1:exit 1]
- The judge skill installs only in `full` mode and only when `PMD_JUDGE_SKILL_DIR` is set. [install.sh:PMD_JUDGE_SKILL_DIR]
- The MCP entry is always `presentation-md` -> `npx -y @presentation-md/mcp-server`. The legacy key `presentation-skill-pack` is deleted. Other `mcpServers` keys are kept. [install.sh:cfg.mcpServers], [install.ps1:presentation-skill-pack]
- Script helpers come from `../_common/install-skill-scripts.*`. [install.sh:install-skill-scripts.sh], [install.ps1:install-skill-scripts.ps1]

## Side Effects
- Writes `~/.claude/skills/presentation-generator/` (`SKILL.md`, `references/`, `scripts/`). [install.sh:TARGET]
- `full` mode: writes `~/.claude/skills/deck-design-judge/`. [install.sh:install-judge-skill.sh]
- `full` mode: creates or rewrites `~/.claude/mcp.json`. Runs `node -e` to merge JSON. [install.sh:MCP_CONFIG], [install.ps1:$McpConfig]

## Verification
- Run: `pnpm test`
- CI syntax check: `bash -n adapters/claude-code/install.sh`
