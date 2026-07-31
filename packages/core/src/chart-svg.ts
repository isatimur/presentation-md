/**
 * Pure SVG chart renderer for the `chart` deck layout.
 * Theme colors default to CSS variables so HTML decks inherit palette tokens;
 * pass concrete hex for PPTX raster fallbacks if needed.
 */

export type ChartType =
  | "bar"
  | "horizontal-bar"
  | "line"
  | "area"
  | "pie"
  | "donut";

export interface ChartSeries {
  name: string;
  values: number[];
}

export interface ChartSpec {
  chartType?: ChartType | string;
  categories?: string[];
  series?: ChartSeries[];
  showLegend?: boolean;
  showValues?: boolean;
  stacked?: boolean;
}

export interface ChartColors {
  accent?: string;
  accent2?: string;
  text?: string;
  muted?: string;
  border?: string;
  cardBg?: string;
  /** Extra series colors beyond accent/accent2 (CSS vars or hex). */
  extras?: string[];
}

const DEFAULT_COLORS: Required<Omit<ChartColors, "extras">> & { extras: string[] } = {
  accent: "var(--accent)",
  accent2: "var(--accent2)",
  text: "var(--text)",
  muted: "var(--muted)",
  border: "var(--border)",
  cardBg: "var(--card-bg)",
  extras: ["var(--accent)", "var(--accent2)", "var(--muted)", "var(--text)"],
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function seriesColors(colors: ChartColors, n: number): string[] {
  const palette = [
    colors.accent ?? DEFAULT_COLORS.accent,
    colors.accent2 ?? DEFAULT_COLORS.accent2,
    ...(colors.extras ?? DEFAULT_COLORS.extras),
  ];
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(palette[i % palette.length]!);
  return out;
}

function maxValue(series: ChartSeries[], stacked: boolean): number {
  if (series.length === 0) return 1;
  if (stacked) {
    const len = Math.max(...series.map((s) => s.values.length), 0);
    let max = 0;
    for (let i = 0; i < len; i++) {
      let sum = 0;
      for (const s of series) sum += Number(s.values[i] ?? 0) || 0;
      if (sum > max) max = sum;
    }
    return max || 1;
  }
  let max = 0;
  for (const s of series) {
    for (const v of s.values) {
      const n = Number(v) || 0;
      if (n > max) max = n;
    }
  }
  return max || 1;
}

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const exp = Math.floor(Math.log10(v));
  const base = Math.pow(10, exp);
  const n = v / base;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return nice * base;
}

function formatValue(v: number): string {
  if (Number.isInteger(v)) return String(v);
  if (Math.abs(v) >= 100) return v.toFixed(0);
  if (Math.abs(v) >= 10) return v.toFixed(1);
  return v.toFixed(2).replace(/\.?0+$/, "");
}

function legend(
  series: ChartSeries[],
  fills: string[],
  colors: ChartColors,
  x: number,
  y: number
): string {
  if (series.length <= 1) return "";
  const items = series
    .map((s, i) => {
      const ix = x + i * 140;
      return `<g transform="translate(${ix},${y})">
      <rect width="12" height="12" rx="2" fill="${fills[i]}"/>
      <text x="18" y="11" font-size="12" fill="${colors.muted ?? DEFAULT_COLORS.muted}" font-family="var(--body-font), system-ui, sans-serif">${esc(s.name)}</text>
    </g>`;
    })
    .join("");
  return `<g class="chart-legend">${items}</g>`;
}

