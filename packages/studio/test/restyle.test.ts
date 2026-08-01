import { describe, expect, it } from "vitest";
import { EXAMPLE_DECK } from "../src/deck.js";
import {
  renderRestyleHtml,
  restyleSlideHtml,
} from "../src/components/DeckRestylePreview.js";

describe("DeckRestylePreview helpers", () => {
  it("injects restyle CSS that isolates the selected slide", () => {
    const html = restyleSlideHtml(
      "<html><head></head><body><section class=\"slide\">A</section><section class=\"slide\">B</section></body></html>",
      1
    );
    expect(html).toContain("data-pmd-restyle");
    expect(html).toContain("nth-of-type(2)");
    expect(html).toContain("1280px");
  });

  it("renders the example deck under a target theme for My deck compare", () => {
    const html = renderRestyleHtml(EXAMPLE_DECK, "aurora-glass", 0);
    expect(html).toContain("data-pmd-restyle");
    expect(html).toContain("nth-of-type(1)");
    expect(html.toLowerCase()).toContain("<section");
  });
});
