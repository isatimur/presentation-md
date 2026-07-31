/**
 * Markdown → Deck JSON bridge (Marp / md-slides flavored).
 *
 * Splits on `---` horizontal rules, reads optional YAML-ish front matter for
 * theme/title/company, and maps each section to the closest schema layout.
 */

import type { ChartSeries } from "./chart-svg.js";

export interface MdSlide {
  layout: string;
  [key: string]: unknown;
}

export interface MdDeck {
  type: "deck";
  meta: {
    title?: string;
    company?: string;
    description?: string;
    theme?: string;
  };
  slides: MdSlide[];
}

export interface MdToDeckOptions {
  /** Default theme when front matter omits theme. */
  theme?: string;
  /** Default title when front matter omits title. */
  title?: string;
}

function stripFence(md: string): string {
  return md.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function parseFrontMatter(src: string): { meta: Record<string, string>; body: string } {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: src };
  const meta: Record<string, string> = {};
  for (const line of m[1]!.split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    meta[kv[1]!.toLowerCase()] = kv[2]!.trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2]! };
}

function splitSlides(body: string): string[] {
  // Marp / md-slides: slides separated by a line that is exactly ---
  const parts = body.split(/\n---\n/);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function firstHeading(block: string): { level: number; text: string } | null {
  const m = block.match(/^(#{1,6})\s+(.+)$/m);
  if (!m) return null;
  return { level: m[1]!.length, text: m[2]!.trim() };
}

function bullets(block: string): string[] {
  return [...block.matchAll(/^\s*[-*+]\s+(.+)$/gm)].map((m) => m[1]!.trim());
}

function numbered(block: string): string[] {
  return [...block.matchAll(/^\s*\d+[.)]\s+(.+)$/gm)].map((m) => m[1]!.trim());
}

function paragraphs(block: string): string[] {
  return block
    .replace(/^#{1,6}\s+.+$/gm, "")
    .replace(/^\s*[-*+]\s+.+$/gm, "")
    .replace(/^\s*\d+[.)]\s+.+$/gm, "")
    .replace(/^```[\s\S]*?```/gm, "")
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

function codeFence(block: string): { language?: string; code: string } | null {
  const m = block.match(/```([A-Za-z0-9_+-]*)\n([\s\S]*?)```/);
  if (!m) return null;
  return { language: m[1] || undefined, code: m[2]!.replace(/\n$/, "") };
}

function table(block: string): { columns: string[]; rows: string[][] } | null {
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|") && l.endsWith("|"));
  if (lines.length < 2) return null;
  const parseRow = (line: string) =>
    line
      .slice(1, -1)
      .split("|")
      .map((c) => c.trim());
  const columns = parseRow(lines[0]!);
  // skip separator row if present
  const start = /^\|?\s*:?-{3,}/.test(lines[1]!) ? 2 : 1;
  const rows = lines.slice(start).map(parseRow);
  if (columns.length === 0 || rows.length === 0) return null;
  return { columns, rows };
}

function quote(block: string): { quote: string; by?: string } | null {
  const lines = [...block.matchAll(/^>\s?(.*)$/gm)].map((m) => m[1]!);
  if (lines.length === 0) return null;
  let by: string | undefined;
  const bodyLines = [...lines];
  const last = bodyLines[bodyLines.length - 1] ?? "";
  const attr = last.match(/^[-—–]\s*(.+)$/);
  if (attr) {
    by = attr[1]!.trim();
    bodyLines.pop();
  }
  const q = bodyLines.join(" ").trim();
  if (!q) return null;
  return { quote: q, by };
}

function parseChartDirective(block: string): {
  chartType: string;
  categories: string[];
  series: ChartSeries[];
} | null {
  // ```chart bar
  // Category,Series A,Series B
  // Q1,10,12
  // ```
  const m = block.match(/```chart(?:\s+(\w+))?\n([\s\S]*?)```/);
  if (!m) return null;
  const chartType = (m[1] || "bar").toLowerCase();
  const lines = m[2]!
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;
  const header = lines[0]!.split(",").map((c) => c.trim());
  const categories: string[] = [];
  const series: ChartSeries[] = header.slice(1).map((name) => ({ name, values: [] as number[] }));
  for (const line of lines.slice(1)) {
    const cells = line.split(",").map((c) => c.trim());
    categories.push(cells[0] || "");
    series.forEach((s, i) => {
      s.values.push(Number(cells[i + 1]) || 0);
    });
  }
  return { chartType, categories, series };
}

function htmlBlock(block: string): string | null {
  const m = block.match(/```html\n([\s\S]*?)```/);
  return m ? m[1]!.trim() : null;
}

function mapBlock(block: string, index: number, total: number): MdSlide {
  const heading = firstHeading(block);
  const paras = paragraphs(block);
  const chart = parseChartDirective(block);
  if (chart) {
    return {
      layout: "chart",
      eyebrow: heading && heading.level > 1 ? undefined : undefined,
      heading: heading?.text ?? "Chart",
      lead: paras[0],
      chartType: chart.chartType,
      categories: chart.categories,
      series: chart.series,
      showLegend: chart.series.length > 1,
    };
  }

  const html = htmlBlock(block);
  if (html) {
    return {
      layout: "custom-html",
      heading: heading?.text,
      lead: paras[0],
      html,
    };
  }

  const fence = codeFence(block);
  if (fence) {
    return {
      layout: "code",
      heading: heading?.text ?? "Code",
      lead: paras[0],
      language: fence.language,
      code: fence.code,
    };
  }

  const tbl = table(block);
  if (tbl) {
    return {
      layout: "data-table",
      heading: heading?.text ?? "Table",
      lead: paras[0],
      columns: tbl.columns,
      rows: tbl.rows,
    };
  }

  const q = quote(block);
  if (q && (!heading || block.trim().startsWith(">"))) {
    return { layout: "quote", quote: q.quote, by: q.by };
  }

  const steps = numbered(block);
  if (steps.length >= 2 && heading) {
    return {
      layout: "timeline",
      heading: heading.text,
      steps: steps.map((title) => ({ title })),
    };
  }

  const items = bullets(block);
  if (items.length >= 2 && heading) {
    // Heuristic: short items → feature-grid; value/label pairs → stat-row;
    // "N. Label — value" or "Label · value · NN%" → ranked-list
    const asRanked = items
      .map((item, i) => {
        const m =
          item.match(/^(?:(\d+)\.?\s+)?(.+?)\s*[·—–\-:]\s*(.+?)(?:\s*[·—–\-:]\s*(\d{1,3})\s*%?)?$/) ||
          item.match(/^(.+?)\s+(\d{1,3})%$/);
        if (!m) return null;
        if (m.length >= 4 && m[2] && m[3] && !m[4] && item.match(/%$/)) {
          // Label 88%
          return {
            rank: String(i + 1).padStart(2, "0"),
            label: m[1]!.trim(),
            widthPct: Number(m[2]),
          };
        }
        const rank = m[1] ? String(m[1]).padStart(2, "0") : String(i + 1).padStart(2, "0");
        const label = (m[2] ?? m[1] ?? item).trim();
        const value = (m[3] ?? "").trim() || undefined;
        const widthPct = m[4] ? Number(m[4]) : undefined;
        return { rank, label, value, widthPct };
      })
      .filter(Boolean) as Array<{
      rank: string;
      label: string;
      value?: string;
      widthPct?: number;
    }>;
    const looksRanked =
      /rank|top\s*\d|leaderboard|sessions|most.?played|activity/i.test(heading.text) &&
      asRanked.length >= 2 &&
      asRanked.length === items.length;
    if (looksRanked) {
      return { layout: "ranked-list", heading: heading.text, items: asRanked };
    }

    const asStats = items
      .map((item) => {
        const m = item.match(/^(\S+)\s+[—–\-:]\s+(.+)$/) || item.match(/^(\S+)\s{2,}(.+)$/);
        return m ? { value: m[1]!, label: m[2]! } : null;
      })
      .filter(Boolean) as Array<{ value: string; label: string }>;
    if (asStats.length >= 2 && asStats.length === items.length) {
      return { layout: "stat-row", heading: heading.text, stats: asStats };
    }
    return {
      layout: "feature-grid",
      heading: heading.text,
      columns: Math.min(Math.max(items.length, 2), 4),
      cards: items.map((title) => ({ title })),
    };
  }

  // Closing heuristic: last slide with CTA-ish heading
  if (index === total - 1 && heading && /thank|next|let'?s|contact|join|get started/i.test(heading.text)) {
    return {
      layout: "closing",
      heading: heading.text,
      lead: paras[0],
      cta: paras[1] ? { label: paras[1], href: "#" } : undefined,
    };
  }

  // Section: lone ## heading with little body
  if (heading && heading.level === 2 && paras.length === 0 && items.length === 0) {
    return {
      layout: "section",
      number: String(index).padStart(2, "0"),
      heading: heading.text,
    };
  }

  // Title: first slide or # heading
  if (index === 0 || (heading && heading.level === 1)) {
    return {
      layout: "title",
      heading: heading?.text ?? paras[0] ?? "Untitled",
      lead: heading ? paras[0] : paras[1],
      eyebrow: undefined,
    };
  }

  // Default two-column / body slide
  if (heading && paras.length >= 2) {
    return {
      layout: "two-column",
      heading: heading.text,
      body: paras[0],
      aside: paras[1],
      ratio: "2-1",
    };
  }

  return {
    layout: heading && heading.level === 2 ? "section" : "title",
    heading: heading?.text ?? paras[0] ?? `Slide ${index + 1}`,
    lead: heading ? paras[0] : paras[1],
  };
}

/** Convert Marp/md-slides-style markdown into Deck JSON. */
export function markdownToDeck(markdown: string, opts: MdToDeckOptions = {}): MdDeck {
  const src = stripFence(markdown);
  const { meta: fm, body } = parseFrontMatter(src);
  const blocks = splitSlides(body.length ? body : src.replace(/^---[\s\S]*?---\n?/, ""));
  const slides = (blocks.length ? blocks : [body || src]).map((b, i, arr) =>
    mapBlock(b, i, arr.length)
  );

  return {
    type: "deck",
    meta: {
      title: fm["title"] || opts.title || slides[0]?.["heading"]?.toString() || "Untitled",
      company: fm["company"] || fm["author"],
      description: fm["description"],
      theme: fm["theme"] || opts.theme || "default-tech",
    },
    slides,
  };
}
