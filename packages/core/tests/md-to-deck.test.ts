import { describe, it, expect } from "vitest";
import { markdownToDeck } from "../src/index.js";

describe("markdownToDeck", () => {
  it("parses front matter and --- slide splits", () => {
    const md = `---
title: Acme Pitch
theme: signal
company: Acme
---

# We make X faster

One line positioning.

---

## Why Acme

- Fast
- Trusted
- Proven

---

## Thanks

Let's talk.
`;
    const deck = markdownToDeck(md);
    expect(deck.type).toBe("deck");
    expect(deck.meta.theme).toBe("signal");
    expect(deck.meta.title).toBe("Acme Pitch");
    expect(deck.slides[0]?.layout).toBe("title");
    expect(deck.slides[1]?.layout).toBe("feature-grid");
    expect(deck.slides.at(-1)?.layout).toBe("closing");
  });

  it("maps chart and html fences", () => {
    const md = `# Data

\`\`\`chart bar
Quarter,ARR
Q1,10
Q2,14
\`\`\`

---

# Art

\`\`\`html
<div style="color:var(--accent)">Hello</div>
\`\`\`
`;
    const deck = markdownToDeck(md);
    expect(deck.slides[0]?.layout).toBe("chart");
    expect(deck.slides[0]?.["chartType"]).toBe("bar");
    expect(deck.slides[1]?.layout).toBe("custom-html");
    expect(String(deck.slides[1]?.["html"])).toContain("var(--accent)");
  });
});
