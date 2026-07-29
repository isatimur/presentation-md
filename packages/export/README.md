# @presentation-md/export

PPTX round-trip for [presentation-md](https://presentation-md.vercel.app) decks — export Deck JSON to native, editable PowerPoint (`.pptx`), and import `.pptx` back into Deck JSON.

## Install

```bash
npm install @presentation-md/export
```

## Export (Deck JSON → `.pptx`)

```typescript
import { deckToPptxBuffer } from "@presentation-md/export";
import { loadTheme } from "@presentation-md/core";
import { writeFile } from "node:fs/promises";

const theme = await loadTheme("corporate");
const buf = await deckToPptxBuffer(deckJson, theme);
await writeFile("deck.pptx", buf);
```

The resulting file opens in **PowerPoint**, **Keynote** (File → Open), and imports into **Google Slides**.

Browser-safe variants: `deckToPptxBlob`, `deckToPptxArrayBuffer`.

## Import (`.pptx` → Deck JSON)

```typescript
import { pptxToDeck } from "@presentation-md/export/import";
import { readFile } from "node:fs/promises";

const buf = await readFile("board-deck.pptx");
const deck = await pptxToDeck(buf, { theme: "corporate" });
```

Lower-level API: `extractPptx` (parse OOXML) + `mapExtractedToDeck` (layout inference).

## CLI & MCP

Most users reach export/import through:

- **CLI:** `presentation-md-render deck.json --format pptx` and `--from-pptx deck.pptx`
- **MCP:** `export_deck`, `import_pptx`

## Fidelity

See [`references/pptx-fidelity.md`](references/pptx-fidelity.md) for fonts, colors, images, and layout caveats.

## See also

- [Main README](../../README.md)
- [PPTX import reference](../core/references/pptx-import.md)
