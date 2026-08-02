import { describe, expect, it, vi } from "vitest";
import type { DeckJson } from "@presentation-md/export";
import {
  canRedo,
  canUndo,
  createDeckHistory,
  pushDeck,
  redoDeck,
  replaceDeck,
  undoDeck,
} from "../src/history.js";

function deck(title: string, slides = 1): DeckJson {
  return {
    type: "deck",
    meta: { title, theme: "default-tech" },
    slides: Array.from({ length: slides }, (_, i) => ({
      layout: "title" as const,
      heading: `${title}-${i}`,
    })),
  };
}

describe("deck history", () => {
  it("pushes, undoes, and redoes deck revisions", () => {
    let h = createDeckHistory(deck("a"));
    h = pushDeck(h, deck("b"));
    h = pushDeck(h, deck("c"));
    expect(h.present.meta?.title).toBe("c");
    expect(canUndo(h)).toBe(true);

    h = undoDeck(h);
    expect(h.present.meta?.title).toBe("b");
    expect(canRedo(h)).toBe(true);

    h = undoDeck(h);
    expect(h.present.meta?.title).toBe("a");
    expect(canUndo(h)).toBe(false);

    h = redoDeck(h);
    expect(h.present.meta?.title).toBe("b");
  });

  it("skips identical pushes and clears redo on new edit", () => {
    let h = createDeckHistory(deck("a"));
    h = pushDeck(h, deck("a"));
    expect(h.past).toHaveLength(0);

    h = pushDeck(h, deck("b"));
    h = undoDeck(h);
    h = pushDeck(h, deck("c"));
    expect(canRedo(h)).toBe(false);
    expect(h.present.meta?.title).toBe("c");
  });

  it("compares revisions without serializing the entire deck", () => {
    const initial = deck("large");
    initial.slides[0]!.body = "x".repeat(2 * 1024 * 1024);
    const changed = {
      ...initial,
      slides: [{ ...initial.slides[0], heading: "Changed" }],
    };
    const stringify = vi.spyOn(JSON, "stringify");
    try {
      const next = pushDeck(createDeckHistory(initial), changed);
      expect(next.past).toHaveLength(1);
      expect(stringify).not.toHaveBeenCalled();
    } finally {
      stringify.mockRestore();
    }
  });

  it("replaceDeck resets the stack (hydrate / example load)", () => {
    let h = createDeckHistory(deck("a"));
    h = pushDeck(h, deck("b"));
    h = replaceDeck(h, deck("shared"));
    expect(h.past).toHaveLength(0);
    expect(h.future).toHaveLength(0);
    expect(h.present.meta?.title).toBe("shared");
  });
});
