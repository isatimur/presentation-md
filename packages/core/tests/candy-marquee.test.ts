import { describe, it, expect } from "vitest";
import { candyMarqueeBrand, candyMarqueeText } from "../src/candy-marquee.js";

describe("candyMarquee", () => {
  it("brands from company over title", () => {
    expect(candyMarqueeBrand({ company: "Sourbean", title: "Launch" })).toBe("SOURBEAN");
    expect(candyMarqueeBrand({ title: "Jelly Drop" })).toBe("JELLY DROP");
    expect(candyMarqueeBrand({})).toBe("CANDY POP");
  });

  it("builds a repeated ticker with brand", () => {
    const text = candyMarqueeText({ company: "Jellybean" });
    expect(text).toContain("JELLYBEAN");
    expect(text).toContain("SAVE TOGETHER");
    expect(text).not.toMatch(/CANDY POP/);
    expect(text.split("JELLYBEAN").length).toBeGreaterThan(3);
  });

  it("honors custom marquee units and still brands", () => {
    const text = candyMarqueeText({ company: "Sourbean", marquee: "DROP · SHIP · SMILE" });
    expect(text).toContain("DROP · SHIP · SMILE");
    expect(text).toContain("SOURBEAN");
    expect(text).not.toContain("SAVE TOGETHER");
  });
});
