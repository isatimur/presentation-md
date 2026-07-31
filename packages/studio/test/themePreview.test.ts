import { describe, expect, it } from "vitest";
import { COMPARE_LIMIT, toggleCompareSlot, themePreviewUrl } from "../src/render/themePreview.js";

describe("themePreview compare helpers", () => {
  it("caps compare at 3 with FIFO when adding a fourth", () => {
    expect(COMPARE_LIMIT).toBe(3);
    let slots: string[] = [];
    slots = toggleCompareSlot(slots, "a");
    slots = toggleCompareSlot(slots, "b");
    slots = toggleCompareSlot(slots, "c");
    expect(slots).toEqual(["a", "b", "c"]);
    slots = toggleCompareSlot(slots, "d");
    expect(slots).toEqual(["b", "c", "d"]);
  });

  it("toggles a theme out of the compare tray", () => {
    expect(toggleCompareSlot(["a", "b"], "a")).toEqual(["b"]);
  });

  it("points theme previews at production craft proofs outside hosted studio", () => {
    expect(themePreviewUrl("aurora-glass")).toMatch(
      /\/previews\/aurora-glass\.html$/
    );
  });
});
