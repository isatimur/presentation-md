import Mustache from "mustache";
import type { ResolvedTheme } from "@presentation-md/core";
import type { DeckJson, Slide } from "@presentation-md/export";
import baseCssTemplate from "../../../shared/base.css?raw";
import surfacesCss from "../../../shared/surfaces.css?raw";
import themeSurfaces from "../../../shared/theme-surfaces.json";
import documentTemplate from "../../../shared/document.html?raw";

function surfaceForTheme(name: string): string {
  return (themeSurfaces as Record<string, string>)[name] ?? "gradient";
}

/**
 * Browser-side deck → HTML render. A fs-free port of `@presentation-md/render`
 * that pulls the shared Mustache layouts and base stylesheet from the monorepo at
 * build time, so the live preview matches the canonical Node renderer output.
 */

const layoutModules = import.meta.glob("../../../shared/layouts/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const LAYOUTS = new Map<string, string>();
for (const [path, tpl] of Object.entries(layoutModules)) {
  const name = path.split("/").pop()!.replace(/\.html$/, "");
  LAYOUTS.set(name, tpl);
}

function buildGoogleFontsUrl(families: string[]): string {
  if (families.length === 0) return "";
  return `https://fonts.googleapis.com/css2?family=${families.join("&family=")}&display=swap`;
}

const SAFE_LINK_SCHEMES = new Set(["http", "https", "mailto", "tel"]);

/** Drop C0/C1 control characters (used to obfuscate schemes like `java\tscript:`). */
function stripControls(s: string): string {
  let out = "";
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    if (c > 0x1f && c !== 0x7f) out += ch;
  }
  return out;
}

function schemeOf(url: string): string | undefined {
  return url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/)?.[1]?.toLowerCase();
}

/** Strip dangerous URL schemes (javascript:, vbscript:, data:…) from link hrefs. */
function sanitizeLink(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const cleaned = stripControls(url).trim();
  const s = schemeOf(cleaned);
  return s && !SAFE_LINK_SCHEMES.has(s) ? "#" : cleaned;
}

/** Allow http(s) and inline images; drop anything else (e.g. javascript:). */
function sanitizeImage(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const cleaned = stripControls(url).trim();
  if (/^data:image\//i.test(cleaned)) return cleaned;
  const s = schemeOf(cleaned);
  return s && s !== "http" && s !== "https" ? "" : cleaned;
}

function normalizeSlideData(slide: Slide): Record<string, unknown> {
  const out: Record<string, unknown> = { ...slide };
  if (slide.layout === "data-table" && Array.isArray(slide.rows)) {
    out["rows"] = slide.rows.map((row) => ({ cells: row }));
  }
  if (slide.layout === "feature-grid") {
    if (typeof slide.columns === "number") out["columns"] = slide.columns;
    else if (!slide.columns) out["columns"] = 3;
  }
  if (slide.cta?.href !== undefined) {
    out["cta"] = { ...slide.cta, href: sanitizeLink(slide.cta.href) };
  }
  if (slide.image !== undefined) {
    out["image"] = sanitizeImage(slide.image);
  }
  return out;
}

const ATTRIBUTION_HTML =
  `<footer class="pmd-attribution">Made with ` +
  `<a href="https://presentation-md.vercel.app/?ref=studio" target="_blank" rel="noopener">presentation-md</a>` +
  `</footer>`;

// Kept identical to the canonical renderer (packages/renderer-node) so the
// studio preview matches a deck downloaded/rendered anywhere else.
const ATTRIBUTION_CSS = `
/* presentation-md attribution footer */
.pmd-attribution {
  font-family: var(--body-font);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.6;
  text-align: center;
  padding: 4px 0 16px;
}
.pmd-attribution a {
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--muted) 40%, transparent);
  transition: color 0.15s ease, border-color 0.15s ease;
}
.pmd-attribution a:hover { color: var(--accent); border-color: var(--accent); }
@media print { .pmd-attribution { opacity: 0.5; } }`;

/**
 * Embed the source deck as a JSON script tag so a deck downloaded from the studio
 * round-trips back into it. Mirrors `embedDeckScript` in the Node renderer.
 */
function embedDeckScript(deck: DeckJson): string {
  const json = JSON.stringify(deck).replace(/</g, "\\u003c");
  return `<script type="application/json" id="pmd-deck">${json}</script>`;
}

export function renderDeckHtml(deck: DeckJson, theme: ResolvedTheme): string {
  const tokenView: Record<string, string> = {
    bg: theme.palette.bg,
    bg2: theme.palette.bg2,
    text: theme.palette.text,
    muted: theme.palette.muted,
    accent: theme.palette.accent,
    accent2: theme.palette.accent2,
    cardBg: theme.palette.cardBg,
    border: theme.palette.border,
    radius: theme.geometry.radius,
    slideW: theme.geometry.slideWidth,
    headingFont: theme.typography.headingFont,
    bodyFont: theme.typography.bodyFont,
    headingWeight: String(theme.typography.headingWeight),
  };

  const renderedCss = Mustache.render(baseCssTemplate, tokenView);
  const googleFontsUrl = buildGoogleFontsUrl(theme.typography.googleFonts);
  const surface = surfaceForTheme(theme.name);
  let fullCss = googleFontsUrl
    ? `@import url('${googleFontsUrl}');\n\n${renderedCss}\n\n${surfacesCss}`
    : `${renderedCss}\n\n${surfacesCss}`;
  fullCss += `\n\n${ATTRIBUTION_CSS}`;

  const slides = (Array.isArray(deck.slides) ? deck.slides : [])
    .map((slide) => {
      const template = LAYOUTS.get(slide.layout);
      if (!template) {
        return `<section class="slide"><h2>Unknown layout: ${slide.layout}</h2></section>`;
      }
      return Mustache.render(template, normalizeSlideData(slide));
    })
    .join("\n");

  const title = deck.meta?.title ?? deck.meta?.company ?? "Presentation";
  return Mustache.render(documentTemplate, {
    title,
    description: deck.meta?.description ?? "",
    styles: fullCss,
    slides,
    surface,
    attribution: ATTRIBUTION_HTML,
    deckData: embedDeckScript(deck),
  });
}
