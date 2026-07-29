# PPTX → Deck JSON Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import a `.pptx` file into a schema-valid presentation-md `DeckJson` — extract text/tables/images/notes from OOXML, map onto the 9 layouts, and expose via CLI + MCP + skill docs.

**Architecture:** Live in `@presentation-md/export` under `src/import/`. Phase 1 (`extractPptx`) unzips OOXML with `jszip` + `fast-xml-parser`. Phase 2 (`mapExtractedToDeck`) applies deterministic layout heuristics. `pptxToDeck` composes both. CLI flag on `@presentation-md/render`; new `import_pptx` MCP tool; skill docs.

**Tech Stack:** TypeScript, vitest, jszip, fast-xml-parser, existing `DeckJson` types + `validateDeckJson` from core, Commander CLI.

**Spec:** `docs/superpowers/specs/2026-07-28-pptx-import-design.md`

## File map

| File | Responsibility |
|------|----------------|
| `packages/export/src/import/types.ts` | `ExtractedPresentation` / slide / image types + options |
| `packages/export/src/import/zip-limits.ts` | Zip-bomb guards (size/file caps) |
| `packages/export/src/import/extract.ts` | OOXML → `ExtractedPresentation` |
| `packages/export/src/import/map.ts` | `ExtractedPresentation` → `DeckJson` heuristics |
| `packages/export/src/import/index.ts` | `extractPptx` / `mapExtractedToDeck` / `pptxToDeck` |
| `packages/export/src/index.ts` | Re-export import API |
| `packages/export/tests/import-*.test.ts` | Unit + round-trip + security tests |
| `packages/renderer-node/src/cli.ts` | `--from-pptx` / `--assets-dir` |
| `packages/mcp-server/src/tools/import-pptx.ts` | MCP tool |
| `packages/mcp-server/src/server.ts` | Register tool |
| Skill + README docs | Agent workflow |

## Global constraints

- No network I/O in import. Skip `TargetMode="External"` relationships with a warning.
- Zip caps: 50 MB uncompressed total, 200 files max, 10 MB per media blob.
- Path inputs: `.pptx` extension + realpath containment under cwd (mirror `import-brand-theme`).
- Always `validateDeckJson` before returning a deck — fail loud on mapper bugs.
- Images default to data URIs so export round-trip works; `--assets-dir` optional.
- EMF/WMF skipped with warning.
- `packages/core` gains **no** new deps / Node APIs.
- Default `meta.theme` = `"claude"` unless overridden.

---

### Task 1: Types + zip-bomb guards

**Files:**
- Create: `packages/export/src/import/types.ts`
- Create: `packages/export/src/import/zip-limits.ts`
- Test: `packages/export/tests/import-zip-limits.test.ts`

- [ ] **Step 1: Write types**

```ts
// packages/export/src/import/types.ts
export interface ExtractedImage {
  name: string;
  contentType: string;
  bytes: Uint8Array;
  widthEmu?: number;
  heightEmu?: number;
}

export interface ExtractedSlide {
  number: number;
  title?: string;
  texts: string[];
  tables: string[][];
  images: ExtractedImage[];
  notes?: string;
}

export interface ExtractedPresentation {
  meta: { title?: string; author?: string; subject?: string };
  slides: ExtractedSlide[];
}

export interface ExtractOptions {
  onWarn?: (msg: string) => void;
}

export interface MapOptions {
  theme?: string;
  /** If set, write images here and use relative paths instead of data URIs. */
  assetsDir?: string;
  onWarn?: (msg: string) => void;
}

export interface ImportOptions extends ExtractOptions, MapOptions {}
```

- [ ] **Step 2: Write zip limit helper + failing tests**

```ts
// packages/export/src/import/zip-limits.ts
export const MAX_UNCOMPRESSED_BYTES = 50 * 1024 * 1024;
export const MAX_ZIP_ENTRIES = 200;
export const MAX_MEDIA_BYTES = 10 * 1024 * 1024;

export function assertZipEntrySafe(opts: {
  entryCount: number;
  uncompressedSize: number;
  totalUncompressed: number;
  isMedia?: boolean;
}): void {
  if (opts.entryCount > MAX_ZIP_ENTRIES) {
    throw new Error(`PPTX has too many entries (>${MAX_ZIP_ENTRIES})`);
  }
  if (opts.totalUncompressed > MAX_UNCOMPRESSED_BYTES) {
    throw new Error(`PPTX uncompressed size exceeds ${MAX_UNCOMPRESSED_BYTES} bytes`);
  }
  if (opts.isMedia && opts.uncompressedSize > MAX_MEDIA_BYTES) {
    throw new Error(`Media blob exceeds ${MAX_MEDIA_BYTES} bytes`);
  }
}
```

- [ ] **Step 3: Add deps** — `pnpm --filter @presentation-md/export add jszip fast-xml-parser` and `@types/jszip` as devDep if needed.
- [ ] **Step 4: Commit** `feat(export): add PPTX import types and zip-bomb guards`

---

### Task 2: `extractPptx` — OOXML parser

**Files:**
- Create: `packages/export/src/import/extract.ts`
- Test: `packages/export/tests/import-extract.test.ts`
- Fixture helper: build minimal pptx via existing `deckToPptxBuffer` OR hand-rolled zip

