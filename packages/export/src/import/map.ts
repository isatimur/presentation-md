import { mkdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { validateDeckJson } from "@presentation-md/core";
import type { DeckJson, Slide, Card, Stat, Step } from "../deck-types.js";
import type {
  ExtractedImage,
  ExtractedPresentation,
  ExtractedSlide,
  MapOptions,
} from "./types.js";

const SKIP_IMAGE_TYPES = /emf|wmf|x-emf|x-wmf/i;
const CTA_RE = /\b(thank|questions|contact|get in touch|book a|sign up|subscribe)\b/i;
const QUOTE_RE = /^[“"](.+)[”"]\s*[—–\-]\s*(.+)$/s;
const STEP_RE = /^(?:step\s*)?\d+[.):]\s+/i;
const STAT_RE = /^(.{1,12})\s*[\n:–\-]\s*(.{2,80})$/;

function bytesToDataUri(img: ExtractedImage): string {
  const b64 = Buffer.from(img.bytes).toString("base64");
  return `data:${img.contentType};base64,${b64}`;
}

/** Path relative to cwd (posix separators) so deck image refs match write location. */
function assetsRelativePath(assetsDir: string, fileName: string): string {
  const dest = join(assetsDir, fileName);
  const rel = relative(process.cwd(), dest).split(sep).join("/");
  return rel || fileName;
}

async function imageToRef(
  img: ExtractedImage,
  slideNumber: number,
  opts: MapOptions,
  warnings: string[]
): Promise<string | undefined> {
  if (SKIP_IMAGE_TYPES.test(img.contentType) || /\.(emf|wmf)$/i.test(img.name)) {
    warnings.push(`Skipped non-web image on slide ${slideNumber}: ${img.name}`);
    opts.onWarn?.(`Skipped non-web image on slide ${slideNumber}: ${img.name}`);
    return undefined;
  }
  if (opts.assetsDir) {
    await mkdir(opts.assetsDir, { recursive: true });
    const dest = join(opts.assetsDir, img.name);
    await writeFile(dest, img.bytes);
    return assetsRelativePath(opts.assetsDir, img.name);
  }
  return bytesToDataUri(img);
}

function looksLikeStats(texts: string[]): Stat[] | null {
  if (texts.length < 3) return null;
  const stats: Stat[] = [];
  for (const t of texts) {
    const m = t.match(STAT_RE);
    if (!m) return null;
    const a = m[1]!.trim();
    const b = m[2]!.trim();
    // Prefer shorter token as value
    if (a.length <= 12 && /[\d$%+]/.test(a)) stats.push({ value: a, label: b });
    else if (b.length <= 12 && /[\d$%+]/.test(b)) stats.push({ value: b, label: a });
    else return null;
  }
  return stats.length >= 3 ? stats : null;
}

function looksLikeCards(texts: string[]): Card[] | null {
  if (texts.length < 2) return null;

  // Exporter often emits title/body as alternating separate shapes.
  if (texts.length >= 4 && texts.length % 2 === 0) {
    const paired: Card[] = [];
    for (let i = 0; i < texts.length; i += 2) {
      paired.push({ title: texts[i]!, body: texts[i + 1] });
    }
    return paired;
  }

  const cards: Card[] = [];
  for (const t of texts) {
    const lines = t.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return null;
    cards.push({ title: lines[0]!, body: lines.slice(1).join(" ") || undefined });
  }
  return cards.length >= 2 ? cards : null;
}

function looksLikeSteps(texts: string[]): Step[] | null {
  if (texts.length < 2) return null;
  const numbered = texts.filter((t) => STEP_RE.test(t));
  if (numbered.length < 2) return null;
  return texts.map((t) => {
    const cleaned = t.replace(STEP_RE, "").trim();
    const lines = cleaned.split("\n");
    return { title: lines[0]!, body: lines.slice(1).join(" ") || undefined };
  });
}

