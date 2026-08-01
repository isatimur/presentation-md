import { describe, expect, it } from "vitest";
import { pickDiscoveryPreviewTrio } from "../src/theme-browse.js";

describe("pickDiscoveryPreviewTrio", () => {
  it("returns null for an empty pool", () => {
    expect(pickDiscoveryPreviewTrio([])).toBeNull();
  });

  it("curates safe / bold / wildcard from a mixed pool", () => {
    const trio = pickDiscoveryPreviewTrio([
      { name: "soft-editorial", scheme: "light", mood: ["editorial", "quiet"], popular: true },
      { name: "neon-noir", scheme: "dark", mood: ["neon", "cyber", "edgy"] },
      { name: "vaporwave", scheme: "dark", mood: ["neon", "playful"], popular: true },
      { name: "corporate", scheme: "light", mood: ["professional"], popular: true },
    ]);
    expect(trio).not.toBeNull();
    expect(trio!.themes).toHaveLength(3);
    expect(trio!.roles.safe).toBeTruthy();
    expect(trio!.roles.bold).toBeTruthy();
    expect(trio!.roles.wildcard).toBeTruthy();
    expect(new Set(trio!.themes).size).toBe(3);
    expect(trio!.hint).toMatch(/preview_themes/i);
  });

  it("dedupes and caps at three", () => {
    const trio = pickDiscoveryPreviewTrio([
      { name: "a", scheme: "light" },
      { name: "a", scheme: "light" },
      { name: "b", scheme: "dark", mood: ["neon"] },
      { name: "c", scheme: "light" },
      { name: "d", scheme: "dark" },
    ]);
    expect(trio!.themes).toHaveLength(3);
    expect(trio!.themes.filter((t) => t === "a")).toHaveLength(1);
  });
});