- [ ] **Step 1: Failing tests**
  - Round-trip extract from a PPTX built with `deckToPptxBuffer` for a 2-slide deck (title + body text) — assert `slides[0].title` matches.
  - Empty/invalid buffer throws.
  - External relationship skipped → warning (can unit-test with a tiny handcrafted zip containing one external blip).

- [ ] **Step 2: Implement `extractPptx`**
  1. `JSZip.loadAsync(input, { checkCRC32: true })`
  2. Enumerate files; running `totalUncompressed` via `assertZipEntrySafe`
  3. Parse `ppt/presentation.xml` slide id list + `ppt/_rels/presentation.xml.rels` for ordered slide paths
  4. Per slide XML: title placeholder → `title`; other text bodies → `texts`; `a:tbl` → `tables`; images via rels → media bytes
  5. Notes via notes rel when present
  6. `docProps/core.xml` → meta
  7. Content-type from `[Content_Types].xml` Override/Default for media

- [ ] **Step 3: Export from `packages/export/src/import/index.ts`** and re-export in package `index.ts`
- [ ] **Step 4: Commit** `feat(export): extract text/tables/images/notes from PPTX`

---

### Task 3: `mapExtractedToDeck` — layout heuristics

**Files:**
- Create: `packages/export/src/import/map.ts`
- Test: `packages/export/tests/import-map.test.ts`

- [ ] **Step 1: Failing tests** covering each rule from the spec table (title, section, data-table, stat-row, feature-grid, quote, timeline, closing, two-column+image, fallback). Assert `validateDeckJson(JSON.stringify(deck)).valid`.

- [ ] **Step 2: Implement mapper**
  - `imageToRef(img, opts)` → data URI or `assetsDir` relative path (create dir + write file when `assetsDir` set)
  - Skip non-web image types (emf/wmf) with warning
  - Default theme `"claude"`
  - First slide prefers `title`; last slide with CTA keywords prefers `closing`

- [ ] **Step 3: Implement `pptxToDeck`** composing extract + map, merging warnings
- [ ] **Step 4: Commit** `feat(export): map extracted PPTX content onto deck layouts`

---

### Task 4: Round-trip integration test

**Files:**
- Create: `packages/export/tests/import-roundtrip.test.ts`

- [ ] Build decks for layouts: `title`, `feature-grid`, `data-table`, `quote`, `closing`
- [ ] `deckToPptxBuffer` → `pptxToDeck` → `validateDeckJson` passes
- [ ] Title/heading text preserved (case-insensitive trim match acceptable)
- [ ] Data-table columns/rows preserved
- [ ] Commit `test(export): PPTX import round-trip against exporter`

---

### Task 5: CLI `--from-pptx`

**Files:**
- Modify: `packages/renderer-node/src/cli.ts`
- Modify: `packages/renderer-node/README.md`
- Test: `packages/renderer-node/tests/cli-from-pptx.test.ts` (or extend existing CLI tests)

- [ ] Add options:
  - `--from-pptx <path>` — read PPTX, write deck JSON
  - `--assets-dir <dir>` — forwarded to mapper
  - Existing `--theme` overrides `meta.theme`
  - Default output `deck.json` when `--from-pptx` is set (not `deck.html`)
- [ ] Mutual exclusion: `--from-pptx` ignores stdin/deck.json argument (or treats argument as pptx path for convenience: `render foo.pptx --from-pptx` unnecessary — prefer `render --from-pptx foo.pptx -o deck.json`)
- [ ] Commit `feat(render): add --from-pptx CLI import`

---

### Task 6: MCP `import_pptx` tool

**Files:**
- Create: `packages/mcp-server/src/tools/import-pptx.ts`
- Modify: `packages/mcp-server/src/server.ts`
- Modify: `packages/mcp-server/README.md`
- Test: `packages/mcp-server/tests/import-pptx.test.ts`

- [ ] Input schema: `pptx_path` XOR `pptx_base64`; optional `theme`, `output_path`, `assets_dir`
- [ ] Path hardening: `.pptx` only + realpath under cwd
- [ ] Return `{ deck, warnings, slide_count, path? }`
- [ ] Commit `feat(mcp-server): add import_pptx tool`

---

### Task 7: Docs + changeset

**Files:**
- Create: `skills/presentation-generator/references/pptx-import.md`
- Modify: `skills/presentation-generator/SKILL.md` (Import from PowerPoint section + MCP table row)
- Modify: `packages/export/README.md` (if present) / `packages/export/references/pptx-fidelity.md` add import notes
- Modify: root `README.md` if it mentions export-only
- Create: `.changeset/pptx-import.md`

- [ ] Document agent workflow: import → review layouts → theme → render
- [ ] Changeset bumps `export`, `render`, `mcp-server` minor
- [ ] Commit `docs: PPTX import workflow and changeset`

---

### Task 8: Package description + final verification

- [ ] Update `packages/export/package.json` description to mention import round-trip
- [ ] Run `pnpm -r build && pnpm -r test && pnpm -r lint && pnpm -r typecheck`
- [ ] Fix any fallout
- [ ] Commit if needed `chore: green build after PPTX import`

---

## Execution notes

- Prefer TDD per task.
- After each task: build the touched packages, run their tests.
- Do not push unless asked; finishing-a-development-branch handles merge/PR menu at the end.
