/**
 * Structural density remorph — non-LLM.
 * Speaker: split crowded list layouts + move overflow prose into notes.
 * Reading: merge thin consecutive list layouts + promote notes into body.
 * Does not invent long copy; agents still rewrite placeholders.
 */

export type DensityMode = "speaker" | "reading";

export interface RemorphDeck {
  type?: string;
  meta?: Record<string, unknown>;
  slides?: unknown;
}

export interface RemorphDensityResult {
  deck: RemorphDeck;
  changes: string[];
  density: DensityMode;
}

const SPEAKER_CAPS: Record<string, { field: string; max: number }> = {
  "feature-grid": { field: "cards", max: 3 },
  "ranked-list": { field: "items", max: 5 },
  timeline: { field: "steps", max: 4 },
  "logo-wall": { field: "cards", max: 6 },
  "data-table": { field: "rows", max: 5 },
};

const READING_MERGE_CAPS: Record<string, { field: string; max: number }> = {
  "feature-grid": { field: "cards", max: 6 },
  "ranked-list": { field: "items", max: 8 },
  timeline: { field: "steps", max: 6 },
  "logo-wall": { field: "cards", max: 12 },
};

const SPEAKER_BODY_CHARS = 220;
const SPEAKER_BODY_LINES = 3;
const READING_BODY_CHARS = 80;

function asSlides(deck: RemorphDeck): Array<Record<string, unknown>> {
  return Array.isArray(deck.slides)
    ? (deck.slides as Array<Record<string, unknown>>).map((s) => ({ ...s }))
    : [];
}

function cloneDeck(deck: RemorphDeck): RemorphDeck {
  return {
    ...deck,
    meta: deck.meta ? { ...deck.meta } : {},
    slides: asSlides(deck),
  };
}

function arrayField(slide: Record<string, unknown>, field: string): unknown[] | null {
  const v = slide[field];
  return Array.isArray(v) ? v : null;
}

function splitListSlide(
  slide: Record<string, unknown>,
  field: string,
  max: number,
  slideIndex1: number,
  changes: string[]
): Array<Record<string, unknown>> {
  const items = arrayField(slide, field);
  if (!items || items.length <= max) return [slide];

  const chunks: unknown[][] = [];
  for (let i = 0; i < items.length; i += max) {
    chunks.push(items.slice(i, i + max));
  }
  const heading = typeof slide.heading === "string" ? slide.heading : `Slide ${slideIndex1}`;
  changes.push(
    `Slide ${slideIndex1}: split ${String(slide.layout)} ${field} ${items.length} → ${chunks.length} slides (≤${max} each)`
  );
  return chunks.map((chunk, i) => {
    const next: Record<string, unknown> = { ...slide, [field]: chunk };
    if (i > 0) {
      next.heading = `${heading} (cont.)`;
      if (typeof next.eyebrow === "string" && next.eyebrow.trim()) {
        // keep eyebrow; cont. heading already signals continuation
      } else {
        next.eyebrow = "Continued";
      }
      // Avoid duplicating long lead/body on continuation slides.
      delete next.lead;
      delete next.body;
      delete next.notes;
    }
    return next;
  });
}

function trimBodyToNotes(
  slide: Record<string, unknown>,
  slideIndex1: number,
  changes: string[]
): void {
  const layout = slide.layout;
  if (layout === "title" || layout === "section" || layout === "closing" || layout === "quote") {
    return;
  }
  const body = typeof slide.body === "string" ? slide.body : "";
  if (!body.trim()) return;

  const lines = body.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const tooManyLines = lines.length > SPEAKER_BODY_LINES;
  const tooLong = body.trim().length > SPEAKER_BODY_CHARS;
  if (!tooManyLines && !tooLong) return;

  let keep: string;
  let overflow: string;
  if (tooManyLines) {
    keep = lines.slice(0, SPEAKER_BODY_LINES).join("\n");
    overflow = lines.slice(SPEAKER_BODY_LINES).join("\n");
  } else {
    // Prefer break at sentence / newline near the cap.
    const trimmed = body.trim();
    const cut = trimmed.lastIndexOf(". ", SPEAKER_BODY_CHARS);
    const at = cut > SPEAKER_BODY_CHARS * 0.5 ? cut + 1 : SPEAKER_BODY_CHARS;
    keep = trimmed.slice(0, at).trim();
    overflow = trimmed.slice(at).trim();
  }
  if (!overflow) return;

  const existingNotes = typeof slide.notes === "string" ? slide.notes.trim() : "";
  slide.body = keep;
  slide.notes = existingNotes ? `${existingNotes}\n\n${overflow}` : overflow;
  changes.push(`Slide ${slideIndex1}: moved overflow body into speaker notes (speaker density)`);
}

