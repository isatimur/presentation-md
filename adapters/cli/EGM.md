# adapters/cli

## Overview
CLI adapter. It prints usage for the `@presentation-md/render` CLI. In `full`
mode it installs `deck-design-judge` to a local folder. It registers no MCP
server and copies no `SKILL.md`. Human notes: [README.md](./README.md).

## Interface
- `PMD_CORE_DIR=<path> bash install.sh [full|lite]` (default `full`). [install.sh:MODE]
- `$env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]`. [install.ps1:param]
- `PMD_CLI_JUDGE_DIR` overrides the judge target. [install.sh:JUDGE_TARGET], [install.ps1:PMD_CLI_JUDGE_DIR]

## Invariants
- `PMD_CORE_DIR` must be set, or the script exits. [install.sh:PMD_CORE_DIR], [install.ps1:exit 1]
- The judge skill installs only in `full` mode and only when `PMD_JUDGE_SKILL_DIR` is set. [install.sh:PMD_JUDGE_SKILL_DIR]

## Side Effects
- Writes to stdout only, in `lite` mode. [install.sh:echo]
- `full` mode: copies the judge skill to `${PMD_CLI_JUDGE_DIR:-$HOME/.presentation-md/skills/deck-design-judge}`. [install.sh:JUDGE_TARGET]

## Verification
- Run: `pnpm test`
- CI syntax check: `bash -n adapters/cli/install.sh`
