import { useEffect, useMemo, useRef, useState } from "react";
import { restyleSlideHtml } from "./DeckRestylePreview.js";
import { SlideFilmstrip } from "./SlideFilmstrip.js";
import { prepareSandboxedPreviewHtml } from "../render/sandboxPreview.js";

// Injected into the deck so each slide fills the viewport and pages cleanly.
const PRESENT_CSS = `
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SHORTCUTS: Array<{ keys: string; label: string }> = [
  { keys: "← → Space", label: "Previous / next slide" },
  { keys: "1–9", label: "Jump to slide" },
  { keys: "Home / End", label: "First / last slide" },
  { keys: "G", label: "Overview grid" },
  { keys: "F", label: "Filmstrip peek" },
  { keys: "S", label: "Speaker notes" },
  { keys: "B", label: "Blackout" },
  { keys: "T", label: "Pause / resume timer" },
  { keys: "?", label: "Shortcuts" },
  { keys: "Esc", label: "Close overlay / exit" },
];

export function PresentMode({
  html,
  slideCount,
  notes = [],
  slideHeadings = [],
  onClose,
}: {
  html: string;
  slideCount: number;
  /** Per-slide speaker notes (index-aligned). Not baked into HTML slides. */
  notes?: Array<string | undefined>;
  /** Short titles for the up-next peek. */
  slideHeadings?: Array<string | undefined>;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [i, setI] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [showStrip, setShowStrip] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const startedAt = useRef(Date.now());
  const accumulated = useRef(0);
  const presentHtml = prepareSandboxedPreviewHtml(
    html.replace("</head>", `<style>${PRESENT_CSS}</style></head>`)
  );
  const currentNotes = (notes[i] ?? "").trim();
  const hasAnyNotes = notes.some((n) => (n ?? "").trim().length > 0);
  const nextIndex = i + 1 < slideCount ? i + 1 : null;
  const nextHeading =
    nextIndex != null
      ? (slideHeadings[nextIndex] ?? "").trim() || `Slide ${nextIndex + 1}`
      : null;
  const nextPeekHtml = useMemo(() => {
    if (nextIndex == null) return null;
    try {
      return prepareSandboxedPreviewHtml(restyleSlideHtml(html, nextIndex));
    } catch {
      return null;
    }
  }, [html, nextIndex]);

  const overviewThumbs = useMemo(() => {
    if (!showOverview || slideCount < 1) return [];
    return Array.from({ length: slideCount }, (_, idx) => {
      try {
        return prepareSandboxedPreviewHtml(restyleSlideHtml(html, idx));
      } catch {
        return null;
      }
    });
  }, [html, slideCount, showOverview]);

  const go = (n: number) => setI((p) => Math.max(0, Math.min(slideCount - 1, p + n)));

  const jumpTo = (index: number) => {
    setBlackout(false);
    setShowOverview(false);
    setShowHelp(false);
    setI(Math.max(0, Math.min(slideCount - 1, index)));
  };

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setElapsedMs(accumulated.current + (Date.now() - startedAt.current));
    }, 500);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key === "Escape") {
        e.preventDefault();
        if (showHelp) {
          setShowHelp(false);
          return;
        }
        if (showOverview) {
          setShowOverview(false);
          return;
        }
        if (blackout) {
          setBlackout(false);
          return;
        }
        onClose();
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShowHelp((v) => !v);
      } else if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setShowHelp(false);
        setBlackout(false);
        setShowOverview((v) => !v);
      } else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        setShowOverview(false);
        setBlackout((v) => !v);
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        if (timerRunning) {
          accumulated.current += Date.now() - startedAt.current;
          setTimerRunning(false);
          setElapsedMs(accumulated.current);
        } else {
          startedAt.current = Date.now();
          setTimerRunning(true);
        }
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        setShowNotes((v) => !v);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        setShowStrip((v) => !v);
      } else if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (showOverview || showHelp) return;
        e.preventDefault();
        setBlackout(false);
        setI((p) => Math.min(slideCount - 1, p + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (showOverview || showHelp) return;
        e.preventDefault();
        setBlackout(false);
        setI((p) => Math.max(0, p - 1));
      } else if (/^[1-9]$/.test(e.key)) {
        if (showOverview || showHelp) return;
        e.preventDefault();
        const target = Number(e.key) - 1;
        if (target < slideCount) jumpTo(target);
      } else if (e.key === "Home") {
        if (showOverview || showHelp) return;
        e.preventDefault();
        jumpTo(0);
      } else if (e.key === "End") {
        if (showOverview || showHelp) return;
        e.preventDefault();
        jumpTo(slideCount - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, slideCount, blackout, timerRunning, showOverview, showHelp]);

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
          {blackout ? (
            <div
              className="present-blackout"
              role="status"
              aria-live="polite"
              onClick={() => setBlackout(false)}
              title="Click or press B to restore"
            >
              <span className="present-blackout-hint">Blackout · B or click to restore</span>
            </div>
          ) : null}
          {showOverview ? (
            <div className="present-overview" role="dialog" aria-label="Slide overview">
              <div className="present-overview-head">
                <span>Overview · G or Esc to close</span>
                <button type="button" className="btn btn-sm" onClick={() => setShowOverview(false)}>
                  Close
                </button>
              </div>
              <div className="present-overview-grid">
                {overviewThumbs.map((srcDoc, idx) => {
                  const heading =
                    (slideHeadings[idx] ?? "").trim() || `Slide ${idx + 1}`;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`present-overview-card${idx === i ? " is-active" : ""}`}
                      onClick={() => jumpTo(idx)}
                      aria-label={`Go to slide ${idx + 1}: ${heading}`}
                      aria-current={idx === i ? "true" : undefined}
                    >
                      <div className="present-overview-frame-wrap">
                        {srcDoc ? (
                          <iframe
                            className="present-overview-frame"
                            title={`Overview slide ${idx + 1}`}
                            srcDoc={srcDoc}
                            sandbox="allow-same-origin"
                            tabIndex={-1}
                            aria-hidden
                          />
                        ) : (
                          <div className="present-overview-fallback">{idx + 1}</div>
                        )}
                      </div>
                      <span className="present-overview-label">
                        <strong>{idx + 1}</strong> {heading}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          {showHelp ? (
            <div className="present-help" role="dialog" aria-label="Presenter shortcuts">
              <div className="present-help-card">
                <div className="present-overview-head">
                  <span>Shortcuts · ? or Esc</span>
                  <button type="button" className="btn btn-sm" onClick={() => setShowHelp(false)}>
                    Close
                  </button>
                </div>
                <ul className="present-help-list">
                  {SHORTCUTS.map((row) => (
                    <li key={row.keys}>
                      <kbd>{row.keys}</kbd>
                      <span>{row.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
        {showNotes && (
          <aside className="present-rail" aria-label="Presenter notes and next slide">
            <div className="present-notes">
              <div className="present-notes-label">Speaker notes · S to hide</div>
              {currentNotes ? (
                <p className="present-notes-body">{currentNotes}</p>
              ) : (
                <p className="present-notes-empty">
                  {hasAnyNotes
                    ? "No notes on this slide."
                    : "No speaker notes yet — add them in the slide form (exports to PPTX)."}
                </p>
              )}
            </div>
            {nextIndex != null && nextPeekHtml ? (
              <div className="present-next" aria-label={`Up next: ${nextHeading}`}>
                <div className="present-notes-label">Up next · {nextHeading}</div>
                <div className="present-next-frame-wrap">
                  <iframe
                    className="present-next-frame"
                    title={`Next slide ${nextIndex + 1}`}
                    srcDoc={nextPeekHtml}
                    sandbox="allow-same-origin"
                    tabIndex={-1}
                  />
                </div>
              </div>
            ) : (
              <div className="present-next present-next-end">
                <div className="present-notes-label">Up next</div>
                <p className="present-notes-empty">Last slide — wrap or take questions.</p>
              </div>
            )}
          </aside>
        )}
      </div>
      {showStrip && slideCount > 1 ? (
        <div className="present-filmstrip" aria-label="Slide filmstrip peek">
          <SlideFilmstrip html={html} count={slideCount} selected={i} onSelect={setI} />
        </div>
      ) : null}
      <div className="present-bar">
        <button className="btn btn-icon" title="Previous (←)" onClick={() => go(-1)}>←</button>
        <span className="present-count">{i + 1} / {slideCount}</span>
        <button className="btn btn-icon" title="Next (→)" onClick={() => go(1)}>→</button>
        <span
          className={`present-timer${timerRunning ? "" : " present-timer-paused"}`}
          title="Elapsed · T to pause/resume"
        >
          {formatElapsed(elapsedMs)}
          {timerRunning ? "" : " · paused"}
        </span>
        <button
          className="btn"
          title="Toggle speaker notes (S)"
          onClick={() => setShowNotes((v) => !v)}
        >
          {showNotes ? "Hide notes · S" : "Notes · S"}
        </button>
        {slideCount > 1 ? (
          <button
            className="btn"
            title="Toggle filmstrip peek (F)"
            onClick={() => setShowStrip((v) => !v)}
          >
            {showStrip ? "Hide strip · F" : "Strip · F"}
          </button>
        ) : null}
        {slideCount > 1 ? (
          <button
            className="btn"
            title="Overview grid (G)"
            onClick={() => {
              setBlackout(false);
              setShowHelp(false);
              setShowOverview((v) => !v);
            }}
          >
            {showOverview ? "Close grid · G" : "Overview · G"}
          </button>
        ) : null}
        <button
          className="btn"
          title="Blackout screen (B)"
          onClick={() => setBlackout((v) => !v)}
        >
          {blackout ? "Restore · B" : "Blackout · B"}
        </button>
        <button
          className="btn"
          title="Shortcuts (?)"
          onClick={() => setShowHelp((v) => !v)}
        >
          ? · Help
        </button>
        <button className="btn" onClick={onClose}>Exit · Esc</button>
      </div>
    </div>
  );
}
