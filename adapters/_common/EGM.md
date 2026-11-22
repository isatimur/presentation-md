# adapters/_common

## Overview
Shared copy helpers that every host adapter calls. One helper copies the
bundled `deck-design-judge` skill. The other copies the
`presentation-generator` PDF and deploy scripts. Each helper has a bash and a
PowerShell version with the same behaviour.

## Interface
- `install-judge-skill.sh <target-dir>` and `install-judge-skill.ps1 -Target <dir>`: copy `$PMD_JUDGE_SKILL_DIR/.` into the target. [install-judge-skill.sh:TARGET], [install-judge-skill.ps1:$Target]
- `install-skill-scripts.sh <target-skill-dir>` and `install-skill-scripts.ps1 -Target <dir>`: copy helper scripts from `$PMD_CORE_DIR/scripts` into `<target>/scripts`. [install-skill-scripts.sh:SCRIPTS_SRC], [install-skill-scripts.ps1:$ScriptsSrc]

## Invariants
- `install-judge-skill.*` fails when `PMD_JUDGE_SKILL_DIR` is unset. [install-judge-skill.sh:PMD_JUDGE_SKILL_DIR], [install-judge-skill.ps1:throw]
- The PowerShell judge helper also fails when `PMD_JUDGE_SKILL_DIR` has no `SKILL.md`. The bash helper does not check this. [install-judge-skill.ps1:Test-Path]
- `install-skill-scripts.*` fails when `PMD_CORE_DIR` is unset. It exits 0 with a warning when `$PMD_CORE_DIR/scripts` does not exist. [install-skill-scripts.sh:SCRIPTS_SRC], [install-skill-scripts.ps1:return]
- `install-skill-scripts.*` copies every `*.sh`, every `*.mjs`, and `package.json` from `$PMD_CORE_DIR/scripts`, so helpers that `export-pdf.mjs` imports (`pdf-security.mjs`) and that `deploy.sh` runs (`check-local-assets.mjs`) always travel together. [install-skill-scripts.sh:nullglob], [install-skill-scripts.ps1:Get-ChildItem]
- The environment variables come from `@presentation-md/install`. [packages/install/src/index.ts:PMD_CORE_DIR], [packages/install/src/index.ts:PMD_JUDGE_SKILL_DIR]

## Side Effects
- Creates the target directory and copies files into it with overwrite (`cp -R`, `Copy-Item -Force`). [install-judge-skill.sh:cp -R], [install-skill-scripts.ps1:Copy-Item]
- Sets the execute bit on copied `*.sh` files (bash version only). [install-skill-scripts.sh:chmod +x]

## Verification
- Run: `pnpm test` (covers `packages/install/tests/install.test.ts`)
- CI syntax check: `bash -n adapters/_common/install-judge-skill.sh` (from `.github/workflows/adapter-install-matrix.yml`). CI does not syntax-check `install-skill-scripts.sh`.
