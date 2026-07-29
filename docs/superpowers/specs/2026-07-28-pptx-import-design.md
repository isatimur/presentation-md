# PPTX → Deck JSON Import

## Problem

We can export Deck JSON → `.pptx` (`@presentation-md/export`), but not the reverse.
Competitor `frontend-slides` ships `scripts/extract-pptx.py` (python-pptx) that pulls title /
text / images / notes into a loose JSON blob, then asks the agent to redesign into HTML.

Agents using presentation-md regularly receive existing PowerPoint decks ("convert
this board deck", "restyle last quarter's all-hands"). Today they either retype content by
hand or abandon the pack for the competitor. Export without import is a one-way street.

## Goal

Ship **PPTX → Deck JSON import** that:

1. Extracts structured content from a `.pptx` (text, tables, images, speaker notes).
2. Maps that content onto our existing 9 layouts as a valid `DeckJson`.
3. Surfaces the result via CLI, MCP, and skill docs so agents can then theme / edit / re-export.

Beats the competitor on the integration point that matters for us: the output is **our**
schema, so Studio, themes, HTML render, and PPTX re-export all work without a second rewrite.

## Non-goals

- Pixel-perfect layout recovery (positions, fonts, animations, master slides). Import is a
  **content + best-fit layout** pipeline, not a visual clone. Fidelity notes mirror export's
  philosophy in reverse — we trade exactness for a structured, re-themeable deck.
- Legacy `.ppt` (binary) — OOXML `.pptx` only.
- Chart / SmartArt / embedded video reconstruction — emit a warning and keep any alt text.
- Automatic theme extraction from PPTX colors (brand-import already covers URL/CSS; PPTX
  theme sniffing can be a follow-up).
- Studio file-upload UI in v1 (CLI + MCP + skill workflow first; Studio can call the same API later).

## Architecture

Two phases, both living in `@presentation-md/export` (already owns `DeckJson` types
and PPTX knowledge). New files under `packages/export/src/import/`; public API re-exported
from `packages/export/src/index.ts`.

```
.pptx bytes
    │
    ▼
 extractPptx(buffer)          ← OOXML unzip + slide XML parse (jszip)
    │
    ▼
 ExtractedPresentation        ← intermediate, layout-agnostic
    │
    ▼
 mapExtractedToDeck(extracted, opts)
    │
    ▼
 DeckJson  (+ warnings[])     ← validate via core.validateDeckJson
```

### Why not a new package?

`packages/export` already exports `DeckJson` / layout types that Studio, render, and MCP
depend on. A separate `@presentation-md/import` would either duplicate those types or
depend on export anyway. Co-locating import next to export keeps the PPTX story in one place;
package description becomes "PPTX round-trip" rather than "export only." Rename to
`@presentation-md/pptx` is a later packaging concern, not a v1 blocker.

### Why not Python-only (competitor parity)?

Our stack is TypeScript-first (MCP server, CLI, Studio). A Python script would force a
second runtime for the hottest path (MCP tool). Use **jszip + OOXML XML parse** in Node —
PPTX is a zip of XML; we only need slide text frames, tables, and image blobs. No
`python-pptx` dependency. Skill docs can still document a one-liner CLI so agents without
deep Node knowledge get the same outcome.

### Phase 1 — `extractPptx`

**Input:** `Uint8Array | Buffer` (and a path-based wrapper for CLI/MCP).

**Output:**

```ts
interface ExtractedPresentation {
  meta: { title?: string; author?: string; subject?: string };
  slides: ExtractedSlide[];
}

interface ExtractedSlide {
  number: number;                 // 1-based
  title?: string;
  texts: string[];                // non-title text frame contents, document order
  tables: string[][];             // first row = header when present
  images: ExtractedImage[];
  notes?: string;
}

interface ExtractedImage {
  /** Relative name suggestion, e.g. `slide3_img1.png` */
  name: string;
  /** `image/png` | `image/jpeg` | `image/gif` | `image/svg+xml` | `image/emf`… */
  contentType: string;
  /** Raw bytes — caller decides data-URL vs on-disk assets */
  bytes: Uint8Array;
  widthEmu?: number;
  heightEmu?: number;
}
```

**Mechanics:**

1. Open the buffer with `jszip`.
2. Read `[Content_Types].xml` and `ppt/presentation.xml` for slide order
   (`p:sldIdLst` → Relationship targets).
3. For each `ppt/slides/slideN.xml` + its `.../_rels/slideN.xml.rels`:
   - Walk `p:sp` shapes with `p:txBody`; treat the shape marked as title
     (`p:nvSpPr/p:nvPr/p:ph[@type="title"|"ctrTitle"]`) as `title`, others as `texts[]`.
   - Parse `a:tbl` into `tables[][]`.
   - Resolve `a:blip/@r:embed` via relationships → `ppt/media/*`, capture bytes + content type.
   - Read `ppt/notesSlides/notesSlideN.xml` when linked.
4. Core properties from `docProps/core.xml` → `meta`.
5. Never network. Never follow external relationships (`TargetMode="External"`) — skip with a
   warning (SSRF / unexpected I/O defense, same spirit as brand-import).

### Phase 2 — `mapExtractedToDeck`

Heuristic layout picker (deterministic, no LLM required). Agents can refine afterwards; the
mapper's job is a **valid, useful starting deck**.

| Signal | Layout |
|--------|--------|
| First slide, short title, ≤1 body text, no table | `title` |
| Slide with only a short title (or title + tiny lead) mid-deck | `section` |
| One table present | `data-table` (header row → `columns`, rest → `rows`) |
| ≥3 short text blocks that look like `Label: value` or big-number + label | `stat-row` |
| ≥2 text blocks with a bold-ish first line + body (or `Title\nBody` pairs) | `feature-grid` |
| Text starts with `"` / `“` or matches `/^["“].+["”]\s*[—–-]/` | `quote` |
| Numbered / sequential steps (`1.`, `Step N`, timeline-ish) | `timeline` |
| Last slide with CTA-like text (`Thank`, `Questions`, `Contact`, URL) | `closing` |
| Image + text | `two-column` with `image` as data URL |
| Fallback | `two-column` (heading + lead/body from texts) |

**Image handling:** default to inline `data:<contentType>;base64,...` on the slide's `image`
field (matches export's "only data URIs embed" contract, so round-trip works). CLI flag
`--assets-dir <dir>` writes files and uses relative paths instead (for agents who prefer
on-disk assets like the competitor). EMF/WMF media is skipped with a warning (browsers can't
render them).

**Theme:** `meta.theme` defaults to `"claude"` (flagship) unless `opts.theme` is set. Import
does not invent a theme from PPTX colors in v1.

**Validation:** always run `validateDeckJson` before returning. If the mapper ever produces
invalid JSON, that's a bug — fail the call, don't return garbage.

### Public API

```ts
export async function extractPptx(
  input: Uint8Array | Buffer,
  opts?: ExtractOptions
): Promise<{ extracted: ExtractedPresentation; warnings: string[] }>;

export async function mapExtractedToDeck(
  extracted: ExtractedPresentation,
  opts?: MapOptions
): Promise<{ deck: DeckJson; warnings: string[] }>;

export async function pptxToDeck(
  input: Uint8Array | Buffer,
  opts?: ImportOptions
): Promise<{ deck: DeckJson; extracted: ExtractedPresentation; warnings: string[] }>;
```

`pptxToDeck` = extract + map. Callers that want agent-in-the-loop redesign can take
`extracted` alone and build their own deck.

### Surfaces

| Surface | Behavior |
|---------|----------|
| **CLI** (`@presentation-md/render`) | `--from-pptx <file>` writes deck JSON to `--output` (default `deck.json`). `--assets-dir` optional. Combines with existing `--theme`. |
| **MCP** | New `import_pptx` tool: `pptx_path` (cwd-contained, `.pptx` only — same realpath containment as `import_brand_theme`'s `cssPath`) **or** `pptx_base64`; returns `{ deck, warnings, slide_count }` and optionally writes `output_path`. |
| **Skill docs** | New "Import from PowerPoint" section in `presentation-generator/SKILL.md` + short `references/pptx-import.md`. Workflow: import → confirm/adjust layouts → pick theme → render/export. |
| **Studio** | Out of scope for v1; `pptxToDeck` is isomorphic enough that a later File input can call it in a worker. |

### Dependencies

- Add `jszip` (+ `@types/jszip` if needed) to `packages/export`.
- No Playwright, no Python, no network I/O in the import path.
- `fast-xml-parser` is acceptable if hand-rolled XML gets painful — prefer the platform
  `DOMParser` is **not** available in Node without a dependency; use `fast-xml-parser` (pure
  JS, already common) rather than `xmldom`. Decision: **`jszip` + `fast-xml-parser`**.

### Security

- Path inputs (MCP/CLI) must resolve under `process.cwd()` via `realpath` containment
  (copy the pattern from `import-brand-theme.ts`).
- Reject non-`.pptx` extensions.
- Cap uncompressed zip bomb: max 50 MB uncompressed total, max 200 files, max 10 MB per media
  blob — abort with a clear error.
- Skip external relationship targets.
- Do not execute macros / OLE — ignore `vbaProject.bin` and embedded objects other than images.

### Testing strategy

- Fixture: take a small deck JSON, `deckToPptxBuffer` it, then `pptxToDeck` the result —
  **round-trip test** for title / feature-grid / data-table / quote / closing (content
  preserved; layout may differ but must be valid).
- Hand-crafted minimal OOXML zip fixtures for edge cases (notes only, image-only slide,
  empty slide).
- Security tests: path escape, non-pptx extension, zip bomb (oversized entry).
- Mapper unit tests with pure `ExtractedPresentation` objects (no zip).

### Success criteria

- `pptxToDeck` returns schema-valid `DeckJson` for PPTX produced by our own exporter.
- Images from round-trip survive as data URIs and re-export.
- MCP `import_pptx` + CLI `--from-pptx` documented and covered by tests.
- Warnings array is non-empty when something was skipped (never silent drop).
- No new network dependency; `packages/core` unchanged (no Node APIs leaked into Studio's
  bundle via core).

## Open follow-ups (explicitly deferred)

- Studio drag-and-drop import.
- PPTX color → theme scaffold (compose with brand-import).
- Chart → `stat-row` / `data-table` best-effort.
- Bidirectional layout hints embedded as PPTX tags on export to improve round-trip layout
  fidelity (export writes `psp:layout=feature-grid`; import reads it).
