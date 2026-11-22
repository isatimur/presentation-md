/** Re-export shared craft gates from core (single source for Studio + MCP). */
export {
  auditCraft,
  repairCraft,
  repairCraftBeat,
  CRAFT_ISSUE_CODES,
  CRAFT_ISSUE_MESSAGES,
} from "@presentation-md/core/craft-audit";
export { remorphDensity, judgeDeckJson } from "@presentation-md/core";
export type { DensityMode } from "@presentation-md/core";
export type { JudgeDeckJsonResult, JudgeFlag } from "@presentation-md/core";
export type {
  CraftIssue,
  CraftIssueCode,
  CraftIssueParams,
  CraftRepairResult,
  CraftFixId,
} from "@presentation-md/core/craft-audit";
