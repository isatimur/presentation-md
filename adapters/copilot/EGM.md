# adapters/copilot

## Overview
Project-scoped GitHub Copilot adapter. It writes the skill body into a named
section of `.github/copilot-instructions.md` in the current directory. In
`full` mode it also installs `deck-design-judge` and registers the MCP server
in `.vscode/mcp.json`. Human notes: [README.md](./README.md).

## Interface
- `PMD_CORE_DIR=<path> bash install.sh [full|lite]` (default `full`). Run it from the project root. [install.sh:MODE], [install.sh:COPILOT_FILE]
- `$env:PMD_CORE_DIR = "<path>"; .\install.ps1 [full|lite]`. [install.ps1:param]

## Invariants
- `PMD_CORE_DIR` must be set, or the script exits. [install.sh:PMD_CORE_DIR], [install.ps1:throw]
- The section sits between `<!-- BEGIN presentation-md -->` and `<!-- END presentation-md -->`. A re-run replaces only that section and keeps other content; both `install.sh` and `install.ps1` follow this. A missing END marker means the old section runs to the end of the file. [install.sh:startIdx], [install.sh:endPos], [install.ps1:$begin]
- The YAML front matter of `SKILL.md` is stripped before embedding. [install.sh:SKILL_BODY]
- The MCP entry is `servers.presentation-md` with `type: stdio`. The legacy key `presentation-skill-pack` is deleted. [install.sh:cfg.servers]
- The judge skill installs only in `full` mode and only when `PMD_JUDGE_SKILL_DIR` is set. [install.sh:PMD_JUDGE_SKILL_DIR]

## Side Effects
- Creates or edits `./.github/copilot-instructions.md`. Uses a `mktemp` file, then deletes it. [install.sh:SECTION_FILE]
- `full` mode: writes `./.github/skills/deck-design-judge/`. [install.sh:install-judge-skill.sh]
- `full` mode: creates or rewrites `./.vscode/mcp.json`. [install.sh:MCP_FILE], [install.ps1:$McpFile]

## Verification
- Run: `pnpm test`
- CI syntax check: `bash -n adapters/copilot/install.sh`
