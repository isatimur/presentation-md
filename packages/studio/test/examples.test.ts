import { describe, expect, it } from "vitest";
import { getExampleDeck, resolveExampleSlug, STUDIO_EXAMPLES } from "../src/examples.js";

describe("studio examples", () => {
  it("resolves aliases and allowlisted slugs", () => {
    expect(resolveExampleSlug("acme")).toBe("acme");
    expect(resolveExampleSlug("default")).toBe("novaspark-pitch");
    expect(resolveExampleSlug("candy")).toBe("jellybean-launch");
    expect(resolveExampleSlug("meridian")).toBe("meridian-sales");
    expect(resolveExampleSlug("signalbox")).toBe("signalbox-report");
    expect(resolveExampleSlug("not-a-real-deck")).toBeNull();
  });

  it("lists the stunning twenty-five flagships before extras", () => {
    const slugs = STUDIO_EXAMPLES.map((e) => e.slug);
    expect(slugs.indexOf("novaspark-pitch")).toBeLessThan(slugs.indexOf("apsis-mission"));
    expect(slugs.indexOf("apsis-mission")).toBeLessThan(slugs.indexOf("posterforge-campaign"));
    expect(slugs).toContain("meridian-sales");
    expect(slugs).toContain("forge-api");
    expect(slugs).toContain("pulse-wrapped");
  });

  it("returns cloned decks for every catalog entry", () => {
    for (const ex of STUDIO_EXAMPLES) {
      const deck = getExampleDeck(ex.slug);
      expect(deck?.type).toBe("deck");
      expect(deck?.slides.length).toBeGreaterThan(0);
      // Clone: mutating returned deck must not corrupt catalog
      deck!.slides[0]!.heading = "MUTATED";
      expect(getExampleDeck(ex.slug)?.slides[0]?.heading).not.toBe("MUTATED");
    }
  });
});
