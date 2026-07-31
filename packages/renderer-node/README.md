# @presentation-md/render

Turns a [deck JSON spec](../../packages/core/references/deck-schema.md) into a polished,
self-contained HTML slide deck — no build step, no external assets beyond Google Fonts.

## Install

```bash
npm install @presentation-md/render
# or
pnpm add @presentation-md/render
```

## CLI

```bash
# Render a file
presentation-md-render deck.json -o slides.html

# Override theme
presentation-md-render deck.json --theme default-tech -o slides.html

# Pipe from stdin
cat deck.json | presentation-md-render -o slides.html

# Validate only (no output file)
presentation-md-render deck.json --validate

# List available themes
presentation-md-render --list-themes

# Import a PowerPoint file to deck JSON
presentation-md-render --from-pptx board-deck.pptx -o deck.json --theme claude

# Import Marp / md-slides Markdown to deck JSON
presentation-md-render --from-md outline.md -o deck.json --theme signal

# Export to native, editable PowerPoint
presentation-md-render deck.json --format pptx -o deck.pptx
```

## Programmatic API

```typescript
import { renderDeck, renderDeckPptx } from "@presentation-md/render";
import { readFile, writeFile } from "node:fs/promises";

const deckJson = await readFile("deck.json", "utf-8");
const html = await renderDeck(deckJson, {
  extraCss: ".slide { font-size: 18px; }",
});
await writeFile("output.html", html);

const pptx = await renderDeckPptx(deckJson);
await writeFile("output.pptx", pptx);
```

### `renderDeck(deckJson, opts?): Promise<string>`

| Option | Type | Description |
|--------|------|-------------|
| `themesDir` | `string` | Override bundled themes directory |
| `extraCss` | `string` | Additional CSS appended after base styles |

Throws if the deck JSON is invalid (schema errors included in message).

### `getBundledThemesDir(): string`

Returns the absolute path to the bundled themes directory from `@presentation-md/core`.

## See also

- [Main README](../../README.md)
- [Deck schema reference](../../packages/core/references/deck-schema.md)
- [Theme reference](../../packages/core/references/themes.md)
