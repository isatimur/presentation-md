/**
 * Deck JSON → Marp / md-slides Markdown (round-trip companion to markdownToDeck).
 *
 * Best-effort: preserves front matter + common layouts so Open / Paste MD /
 * import_markdown can re-ingest. Exotic fields (tone, images as URLs, etc.)
 * degrade to readable Markdown rather than failing.
 */

import type { MdDeck, MdSlide } from "./md-to-deck.js";

export interface DeckToMarkdownOptions {
  /** Include YAML front matter (default true). */
  frontMatter?: boolean;
}

function escCell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function headingLine(level: 1 | 2, text: string): string {
  return `${"#".repeat(level)} ${text.trim()}`;
}

function bullets(items: string[]): string {
  return items.map((t) => `- ${t}`).join("\n");
}

function numbered(items: string[]): string {
  return items.map((t, i) => `${i + 1}. ${t}`).join("\n");
}

function slideToMarkdown(slide: MdSlide, index: number): string {
  const layout = String(slide.layout ?? "title");
  const heading = typeof slide.heading === "string" ? slide.heading : undefined;
  const lead = typeof slide.lead === "string" ? slide.lead : undefined;
  const body = typeof slide.body === "string" ? slide.body : undefined;
  const parts: string[] = [];

  const pushNotes = () => {
    const notes = typeof slide.notes === "string" ? slide.notes.trim() : "";
    if (notes) {
      parts.push("");
      parts.push(`<!-- notes: ${notes.replace(/-->/g, "->")} -->`);
    }
  };

  switch (layout) {
    case "title": {
      parts.push(headingLine(1, heading ?? "Untitled"));
      if (lead) parts.push("", lead);
      if (body) parts.push("", body);
      break;
    }
    case "section": {
      parts.push(headingLine(2, heading ?? "Section"));
      if (lead) parts.push("", lead);
      break;
    }
    case "quote": {
      const q = typeof slide.quote === "string" ? slide.quote : heading ?? "";
      const by = typeof slide.by === "string" ? slide.by : undefined;
      parts.push(`> ${q}`);
      if (by) parts.push(`> — ${by}`);
      break;
    }
    case "feature-grid":
    case "logo-wall": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const cards = Array.isArray(slide.cards) ? slide.cards : [];
      const lines = cards
        .map((c) => {
          if (!c || typeof c !== "object") return null;
          const card = c as { title?: string; body?: string };
          if (!card.title) return null;
          return card.body ? `${card.title} — ${card.body}` : card.title;
        })
        .filter(Boolean) as string[];
      if (lines.length) parts.push("", bullets(lines));
      break;
    }
    case "stat-row": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const stats = Array.isArray(slide.stats) ? slide.stats : [];
      const lines = stats
        .map((s) => {
          if (!s || typeof s !== "object") return null;
          const st = s as { value?: string; label?: string };
          if (!st.value) return null;
          return `${st.value} — ${st.label ?? ""}`.trim();
        })
        .filter(Boolean) as string[];
      if (lines.length) parts.push("", bullets(lines));
      break;
    }
    case "ranked-list": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const items = Array.isArray(slide.items) ? slide.items : [];
      const lines = items
        .map((it, i) => {
          if (!it || typeof it !== "object") return null;
          const row = it as { rank?: string; label?: string; value?: string; widthPct?: number };
          if (!row.label) return null;
          const rank = row.rank ?? String(i + 1).padStart(2, "0");
          const pct =
            typeof row.widthPct === "number"
              ? ` · ${row.widthPct}%`
              : row.value
                ? ` — ${row.value}`
                : "";
          return `${rank}. ${row.label}${pct}`;
        })
        .filter(Boolean) as string[];
      if (lines.length) parts.push("", lines.join("\n"));
      break;
    }
    case "timeline": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const steps = Array.isArray(slide.steps) ? slide.steps : [];
      const lines = steps
        .map((st) => {
          if (!st || typeof st !== "object") return null;
          const step = st as { title?: string; body?: string };
          if (!step.title) return null;
          return step.body ? `${step.title} — ${step.body}` : step.title;
        })
        .filter(Boolean) as string[];
      if (lines.length) parts.push("", numbered(lines));
      break;
    }
    case "data-table": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const columns = Array.isArray(slide.columns)
        ? (slide.columns as unknown[]).map(String)
        : [];
      const rows = Array.isArray(slide.rows) ? slide.rows : [];
      if (columns.length) {
        parts.push("");
        parts.push(`| ${columns.map(escCell).join(" | ")} |`);
        parts.push(`| ${columns.map(() => "---").join(" | ")} |`);
        for (const row of rows) {
          if (!Array.isArray(row)) continue;
          parts.push(`| ${row.map((c) => escCell(String(c))).join(" | ")} |`);
        }
      }
      break;
    }
    case "code": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const lang = typeof slide.language === "string" ? slide.language : "";
      const code = typeof slide.code === "string" ? slide.code : "";
      parts.push("", "```" + lang, code, "```");
      break;
    }
    case "chart": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const chartType = typeof slide.chartType === "string" ? slide.chartType : "bar";
      const categories = Array.isArray(slide.categories)
        ? (slide.categories as unknown[]).map(String)
        : [];
      const series = Array.isArray(slide.series) ? slide.series : [];
      const names = series.map((s, i) => {
        if (s && typeof s === "object" && typeof (s as { name?: string }).name === "string") {
          return (s as { name: string }).name;
        }
        return `Series ${i + 1}`;
      });
      const header = ["Category", ...names].join(",");
      const lines = [header];
      categories.forEach((cat, i) => {
        const vals = series.map((s) => {
          const values =
            s && typeof s === "object" && Array.isArray((s as { values?: number[] }).values)
              ? (s as { values: number[] }).values
              : [];
          return String(values[i] ?? 0);
        });
        lines.push([cat, ...vals].join(","));
      });
      parts.push("", "```chart " + chartType, ...lines, "```");
      break;
    }
    case "custom-html": {
      if (heading) parts.push(headingLine(2, heading));
      if (lead) parts.push("", lead);
      const html = typeof slide.html === "string" ? slide.html : "";
      parts.push("", "```html", html, "```");
      break;
    }
    case "closing": {
      parts.push(headingLine(2, heading ?? "Thanks"));
      if (lead) parts.push("", lead);
      const actions = Array.isArray(slide.actions) ? slide.actions : [];
      const labels = actions
        .map((a) => (a && typeof a === "object" ? (a as { label?: string }).label : undefined))
        .filter((l): l is string => !!l);
      if (labels.length) parts.push("", bullets(labels));
      else if (body) parts.push("", body);
      break;
    }
    case "two-column": {
      if (heading) parts.push(headingLine(2, heading));
      if (body) parts.push("", body);
      if (typeof slide.aside === "string" && slide.aside) parts.push("", slide.aside);
      else if (lead) parts.push("", lead);
      break;
    }
    case "comparison": {
      if (heading) parts.push(headingLine(2, heading));
      const leftLabel = typeof slide.leftLabel === "string" ? slide.leftLabel : "Left";
      const rightLabel = typeof slide.rightLabel === "string" ? slide.rightLabel : "Right";
      const left = typeof slide.left === "string" ? slide.left : "";
      const right = typeof slide.right === "string" ? slide.right : "";
      parts.push("", bullets([`${leftLabel} — ${left}`, `${rightLabel} — ${right}`]));
      break;
    }
    case "streak-grid": {
      if (heading) parts.push(headingLine(2, heading));
      const filled = typeof slide.filled === "number" ? slide.filled : undefined;
      const streakLead =
        lead ??
        (filled != null ? `${filled} days straight.` : "Habit grid.");
      parts.push("", streakLead);
      break;
    }
    case "metric-ring": {
      if (heading) parts.push(headingLine(2, heading));
      const value = typeof slide.value === "string" ? slide.value : undefined;
      const label = typeof slide.label === "string" ? slide.label : undefined;
      const line = [value, label].filter(Boolean).join(" ");
      if (line) parts.push("", line);
      if (lead) parts.push("", lead);
      if (body) parts.push("", body);
      break;
    }
    case "image-hero": {
      if (heading) parts.push(headingLine(1, heading));
      if (lead) parts.push("", lead);
      if (typeof slide.image === "string" && slide.image) {
        const alt = typeof slide.imageAlt === "string" ? slide.imageAlt : heading ?? "image";
        parts.push("", `![${alt}](${slide.image})`);
      }
      break;
    }
    default: {
      // Fallback: heading + lead/body so unknown layouts still round-trip text.
      const level = index === 0 ? 1 : 2;
      parts.push(headingLine(level as 1 | 2, heading ?? `Slide ${index + 1}`));
      if (lead) parts.push("", lead);
      if (body) parts.push("", body);
      if (typeof slide.quote === "string") parts.push("", `> ${slide.quote}`);
      break;
    }
  }

  pushNotes();
  return parts.join("\n").trim();
}

/** Serialize Deck JSON to Marp/md-slides Markdown for round-trip export. */
export function deckToMarkdown(
  deck: MdDeck | { type?: string; meta?: MdDeck["meta"]; slides: MdSlide[] },
  opts: DeckToMarkdownOptions = {}
): string {
  const frontMatter = opts.frontMatter !== false;
  const meta = deck.meta ?? {};
  const slides = Array.isArray(deck.slides) ? deck.slides : [];
  const bodies = slides.map((s, i) => slideToMarkdown(s, i));
  const body = bodies.join("\n\n---\n\n");

  if (!frontMatter) return body + "\n";

  const fm: string[] = ["---"];
  if (meta.title) fm.push(`title: ${meta.title}`);
  if (meta.theme) fm.push(`theme: ${meta.theme}`);
  if (meta.company) fm.push(`company: ${meta.company}`);
  if (meta.description) fm.push(`description: ${meta.description}`);
  fm.push("---", "");
  return fm.join("\n") + body + "\n";
}
