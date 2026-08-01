/**
 * Speaker-notes handouts — plain text + WebVTT for Studio downloads and MCP export_deck.
 */

export type NotesHandoutSlide = {
  heading?: string;
  quote?: string;
  eyebrow?: string;
  notes?: string;
};

export type NotesHandoutDeck = {
  meta?: { title?: string };
  slides: NotesHandoutSlide[];
};

function slideTitle(slide: NotesHandoutSlide, index: number): string {
  return (slide.heading ?? slide.quote ?? slide.eyebrow ?? `Slide ${index + 1}`).trim();
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Format seconds as WebVTT timestamp (HH:MM:SS.mmm). */
export function formatVttTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${pad2(h)}:${pad2(m)}:${pad2(sec)}.000`;
}

/** Speaker-notes handout — plain text for print / async review. */
export function notesHandoutTxt(deck: NotesHandoutDeck): string {
  const title = deck.meta?.title?.trim() || "Deck";
  const blocks = deck.slides.map((slide, i) => {
    const heading = slideTitle(slide, i);
    const notes = (slide.notes ?? "").trim() || "(no speaker notes)";
    return `--- Slide ${i + 1}: ${heading} ---\n${notes}`;
  });
  return `${title} — speaker notes\n\n${blocks.join("\n\n")}\n`;
}

/**
 * WebVTT chapter-style cues — one cue per slide (30s placeholder span) for
 * handout / caption pipelines that consume VTT beside Present mode notes.
 */
export function notesHandoutVtt(deck: NotesHandoutDeck, cueSecs = 30): string {
  const span = Math.max(1, Math.floor(cueSecs));
  const cues = deck.slides.map((slide, i) => {
    const start = formatVttTime(i * span);
    const end = formatVttTime((i + 1) * span);
    const heading = slideTitle(slide, i);
    const notes = (slide.notes ?? "").trim() || heading;
    const body = notes
      .split(/\r?\n/)
      .map((line) => line.trimEnd())
      .join("\n");
    return `${i + 1}\n${start} --> ${end}\n${heading}\n${body}`;
  });
  return `WEBVTT\n\n${cues.join("\n\n")}\n`;
}