function renderCartesian(
  type: "bar" | "horizontal-bar" | "line" | "area",
  categories: string[],
  series: ChartSeries[],
  colors: ChartColors,
  opts: { showLegend: boolean; showValues: boolean; stacked: boolean }
): string {
  const W = 920;
  const H = 420;
  const padL = 52;
  const padR = 24;
  const padT = opts.showLegend && series.length > 1 ? 36 : 16;
  const padB = 44;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const fills = seriesColors(colors, Math.max(series.length, 1));
  const m = niceMax(maxValue(series, opts.stacked));
  const cats = categories.length
    ? categories
    : Array.from({ length: Math.max(...series.map((s) => s.values.length), 1) }, (_, i) =>
        String(i + 1)
      );
  const n = Math.max(cats.length, 1);
  const muted = colors.muted ?? DEFAULT_COLORS.muted;
  const border = colors.border ?? DEFAULT_COLORS.border;
  const text = colors.text ?? DEFAULT_COLORS.text;

  // Gridlines
  const grid: string[] = [];
  for (let g = 0; g <= 4; g++) {
    const gy = padT + (plotH * g) / 4;
    const val = m * (1 - g / 4);
    grid.push(
      `<line x1="${padL}" y1="${gy}" x2="${padL + plotW}" y2="${gy}" stroke="${border}" stroke-width="1" opacity="0.55"/>`
    );
    if (type !== "horizontal-bar") {
      grid.push(
        `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${muted}" font-family="var(--body-font), system-ui, sans-serif">${formatValue(val)}</text>`
      );
    }
  }

  let marks = "";
  let catLabels = "";

  if (type === "bar" || type === "horizontal-bar") {
    if (type === "horizontal-bar") {
      const rowH = plotH / n;
      const gap = Math.min(10, rowH * 0.2);
      const barH = Math.max(8, rowH - gap);
      cats.forEach((cat, i) => {
        const y0 = padT + i * rowH + gap / 2;
        let xOff = 0;
        series.forEach((s, si) => {
          const v = Number(s.values[i] ?? 0) || 0;
          const bw = (v / m) * plotW;
          const x = padL + (opts.stacked ? xOff : 0);
          const seriesOffset = opts.stacked
            ? 0
            : (si * barH) / Math.max(series.length, 1);
          const h = opts.stacked ? barH : barH / Math.max(series.length, 1);
          marks += `<rect x="${x}" y="${y0 + seriesOffset}" width="${Math.max(bw, 0)}" height="${h}" rx="3" fill="${fills[si]}"/>`;
          if (opts.showValues && v !== 0) {
            marks += `<text x="${x + bw + 6}" y="${y0 + seriesOffset + h / 2 + 4}" font-size="11" fill="${text}" font-family="var(--body-font), system-ui, sans-serif">${formatValue(v)}</text>`;
          }
          if (opts.stacked) xOff += bw;
        });
        catLabels += `<text x="${padL - 8}" y="${y0 + barH / 2 + 4}" text-anchor="end" font-size="12" fill="${muted}" font-family="var(--body-font), system-ui, sans-serif">${esc(cat)}</text>`;
      });
    } else {
      const groupW = plotW / n;
      const gap = Math.min(16, groupW * 0.18);
      const inner = groupW - gap;
      cats.forEach((cat, i) => {
        const gx = padL + i * groupW + gap / 2;
        let yOff = 0;
        series.forEach((s, si) => {
          const v = Number(s.values[i] ?? 0) || 0;
          const bh = (v / m) * plotH;
          const barW = opts.stacked ? inner : inner / Math.max(series.length, 1);
          const x = opts.stacked ? gx : gx + si * barW;
          const y = padT + plotH - bh - (opts.stacked ? yOff : 0);
          marks += `<rect x="${x}" y="${y}" width="${Math.max(barW - 2, 2)}" height="${Math.max(bh, 0)}" rx="3" fill="${fills[si]}"/>`;
          if (opts.showValues && v !== 0) {
            marks += `<text x="${x + barW / 2}" y="${y - 6}" text-anchor="middle" font-size="11" fill="${text}" font-family="var(--body-font), system-ui, sans-serif">${formatValue(v)}</text>`;
          }
          if (opts.stacked) yOff += bh;
        });
        catLabels += `<text x="${gx + inner / 2}" y="${H - 14}" text-anchor="middle" font-size="12" fill="${muted}" font-family="var(--body-font), system-ui, sans-serif">${esc(cat)}</text>`;
      });
    }
  } else {
    // line / area
    const pts = (s: ChartSeries): string =>
      cats
        .map((_, i) => {
          const v = Number(s.values[i] ?? 0) || 0;
          const x = padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
          const y = padT + plotH - (v / m) * plotH;
          return `${x},${y}`;
        })
        .join(" ");

    series.forEach((s, si) => {
      const points = pts(s);
      const coords = points.split(" ").map((p) => {
        const [x, y] = p.split(",").map(Number);
        return { x: x!, y: y! };
      });
      if (type === "area" && coords.length) {
        const first = coords[0]!;
        const last = coords[coords.length - 1]!;
        const areaPath = `M ${first.x} ${padT + plotH} L ${coords.map((c) => `${c.x} ${c.y}`).join(" L ")} L ${last.x} ${padT + plotH} Z`;
        marks += `<path d="${areaPath}" fill="${fills[si]}" opacity="0.28"/>`;
      }
      marks += `<polyline fill="none" stroke="${fills[si]}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" points="${points}"/>`;
      coords.forEach((c, i) => {
        marks += `<circle cx="${c.x}" cy="${c.y}" r="4.5" fill="${fills[si]}" stroke="var(--bg, #fff)" stroke-width="2"/>`;
        if (opts.showValues) {
          const v = Number(s.values[i] ?? 0) || 0;
          marks += `<text x="${c.x}" y="${c.y - 10}" text-anchor="middle" font-size="11" fill="${text}" font-family="var(--body-font), system-ui, sans-serif">${formatValue(v)}</text>`;
        }
      });
    });
    cats.forEach((cat, i) => {
      const x = padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
      catLabels += `<text x="${x}" y="${H - 14}" text-anchor="middle" font-size="12" fill="${muted}" font-family="var(--body-font), system-ui, sans-serif">${esc(cat)}</text>`;
    });
  }

  return `<svg class="pmd-chart" viewBox="0 0 ${W} ${H}" width="100%" height="100%" role="img" aria-label="Chart" xmlns="http://www.w3.org/2000/svg">
  ${opts.showLegend ? legend(series, fills, colors, padL, 8) : ""}
  <g class="chart-grid">${grid.join("")}</g>
  <g class="chart-marks">${marks}</g>
  <g class="chart-cats">${catLabels}</g>
</svg>`;
}

