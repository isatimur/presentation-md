# Deck JSON schema (quick reference)

A deck is `{ "type": "deck", "meta": {...}, "slides": [...] }`. Full JSON Schema:
`@presentation-md/core/deck-schema` (`deck.schema.json`).

## meta
| field | notes |
|-------|-------|
| `title` | document title (browser tab) |
| `company` | brand/project name |
| `description` | meta description |
| `theme` | theme name (default: `default-tech`) |

## slide layouts

Every slide needs `layout`. Fields are per-layout; unused fields are ignored.

### title / closing
`{ "layout": "title", "eyebrow"?, "heading", "lead"? }`
`closing` additionally takes `cta: { "label", "href" }`.

### section
`{ "layout": "section", "number"?, "heading", "lead"? }`

### two-column
`{ "layout": "two-column", "eyebrow"?, "heading", "body"?, "image"?, "imageAlt"?,
   "aside"?, "ratio"?: "1-1"|"2-1"|"1-2"|"3-2"|"2-3", "reverse"? }`
Use `aside` for a pull-quote panel when there is no image. `ratio` / `reverse` unlock asymmetric craft.

### image-hero
`{ "layout": "image-hero", "eyebrow"?, "heading", "lead"?, "image", "imageAlt"? }`

### comparison
`{ "layout": "comparison", "eyebrow"?, "heading"?, "leftLabel"?, "left", "rightLabel"?, "right",
   "emphasis"?: "left"|"right" }`

### feature-grid
`{ "layout": "feature-grid", "eyebrow"?, "heading"?, "columns": 2|3|4|"bento",
   "cards": [ { "icon"?: "fa-solid fa-bolt", "title", "body"? } ] }`
`"bento"` = asymmetric hero card + four supporting cards.

### quote
`{ "layout": "quote", "quote", "by"? }`

### stat-row
`{ "layout": "stat-row", "eyebrow"?, "heading"?, "stats": [ { "value", "label" } ] }`

### timeline
`{ "layout": "timeline", "eyebrow"?, "heading"?, "steps": [ { "title", "body"? } ] }`

### data-table
`{ "layout": "data-table", "eyebrow"?, "heading"?, "columns": ["A","B"],
   "rows": [ ["a1","b1"], ["a2","b2"] ] }`

### code
`{ "layout": "code", "eyebrow"?, "heading"?, "lead"?, "code", "language"?, "filename"? }`
Plain-text snippet in window chrome. HTML is escaped on render — no markup inside `code`.

## Example
```json
{
  "type": "deck",
  "meta": { "title": "Acme", "company": "Acme", "theme": "corporate" },
  "slides": [
    { "layout": "title", "eyebrow": "Acme", "heading": "We make X faster.", "lead": "One line." },
    { "layout": "feature-grid", "heading": "Why Acme", "columns": 3,
      "cards": [
        { "icon": "fa-solid fa-bolt", "title": "Fast", "body": "Sub-second." },
        { "icon": "fa-solid fa-shield", "title": "Trusted", "body": "SOC2." },
        { "icon": "fa-solid fa-chart-line", "title": "Proven", "body": "200 teams." }
      ] },
    { "layout": "closing", "heading": "Let's talk.", "cta": { "label": "hello@acme.com", "href": "#" } }
  ]
}
```
