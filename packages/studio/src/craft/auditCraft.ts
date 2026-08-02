/** Re-export shared craft gates from core (single source for Studio + MCP). */
export { auditCraft, repairCraft, repairCraftBeat } from "@presentation-md/core/craft-audit";
export { remorphDensity, judgeDeckJson } from "@presentation-md/core";
export type { DensityMode } from "@presentation-md/core";
export type { JudgeDeckJsonResult, JudgeFlag } from "@presentation-md/core";
export type { CraftIssue, CraftRepairResult, CraftFixId } from "@presentation-md/core/craft-audit";
