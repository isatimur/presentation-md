import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  scaffoldDeck,
  listScaffoldPurposes,
  resolveScaffoldPurpose,
  auditCraft,
  repairCraft,
  validateDeck,
} from "../src/index.js";

/** Fields each layout's schema branch declares (the fields a template can render). */
function layoutFields(): Map<string, Set<string>> {
  const schema = JSON.parse(readFileSync(resolve(process.cwd(), "deck.schema.json"), "utf-8"));
  const known = new Map<string, Set<string>>();
  const walk = (o: unknown): void => {
    if (!o || typeof o !== "object") return;
    const node = o as Record<string, unknown>;
    const props = node["properties"] as Record<string, Record<string, unknown>> | undefined;
    const layout = props?.["layout"];
    const names = layout ? ((layout["const"] ? [layout["const"]] : layout["enum"]) as string[] | undefined) : undefined;
    if (props && names) for (const l of names) known.set(l, new Set([...(known.get(l) ?? []), ...Object.keys(props)]));
    for (const v of Object.values(node)) walk(v);
  };
  walk(schema);
  return known;
}

describe("every scaffold recipe", () => {
  const known = layoutFields();
  for (const { id } of listScaffoldPurposes()) {
    it(`${id}: validates and uses only fields its layouts render`, () => {
      const { deck } = scaffoldDeck({ purpose: id, title: "Acme" });
      const result = validateDeck(deck);
      expect(result.valid, JSON.stringify(result.errors?.slice(0, 3))).toBe(true);
      const extra: string[] = [];
      deck.slides.forEach((slide, i) => {
        const fields = known.get(String(slide["layout"]));
        if (!fields) return;
        for (const k of Object.keys(slide)) if (!fields.has(k)) extra.push(`slide ${i} (${slide["layout"]}): ${k}`);
      });
      expect(extra).toEqual([]);
    });
  }
});

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
