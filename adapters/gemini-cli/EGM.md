# adapters/gemini-cli

## Overview
Installs the `presentation-generator` skill as a Gemini CLI extension. In
`full` mode it also installs `deck-design-judge` as a second extension and
registers the `presentation-md` MCP server. Human notes:
[README.md](./README.md).

## Interface
- `PMD_CORE_DIR=<path> bash install.sh [full|lite]` (default `full`). [install.sh:MODE]
- `$env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]`. [install.ps1:param]

## Invariants
- `PMD_CORE_DIR` must be set, or the script exits. [install.sh:PMD_CORE_DIR], [install.ps1:exit 1]
- Each extension folder gets an `extension.json` that points to `./SKILL.md`. [install.sh:extension.json]
- The MCP entry is always `presentation-md` -> `npx -y @presentation-md/mcp-server`. The legacy key `presentation-skill-pack` is deleted. [install.sh:cfg.mcpServers], [install.ps1:presentation-skill-pack]
- The judge extension installs only in `full` mode and only when `PMD_JUDGE_SKILL_DIR` is set. [install.sh:JUDGE_TARGET]
- This adapter copies `SKILL.md` but not `references/`. [install.sh:TARGET]

## Side Effects
- Writes `~/.gemini/extensions/presentation-generator/` (`SKILL.md`, `scripts/`, `extension.json`). [install.sh:TARGET]
- `full` mode: writes `~/.gemini/extensions/deck-design-judge/` and its `extension.json`. [install.sh:JUDGE_TARGET]
- `full` mode: creates or rewrites `~/.gemini/settings.json`. [install.sh:GEMINI_SETTINGS], [install.ps1:$GeminiSettings]

## Verification
- Run: `pnpm test`
- CI syntax check: `bash -n adapters/gemini-cli/install.sh`
