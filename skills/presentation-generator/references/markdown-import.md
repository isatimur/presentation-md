# Markdown → Deck JSON

Bridge Marp / md-slides authoring into presentation-md without abandoning schema.

## CLI

```bash
presentation-md-render --from-md ./deck.md -o deck.json --theme signal
```

## MCP

`import_markdown` with `{ markdown, theme?, title?, output_path? }`.

## Front matter

```yaml
---
title: Acme Pitch
theme: signal
company: Acme
description: Optional
---
```

## Slide splits

Separate slides with a line that is exactly `---`.

## Layout mapping

| Markdown | Layout |
|----------|--------|
| `#` / first slide | `title` |
| lone `##` | `section` |
| bullets | `feature-grid` (or `stat-row` when `Value — Label`) |
| numbered list | `timeline` |
| markdown table | `data-table` |
| `>` quote | `quote` |
| ` ```lang ` fence | `code` |
| ` ```chart bar ` CSV | `chart` |
| ` ```html ` | `custom-html` |
| thank/next CTA last slide | `closing` |

### Chart fence

````markdown
```chart bar
Quarter,Enterprise,Mid-market
Q1,38,14
Q2,41,16
```
````

### HTML fence

````markdown
```html
<div style="color:var(--accent)">One-off art</div>
```
````

Always `audit_deck` + `judge_deck` after import — heuristics are best-effort.
