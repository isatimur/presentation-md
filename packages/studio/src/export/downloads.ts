import type { DeckJson, Slide } from "@presentation-md/export";
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

async function blobToDataUri(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  const b64 = btoa(binary);
  const type = blob.type || "image/png";
  return `data:${type};base64,${b64}`;
}

/** Prefetch remote http(s) images to data URIs so PPTX export can embed them. */
export async function prefetchDeckImages(deck: DeckJson): Promise<{ deck: DeckJson; warnings: string[] }> {
  const warnings: string[] = [];
  const slides: Slide[] = [];
  for (const slide of deck.slides ?? []) {
    const src = slide.image;
    if (!src || src.startsWith("data:") || !/^https?:\/\//i.test(src)) {
      slides.push(slide);
      continue;
    }
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const dataUri = await blobToDataUri(await res.blob());
      slides.push({ ...slide, image: dataUri });
    } catch (err) {
      warnings.push(`Could not prefetch image (${(err as Error).message}): ${src}`);
      slides.push(slide);
    }
  }
  return { deck: { ...deck, slides }, warnings };
}

export async function downloadPptx(deck: DeckJson): Promise<PptxDownloadResult> {
  const warnings: string[] = [];
  const theme = resolveTheme(themeName(deck));
  const prepared = await prefetchDeckImages(deck);
  warnings.push(...prepared.warnings);
  // Lazy-load the exporter (pptxgenjs) so it's a separate chunk fetched only on
  // first export — keeps the studio's initial bundle small.
  const { deckToPptxBlob } = await import("@presentation-md/export");
  const blob = await deckToPptxBlob(prepared.deck, theme, { onWarn: (m) => warnings.push(m) });
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
