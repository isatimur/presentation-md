import type { DeckJson } from "@presentation-md/export";
import { resolveTheme } from "../render/themes.js";
import { renderDeckHtml } from "../render/renderDeck.js";

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function safeName(deck: DeckJson, ext: string): string {
  const base = (deck.meta?.title ?? deck.meta?.company ?? "deck")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "deck";
  return `${base}.${ext}`;
}

function themeName(deck: DeckJson): string {
  return deck.meta?.theme ?? "default-tech";
}

export interface PptxDownloadResult {
  warnings: string[];
}

/** Prefetch http(s) + local images to data URIs so PPTX export can embed them. */
export async function prefetchDeckImages(
  deck: DeckJson
): Promise<{ deck: DeckJson; warnings: string[] }> {
  const { prefetchDeckImages: prefetch } = await import("@presentation-md/export");
  return prefetch(deck);
}

export async function downloadPptx(deck: DeckJson): Promise<PptxDownloadResult> {
  const warnings: string[] = [];
  const theme = resolveTheme(themeName(deck));
  // Lazy-load the exporter (pptxgenjs) so it's a separate chunk fetched only on
  // first export — keeps the studio's initial bundle small.
  const { deckToPptxBlob } = await import("@presentation-md/export");
  const blob = await deckToPptxBlob(deck, theme, {
    prefetchImages: true,
    onWarn: (m) => warnings.push(m),
  });
  triggerDownload(blob, safeName(deck, "pptx"));
  return { warnings };
}

export function downloadHtml(deck: DeckJson): void {
  const theme = resolveTheme(themeName(deck));
  const html = renderDeckHtml(deck, theme);
  triggerDownload(new Blob([html], { type: "text/html" }), safeName(deck, "html"));
}

export function downloadJson(deck: DeckJson): void {
  triggerDownload(
    new Blob([JSON.stringify(deck, null, 2)], { type: "application/json" }),
    safeName(deck, "json")
  );
}

export function parseDeckJson(text: string): DeckJson {
  const parsed = JSON.parse(text) as DeckJson;
  if (parsed?.type !== "deck" || !Array.isArray(parsed.slides)) {
    throw new Error('Not a valid deck: expected { "type": "deck", "slides": [...] }');
  }
  return parsed;
}

/** Import a PowerPoint file into Deck JSON (best-fit layouts; data-URI images). */
export async function importPptxFile(
  bytes: ArrayBuffer,
  theme = "default-tech"
): Promise<{ deck: DeckJson; warnings: string[] }> {
  const { pptxToDeck } = await import("@presentation-md/export/import");
  const warnings: string[] = [];
  const { deck, warnings: importWarnings } = await pptxToDeck(new Uint8Array(bytes), {
    theme,
    onWarn: (m) => warnings.push(m),
  });
  return { deck, warnings: [...warnings, ...importWarnings] };
}

/**
 * Recover the source deck embedded in a rendered presentation `.html`
 * (`id="pmd-deck"`, or legacy `id="psp-deck"` from pre-rename renders).
 */
function extractDeckJsonString(html: string): string | undefined {
  const ids = ["pmd-deck", "psp-deck"];
  if (typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    for (const id of ids) {
      const text = doc.getElementById(id)?.textContent?.trim();
      if (text) return text;
    }
  }
  // Fallback for non-DOM environments. Safe because the renderer escapes `<`
  // inside the embedded JSON, so it can never contain a literal `</script>`.
  const m = html.match(
    /<script[^>]*id=["'](?:pmd-deck|psp-deck)["'][^>]*>([\s\S]*?)<\/script>/i
  );
  return m?.[1]?.trim();
}

export function extractDeckFromHtml(html: string): DeckJson {
  const json = extractDeckJsonString(html);
  if (!json) {
    throw new Error(
      "No editable deck found in this HTML. Only presentations created by presentation-md (with an embedded source) can be opened."
    );
  }
  return parseDeckJson(json);
}

/** Open a `.html` (embedded deck) or `.json` deck file by content type. */
export function parseDeckFile(filename: string, text: string): DeckJson {
  return /\.html?$/i.test(filename) ? extractDeckFromHtml(text) : parseDeckJson(text);
}
