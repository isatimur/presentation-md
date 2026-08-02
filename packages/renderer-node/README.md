# @presentation-md/render

Turns a [deck JSON spec](../../packages/core/references/deck-schema.md) into a polished,
self-contained HTML slide deck — no build step, no external assets beyond Google Fonts.
Exported HTML includes Present chrome (blackout/whiteout, speaker notes from `#pmd-deck`,
elapsed timer, digit jump) so agents can hand off a presentable file without Studio.

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

# Craft loop (MCP scaffold_deck / audit_deck / apply_theme parity — no MCP required)
presentation-md-render --list-scaffold-purposes
presentation-md-render --scaffold pitch -o deck.json --theme default-tech
presentation-md-render deck.json --audit
presentation-md-render deck.json --audit --fix -o deck.json

# Structural design judge t0/t1 (MCP judge_deck parity; t2/t3 stay on MCP)
presentation-md-render deck.json --judge
presentation-md-render deck.json --judge --judge-tier t0
presentation-md-render deck.json --apply-theme aurora-glass -o deck.json
presentation-md-render deck.json --apply-theme signal --no-repair -o deck.json

# Structural density remorph (non-LLM — MCP audit_deck remorph_density parity)
presentation-md-render deck.json --remorph-density speaker -o deck.json
presentation-md-render deck.json --remorph-density reading -o deck.json

# Studio share link (MCP share_deck_link parity)
presentation-md-render deck.json --share-link

# One-shot craft prompt (MCP generate_deck_prompt parity)
presentation-md-render --generate-prompt --theme aurora-glass --prompt-density speaker -o craft-prompt.json
presentation-md-render --generate-prompt --prompt-intent "Board pack" --prompt-density reading -o craft-prompt.json

# List available themes
presentation-md-render --list-themes

# Pick-3 theme compare (multi-layout craft previews — beats title-only skim)
presentation-md-render --preview-compare aurora-glass,signal,claude
presentation-md-render --preview-compare default-tech,claude --preview-dir ./tmp/previews --preview-mode layouts
presentation-md-render --preview-compare claude --no-preview-shots

# Restyle YOUR deck across themes (Studio/MCP My deck parity)
presentation-md-render --preview-compare aurora-glass,signal,claude --preview-deck ./deck.json --preview-slide 1

# Import a PowerPoint file to deck JSON
presentation-md-render --from-pptx board-deck.pptx -o deck.json --theme claude

# Same import, but write extracted images to disk (relative paths in deck JSON)
presentation-md-render --from-pptx board-deck.pptx -o deck.json --assets-dir ./assets

# Import Marp / md-slides Markdown to deck JSON
presentation-md-render --from-md outline.md -o deck.json --theme signal

# Export to native, editable PowerPoint
presentation-md-render deck.json --format pptx -o deck.pptx

# Speaker-notes handouts (Studio / MCP notes_txt · notes_vtt parity)
presentation-md-render deck.json --format notes_txt -o notes.txt
presentation-md-render deck.json --format notes_vtt -o notes.vtt
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
