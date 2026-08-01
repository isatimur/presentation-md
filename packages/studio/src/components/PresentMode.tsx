import { useEffect, useRef, useState } from "react";

// Injected into the deck so each slide fills the viewport and pages cleanly.
const PRESENT_CSS = `
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;

export function PresentMode({
  html,
  slideCount,
  notes = [],
  onClose,
}: {
  html: string;
  slideCount: number;
  /** Per-slide speaker notes (index-aligned). Not baked into HTML slides. */
  notes?: Array<string | undefined>;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [i, setI] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const presentHtml = html.replace("</head>", `<style>${PRESENT_CSS}</style></head>`);
  const currentNotes = (notes[i] ?? "").trim();
  const hasAnyNotes = notes.some((n) => (n ?? "").trim().length > 0);

  const go = (n: number) => setI((p) => Math.max(0, Math.min(slideCount - 1, p + n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        setShowNotes((v) => !v);
      } else if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setI((p) => Math.min(slideCount - 1, p + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setI((p) => Math.max(0, p - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, slideCount]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const scrollToSlide = () => {
      const sections = frame.contentDocument?.querySelectorAll<HTMLElement>("section.slide");
      sections?.[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    frame.addEventListener("load", scrollToSlide);
    // First open can race srcDoc paint — load handler covers it; call anyway if ready.
    if (frame.contentDocument?.readyState === "complete") scrollToSlide();
    return () => frame.removeEventListener("load", scrollToSlide);
  }, [i, presentHtml]);

  return (
    <div className="present-overlay">
      <div className="present-main">
        <div className="present-stage">
          <iframe
            ref={frameRef}
            className="present-frame"
            title="Present deck"
            srcDoc={presentHtml}
            sandbox="allow-same-origin"
          />
        </div>
        {showNotes && (
          <aside className="present-notes" aria-label="Speaker notes">
            <div className="present-notes-label">Speaker notes · S to hide</div>
            {currentNotes ? (
              <p className="present-notes-body">{currentNotes}</p>
            ) : (
              <p className="present-notes-empty">
                {hasAnyNotes ? "No notes on this slide." : "No speaker notes yet — add them in the slide form (exports to PPTX)."}
              </p>
            )}
          </aside>
        )}
      </div>
      <div className="present-bar">
        <button className="btn btn-icon" title="Previous (←)" onClick={() => go(-1)}>←</button>
        <span className="present-count">{i + 1} / {slideCount}</span>
        <button className="btn btn-icon" title="Next (→)" onClick={() => go(1)}>→</button>
        <button
          className="btn"
          title="Toggle speaker notes (S)"
          onClick={() => setShowNotes((v) => !v)}
        >
          {showNotes ? "Hide notes · S" : "Notes · S"}
        </button>
        <button className="btn" onClick={onClose}>Exit · Esc</button>
      </div>
    </div>
  );
}
