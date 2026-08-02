import { describe, it, expect } from "vitest";
import { judgeDeckJson } from "../src/judge-deck-json.js";

describe("judgeDeckJson", () => {
  it("flags wall-of-text gates", () => {
    const wall = Array.from({ length: 45 }, () => "word").join(" ");
    const result = judgeDeckJson({
      meta: { theme: "default-tech" },
      slides: [
        { layout: "title", heading: "Hi" },
        { layout: "section", heading: "Body", body: wall },
      ],
    });
    expect(result.flags.some((f) => f.id === "G1" && f.severity === "gate")).toBe(true);
    expect(result.metrics.gate_hits).toBeGreaterThan(0);
  });

  it("warns on missing visual beat for long decks", () => {
    const slides = Array.from({ length: 5 }, (_, i) => ({
      layout: "section",
      heading: `Slide ${i + 1}`,
      body: "Short.",
    }));
    const result = judgeDeckJson({ meta: { theme: "default-tech" }, slides });
    expect(result.flags.some((f) => f.id === "visual_beat")).toBe(true);
    expect(result.flags.some((f) => f.id === "asymmetry")).toBe(true);
  });

  it("passes a tight speaker-friendly deck", () => {
    const result = judgeDeckJson({
      meta: { theme: "aurora-glass" },
      slides: [
        { layout: "title", heading: "Ship it" },
        {
          layout: "comparison",
          heading: "Before / after",
          emphasis: "right",
          left: { title: "Before", body: "Slow" },
          right: { title: "After", body: "Fast" },
        },
        { layout: "image-hero", heading: "Proof", image: "https://example.com/x.png" },
        {
          layout: "closing",
          heading: "Next",
          actions: [{ label: "Book demo", href: "https://example.com" }],
        },
      ],
    });
    expect(result.flags.filter((f) => f.severity === "gate")).toHaveLength(0);
    expect(result.metrics.slide_count).toBe(4);
  });
});
