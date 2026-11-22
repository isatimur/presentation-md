# adapters

## Overview
Per-host install scripts for the presentation-md skill pack. Each host folder
has an `install.sh` and an `install.ps1` that take `[full|lite]` and need
`PMD_CORE_DIR`. `@presentation-md/install` picks the folder by name and sets
`PMD_CORE_DIR` and, in `full` mode, `PMD_JUDGE_SKILL_DIR`
([packages/install/src/index.ts:VALID_ADAPTERS]). In `full` mode the host
adapters register the `presentation-md` MCP server (`npx -y
@presentation-md/mcp-server`) and remove the legacy `presentation-skill-pack`
key.

## Subdirectories & Boundaries
- _common: [EGM.md](./_common/EGM.md) - shared copy helpers for the judge skill and the PDF/deploy scripts.
- claude-code: [EGM.md](./claude-code/EGM.md) - writes `~/.claude/skills/` and `~/.claude/mcp.json`.
- cli: [EGM.md](./cli/EGM.md) - prints render CLI usage; `full` mode copies the judge skill locally. No MCP registration.
- codex: [EGM.md](./codex/EGM.md) - writes `~/.codex/skills/` and `~/.codex/config.json`.
- copilot: [EGM.md](./copilot/EGM.md) - project-scoped; edits `.github/copilot-instructions.md` and `.vscode/mcp.json`.
- cursor: [EGM.md](./cursor/EGM.md) - writes `~/.cursor/rules/presentation-generator.mdc` and `~/.cursor/mcp.json`.
- gemini-cli: [EGM.md](./gemini-cli/EGM.md) - writes `~/.gemini/extensions/` and `~/.gemini/settings.json`.
