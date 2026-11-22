# install/src

## Overview

The `presentation-md-install` CLI. It finds the installer shell script for one AI tool adapter, then runs it with bash (or PowerShell on Windows). It passes the resolved core and judge-skill locations through environment variables.

## Interface

- CLI `presentation-md-install <adapter> [--lite]` [index.ts:buildProgram].
- `VALID_ADAPTERS` = `claude-code`, `cursor`, `codex`, `gemini-cli`, `copilot`, `cli`; type `Adapter`; guard `isValidAdapter` [index.ts].
- `resolveAdapterScript(adapter, platform, fs?)` and `FsOps` [index.ts:resolveAdapterScript] - looks in `dist/adapters/<adapter>/install.{sh,ps1}`, then the monorepo `adapters/` directory.
- `resolveJudgeSkillDir()` [index.ts:resolveJudgeSkillDir] - finds `skills/deck-design-judge` (must contain `SKILL.md`).
- `INSTALL_TIMEOUT_MS` = 300000 [index.ts].

## Invariants

- An unknown adapter throws in `resolveAdapterScript`; the CLI prints an error and exits 1 [index.ts:resolveAdapterScript, buildProgram].
- The script extension is `ps1` on `win32`, else `sh` [index.ts:scriptExtension].
- The returned script path is `realpathSync`-resolved [index.ts:resolveAdapterScript].
- `PMD_CORE_DIR` is always set, from `require.resolve("@presentation-md/core/skill")`. If core cannot be resolved, the CLI exits 1 [index.ts:resolveCoreDir, buildProgram].
- `PMD_JUDGE_SKILL_DIR` is set only in full mode. A missing judge skill gives a warning, not a failure [index.ts:buildProgram].
- The CLI exits with the script's status, or 1 when there is none (for example on timeout) [index.ts:buildProgram].
- The CLI runs only when the file is the direct entry point, so tests can import it [index.ts module guard].

## Side Effects

- Process spawn: `bash <script> <full|lite>`, or `powershell -ExecutionPolicy Bypass -File <script> -Mode <mode>` on Windows. stdio is inherited; 300 s timeout with `SIGKILL` [index.ts:buildProgram].
- Runs the adapter script found by [index.ts:resolveAdapterScript]. Its effects live in `adapters/<adapter>/install.{sh,ps1}`, outside this partition.
- Filesystem reads: existence and realpath checks on candidate script and skill paths [index.ts:resolveAdapterScript, resolveJudgeSkillDir].

## Verification

- Run: `pnpm --filter @presentation-md/install test`
