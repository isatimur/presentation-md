import Mustache from "mustache";
import type { ResolvedTheme } from "@presentation-md/core";
import { renderChartSvg, sanitizeCustomHtml, candyMarqueeText } from "@presentation-md/core";
import type { DeckJson, Slide, ChartSeries } from "@presentation-md/export";
import baseCssTemplate from "../../../shared/base.css?raw";
import surfacesCss from "../../../shared/surfaces.css?raw";
import themeSurfaces from "../../../shared/theme-surfaces.json";
import documentTemplate from "../../../shared/document.html?raw";

function surfaceForTheme(name: string): string {
  return (themeSurfaces as Record<string, string>)[name] ?? "gradient";
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/\n/g, " ");
}

function injectCandyMarquee(
  html: string,
  layout: string,
  surface: string,
  meta: DeckJson["meta"]
): string {
  if (surface !== "candy-blob") return html;
  if (layout !== "title" && layout !== "closing") return html;
  const ticker = candyMarqueeText({
    company: meta?.company,
    title: meta?.title,
    marquee: meta?.marquee,
  });
  return html.replace(
    /<section(\s+class="slide)/i,
    `<section data-marquee="${escapeAttr(ticker)}"$1`
  );
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
    if (slide.columns === "bento") {
      out["columns"] = "bento";
    } else if (typeof slide.columns === "number") {
      out["columns"] = slide.columns;
    } else if (!slide.columns) {
      out["columns"] = 3;
    }
  }
  if (slide.layout === "chart") {
    const series = (Array.isArray(slide.series) ? slide.series : []) as ChartSeries[];
    out["chartSvg"] = renderChartSvg({
      chartType: typeof slide.chartType === "string" ? slide.chartType : "bar",
      categories: Array.isArray(slide.categories) ? slide.categories : [],
      series: series.map((s) => ({ name: s.name || "Series", values: s.values ?? [] })),
      showLegend: slide.showLegend !== false,
      showValues: slide.showValues === true,
      stacked: slide.stacked === true,
    });
  }
  if (slide.layout === "custom-html") {
    out["html"] = sanitizeCustomHtml(slide.html);
  }
  if (slide.layout === "ranked-list") {
    const raw = Array.isArray(slide.items) ? slide.items : [];
    const n = Math.max(raw.length, 1);
    out["items"] = raw.map((item, i) => {
      const defaultPct = Math.max(18, Math.round(100 - (i * 70) / Math.max(n - 1, 1)));
      const widthPct =
        typeof item.widthPct === "number" && item.widthPct > 0
          ? Math.min(100, item.widthPct)
          : defaultPct;
      const rank =
        typeof item.rank === "string" && item.rank.trim()
          ? item.rank.trim()
          : String(i + 1).padStart(2, "0");
      return { ...item, rank, widthPct, isPrimary: i === 0 };
    });
  }
  if (slide.layout === "stat-row") {
    const isHero = slide.variant === "hero";
    out["isHero"] = isHero;
    const stats = Array.isArray(slide.stats) ? slide.stats : [];
    if (isHero && stats.length) {
      out["stats"] = stats.map((s, i) => ({ ...s, isMega: i === 0 }));
    }
  }
  if (slide.layout === "logo-wall") {
    const cols =
      typeof slide.columns === "number" && slide.columns >= 2 && slide.columns <= 6
        ? slide.columns
        : Array.isArray(slide.cards)
          ? Math.min(Math.max(slide.cards.length, 2), 4)
          : 4;
    out["columns"] = cols;
    if (Array.isArray(slide.cards)) {
      out["cards"] = slide.cards.map((c) => ({
        ...c,
        image: c.image !== undefined ? sanitizeImage(c.image) : undefined,
      }));
    }
  }
  if (slide.layout === "streak-grid") {
    const filledRaw = typeof slide.filled === "number" ? slide.filled : 0;
    const filled = Math.max(0, Math.min(120, Math.round(filledRaw)));
    const totalRaw = typeof slide.total === "number" ? slide.total : filled || 1;
    const total = Math.max(filled, Math.min(120, Math.round(totalRaw)));
    const colsRaw = typeof slide.cols === "number" ? slide.cols : 10;
    const cols = Math.max(4, Math.min(16, Math.round(colsRaw)));
    out["filled"] = filled;
    out["total"] = total;
    out["cols"] = cols;
    out["cells"] = Array.from({ length: total }, (_, i) => ({
      dim: i >= filled,
      mid: false,
    }));
  }
  if (slide.layout === "metric-ring") {
    const pctRaw = typeof slide.pct === "number" ? slide.pct : 100;
    const pct = Math.max(0, Math.min(100, pctRaw));
    const isArc = pct > 0 && pct < 100;
    out["pct"] = pct;
    out["isArc"] = isArc;
    out["value"] = typeof slide.value === "string" ? slide.value : `${Math.round(pct)}%`;
    out["label"] = typeof slide.label === "string" ? slide.label : "";
    if (isArc) {
      const r = 42;
      const c = 2 * Math.PI * r;
      const dash = (pct / 100) * c;
      out["ringSvg"] =
        `<svg class="pct-ring-svg" viewBox="0 0 100 100" aria-hidden="true">` +
        `<circle cx="50" cy="50" r="${r}" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="10"/>` +
        `<circle cx="50" cy="50" r="${r}" fill="none" stroke="currentColor" stroke-width="10" ` +
        `stroke-linecap="round" stroke-dasharray="${dash.toFixed(2)} ${c.toFixed(2)}" ` +
        `transform="rotate(-90 50 50)"/></svg>`;
    }
  }
  if (slide.layout === "timeline") {
    out["isVertical"] = slide.orientation === "vertical";
  }
  // Normalize closing actions (cta remains alias for actions[0]).
  {
    const raw = Array.isArray(slide.actions)
      ? slide.actions
      : slide.cta?.label
        ? [slide.cta]
        : [];
    if (raw.length || slide.layout === "closing") {
      const actions = raw.slice(0, 3).map((a, i) => {
        const styleRaw = typeof a.style === "string" ? a.style : i === 0 ? "solid" : "outline";
        const style = ["solid", "outline", "ghost"].includes(styleRaw) ? styleRaw : i === 0 ? "solid" : "outline";
        const icon =
          typeof a.icon === "string" && /^fa[a-z0-9 -]*$/i.test(a.icon.trim())
            ? a.icon.trim().replace(/\s+/g, " ")
            : undefined;
        return {
          label: String(a.label ?? ""),
          href: sanitizeLink(a.href) ?? "#",
          style,
          icon,
          isOutline: style === "outline",
          isGhost: style === "ghost",
        };
      });
      out["actions"] = actions;
      out["hasActions"] = actions.length > 0;
      if (actions.length) {
        out["cta"] = { label: actions[0]!.label, href: actions[0]!.href };
      }
    } else if (slide.cta?.href !== undefined) {
      out["cta"] = { ...slide.cta, href: sanitizeLink(slide.cta.href) };
    }
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
      let html = Mustache.render(template, normalizeSlideData(slide));
      const tone = typeof slide.tone === "string" ? slide.tone.trim() : "";
      if (tone && /^[a-z0-9-]+$/i.test(tone)) {
        html = html.replace(/<section(\s+class="slide)/i, `<section data-tone="${tone}"$1`);
      }
      return injectCandyMarquee(html, slide.layout, surface, deck.meta);
    })
    .join("\n");

  // Sanitize custom-html before embed so Studio round-trips stay safe.
  for (const slide of deck.slides ?? []) {
    if (slide.layout === "custom-html" && slide.html !== undefined) {
      slide.html = sanitizeCustomHtml(slide.html);
    }
  }

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
