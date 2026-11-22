import { describe, expect, it } from "vitest";
import { deckChromeJson, resolveDeckChrome } from "../src/deck-chrome.js";

const catalog = {
  en: { edit: "Edit", help: "Help", next: "Next" },
  ja: { edit: "編集", help: "  ", extra: "unused" },
};

describe("resolveDeckChrome", () => {
  it("uses the primary subtag and fills gaps from English", () => {
    expect(resolveDeckChrome(catalog, "ja-JP")).toEqual({ edit: "編集", help: "Help", next: "Next" });
  });

  it("falls back to English for unknown languages", () => {
    expect(resolveDeckChrome(catalog, "xx")).toEqual(catalog.en);
    expect(resolveDeckChrome(catalog, "en-GB")).toEqual(catalog.en);
  });

  it("ignores keys English does not define", () => {
    expect(resolveDeckChrome(catalog, "ja")).not.toHaveProperty("extra");
  });
});

describe("deckChromeJson", () => {
  it("escapes < so the JSON cannot close its script tag", () => {
    expect(deckChromeJson({ a: "</script><b>" })).not.toContain("</script>");
    expect(JSON.parse(deckChromeJson({ a: "</script>" }))).toEqual({ a: "</script>" });
  });
});
