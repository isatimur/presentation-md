import { describe, expect, it } from "vitest";
import { morphSlide } from "../src/deck.js";

describe("morphSlide", () => {
  it("preserves heading and notes when changing layout", () => {
    const next = morphSlide(
      {
        layout: "title",
        heading: "Keep me",
        lead: "Also keep",
        notes: "Speaker line",
        eyebrow: "Q3",
      },
      "comparison"
    );
    expect(next.layout).toBe("comparison");
    expect(next.heading).toBe("Keep me");
    expect(next.lead).toBe("Also keep");
    expect(next.notes).toBe("Speaker line");
    expect(next.eyebrow).toBe("Q3");
    expect(next.leftLabel).toBeTruthy();
    expect(next.rightLabel).toBeTruthy();
  });

  it("bridges heading ↔ quote when morphing to/from quote", () => {
    const toQuote = morphSlide({ layout: "section", heading: "Bold claim" }, "quote");
    expect(toQuote.layout).toBe("quote");
    expect(toQuote.quote).toBe("Bold claim");

    const fromQuote = morphSlide({ layout: "quote", quote: "Memorable line", by: "Ada" }, "title");
    expect(fromQuote.layout).toBe("title");
    expect(fromQuote.heading).toBe("Memorable line");
  });

  it("is a no-op when layout is unchanged", () => {
    const slide = { layout: "stat-row" as const, heading: "KPI", stats: [{ value: "1", label: "x" }] };
    expect(morphSlide(slide, "stat-row")).toBe(slide);
  });
});
