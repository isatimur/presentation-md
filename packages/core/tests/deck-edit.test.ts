import { describe, expect, it } from "vitest";
import { applyDeckEdits, DeckEditError, deckOutline } from "../src/deck-edit.js";

const deck = () => ({
  type: "deck",
  meta: { title: "Q3", theme: "claude", lang: "en" },
  slides: [
    { layout: "title", heading: "Hello", lead: "Three words here" },
    { layout: "section", heading: "Part one", notes: "say hi" },
    { layout: "quote", quote: "Ship it" },
    { layout: "closing", heading: "Thanks" },
  ],
});

describe("deckOutline", () => {
  it("summarises each slide and returns full JSON only for included slides", () => {
    const o = deckOutline(deck(), [2, 99]);
    expect(o).toMatchObject({ title: "Q3", theme: "claude", lang: "en", slide_count: 4 });
    expect(o.slides.map((s) => [s.n, s.layout, s.title, s.has_notes])).toEqual([
      [1, "title", "Hello", false],
      [2, "section", "Part one", true],
      [3, "quote", "Ship it", false],
      [4, "closing", "Thanks", false],
    ]);
    expect(o.slides[0]!.words).toBeGreaterThanOrEqual(4);
    expect(Object.keys(o.slide_json!)).toEqual(["2"]);
    // Closing without actions is a slide-local craft issue.
    expect(o.slides[3]!.issues.join(" ")).toMatch(/CTA/);
  });
});

describe("applyDeckEdits", () => {
  it("applies a batch in order, reports final positions, and leaves the input untouched", () => {
    const input = deck();
    const { deck: out, touched } = applyDeckEdits(input, [
      { op: "update_slide", slide: 1, fields: { heading: "Hi", lead: null } },
      { op: "insert_slide", at: 2, value: { layout: "quote", quote: "New" } },
      { op: "move_slide", slide: 5, to: 1 },
      { op: "delete_slide", slide: 4 },
      { op: "update_meta", fields: { title: "Q4", lang: null } },
    ]);
    const slides = out["slides"] as Array<Record<string, unknown>>;
    expect(slides.map((s) => s["heading"] ?? s["quote"])).toEqual(["Thanks", "Hi", "New", "Ship it"]);
    expect(slides[1]).not.toHaveProperty("lead");
    expect(out["meta"]).toEqual({ title: "Q4", theme: "claude" });
    expect(touched).toEqual([1, 2, 3]);
    expect(input.slides[0]!.heading).toBe("Hello");
    expect(input.slides).toHaveLength(4);
  });

  it("replace_slide swaps the whole slide and insert at count+1 appends", () => {
    const { deck: out } = applyDeckEdits(deck(), [
      { op: "replace_slide", slide: 3, value: { layout: "stat-row", heading: "KPIs", stats: [] } },
      { op: "insert_slide", at: 5, value: { layout: "section", heading: "Appendix" } },
    ]);
    const slides = out["slides"] as Array<Record<string, unknown>>;
    expect(slides[2]).toEqual({ layout: "stat-row", heading: "KPIs", stats: [] });
    expect(slides[4]!["heading"]).toBe("Appendix");
  });

  it("names the failing operation and applies nothing", () => {
    const input = deck();
    const bad = [
      { op: "update_slide", slide: 1, fields: { heading: "changed" } },
      { op: "delete_slide", slide: 9 },
    ];
    expect(() => applyDeckEdits(input, bad)).toThrow(DeckEditError);
    expect(() => applyDeckEdits(input, bad)).toThrow(/operation 2: `slide` must be a slide number from 1 to 4/);
    expect(input.slides[0]!.heading).toBe("Hello");
  });

  it("rejects unknown ops, missing layouts, non-objects and prototype keys", () => {
    expect(() => applyDeckEdits(deck(), [])).toThrow(/non-empty array/);
    expect(() => applyDeckEdits(deck(), [{ op: "rename" }])).toThrow(/unknown op "rename"/);
    expect(() => applyDeckEdits(deck(), [{ op: "insert_slide", at: 1, value: { heading: "x" } }])).toThrow(
      /value.layout/
    );
    expect(() => applyDeckEdits(deck(), [{ op: "update_slide", slide: 1, fields: "x" }])).toThrow(/fields/);
    const polluted = JSON.parse('[{"op":"update_meta","fields":{"__proto__":{"x":1}}}]');
    expect(() => applyDeckEdits(deck(), polluted)).toThrow(/not allowed/);
    expect(({} as Record<string, unknown>)["x"]).toBeUndefined();
  });
});
