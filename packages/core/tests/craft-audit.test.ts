import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { auditCraft } from "../src/craft-audit.js";

describe("auditCraft", () => {
  it("does not require image-hero on kinetic-wrapped wrap decks", () => {
    const pulse = JSON.parse(
      readFileSync(resolve(process.cwd(), "../../examples/decks/pulse-wrapped.json"), "utf-8")
    );
    const issues = auditCraft(pulse);
    expect(issues.some((i) => i.message.toLowerCase().includes("image-hero"))).toBe(false);
  });

  it("warns on weak asymmetry for long feature-grid-only decks", () => {
    const deck = {
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
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /asymmetry/i.test(i.message))).toBe(true);
    expect(issues.some((i) => /repeats 6x/i.test(i.message))).toBe(true);
  });

  it("warns when kinetic wrap lacks tone beats", () => {
    const deck = {
      type: "deck",
      meta: { theme: "kinetic-wrapped", title: "Flat wrap" },
      slides: [
        { layout: "title", heading: "Year" },
        { layout: "stat-row", variant: "hero", heading: "N", stats: [{ value: "1", label: "a" }] },
        { layout: "ranked-list", heading: "Top", items: [{ label: "A", widthPct: 80 }] },
        { layout: "closing", heading: "Bye", cta: { label: "Go", href: "#" } },
        { layout: "section", heading: "More" },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /fewer than 3 toned/i.test(i.message))).toBe(true);
  });

  it("errors on empty slides", () => {
    const issues = auditCraft({ type: "deck", slides: [] });
    expect(issues.some((i) => i.severity === "error" && /no slides/i.test(i.message))).toBe(true);
  });

  it("warns when launch closing has a single CTA", () => {
    const deck = {
      type: "deck",
      meta: { theme: "genz-bento", title: "Launch" },
      slides: [
        { layout: "title", heading: "App launch" },
        { layout: "image-hero", heading: "Hero", image: "https://x/y.png" },
        { layout: "comparison", heading: "Diff", left: "A", right: "B", emphasis: "right" },
        { layout: "stat-row", heading: "Stats", stats: [{ value: "1", label: "a" }] },
        { layout: "quote", quote: "Nice", by: "User" },
        {
          layout: "closing",
          heading: "Download the waitlist app",
          cta: { label: "Get the app", href: "#" },
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /single CTA|dual ask/i.test(i.message))).toBe(true);
  });
});
