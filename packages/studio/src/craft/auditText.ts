import type { MessageKey } from "../i18n/index.js";
import type { CraftIssueCode, CraftIssueParams } from "./auditCraft.js";

/** Catalog key for a craft issue. tsc fails here if en.ts lacks a key for any code. */
export function auditKey(code: CraftIssueCode): MessageKey {
  return `audit.${code}`;
}

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

/**
 * Text for one audit-panel row in the current locale. Issues from auditCraft carry
 * a code and are translated; PPTX warnings and judge flags have no code and keep
 * their English message.
 */
export function auditText(
  issue: { message: string; code?: CraftIssueCode; params?: CraftIssueParams },
  t: Translate
): string {
  return issue.code ? t(auditKey(issue.code), issue.params) : issue.message;
}
