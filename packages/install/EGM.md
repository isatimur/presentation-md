# @presentation-md/install

## Overview

A one-command installer that wires the presentation-md skill and MCP into Claude Code, Cursor, Copilot, Codex, or Gemini CLI. It ships the `presentation-md-install` bin (`dist/index.js`). The build copies the repository `adapters/` and `skills/deck-design-judge/` into `dist/`. It depends on `@presentation-md/core` and `commander`. Requires Node >= 22 [package.json].

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - CLI: `resolveAdapterScript`, `resolveJudgeSkillDir`, `VALID_ADAPTERS`. Spawns the adapter's `install.sh` or `install.ps1` with `PMD_CORE_DIR` and `PMD_JUDGE_SKILL_DIR`.

## Verification

- Run: `pnpm --filter @presentation-md/install test`
