import { describe, it, expect } from "vitest";
import {
  scaffoldDeck,
  listScaffoldPurposes,
  resolveScaffoldPurpose,
  auditCraft,
  repairCraft,
} from "../src/index.js";

describe("scaffoldDeck", () => {
  it("lists all recipe purposes", () => {
    const purposes = listScaffoldPurposes();
    expect(purposes.length).toBeGreaterThanOrEqual(20);
    expect(purposes.some((p) => p.id === "pitch")).toBe(true);
    expect(purposes.some((p) => p.id === "wrap")).toBe(true);
  });

  it("resolves aliases", () => {
    expect(resolveScaffoldPurpose("demo")).toBe("sales");
    expect(resolveScaffoldPurpose("year-wrap")).toBe("wrap");
    expect(resolveScaffoldPurpose("unknown-xyz")).toBeNull();
  });

  it("scaffolds a pitch deck that clears craft floors after soft field repair", () => {
    const { deck, slide_count, recipe_label } = scaffoldDeck({
      purpose: "pitch",
      theme: "default-tech",
      title: "Acme",
      company: "Acme Co",
    });
    expect(recipe_label).toMatch(/Pitch/);
    expect(slide_count).toBe(12);
    expect(deck.type).toBe("deck");
    expect(deck.meta.theme).toBe("default-tech");
    expect(deck.slides.some((s) => s["layout"] === "image-hero")).toBe(true);
    expect(deck.slides.some((s) => s["layout"] === "comparison")).toBe(true);
    expect(
      deck.slides.some(
        (s) => s["layout"] === "closing" && Array.isArray(s["actions"]) && (s["actions"] as unknown[]).length >= 2
      )
    ).toBe(true);

    const { deck: repaired } = repairCraft(deck);
    const issues = auditCraft(repaired);
    const blockers = issues.filter((i) => i.severity === "error");
    expect(blockers).toEqual([]);
    // Structural craft floors should be clear (theme honesty may still warn on soft placeholders).
    expect(
      issues.every(
        (i) =>
          !/No image-hero|Weak asymmetry|Long deck with no chart|missing CTA|dual actions without icons/i.test(
            i.message
          )
      )
    ).toBe(true);
  });

  it("defaults wrap purpose to kinetic-wrapped with tones", () => {
    const { deck } = scaffoldDeck({ purpose: "wrap", title: "2025 Wrapped" });
    expect(deck.meta.theme).toBe("kinetic-wrapped");
    const toned = deck.slides.filter((s) => {
      const t = s["tone"];
      return typeof t === "string" && t !== "default" && t.trim() !== "";
    });
    expect(toned.length).toBeGreaterThanOrEqual(3);
    expect(deck.slides.some((s) => s["layout"] === "ranked-list")).toBe(true);
    expect(deck.slides.some((s) => s["layout"] === "streak-grid")).toBe(true);
  });
});
