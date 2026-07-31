import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { auditDeckTool } from "../src/tools/audit-deck.js";

async function audit(json: string) {
  return auditDeckTool.handler({ json }) as Promise<{
    valid: boolean;
    issues: Array<{ severity: string; message: string }>;
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
});