function renderPie(
  donut: boolean,
  categories: string[],
  series: ChartSeries[],
  colors: ChartColors,
  opts: { showLegend: boolean; showValues: boolean }
): string {
  const W = 920;
  const H = 420;
  const primary = series[0] ?? { name: "Series", values: [] };
  const values = primary.values.map((v) => Number(v) || 0);
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cats = categories.length
    ? categories
    : values.map((_, i) => primary.name || `Slice ${i + 1}`);
  const fills = seriesColors(colors, values.length);
  const cx = 340;
  const cy = 210;
  const R = 150;
  const r = donut ? 78 : 0;
  let angle = -Math.PI / 2;
  const slices: string[] = [];
  values.forEach((v, i) => {
    const sweep = (v / total) * Math.PI * 2;
    const a1 = angle;
    const a2 = angle + sweep;
    const x1 = cx + R * Math.cos(a1);
    const y1 = cy + R * Math.sin(a1);
    const x2 = cx + R * Math.cos(a2);
    const y2 = cy + R * Math.sin(a2);
    const large = sweep > Math.PI ? 1 : 0;
    let d: string;
    if (r > 0) {
      const ix1 = cx + r * Math.cos(a2);
      const iy1 = cy + r * Math.sin(a2);
      const ix2 = cx + r * Math.cos(a1);
      const iy2 = cy + r * Math.sin(a1);
      d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z`;
    } else {
      d = `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
    }
    slices.push(`<path d="${d}" fill="${fills[i]}" stroke="var(--bg, #fff)" stroke-width="2"/>`);
    if (opts.showValues && v !== 0) {
      const mid = a1 + sweep / 2;
      const lr = (R + r) / 2 || R * 0.62;
      const tx = cx + lr * Math.cos(mid);
      const ty = cy + lr * Math.sin(mid);
      slices.push(
        `<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="600" fill="var(--bg, #fff)" font-family="var(--heading-font), system-ui, sans-serif">${formatValue(v)}</text>`
      );
    }
    angle = a2;
  });

  const legendItems = values
    .map((v, i) => {
      const y = 48 + i * 28;
      const pct = ((v / total) * 100).toFixed(0);
      return `<g transform="translate(560,${y})">
      <rect width="14" height="14" rx="3" fill="${fills[i]}"/>
      <text x="22" y="12" font-size="14" fill="${colors.text ?? DEFAULT_COLORS.text}" font-family="var(--body-font), system-ui, sans-serif">${esc(cats[i] ?? `Item ${i + 1}`)} <tspan fill="${colors.muted ?? DEFAULT_COLORS.muted}">${pct}%</tspan></text>
    </g>`;
    })
    .join("");

  return `<svg class="pmd-chart" viewBox="0 0 ${W} ${H}" width="100%" height="100%" role="img" aria-label="Chart" xmlns="http://www.w3.org/2000/svg">
  <g class="chart-slices">${slices.join("")}</g>
  ${opts.showLegend !== false ? `<g class="chart-legend">${legendItems}</g>` : ""}
</svg>`;
}

/** Build an inline SVG string for a chart slide. */
export function renderChartSvg(spec: ChartSpec, colors: ChartColors = {}): string {
  const chartType = (spec.chartType ?? "bar") as ChartType;
  const series = (spec.series ?? []).map((s) => ({
    name: s.name || "Series",
    values: (s.values ?? []).map((v) => Number(v) || 0),
  }));
  const categories = spec.categories ?? [];
  const showLegend = spec.showLegend !== false;
  const showValues = spec.showValues === true;
  const stacked = spec.stacked === true;

  if (series.length === 0 || series.every((s) => s.values.length === 0)) {
    return `<svg class="pmd-chart pmd-chart-empty" viewBox="0 0 920 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <text x="460" y="210" text-anchor="middle" font-size="16" fill="${colors.muted ?? DEFAULT_COLORS.muted}" font-family="var(--body-font), system-ui, sans-serif">No chart data</text>
</svg>`;
  }

  if (chartType === "pie" || chartType === "donut") {
    return renderPie(chartType === "donut", categories, series, colors, {
      showLegend,
      showValues,
    });
  }

  const cartesian: "bar" | "horizontal-bar" | "line" | "area" =
    chartType === "horizontal-bar" || chartType === "line" || chartType === "area"
      ? chartType
      : "bar";

  return renderCartesian(cartesian, categories, series, colors, {
    showLegend,
    showValues,
    stacked,
  });
}
