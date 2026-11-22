# adapters/cursor

## Overview
Installs the `presentation-generator` skill into Cursor as a rule file. In
`full` mode it also installs `deck-design-judge` and registers the
`presentation-md` MCP server. Human notes: [README.md](./README.md).

## Interface
- `PMD_CORE_DIR=<path> bash install.sh [full|lite]` (default `full`). [install.sh:MODE]
- `$env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]`. [install.ps1:param]

## Invariants
- `PMD_CORE_DIR` must be set, or the script exits. [install.sh:PMD_CORE_DIR], [install.ps1:exit 1]
- The rule file gets its own front matter (`alwaysApply: false`). The `SKILL.md` front matter is stripped so it is not embedded twice. [install.sh:SKILL_BODY]
- The MCP entry is always `presentation-md` -> `npx -y @presentation-md/mcp-server`. The legacy key `presentation-skill-pack` is deleted. [install.sh:cfg.mcpServers], [install.ps1:presentation-skill-pack]
- The judge skill installs only in `full` mode and only when `PMD_JUDGE_SKILL_DIR` is set. [install.sh:PMD_JUDGE_SKILL_DIR]
- This adapter does not call `install-skill-scripts`, so no PDF or deploy helpers are installed. [install.sh:TARGET_FILE]

## Side Effects
- Overwrites `~/.cursor/rules/presentation-generator.mdc`. [install.sh:TARGET_FILE], [install.ps1:$TargetFile]
- `full` mode: writes `~/.cursor/skills/deck-design-judge/`. [install.sh:install-judge-skill.sh]
- `full` mode: creates or rewrites `~/.cursor/mcp.json`. [install.sh:MCP_CONFIG], [install.ps1:$McpConfig]

## Verification
- Run: `pnpm test`
- CI syntax check: `bash -n adapters/cursor/install.sh`
