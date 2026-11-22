# craft

## Overview

A thin re-export barrel. It gives Studio one import point for the craft audit, repair, density remorph, and judge gates. The logic lives in `@presentation-md/core`, so Studio and the MCP server share one source. This directory owns no behaviour of its own.

## Interface

- Re-exports from `@presentation-md/core/craft-audit`: `auditCraft`, `repairCraft`, `repairCraftBeat`. [auditCraft.ts:auditCraft]
- Re-exports from `@presentation-md/core`: `remorphDensity`, `judgeDeckJson`. [auditCraft.ts:remorphDensity]
- Type re-exports: `DensityMode`, `JudgeDeckJsonResult`, `JudgeFlag` from `@presentation-md/core`; `CraftIssue`, `CraftRepairResult`, `CraftFixId` from `@presentation-md/core/craft-audit`. [auditCraft.ts:DensityMode]

## Invariants

- This `DensityMode` is the core type. It is a separate declaration from the local `DensityMode` in `../ai/generate.ts`. Do not merge them by assumption. [auditCraft.ts:DensityMode, ../ai/generate.ts:DensityMode]
- Keep this file a pure re-export. Craft rules change in `@presentation-md/core`, not here. [auditCraft.ts:auditCraft, auditCraft.ts:judgeDeckJson]

## Side Effects

- None. The file only re-exports. [auditCraft.ts:auditCraft]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
