import type { MessageKey } from "../i18n/index.js";
import type { CraftIssue, CraftIssueCode, JudgeFlagId } from "./auditCraft.js";

/** One audit-panel row: a craft issue, a judge flag (judgeId set), or a PPTX warning. */
export type AuditRow = CraftIssue & { judgeId?: JudgeFlagId };

/** Catalog key for a craft issue. tsc fails here if en.ts lacks a key for any code. */
export function auditKey(code: CraftIssueCode): MessageKey {
  return `audit.${code}`;
}

/** Catalog key for a judge flag. tsc fails here if en.ts lacks a key for any id. */
export function judgeKey(id: JudgeFlagId): MessageKey {
  return `judge.${id}`;
}

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

/**
 * Text for one audit-panel row in the current locale. Craft issues (code) and
 * judge flags (judgeId) are translated; the "[judge · id]" tag stays as a
 * technical label. PPTX warnings have neither and keep their English message.
 */
export function auditText(
  row: Pick<AuditRow, "message" | "code" | "params" | "judgeId">,
  t: Translate
): string {
  if (row.judgeId) return `[judge · ${row.judgeId}] ${t(judgeKey(row.judgeId), row.params)}`;
  return row.code ? t(auditKey(row.code), row.params) : row.message;
}
