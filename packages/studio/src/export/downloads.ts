import type { DeckJson } from "@presentation-md/export";
import { markdownToDeck } from "@presentation-md/core";
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
  // Delay revoke so Chromium headless can start the download.
  window.setTimeout(() => URL.revokeObjectURL(url), 2_000);
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

function deckHtml(deck: DeckJson, renderedHtml?: string): string {
  return (
    renderedHtml ??
    (() => {
      const theme = resolveTheme(themeName(deck));
      return renderDeckHtml(deck, theme);
    })()
  );
}

export interface PptxDownloadResult {
  warnings: string[];
}

export type PdfDownloadMode = "headless" | "client" | "print";

export interface PdfDownloadResult {
  mode: PdfDownloadMode;
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

export function downloadHtml(deck: DeckJson, renderedHtml?: string): void {
  // Prefer the already-rendered Studio preview HTML so the click stays
  // gesture-associated (avoids headless re-render cost).
  const html = deckHtml(deck, renderedHtml);
  // application/octet-stream: Chromium blocks blob: downloads of text/html
  // (phishing protection) — which flakes Playwright and some browsers.
  triggerDownload(
    new Blob([html], { type: "application/octet-stream" }),
    safeName(deck, "html")
  );
}

export function downloadJson(deck: DeckJson): void {
  triggerDownload(
    new Blob([JSON.stringify(deck, null, 2)], { type: "application/json" }),
    safeName(deck, "json")
  );
}

/**
 * Local Vite / preview middleware — Chromium printToPDF (same @page 16:9 as MCP/CLI).
 * Absent on static Vercel hosts; callers fall through to client raster or print.
 */
export async function fetchHeadlessPdfBlob(html: string): Promise<Blob | null> {
  try {
    const controller = new AbortController();
    const timer = globalThis.setTimeout(() => controller.abort(), 45_000);
    let res: Response;
    try {
      res = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: html,
        signal: controller.signal,
      });
    } finally {
      globalThis.clearTimeout(timer);
    }
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.size) return null;
    if (/pdf/i.test(blob.type)) return blob;
    // Some servers omit Content-Type — accept bodies that look like PDF.
    const head = new Uint8Array(await blob.slice(0, 5).arrayBuffer());
    const magic = String.fromCharCode(...head);
    if (!magic.startsWith("%PDF")) return null;
    return new Blob([blob], { type: "application/pdf" });
  } catch {
    return null;
  }
}

/**
 * Client-side PDF: rasterize each `.slide` into a 16:9 page (production Studio
 * has no headless Chromium). Prefer `fetchHeadlessPdfBlob` when the Vite API exists.
 */
export async function downloadPdfClientRaster(
  deck: DeckJson,
  renderedHtml?: string
): Promise<void> {
  const html = deckHtml(deck, renderedHtml);
  const [{ default: html2canvas }, { PDFDocument }] = await Promise.all([
    import("html2canvas"),
    import("pdf-lib"),
  ]);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-12000px;top:0;width:1920px;height:1080px;border:0;opacity:0;pointer-events:none";
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("Could not open PDF render frame");
    doc.open();
    doc.write(html);
    doc.close();

    await new Promise<void>((resolve) => {
      if (doc.readyState === "complete") resolve();
      else iframe.addEventListener("load", () => resolve(), { once: true });
    });
    // Fonts / theme CSS settle before capture.
    await new Promise((r) => window.setTimeout(r, 350));
    try {
      await doc.fonts?.ready;
    } catch {
      /* ignore */
    }

    const slides = [...doc.querySelectorAll(".slide")] as HTMLElement[];
    if (!slides.length) {
      throw new Error("No .slide elements found to rasterize");
    }

    const pdf = await PDFDocument.create();
    const pageW = 1920;
    const pageH = 1080;

    for (const slide of slides) {
      const canvas = await html2canvas(slide, {
        scale: 1,
        width: pageW,
        height: pageH,
        windowWidth: pageW,
        windowHeight: pageH,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      const jpgBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
      const jpg = await pdf.embedJpg(jpgBytes);
      const page = pdf.addPage([pageW, pageH]);
      page.drawImage(jpg, { x: 0, y: 0, width: pageW, height: pageH });
    }

    const bytes = await pdf.save();
    const copy = new Uint8Array(bytes);
    triggerDownload(
      new Blob([copy], { type: "application/pdf" }),
      safeName(deck, "pdf")
    );
  } finally {
    iframe.remove();
  }
}

/**
 * True PDF blob download when possible:
 * 1. Local Vite headless Chromium (vector, selectable text — MCP/CLI parity)
 * 2. Client raster (static hosts)
 * 3. Browser print dialog as last resort
 */
export async function downloadPdf(
  deck: DeckJson,
  renderedHtml?: string
): Promise<PdfDownloadResult> {
  const html = deckHtml(deck, renderedHtml);

  const headless = await fetchHeadlessPdfBlob(html);
  if (headless) {
    triggerDownload(headless, safeName(deck, "pdf"));
    return { mode: "headless" };
  }

  try {
    await downloadPdfClientRaster(deck, html);
    return { mode: "client" };
  } catch {
    printDeckPdf(deck, html);
    return { mode: "print" };
  }
}

/**
 * Open the rendered deck in a print window so the browser's Save as PDF uses the
 * same `@media print` / `@page` 16:9 rules as MCP/CLI vector PDF (one page per slide).
 * Pure client path — no server round-trip. Kept as fallback when blob export fails.
 */
export function printDeckPdf(deck: DeckJson, renderedHtml?: string): void {
  const html = deckHtml(deck, renderedHtml);
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) {
    throw new Error(
      "Pop-up blocked — allow pop-ups for Studio, then try Download PDF again (or use MCP/CLI `format: pdf`)."
    );
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.document.title = safeName(deck, "pdf").replace(/\.pdf$/i, "");
  const trigger = () => {
    try {
      w.focus();
      w.print();
    } catch {
      /* user can still File → Print */
    }
  };
  // Give fonts/images a beat; print CSS already hides nav chrome.
  if (w.document.readyState === "complete") {
    window.setTimeout(trigger, 250);
  } else {
    w.addEventListener("load", () => window.setTimeout(trigger, 250), { once: true });
  }
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

/** Convert Marp / md-slides flavored Markdown into Deck JSON (MCP `import_markdown` parity). */
export function importMarkdownFile(text: string, theme = "default-tech"): DeckJson {
  if (!text.trim()) throw new Error("Markdown file is empty");
  return markdownToDeck(text, { theme }) as DeckJson;
}

/** Open `.html` (embedded), `.json`, or `.md` / `.markdown` by filename. */
export function parseDeckFile(filename: string, text: string, theme = "default-tech"): DeckJson {
  if (/\.html?$/i.test(filename)) return extractDeckFromHtml(text);
  if (/\.(md|markdown)$/i.test(filename)) return importMarkdownFile(text, theme);
  return parseDeckJson(text);
}