function remorphSpeaker(deck: RemorphDeck): RemorphDensityResult {
  const out = cloneDeck(deck);
  const changes: string[] = [];
  const slides = asSlides(out);
  const nextSlides: Array<Record<string, unknown>> = [];

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]!;
    const layout = typeof slide.layout === "string" ? slide.layout : "";
    // bento is intentional asymmetry — don't shred it.
    if (layout === "feature-grid" && slide.columns === "bento") {
      trimBodyToNotes(slide, i + 1, changes);
      nextSlides.push(slide);
      continue;
    }
    const cap = SPEAKER_CAPS[layout];
    if (cap) {
      const pieces = splitListSlide(slide, cap.field, cap.max, i + 1, changes);
      for (const p of pieces) {
        trimBodyToNotes(p, nextSlides.length + 1, changes);
        nextSlides.push(p);
      }
    } else {
      trimBodyToNotes(slide, i + 1, changes);
      nextSlides.push(slide);
    }
  }

  out.slides = nextSlides;
  const meta = (out.meta ?? {}) as Record<string, unknown>;
  meta.density = "speaker";
  out.meta = meta;
  changes.push("Locked meta.density = speaker");
  return { deck: out, changes, density: "speaker" };
}

function canMergeList(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): { field: string; max: number } | null {
  const layout = a.layout;
  if (typeof layout !== "string" || layout !== b.layout) return null;
  if (layout === "feature-grid" && (a.columns === "bento" || b.columns === "bento")) return null;
  const cap = READING_MERGE_CAPS[layout];
  if (!cap) return null;
  // Only merge continuation-style or thin siblings.
  const aHeading = typeof a.heading === "string" ? a.heading.replace(/\s*\(cont\.\)\s*$/i, "").trim() : "";
  const bHeading = typeof b.heading === "string" ? b.heading.replace(/\s*\(cont\.\)\s*$/i, "").trim() : "";
  const cont = /\(cont\.\)\s*$/i.test(String(b.heading ?? ""));
  const sameFamily = aHeading && bHeading && aHeading === bHeading;
  if (!cont && !sameFamily) return null;
  const aItems = arrayField(a, cap.field);
  const bItems = arrayField(b, cap.field);
  if (!aItems || !bItems) return null;
  if (aItems.length + bItems.length > cap.max) return null;
  // Prefer merging thin slides (each under half the reading cap).
  if (aItems.length > Math.ceil(cap.max / 2) && bItems.length > Math.ceil(cap.max / 2)) return null;
  return cap;
}

function promoteNotesToBody(
  slide: Record<string, unknown>,
  slideIndex1: number,
  changes: string[]
): void {
  const notes = typeof slide.notes === "string" ? slide.notes.trim() : "";
  if (!notes) return;
  const body = typeof slide.body === "string" ? slide.body.trim() : "";
  const lead = typeof slide.lead === "string" ? slide.lead.trim() : "";
  if (body.length >= READING_BODY_CHARS || lead.length >= READING_BODY_CHARS) return;
  // Don't dump notes onto title/closing chrome.
  const layout = slide.layout;
  if (layout === "title" || layout === "closing" || layout === "section" || layout === "image-hero") {
    return;
  }
  if (!body) {
    slide.body = notes;
  } else {
    slide.body = `${body}\n\n${notes}`;
  }
  delete slide.notes;
  changes.push(`Slide ${slideIndex1}: promoted speaker notes into body (reading density)`);
}

function remorphReading(deck: RemorphDeck): RemorphDensityResult {
  const out = cloneDeck(deck);
  const changes: string[] = [];
  let slides = asSlides(out);

  // Pass 1: merge thin consecutive list siblings / cont. slides.
  const merged: Array<Record<string, unknown>> = [];
  for (let i = 0; i < slides.length; i++) {
    const cur = slides[i]!;
    const prev = merged[merged.length - 1];
    if (prev) {
      const cap = canMergeList(prev, cur);
      if (cap) {
        const aItems = arrayField(prev, cap.field)!;
        const bItems = arrayField(cur, cap.field)!;
        prev[cap.field] = [...aItems, ...bItems];
        // Prefer the non-cont heading.
        if (/\(cont\.\)\s*$/i.test(String(prev.heading ?? "")) && typeof cur.heading === "string") {
          prev.heading = String(cur.heading).replace(/\s*\(cont\.\)\s*$/i, "").trim();
        } else if (typeof prev.heading === "string") {
          prev.heading = prev.heading.replace(/\s*\(cont\.\)\s*$/i, "").trim();
        }
        if (prev.eyebrow === "Continued") delete prev.eyebrow;
        changes.push(
          `Merged slides into denser ${String(prev.layout)} (${aItems.length}+${bItems.length} ${cap.field})`
        );
        continue;
      }
    }
    merged.push(cur);
  }
  slides = merged;

  // Pass 2: promote notes on thin body slides.
  for (let i = 0; i < slides.length; i++) {
    promoteNotesToBody(slides[i]!, i + 1, changes);
  }

  out.slides = slides;
  const meta = (out.meta ?? {}) as Record<string, unknown>;
  meta.density = "reading";
  out.meta = meta;
  changes.push("Locked meta.density = reading");
  return { deck: out, changes, density: "reading" };
}

/**
 * Remorph deck structure for speaker-led or reading-first density.
 * Idempotent enough for a second pass (caps + density lock).
 */
export function remorphDensity(deck: RemorphDeck, density: DensityMode): RemorphDensityResult {
  if (density === "reading") return remorphReading(deck);
  return remorphSpeaker(deck);
}
