# @presentation-md/studio

A browser-based editor studio for presentation-md decks. Edit slides through
schema-driven forms, see a live preview, and export to HTML or **native, editable PowerPoint
(`.pptx`)** — which also opens in Keynote and imports into Google Slides.

It's a fully **static** Vite + React SPA for hosted builds: rendering and `.pptx` generation happen
client-side. Local `vite` / `vite preview` also mounts `/api/export-pdf` (headless Chromium) so
**Download PDF** returns a real `.pdf` blob — same `@page` 16:9 print pipeline as MCP/CLI, with
origin checks, HTML size bounds, concurrency limits, and loopback/private-network subresource
blocking. On static hosts the button falls back to client raster, then the print dialog. Preview
iframes omit `allow-scripts` (sandboxed HTML strips executable scripts). Autosave is scheduled,
cross-tab aware, and recovers corrupt storage without silent overwrite.

## Develop

```bash
pnpm --filter @presentation-md/studio dev       # http://localhost:5173
pnpm --filter @presentation-md/studio build     # static build → dist/
pnpm --filter @presentation-md/studio test      # unit tests (render + themes)
pnpm --filter @presentation-md/studio test:e2e  # Playwright flow (needs: npx playwright install chromium)
```

## What it does

- **Slide list** — add (any of the 18 layouts), duplicate, reorder, delete.
- **Form editor** — fields per layout (cards, stats, steps, table rows…), driven by the deck schema, plus speaker notes that export to the PPTX notes pane.
- **Live preview** — an `<iframe>` rendered with the same shared Mustache layouts + theme tokens as
  the canonical Node renderer, so what you see matches the published deck.
- **Generate** — Anthropic key path, agent-handoff prompt, or **Land scaffold** (same recipes as MCP `scaffold_deck` — no key).
- **Export** — Download HTML, **Download Markdown** (Marp/md-slides round-trip), **Download PDF** (headless blob locally / client raster on static / print fallback), Download `.pptx`, or export the raw Deck JSON. **Download notes TXT/VTT** exports speaker-notes handouts. **Copy link** shares an editable `?d=` compressed deck URL (not just curated examples). **Open** accepts Deck JSON, rendered HTML, `.pptx`, or Marp/md-slides `.md` (same `markdownToDeck` path as MCP `import_markdown`). **Paste Brand** registers an ephemeral theme from `:root` CSS (import_brand_theme parity). A **horizontal densified filmstrip** (one live iframe for all thumbs) sits under the preview with Fit/zoom controls; **Present** reuses the same strip as a jump peek (toggle **F**) beside up-next + speaker notes, plus **overview grid (G)**, **blackout (B)**, elapsed **timer (T)**, and **shortcuts (?)**. Theme picker covers every bundled + workspace theme; pick-3 live defaults to **My deck restyle** (selected slide across themes) with Craft proofs as the alternate. Craft audit panel includes **Apply safe fixes** / **Speaker density** / **Reading density** / per-issue **Insert beat** (same `repairCraft` + `remorphDensity` path as MCP `audit_deck`). Use on compare applies theme + safe craft repair.

## How it stays in sync with the renderer

`src/render/` is a fs-free port of `@presentation-md/render`: it bundles the shared
`layouts/*.html`, `base.css`, and every `theme.json` at build time (via `import.meta.glob` / `?raw`)
and resolves the theme `extends` chain in-memory. PPTX export reuses `@presentation-md/export`
directly (`deckToPptxBlob`).

## Deploy

The build uses a relative `base` (`./`), so the same output works at `/` or any sub-path.

- **Under the gallery (default):** `pnpm --filter @presentation-md/studio build:web` emits a
  production build into `web/studio/`, served at `/studio` by the gallery's Vercel deploy. The
  "Open Studio" button in `web/index.html` links there. Re-run after studio changes — `web/studio/`
  is generated output.
- **Standalone:** `pnpm build` → `dist/`; deploy as its own Vercel project (config in `vercel.json`).
