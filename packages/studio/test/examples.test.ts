import { describe, expect, it } from "vitest";
import {
  loadExampleDeck,
  resolveExampleSlug,
  STUDIO_EXAMPLES,
} from "../src/examples.js";

describe("studio examples", () => {
  it("loads an allowlisted deck payload on demand", async () => {
    const deck = await loadExampleDeck("novaspark-pitch");

    expect(deck?.type).toBe("deck");
    expect(deck?.meta?.theme).toBe("aurora-glass");
  });

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

  // Flagships are real presentations, each following its genre's spine
  // (examples/decks, meta.genre), not one shared title → grid → compare template.
  // Theme preview crops read /previews/<theme>.html, not these decks.
  it("ships every stunning-25 flagship as a full genre deck that opens on a title", async () => {
    const flagshipSlugs = STUDIO_EXAMPLES.map((e) => e.slug).filter(
      (s) => s !== "acme" && s !== "briefing-signal" && s !== "posterforge-campaign"
    );
    expect(flagshipSlugs.length).toBe(25);
    for (const slug of flagshipSlugs) {
      const deck = await loadExampleDeck(slug);
      expect(deck).not.toBeNull();
      expect(deck!.slides[0]?.layout, slug).toBe("title");
      expect(deck!.slides.length, slug).toBeGreaterThanOrEqual(10);
      expect((deck!.meta as { genre?: string } | undefined)?.genre, slug).toBeTruthy();
    }
  });

  it("returns cloned decks for every catalog entry", async () => {
    for (const ex of STUDIO_EXAMPLES) {
      const deck = await loadExampleDeck(ex.slug);
      expect(deck?.type).toBe("deck");
      expect(deck?.slides.length).toBeGreaterThan(0);
      expect(deck?.meta?.theme, ex.slug).toBe(ex.theme);
      // Clone: mutating returned deck must not corrupt catalog
      deck!.slides[0]!.heading = "MUTATED";
      expect((await loadExampleDeck(ex.slug))?.slides[0]?.heading).not.toBe("MUTATED");
    }
  });
});