function mapSlide(
  slide: ExtractedSlide,
  index: number,
  total: number,
  imageRef: string | undefined
): Slide {
  const heading = slide.title?.trim() || `Slide ${slide.number}`;
  const texts = slide.texts.map((t) => t.trim()).filter(Boolean);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (slide.tables.length >= 2) {
    const [header, ...rows] = slide.tables;
    return {
      layout: "data-table",
      heading,
      lead: texts[0],
      columns: header,
      rows,
    };
  }

  const quoteJoined = [heading, ...texts].join("\n");
  const quoteMatch = quoteJoined.match(QUOTE_RE);
  if (quoteMatch || (/^[“"]/.test(heading) && texts.length <= 2)) {
    if (quoteMatch) {
      return { layout: "quote", quote: quoteMatch[1]!.trim(), by: quoteMatch[2]!.trim() };
    }
    return {
      layout: "quote",
      quote: heading.replace(/^[“"]|[”"]$/g, ""),
      by: texts[0]?.replace(/^[—–\-]\s*/, ""),
    };
  }

  const stats = looksLikeStats(texts);
  if (stats) return { layout: "stat-row", heading, stats };

  const steps = looksLikeSteps(texts);
  if (steps) return { layout: "timeline", heading, steps };

  const cards = looksLikeCards(texts);
  if (cards && texts.length >= 2 && !imageRef) {
    return { layout: "feature-grid", heading, cards, columns: Math.min(4, cards.length) };
  }

  if (isLast && (CTA_RE.test(heading) || texts.some((t) => CTA_RE.test(t)))) {
    const url = texts.find((t) => /^https?:\/\//i.test(t));
    return {
      layout: "closing",
      heading,
      lead: texts.filter((t) => t !== url).join(" ") || undefined,
      cta: url ? { label: "Learn more", href: url } : undefined,
    };
  }

  if (isFirst && texts.length <= 1 && !slide.tables.length && !imageRef) {
    return { layout: "title", heading, lead: texts[0] };
  }

  if (!isFirst && texts.length === 0 && !imageRef && heading.length < 60) {
    return { layout: "section", heading, number: String(slide.number).padStart(2, "0") };
  }

  if (imageRef) {
    return {
      layout: "two-column",
      heading,
      lead: texts[0],
      body: texts.slice(1).join("\n") || undefined,
      image: imageRef,
      imageAlt: heading,
    };
  }

  return {
    layout: "two-column",
    heading,
    lead: texts[0],
    body: texts.slice(1).join("\n") || undefined,
  };
}

export async function mapExtractedToDeck(
  extracted: ExtractedPresentation,
  opts: MapOptions = {}
): Promise<{ deck: DeckJson; warnings: string[] }> {
  const warnings: string[] = [];
  const slides: Slide[] = [];

  for (let i = 0; i < extracted.slides.length; i++) {
    const slide = extracted.slides[i]!;
    let imageRef: string | undefined;
    if (slide.images[0]) {
      imageRef = await imageToRef(slide.images[0], slide.number, opts, warnings);
    }
    for (const extra of slide.images.slice(1)) {
      warnings.push(`Slide ${slide.number}: extra image ${extra.name} ignored (using first only)`);
      opts.onWarn?.(warnings[warnings.length - 1]!);
    }
    const mapped = mapSlide(slide, i, extracted.slides.length, imageRef);
    if (slide.notes?.trim()) {
      mapped.notes = slide.notes.trim();
    }
    slides.push(mapped);
  }

  const deck: DeckJson = {
    type: "deck",
    meta: {
      title: extracted.meta.title,
      company: extracted.meta.author,
      description: extracted.meta.subject,
      theme: opts.theme ?? "claude",
    },
    slides,
  };

  const validation = validateDeckJson(JSON.stringify(deck));
  if (!validation.valid) {
    throw new Error(`Mapped deck failed validation:\n${validation.errors.join("\n")}`);
  }

  return { deck, warnings };
}
