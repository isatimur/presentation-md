import { describe, it, expect } from "vitest";
import { buildGenerateDeckPrompt } from "../src/generate-deck-prompt.js";

describe("buildGenerateDeckPrompt", () => {
  it("returns craft mandate with density lock and remorph hint", async () => {
    const result = await buildGenerateDeckPrompt({
      theme: "default-tech",
      intent: "Demo the product",
      density: "speaker",
    });
    expect(result.theme).toBe("default-tech");
    expect(result.density).toBe("speaker");
    expect(result.intent).toMatch(/Demo/);
    expect(result.craft_mandate).toMatch(/DENSITY LOCK: speaker-led/i);
    expect(result.craft_mandate).toMatch(/remorph_density/i);
    expect(result.skill.length).toBeGreaterThan(100);
    expect(result.palette).toBeTruthy();
    expect(result.deck_schema_reference.length).toBeGreaterThan(50);
  });

  it("locks reading density", async () => {
    const result = await buildGenerateDeckPrompt({ density: "reading" });
    expect(result.density).toBe("reading");
    expect(result.craft_mandate).toMatch(/reading-first/i);
  });
});
