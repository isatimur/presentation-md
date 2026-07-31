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

  it("warns when long decks lack a data beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "default-tech", title: "Words" },
      slides: [
        { layout: "title", heading: "T" },
        { layout: "comparison", heading: "C", left: "A", right: "B", emphasis: "left" },
        { layout: "section", heading: "S1" },
        { layout: "section", heading: "S2" },
        { layout: "quote", quote: "Q", by: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Go", href: "#", style: "solid" },
            { label: "More", href: "#", style: "outline" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /data beat/i.test(i.message))).toBe(true);
  });

  it("warns when candy-pop lacks company/marquee brand", () => {
    const deck = {
      type: "deck",
      meta: { theme: "candy-pop", title: "Launch" },
      slides: [
        { layout: "title", heading: "Hi" },
        { layout: "closing", heading: "Bye", cta: { label: "Go", href: "#" } },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /candy-pop marquee/i.test(i.message))).toBe(true);
  });

  it("attaches slide index on local craft issues", () => {
    const deck = {
      type: "deck",
      meta: { theme: "default-tech", title: "X" },
      slides: [
        { layout: "title", heading: "A" },
        { layout: "comparison", heading: "Diff", left: "A", right: "B" },
      ],
    };
    const issues = auditCraft(deck);
    const cmp = issues.find((i) => /emphasis/i.test(i.message));
    expect(cmp?.slide).toBe(2);
  });

  it("warns when dual closing actions lack icons", () => {
    const deck = {
      type: "deck",
      meta: { theme: "genz-bento", title: "Launch" },
      slides: [
        { layout: "title", heading: "App" },
        {
          layout: "closing",
          heading: "Download now",
          actions: [
            { label: "Get the app", href: "#", style: "solid" },
            { label: "Watch demo", href: "#", style: "outline" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => i.slide === 2 && /dual actions without icons/i.test(i.message))).toBe(
      true
    );
  });

  it("warns when stunning-25 theme closing is a single CTA", () => {
    const deck = {
      type: "deck",
      meta: { theme: "aurora-glass", title: "Quiet" },
      slides: [
        { layout: "title", heading: "Hi" },
        { layout: "closing", heading: "Bye", cta: { label: "Contact", href: "#" } },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /Stunning-25 theme closing/i.test(i.message))).toBe(true);
  });

  it("warns when risograph-zine lacks a print beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "risograph-zine", title: "Flat zine" },
      slides: [
        { layout: "title", heading: "Ink" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "feature-grid", heading: "Cards", columns: 3, cards: [
          { title: "One", body: "A", icon: "fa-solid fa-1" },
          { title: "Two", body: "B", icon: "fa-solid fa-2" },
          { title: "Three", body: "C", icon: "fa-solid fa-3" },
        ] },
        { layout: "stat-row", heading: "N", stats: [{ value: "1", label: "a" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Print", href: "#", style: "solid", icon: "fa-solid fa-print" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /print beat/i.test(i.message))).toBe(true);
  });
});
