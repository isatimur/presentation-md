import { useEffect, useMemo, useRef } from "react";
import { prepareSandboxedPreviewHtml } from "../render/sandboxPreview.js";

const SLIDE_W = 1280;
const SLIDE_H = 720;
/** Visible thumb height — width follows 16:9. */
export const FILMSTRIP_THUMB_H = 64;

/**
 * Relayout the live deck HTML into a single horizontal strip so one iframe
 * can power every filmstrip thumb (N iframes → 1).
 */
export function densifyFilmstripHtml(deckHtml: string): string {
  const css = `
html, body {
  margin: 0 !important; padding: 0 !important; gap: 0 !important;
  background: transparent !important; overflow: hidden !important;
  width: max-content !important; height: ${SLIDE_H}px !important;
}
main.deck, .deck, body > main {
  display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important;
  gap: 0 !important; padding: 0 !important; margin: 0 !important;
  width: max-content !important; height: ${SLIDE_H}px !important;
  background: transparent !important;
}
section.slide, .slide {
  display: flex !important;
  flex: 0 0 ${SLIDE_W}px !important;
  width: ${SLIDE_W}px !important; min-width: ${SLIDE_W}px !important;
  max-width: ${SLIDE_W}px !important;
  height: ${SLIDE_H}px !important; min-height: ${SLIDE_H}px !important;
  margin: 0 !important; border-radius: 0 !important; box-shadow: none !important;
}
.nav-hint, .pmd-attribution { display: none !important; }
`;
  if (deckHtml.includes("</head>")) {
    return deckHtml.replace("</head>", `<style data-pmd-filmstrip>${css}</style></head>`);
  }
  return `<style data-pmd-filmstrip>${css}</style>${deckHtml}`;
}

/**
 * Horizontal Keynote-style filmstrip under the preview — one scaled iframe for
 * all slides, with hit targets for selection (beats per-row lazy iframes).
 */
export function SlideFilmstrip({
  html,
  count,
  selected,
  onSelect,
}: {
  html: string;
  count: number;
  selected: number;
  onSelect: (index: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const srcDoc = useMemo(() => {
    if (!html || count < 1) return null;
    try {
      return prepareSandboxedPreviewHtml(densifyFilmstripHtml(html));
    } catch {
      return null;
    }
  }, [html, count]);

  const scale = FILMSTRIP_THUMB_H / SLIDE_H;
  const thumbW = SLIDE_W * scale;
  const trackW = Math.max(1, count) * thumbW;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const hit = scroller.querySelector<HTMLElement>(`[data-filmstrip-i="${selected}"]`);
    hit?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [selected, count]);

  if (!srcDoc || count < 1) return null;

  return (
    <div
      ref={scrollerRef}
      className="slide-filmstrip"
      role="listbox"
      aria-label="Slide filmstrip"
      aria-orientation="horizontal"
    >
      <div
        className="slide-filmstrip-track"
        style={{
          width: trackW,
          height: FILMSTRIP_THUMB_H,
          ["--filmstrip-scale" as string]: String(scale),
          ["--filmstrip-count" as string]: String(count),
        }}
      >
        <iframe
          className="slide-filmstrip-frame"
          title="Deck filmstrip"
          srcDoc={srcDoc}
          sandbox="allow-same-origin"
          referrerPolicy="no-referrer"
          tabIndex={-1}
          aria-hidden
        />
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="option"
            aria-selected={i === selected}
            aria-label={`Slide ${i + 1}`}
            data-filmstrip-i={i}
            tabIndex={i === selected ? 0 : -1}
            className={`slide-filmstrip-hit${i === selected ? " is-active" : ""}`}
            style={{ left: i * thumbW, width: thumbW, height: FILMSTRIP_THUMB_H }}
            onClick={() => onSelect(i)}
            onKeyDown={(event) => {
              let next: number | null = null;
              if (event.key === "ArrowLeft") next = Math.max(0, i - 1);
              else if (event.key === "ArrowRight") next = Math.min(count - 1, i + 1);
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = count - 1;
              if (next == null) return;

              event.preventDefault();
              onSelect(next);
              window.requestAnimationFrame(() => {
                scrollerRef.current
                  ?.querySelector<HTMLElement>(`[data-filmstrip-i="${next}"]`)
                  ?.focus();
              });
            }}
          >
            <span className="slide-filmstrip-num">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
