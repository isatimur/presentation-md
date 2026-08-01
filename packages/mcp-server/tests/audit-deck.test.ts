import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { auditDeckTool } from "../src/tools/audit-deck.js";

async function audit(json: string, apply_safe_fixes?: boolean) {
  return auditDeckTool.handler({ json, apply_safe_fixes }) as Promise<{
    valid: boolean;
    issues: Array<{ severity: string; message: string }>;
    fixes_applied?: string[];
    json?: string;
    fixed?: boolean;
  }>;
}

describe("audit_deck craft gates", () => {
  it("does not require image-hero on kinetic-wrapped wrap decks", async () => {
    const pulse = readFileSync(
      resolve(process.cwd(), "../../examples/decks/pulse-wrapped.json"),
      "utf-8"
    );
    const result = await audit(pulse);
    expect(result.valid).toBe(true);
    expect(
      result.issues.some((i) => i.message.toLowerCase().includes("image-hero"))
    ).toBe(false);
  });

  it("warns on weak asymmetry for long feature-grid-only decks", async () => {
    const deck = JSON.stringify({
      type: "deck",
      meta: { theme: "default-tech", title: "Flat" },
      slides: Array.from({ length: 6 }, (_, i) => ({
        layout: "feature-grid",
        heading: `Slide ${i + 1}`,
        columns: 3,
        cards: [
          { title: "One", body: "A" },
          { title: "Two", body: "B" },
          { title: "Three", body: "C" },
        ],
      })),
    });
    const result = await audit(deck);
    expect(result.issues.some((i) => /asymmetry/i.test(i.message))).toBe(true);
    expect(result.issues.some((i) => /repeats 6x/i.test(i.message))).toBe(true);
  });

  it("warns when kinetic wrap lacks tone beats", async () => {
    const deck = JSON.stringify({
      type: "deck",
      meta: { theme: "kinetic-wrapped", title: "Flat wrap" },
      slides: [
        { layout: "title", heading: "Year" },
        { layout: "stat-row", variant: "hero", heading: "N", stats: [{ value: "1", label: "a" }] },
        { layout: "ranked-list", heading: "Top", items: [{ label: "A", widthPct: 80 }] },
        { layout: "closing", heading: "Bye", cta: { label: "Go", href: "#" } },
        { layout: "section", heading: "More" },
      ],
    });
    const result = await audit(deck);
    expect(result.issues.some((i) => /fewer than 3 toned/i.test(i.message))).toBe(true);
  });

  it("apply_safe_fixes returns repaired json and clears structural warnings", async () => {
    const deck = JSON.stringify({
      type: "deck",
      meta: { theme: "default-tech", title: "Fix me" },
      slides: [
        { layout: "title", heading: "Hi" },
        {
          layout: "comparison",
          heading: "Vs",
          leftLabel: "A",
          left: "old",
          rightLabel: "B",
          right: "new",
        },
        { layout: "two-column", heading: "Split", left: "L", right: "R", ratio: "1-1" },
        { layout: "section", heading: "Mid" },
        { layout: "stat-row", heading: "Nums", stats: [{ value: "1", label: "a" }] },
        { layout: "closing", heading: "Bye" },
      ],
    });
    const before = await audit(deck);
    expect(before.issues.some((i) => /emphasis/i.test(i.message))).toBe(true);
    expect(before.issues.some((i) => /missing CTA/i.test(i.message))).toBe(true);

    const result = await audit(deck, true);
    expect(result.fixed).toBe(true);
    expect(result.fixes_applied!.length).toBeGreaterThan(0);
    expect(result.json).toBeTruthy();
    const repaired = JSON.parse(result.json!);
    const comparison = repaired.slides.find((s: { layout?: string }) => s.layout === "comparison");
    const closing = repaired.slides.find((s: { layout?: string }) => s.layout === "closing");
    expect(comparison?.emphasis).toBe("right");
    expect(closing?.actions?.length).toBeGreaterThanOrEqual(1);
    expect(repaired.slides.some((s: { layout?: string }) => s.layout === "image-hero")).toBe(true);
    expect(result.issues.some((i) => /emphasis/i.test(i.message))).toBe(false);
    expect(result.issues.some((i) => /missing CTA/i.test(i.message))).toBe(false);
  });
});
