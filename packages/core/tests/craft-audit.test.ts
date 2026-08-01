import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { auditCraft, repairCraft } from "../src/craft-audit.js";

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

  it("accepts timeline as a long-deck data beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "bauhaus", title: "Talk" },
      slides: [
        { layout: "title", heading: "T" },
        { layout: "image-hero", heading: "H", image: "https://x/y.png" },
        { layout: "comparison", heading: "C", left: "A", right: "B", emphasis: "left" },
        { layout: "quote", quote: "Q", by: "B" },
        { layout: "feature-grid", heading: "G", columns: 3, cards: [
          { title: "One", body: "A", icon: "fa-solid fa-1" },
          { title: "Two", body: "B", icon: "fa-solid fa-2" },
          { title: "Three", body: "C", icon: "fa-solid fa-3" },
        ]},
        { layout: "timeline", heading: "Road", items: [{ title: "Q1", body: "Ship" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Go", href: "#", style: "solid", icon: "fa-solid fa-rocket" },
            { label: "More", href: "#", style: "outline", icon: "fa-solid fa-book" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /data beat/i.test(i.message))).toBe(false);
  });

  it("warns when loud/hard-card pack lacks a punchy beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "block-frame", title: "Flat loud" },
      slides: [
        { layout: "title", heading: "Loud" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "two-column", heading: "Notes", left: "A", right: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /loud\/hard-card|punchy beat/i.test(i.message))).toBe(true);
  });

  it("warns when grove lacks a botanical monograph beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "grove", title: "Flat grove" },
      slides: [
        { layout: "title", heading: "Grove" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "two-column", heading: "Notes", left: "A", right: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /grove|botanical monograph/i.test(i.message))).toBe(true);
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

  it("warns when paper/editorial theme lacks a magazine beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "soft-editorial", title: "Flat paper" },
      slides: [
        { layout: "title", heading: "Cover" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A" },
            { title: "Two", body: "B" },
            { title: "Three", body: "C" },
          ],
        },
        { layout: "stat-row", heading: "N", stats: [{ value: "1", label: "a" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Read", href: "#", style: "solid", icon: "fa-solid fa-book" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /magazine beat/i.test(i.message))).toBe(true);
  });

  it("warns when pink-script lacks a magazine beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "pink-script", title: "Flat afterhours" },
      slides: [
        { layout: "title", heading: "Cover" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "stat-row", heading: "N", stats: [{ value: "1", label: "a" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Book", href: "#", style: "solid", icon: "fa-solid fa-calendar" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /magazine beat/i.test(i.message))).toBe(true);
  });

  it("warns when neon-noir lacks a cinematic atmosphere beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "neon-noir", title: "Flat neon" },
      slides: [
        { layout: "title", heading: "Night" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "stat-row", heading: "N", stats: [{ value: "1", label: "a" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /atmosphere theme|cinematic beat/i.test(i.message))).toBe(true);
  });

  it("warns when coral poster theme lacks a bold beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "coral", title: "Flat poster" },
      slides: [
        { layout: "title", heading: "Poster" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Join", href: "#", style: "solid", icon: "fa-solid fa-rocket" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /poster theme|bold beat/i.test(i.message))).toBe(true);
  });

  it("warns when mat lacks a mid-century beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "mat", title: "Flat mat" },
      slides: [
        { layout: "title", heading: "Wood" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /mat woodglow|mid-century beat/i.test(i.message))).toBe(true);
  });

  it("warns when cobalt-grid lacks a drafted data beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "cobalt-grid", title: "Flat grid" },
      slides: [
        { layout: "title", heading: "Grid" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "two-column", heading: "Split", left: "A", right: "B", ratio: "2-1" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /cobalt-grid|drafted data beat/i.test(i.message))).toBe(true);
  });

  it("warns when biennale-yellow lacks a magazine beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "biennale-yellow", title: "Flat sun" },
      slides: [
        { layout: "title", heading: "Sun" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /magazine beat/i.test(i.message))).toBe(true);
  });

  it("warns when aerospace-hud lacks an instrument beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "aerospace-hud", title: "Flat HUD" },
      slides: [
        { layout: "title", heading: "Callsign" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Modules",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "quote", heading: "Status", quote: "Nominal." },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /HUD\/tech|instrument beat/i.test(i.message))).toBe(true);
  });

  it("warns when bauhaus lacks a modernist beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "bauhaus", title: "Flat Primary" },
      slides: [
        { layout: "title", heading: "Primary" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        { layout: "stat-row", heading: "Nums", stats: [{ value: "1", label: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /bauhaus|modernist beat/i.test(i.message))).toBe(true);
  });

  it("warns when genz-bento lacks a hard-bento beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "genz-bento", title: "Flat Bounce" },
      slides: [
        { layout: "title", heading: "Bounce" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Soft cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /genz-bento|hard-bento beat/i.test(i.message))).toBe(true);
  });

  it("warns when aurora-glass lacks a frosted product beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "aurora-glass", title: "Flat glass" },
      slides: [
        { layout: "title", heading: "Glass" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /Glass theme|frosted product beat/i.test(i.message))).toBe(true);
  });

  it("warns when electric-studio lacks a loud brand beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "electric-studio", title: "Flat electric" },
      slides: [
        { layout: "title", heading: "Electric" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /electric-studio|loud brand beat/i.test(i.message))).toBe(true);
  });

  it("warns when brutalist-mono lacks a hard mono beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "brutalist-mono", title: "Flat concrete" },
      slides: [
        { layout: "title", heading: "Concrete" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /brutalist-mono|hard mono beat/i.test(i.message))).toBe(true);
  });

  it("warns when cartesian lacks a plotted data beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "cartesian", title: "Flat draft" },
      slides: [
        { layout: "title", heading: "Draft" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "quote", heading: "Note", quote: "Plot it." },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /cartesian|plotted data beat/i.test(i.message))).toBe(true);
  });

  it("warns when swiss-typographic lacks a modernist beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "swiss-typographic", title: "Flat swiss" },
      slides: [
        { layout: "title", heading: "Swiss" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        { layout: "stat-row", heading: "Nums", stats: [{ value: "1", label: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /swiss-typographic|modernist beat/i.test(i.message))).toBe(true);
  });

  it("warns when signal lacks a briefing beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "signal", title: "Flat briefing" },
      slides: [
        { layout: "title", heading: "Signal" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "timeline", heading: "Steps", items: [{ label: "One", detail: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /signal|briefing beat/i.test(i.message))).toBe(true);
  });

  it("warns when luxury-minimalist lacks a quiet-luxe beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "luxury-minimalist", title: "Flat luxe" },
      slides: [
        { layout: "title", heading: "Luxe" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        {
          layout: "feature-grid",
          heading: "Cards",
          columns: 3,
          cards: [
            { title: "One", body: "A", icon: "fa-solid fa-1" },
            { title: "Two", body: "B", icon: "fa-solid fa-2" },
            { title: "Three", body: "C", icon: "fa-solid fa-3" },
          ],
        },
        { layout: "stat-row", heading: "Nums", stats: [{ value: "1", label: "A" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /luxury-minimalist|quiet-luxe|restrained luxury/i.test(i.message))).toBe(
      true
    );
  });

  it("warns when corporate lacks a clean product beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "corporate", title: "Flat corp" },
      slides: [
        { layout: "title", heading: "Corp" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "two-column", heading: "Notes", left: "A", right: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /corporate|fintech-clean|clean product beat/i.test(i.message))).toBe(
      true
    );
  });

  it("warns when playful lacks a soft-bento beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "playful", title: "Flat play" },
      slides: [
        { layout: "title", heading: "Play" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "two-column", heading: "Notes", left: "A", right: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /playful|split-pastel|soft-bento beat/i.test(i.message))).toBe(true);
  });

  it("warns when default-tech lacks a tech product beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "default-tech", title: "Flat tech" },
      slides: [
        { layout: "title", heading: "Tech" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "two-column", heading: "Notes", left: "A", right: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /default-tech|developer-dark|tech product beat/i.test(i.message))).toBe(
      true
    );
  });

  it("warns when scatterbrain lacks a workshop beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "scatterbrain", title: "Flat cork" },
      slides: [
        { layout: "title", heading: "Cork" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "two-column", heading: "Notes", left: "A", right: "B" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /scatterbrain|workshop beat/i.test(i.message))).toBe(true);
  });

  it("warns when data-editorial lacks a reported data beat", () => {
    const deck = {
      type: "deck",
      meta: { theme: "data-editorial", title: "Flat report" },
      slides: [
        { layout: "title", heading: "Report" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "quote", quote: "Line", by: "Ed" },
        { layout: "comparison", heading: "Diff", left: "A", right: "B", emphasis: "right" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Enter", href: "#", style: "solid", icon: "fa-solid fa-door-open" },
            { label: "Share", href: "#", style: "outline", icon: "fa-solid fa-share" },
          ],
        },
      ],
    };
    const issues = auditCraft(deck);
    expect(issues.some((i) => /data-editorial|reported data beat/i.test(i.message))).toBe(true);
  });

  it("gallery example decks clear the craft floor (notes / dual-CTA / data beats)", () => {
    const dir = resolve(process.cwd(), "../../examples/decks");
    const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
    expect(files.length).toBeGreaterThan(50);
    const failures: string[] = [];
    for (const file of files) {
      const deck = JSON.parse(readFileSync(join(dir, file), "utf-8"));
      const issues = auditCraft(deck).filter((i) => i.severity === "warning" || i.severity === "error");
      if (issues.length) {
        failures.push(`${file}: ${issues.map((i) => i.message).join(" | ")}`);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe("repairCraft", () => {
  it("fills safe structural craft fields and clears those warnings", () => {
    const deck = {
      type: "deck",
      meta: { theme: "aurora-glass", title: "Launch waitlist" },
      slides: [
        { layout: "title", heading: "Go" },
        {
          layout: "feature-grid",
          heading: "Five",
          cards: [
            { title: "One", body: "A" },
            { title: "Two", body: "B" },
            { title: "Three", body: "C" },
            { title: "Four", body: "D" },
            { title: "Five", body: "E" },
          ],
        },
        {
          layout: "comparison",
          heading: "Vs",
          leftLabel: "A",
          left: "old",
          rightLabel: "B",
          right: "new",
        },
        { layout: "two-column", heading: "Split", left: "L", right: "R" },
        { layout: "section", heading: "More" },
        { layout: "closing", heading: "Ship", cta: { label: "Join the waitlist", href: "#" } },
      ],
    };
    const before = auditCraft(deck);
    expect(before.some((i) => /emphasis/i.test(i.message))).toBe(true);
    expect(before.some((i) => /bento/i.test(i.message))).toBe(true);
    expect(before.some((i) => /ratio/i.test(i.message))).toBe(true);
    expect(before.some((i) => /speaker notes/i.test(i.message))).toBe(true);

    const { deck: repaired, fixes } = repairCraft(deck);
    expect(fixes.length).toBeGreaterThan(3);
    const slides = repaired.slides as Array<Record<string, unknown>>;
    const comparison = slides.find((s) => s["layout"] === "comparison");
    const feature = slides.find((s) => s["layout"] === "feature-grid");
    const twoCol = slides.find((s) => s["layout"] === "two-column");
    const closing = slides.find((s) => s["layout"] === "closing");
    expect(comparison?.["emphasis"]).toBe("right");
    expect(feature?.["columns"]).toBe("bento");
    expect(twoCol?.["ratio"]).toBe("2-1");
    expect(Array.isArray(closing?.["actions"])).toBe(true);
    expect(
      (feature?.["cards"] as Array<Record<string, unknown>>).every(
        (c) => typeof c["icon"] === "string" && c["icon"]
      )
    ).toBe(true);

    const after = auditCraft(repaired);
    expect(after.some((i) => /emphasis/i.test(i.message))).toBe(false);
    expect(after.some((i) => /bento/i.test(i.message))).toBe(false);
    expect(after.some((i) => /ratio/i.test(i.message))).toBe(false);
    expect(after.some((i) => /speaker notes/i.test(i.message))).toBe(false);
    expect(after.some((i) => /single CTA|dual actions/i.test(i.message))).toBe(false);
  });

  it("is a no-op on already-clean stunning decks", () => {
    const pulse = JSON.parse(
      readFileSync(resolve(process.cwd(), "../../examples/decks/pulse-wrapped.json"), "utf-8")
    );
    const { fixes } = repairCraft(pulse);
    expect(fixes).toEqual([]);
  });

  it("inserts image-hero, comparison, and data beats for flat long decks", () => {
    const deck = {
      type: "deck",
      meta: { theme: "default-tech", title: "Flat Launch" },
      slides: Array.from({ length: 6 }, (_, i) =>
        i === 0
          ? { layout: "title", heading: "Flat Launch" }
          : i === 5
            ? {
                layout: "closing",
                heading: "Bye",
                actions: [
                  { label: "Go", href: "#", style: "solid", icon: "fa-solid fa-rocket" },
                  { label: "More", href: "#", style: "outline", icon: "fa-solid fa-book" },
                ],
              }
            : {
                layout: "feature-grid",
                heading: `Slide ${i + 1}`,
                columns: 3,
                cards: [
                  { title: "One", body: "A", icon: "fa-solid fa-1" },
                  { title: "Two", body: "B", icon: "fa-solid fa-2" },
                  { title: "Three", body: "C", icon: "fa-solid fa-3" },
                ],
              }
      ),
    };
    const before = auditCraft(deck);
    expect(before.some((i) => /image-hero/i.test(i.message))).toBe(true);
    expect(before.some((i) => /asymmetry/i.test(i.message))).toBe(true);
    expect(before.some((i) => /data beat/i.test(i.message))).toBe(true);

    const { deck: repaired, fixes } = repairCraft(deck);
    expect(fixes.some((f) => /image-hero/i.test(f))).toBe(true);
    expect(fixes.some((f) => /comparison/i.test(f))).toBe(true);
    expect(fixes.some((f) => /stat-row|data beat/i.test(f))).toBe(true);

    const layouts = (repaired.slides as Array<Record<string, unknown>>).map((s) => s["layout"]);
    expect(layouts).toContain("image-hero");
    expect(layouts).toContain("comparison");
    expect(layouts).toContain("stat-row");

    const after = auditCraft(repaired);
    expect(after.some((i) => /image-hero/i.test(i.message))).toBe(false);
    expect(after.some((i) => /asymmetry/i.test(i.message))).toBe(false);
    expect(after.some((i) => /data beat/i.test(i.message))).toBe(false);
  });

  it("assigns wrap tones and inserts wrap visual when missing", () => {
    const deck = {
      type: "deck",
      meta: { theme: "kinetic-wrapped", title: "Flat wrap" },
      slides: [
        { layout: "title", heading: "Year" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "closing", heading: "Bye", cta: { label: "Go", href: "#" } },
      ],
    };
    const before = auditCraft(deck);
    expect(before.some((i) => /fewer than 3 toned/i.test(i.message))).toBe(true);
    expect(before.some((i) => /wrap needs a visual beat/i.test(i.message))).toBe(true);

    const { deck: repaired, fixes } = repairCraft(deck);
    expect(fixes.some((f) => /tone/i.test(f))).toBe(true);
    expect(fixes.some((f) => /ranked-list/i.test(f))).toBe(true);

    const after = auditCraft(repaired);
    expect(after.some((i) => /fewer than 3 toned/i.test(i.message))).toBe(false);
    expect(after.some((i) => /wrap needs a visual beat/i.test(i.message))).toBe(false);
  });

  it("fills missing headings and inserts logo-wall for social-proof copy", () => {
    const deck = {
      type: "deck",
      meta: { theme: "fintech-clean", title: "Trusted partners" },
      slides: [
        { layout: "title", lead: "Trusted by customers worldwide" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "quote", quote: "Great partners.", by: "CEO" },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Go", href: "#", style: "solid", icon: "fa-solid fa-rocket" },
            { label: "More", href: "#", style: "outline", icon: "fa-solid fa-book" },
          ],
        },
      ],
    };
    const before = auditCraft(deck);
    expect(before.some((i) => /missing a "heading"/i.test(i.message))).toBe(true);
    expect(before.some((i) => /logo-wall/i.test(i.message))).toBe(true);

    const { deck: repaired, fixes } = repairCraft(deck);
    expect(fixes.some((f) => /heading/i.test(f))).toBe(true);
    expect(fixes.some((f) => /logo-wall/i.test(f))).toBe(true);
    const slides = repaired.slides as Array<Record<string, unknown>>;
    expect(slides[0]?.["heading"]).toBeTruthy();
    expect(slides.some((s) => s["layout"] === "logo-wall")).toBe(true);

    const after = auditCraft(repaired);
    expect(after.some((i) => /missing a "heading"/i.test(i.message))).toBe(false);
    expect(after.some((i) => /logo-wall/i.test(i.message))).toBe(false);
  });

  it("breaks identical layout cadence with a lossless swap", () => {
    const deck = {
      type: "deck",
      meta: { theme: "default-tech", title: "Cadence" },
      slides: [
        { layout: "title", heading: "Cadence" },
        { layout: "image-hero", heading: "Hero", image: "https://x/y.png" },
        { layout: "section", heading: "A" },
        { layout: "section", heading: "B" },
        { layout: "section", heading: "C" },
        { layout: "stat-row", heading: "N", stats: [{ value: "1", label: "a" }] },
        {
          layout: "closing",
          heading: "Bye",
          actions: [
            { label: "Go", href: "#", style: "solid", icon: "fa-solid fa-rocket" },
            { label: "More", href: "#", style: "outline", icon: "fa-solid fa-book" },
          ],
        },
      ],
    };
    const before = auditCraft(deck);
    expect(before.some((i) => /repeats 3x/i.test(i.message))).toBe(true);

    const { deck: repaired, fixes } = repairCraft(deck);
    expect(fixes.some((f) => /cadence/i.test(f))).toBe(true);
    const layouts = (repaired.slides as Array<Record<string, unknown>>).map((s) => s["layout"]);
    expect(layouts.filter((l) => l === "section").length).toBeLessThan(3);

    const after = auditCraft(repaired);
    expect(after.some((i) => /repeats 3x/i.test(i.message))).toBe(false);
  });
});
