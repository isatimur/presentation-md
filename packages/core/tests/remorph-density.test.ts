import { describe, it, expect } from "vitest";
import { remorphDensity } from "../src/remorph-density.js";

describe("remorphDensity speaker", () => {
  it("splits crowded feature-grid cards and locks meta.density", () => {
    const deck = {
      type: "deck",
      meta: { title: "Dense", theme: "default-tech" },
      slides: [
        {
          layout: "feature-grid",
          heading: "Six things",
          columns: 3,
          cards: [
            { title: "A", body: "1" },
            { title: "B", body: "2" },
            { title: "C", body: "3" },
            { title: "D", body: "4" },
            { title: "E", body: "5" },
            { title: "F", body: "6" },
          ],
        },
      ],
    };
    const { deck: out, changes, density } = remorphDensity(deck, "speaker");
    expect(density).toBe("speaker");
    expect(out.meta?.density).toBe("speaker");
    expect(out.slides).toHaveLength(2);
    const s0 = (out.slides as Array<Record<string, unknown>>)[0]!;
    const s1 = (out.slides as Array<Record<string, unknown>>)[1]!;
    expect((s0.cards as unknown[]).length).toBe(3);
    expect((s1.cards as unknown[]).length).toBe(3);
    expect(s1.heading).toMatch(/cont/i);
    expect(changes.some((c) => /split feature-grid/i.test(c))).toBe(true);
  });

  it("leaves bento feature-grids intact", () => {
    const cards = Array.from({ length: 5 }, (_, i) => ({
      title: `Card ${i + 1}`,
      body: "x",
    }));
    const deck = {
      type: "deck",
      meta: {},
      slides: [{ layout: "feature-grid", columns: "bento", heading: "Bento", cards }],
    };
    const { deck: out } = remorphDensity(deck, "speaker");
    expect(out.slides).toHaveLength(1);
    expect(((out.slides as Array<Record<string, unknown>>)[0]!.cards as unknown[]).length).toBe(5);
  });

  it("moves overflow body into notes", () => {
    const long =
      "First line of the story.\nSecond line keeps going.\nThird line still here.\nFourth line should move.\nFifth line too.";
    const deck = {
      type: "deck",
      meta: {},
      slides: [{ layout: "two-column", heading: "Talk", body: long }],
    };
    const { deck: out, changes } = remorphDensity(deck, "speaker");
    const slide = (out.slides as Array<Record<string, unknown>>)[0]!;
    expect(String(slide.body).split(/\n+/).filter(Boolean).length).toBeLessThanOrEqual(3);
    expect(String(slide.notes)).toMatch(/Fourth|Fifth/);
    expect(changes.some((c) => /overflow body/i.test(c))).toBe(true);
  });

  it("splits ranked-list and timeline by caps", () => {
    const deck = {
      type: "deck",
      meta: {},
      slides: [
        {
          layout: "ranked-list",
          heading: "Top",
          items: Array.from({ length: 8 }, (_, i) => ({ label: `Item ${i + 1}` })),
        },
        {
          layout: "timeline",
          heading: "Roadmap",
          steps: Array.from({ length: 7 }, (_, i) => ({ title: `Step ${i + 1}` })),
        },
      ],
    };
    const { deck: out } = remorphDensity(deck, "speaker");
    const slides = out.slides as Array<Record<string, unknown>>;
    expect(slides.length).toBeGreaterThan(2);
    expect(slides.every((s) => s.layout === "ranked-list" || s.layout === "timeline")).toBe(true);
  });
});

describe("remorphDensity reading", () => {
  it("merges continuation list slides and promotes notes", () => {
    const deck = {
      type: "deck",
      meta: { density: "speaker" },
      slides: [
        {
          layout: "feature-grid",
          heading: "Pack",
          columns: 3,
          cards: [
            { title: "A", body: "1" },
            { title: "B", body: "2" },
          ],
        },
        {
          layout: "feature-grid",
          heading: "Pack (cont.)",
          eyebrow: "Continued",
          columns: 3,
          cards: [
            { title: "C", body: "3" },
            { title: "D", body: "4" },
          ],
        },
        {
          layout: "two-column",
          heading: "Detail",
          body: "Short.",
          notes: "Extra reading context that belongs on the slide face.",
        },
      ],
    };
    const { deck: out, changes, density } = remorphDensity(deck, "reading");
    expect(density).toBe("reading");
    expect(out.meta?.density).toBe("reading");
    const slides = out.slides as Array<Record<string, unknown>>;
    expect(slides).toHaveLength(2);
    expect((slides[0]!.cards as unknown[]).length).toBe(4);
    expect(String(slides[0]!.heading)).not.toMatch(/cont/i);
    expect(String(slides[1]!.body)).toMatch(/Extra reading/);
    expect(slides[1]!.notes).toBeUndefined();
    expect(changes.some((c) => /Merged/i.test(c))).toBe(true);
    expect(changes.some((c) => /promoted speaker notes/i.test(c))).toBe(true);
  });

  it("is a no-op merge when siblings are unrelated", () => {
    const deck = {
      type: "deck",
      meta: {},
      slides: [
        {
          layout: "feature-grid",
          heading: "Alpha",
          cards: [{ title: "A", body: "1" }],
        },
        {
          layout: "feature-grid",
          heading: "Beta",
          cards: [{ title: "B", body: "2" }],
        },
      ],
    };
    const { deck: out } = remorphDensity(deck, "reading");
    expect(out.slides).toHaveLength(2);
  });
});
