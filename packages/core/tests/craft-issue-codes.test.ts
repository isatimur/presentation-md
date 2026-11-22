import { describe, expect, it } from "vitest";
import {
  CRAFT_ISSUE_CODES,
  CRAFT_ISSUE_MESSAGES,
  auditCraft,
  fillCraftTemplate,
} from "../src/craft-audit.js";

const deck = (theme: string, slides: unknown[]) => ({ meta: { theme }, slides });

describe("craft issue codes", () => {
  it("gives every issue a known code whose template fills to the message", () => {
    const decks = [
      { slides: [] },
      deck("default-tech", [{ layout: "closing" }]),
      deck("bauhaus", [
        { layout: "title" },
        { layout: "feature-grid", columns: 3, cards: [{ title: "a" }, { title: "b" }, { title: "c" }, { title: "d" }, { title: "e" }] },
        { layout: "feature-grid", columns: 2, cards: [{ title: "a" }, { title: "b" }, { title: "c" }] },
        { layout: "feature-grid", columns: 2, cards: [{ title: "a" }, { title: "b" }, { title: "c" }] },
        { layout: "nope" },
        { layout: "two-column" },
        { layout: "closing", heading: "Go", actions: [{ label: "Book" }, { label: "Read" }] },
      ]),
    ];
    const issues = decks.flatMap((d) => auditCraft(d));
    expect(issues.length).toBeGreaterThan(5);
    for (const issue of issues) {
      expect(issue.code, issue.message).toBeDefined();
      expect(CRAFT_ISSUE_CODES).toContain(issue.code);
      expect(fillCraftTemplate(CRAFT_ISSUE_MESSAGES[issue.code!], issue.params)).toBe(issue.message);
    }
    const codes = new Set(issues.map((i) => i.code));
    for (const code of ["noSlides", "fewSlides", "layoutRepeat", "unknownLayout", "featureGridColumns", "closingActionsNoIcons"]) {
      expect(codes.has(code as never), code).toBe(true);
    }
  });

  it("fills numeric params and leaves unknown placeholders alone", () => {
    expect(fillCraftTemplate("Slide {n} of {total} {x}", { n: 2, total: 9 })).toBe("Slide 2 of 9 {x}");
    expect(fillCraftTemplate("plain")).toBe("plain");
  });

  it("uses camelCase codes so Studio keys read audit.<code>", () => {
    for (const code of CRAFT_ISSUE_CODES) expect(code).toMatch(/^[a-z][A-Za-z0-9]+$/);
  });
});
