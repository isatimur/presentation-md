import { afterEach, describe, expect, it } from "vitest";
import {
  auditCraft,
  CRAFT_ISSUE_CODES,
  CRAFT_ISSUE_MESSAGES,
  JUDGE_FLAG_IDS,
  JUDGE_FLAG_MESSAGES,
  judgeDeckJson,
} from "../src/craft/auditCraft.js";
import { auditKey, auditText, judgeKey } from "../src/craft/auditText.js";
import { formatMessage, setLocale, t } from "../src/i18n/index.js";
import { en } from "../src/i18n/messages/en.js";

const deck = {
  meta: { theme: "bauhaus" },
  slides: [
    { layout: "title" },
    { layout: "feature-grid", columns: 3, cards: [{ title: "a" }, { title: "b" }, { title: "c" }, { title: "d" }, { title: "e" }] },
    { layout: "feature-grid", columns: 2, cards: [{ title: "a" }, { title: "b" }, { title: "c" }] },
    { layout: "feature-grid", columns: 2, cards: [{ title: "a" }, { title: "b" }, { title: "c" }] },
    { layout: "nope" },
    { layout: "two-column" },
    { layout: "closing", heading: "Go", actions: [{ label: "Book" }, { label: "Read", icon: "book" }] },
  ],
};

describe("audit messages", () => {
  afterEach(async () => {
    await setLocale("en", { persist: false });
  });

  it("keeps the English catalog equal to the core templates", () => {
    for (const code of CRAFT_ISSUE_CODES) {
      expect(en[auditKey(code)], code).toBe(CRAFT_ISSUE_MESSAGES[code]);
    }
    const auditKeys = Object.keys(en).filter((k) => k.startsWith("audit."));
    expect(auditKeys.sort()).toEqual(CRAFT_ISSUE_CODES.map((c) => `audit.${c}`).sort());
  });

  it("renders real issues in English exactly as core wrote them", () => {
    const issues = auditCraft(deck);
    expect(issues.length).toBeGreaterThan(5);
    for (const issue of issues) {
      expect(issue.code, issue.message).toBeDefined();
      expect(formatMessage("en", en[auditKey(issue.code!)], issue.params)).toBe(issue.message);
      expect(auditText(issue, t)).toBe(issue.message);
    }
  });

  it("translates coded issues and keeps uncoded ones (PPTX, judge) as written", async () => {
    await setLocale("de", { persist: false });
    const [issue] = auditCraft({ meta: {}, slides: [{ layout: "nope" }] }).filter((i) => i.code === "unknownLayout");
    expect(issue).toBeDefined();
    const text = auditText(issue!, t);
    expect(text).not.toBe(issue!.message);
    expect(text).toContain('"nope"');
    expect(auditText({ message: "PPTX: chart lost its legend" }, t)).toBe("PPTX: chart lost its legend");
  });

  it("keeps judge flags equal to core in English and translates them by id", async () => {
    for (const id of JUDGE_FLAG_IDS) expect(en[judgeKey(id)], id).toBe(JUDGE_FLAG_MESSAGES[id]);
    const [flag] = judgeDeckJson({ slides: [{ layout: "title", body: "word ".repeat(60) }] }).flags.filter(
      (f) => f.id === "G1"
    );
    expect(flag).toBeDefined();
    const row = { message: `[judge · ${flag!.id}] ${flag!.detail}`, severity: "error" as const, judgeId: flag!.id, params: flag!.params };
    expect(auditText(row, t)).toBe(row.message);
    await setLocale("ja", { persist: false });
    const ja = auditText(row, t);
    expect(ja.startsWith("[judge · G1] ")).toBe(true);
    expect(ja).not.toBe(row.message);
    expect(ja).toContain("60");
  });
});
