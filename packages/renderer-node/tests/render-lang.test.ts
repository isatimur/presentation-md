import { describe, expect, it } from "vitest";
import { renderDeck } from "../src/index.js";

function deck(lang?: string): string {
  return JSON.stringify({
    type: "deck",
    meta: { title: "Lang", theme: "claude", ...(lang ? { lang } : {}) },
    slides: [
      { layout: "title", heading: "عنوان العرض" },
      { layout: "closing", heading: "شكرا" },
    ],
  });
}

describe("presenter chrome strings", () => {
  it("fills every chrome placeholder and embeds a parsable pmd-chrome block", async () => {
    const html = await renderDeck(deck());
    expect(html).not.toContain("{{chrome.");
    expect(html).not.toContain("{{{chromeJson}}}");
    const m = html.match(/<script type="application\/json" id="pmd-chrome">([\s\S]*?)<\/script>/);
    expect(m).not.toBeNull();
    const strings = JSON.parse(m![1]!) as Record<string, string>;
    expect(strings["editButtonTitle"]).toBe("Edit mode (E)");
    expect(html).toContain('title="Edit mode (E)"');
    expect(html).toContain("Speaker · O");
    expect(html).toContain("Last slide — wrap or take questions.");
  });
});

describe("deck language in HTML", () => {
  it("defaults to lang=en dir=ltr", async () => {
    const html = await renderDeck(deck());
    expect(html).toMatch(/<html lang="en" dir="ltr">/);
  });

  it("sets lang and rtl for Arabic and adds an Arabic font fallback", async () => {
    const html = await renderDeck(deck("ar"));
    expect(html).toMatch(/<html lang="ar" dir="rtl">/);
    expect(html).toContain("Noto+Sans+Arabic");
    expect(html).toContain("'Noto Sans Arabic'");
  });

  it("adds a CJK fallback for Japanese and keeps ltr", async () => {
    const html = await renderDeck(deck("ja"));
    expect(html).toMatch(/<html lang="ja" dir="ltr">/);
    expect(html).toContain("Noto+Sans+JP");
  });

  it("rejects a malformed lang at validation", async () => {
    await expect(renderDeck(deck('en" onload="alert(1)'))).rejects.toThrow(/invalid/i);
  });
});
