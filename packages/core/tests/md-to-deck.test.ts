import { describe, it, expect } from "vitest";
import { markdownToDeck, deckToMarkdown } from "../src/index.js";

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

  it("maps streak, metric-ring, logo-wall, and dual closing actions", () => {
    const md = `---
title: Wrap
theme: kinetic-wrapped
---

# Best streak

47 days straight. March 3 → April 18.

---

# TOP 3%

Out of millions of users, you ranked top 3% globally.

---

## Trusted by

- Helix
- Cobalt
- Parcel
- Northwind

---

## Share your wrap

You earned this flex.

- Share on Instagram
- Post to X
`;
    const deck = markdownToDeck(md);
    expect(deck.slides[0]?.layout).toBe("streak-grid");
    expect(deck.slides[0]?.["filled"]).toBe(47);
    expect(deck.slides[1]?.layout).toBe("metric-ring");
    expect(deck.slides[1]?.["value"]).toBe("3%");
    expect(deck.slides[2]?.layout).toBe("logo-wall");
    const closing = deck.slides.at(-1)!;
    expect(closing.layout).toBe("closing");
    expect(Array.isArray(closing["actions"])).toBe(true);
    expect((closing["actions"] as unknown[]).length).toBe(2);
  });
});

describe("deckToMarkdown", () => {
  it("round-trips front matter and common layouts", () => {
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

- Book a demo
- Read the docs
`;
    const deck = markdownToDeck(md);
    const out = deckToMarkdown(deck);
    expect(out).toContain("title: Acme Pitch");
    expect(out).toContain("theme: signal");
    expect(out).toContain("# We make X faster");
    expect(out).toContain("- Fast");
    const again = markdownToDeck(out);
    expect(again.meta.theme).toBe("signal");
    expect(again.slides[0]?.layout).toBe("title");
    expect(again.slides[1]?.layout).toBe("feature-grid");
    expect(again.slides.at(-1)?.layout).toBe("closing");
  });

  it("exports chart and code fences", () => {
    const deck = {
      type: "deck" as const,
      meta: { title: "Data", theme: "default-tech" },
      slides: [
        {
          layout: "chart",
          heading: "ARR",
          chartType: "bar",
          categories: ["Q1", "Q2"],
          series: [{ name: "ARR", values: [10, 14] }],
        },
        {
          layout: "code",
          heading: "Snippet",
          language: "ts",
          code: "console.log(1);",
        },
      ],
    };
    const out = deckToMarkdown(deck);
    expect(out).toContain("```chart bar");
    expect(out).toContain("Category,ARR");
    expect(out).toContain("```ts");
    const again = markdownToDeck(out);
    expect(again.slides[0]?.layout).toBe("chart");
    expect(again.slides[1]?.layout).toBe("code");
  });
});
