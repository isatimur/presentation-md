import { describe, expect, it } from "vitest";
import {
  COMPARE_LIMIT,
  PREVIEW_CROP_OFFSET_PX,
  PREVIEW_CROPS,
  isPreviewCrop,
  toggleCompareSlot,
  themePreviewUrl,
} from "../src/render/themePreview.js";

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

  it("points theme previews at same-origin /previews craft proofs", () => {
    expect(themePreviewUrl("aurora-glass")).toBe("/previews/aurora-glass.html");
  });

  it("exposes title → bento → comparison crop offsets for multi-layout live compare", () => {
    expect([...PREVIEW_CROPS]).toEqual(["title", "bento", "comparison"]);
    expect(isPreviewCrop("bento")).toBe(true);
    expect(isPreviewCrop("hero")).toBe(false);
    expect(PREVIEW_CROP_OFFSET_PX.title).toBe(48);
    expect(PREVIEW_CROP_OFFSET_PX.bento).toBe(48 + 720 + 48);
    expect(PREVIEW_CROP_OFFSET_PX.comparison).toBe(48 + 2 * (720 + 48));
    expect(PREVIEW_CROP_OFFSET_PX.bento).toBeGreaterThan(PREVIEW_CROP_OFFSET_PX.title);
    expect(PREVIEW_CROP_OFFSET_PX.comparison).toBeGreaterThan(
      PREVIEW_CROP_OFFSET_PX.bento
    );
  });
});
