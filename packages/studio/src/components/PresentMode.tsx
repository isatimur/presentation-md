import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { restyleSlideHtml } from "./DeckRestylePreview.js";
import { SlideFilmstrip } from "./SlideFilmstrip.js";
import { prepareSandboxedPreviewHtml } from "../render/sandboxPreview.js";
import { useI18n, type MessageKey } from "../i18n/index.js";

// Injected into the deck so each slide fills the viewport and pages cleanly.
const PRESENT_CSS = `
html { scroll-behavior: smooth; scroll-snap-type: y mandatory; }
body { gap: 0 !important; padding: 0 !important; }
.slide { min-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; scroll-snap-align: start !important; scroll-snap-stop: always !important; }
.pmd-attribution { display: none !important; }
`;

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(Math.abs(ms) / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Minutes presets for Present pace countdown (0 = elapsed-only). */
const PACE_PRESETS_MIN = [0, 5, 10, 15, 20, 30] as const;

type PaceStatus = "off" | "ahead" | "on-pace" | "behind" | "over";

function paceStatus(
  elapsedMs: number,
  targetMs: number,
  slideIndex: number,
  slideCount: number
): PaceStatus {
  if (targetMs <= 0) return "off";
  if (elapsedMs >= targetMs) return "over";
  if (slideCount <= 1) return "on-pace";
  const progress = slideIndex / (slideCount - 1);
  const expected = Math.min(1, elapsedMs / targetMs);
  const delta = progress - expected;
  if (delta > 0.1) return "ahead";
  if (delta < -0.1) return "behind";
  return "on-pace";
}

const SHORTCUTS: Array<{ keys: string; labelKey: MessageKey }> = [
  { keys: "← → Space", labelKey: "present.scPrevNext" },
  { keys: "1–9", labelKey: "present.scJump" },
  { keys: "Home / End", labelKey: "present.scFirstLast" },
  { keys: "G", labelKey: "present.scOverview" },
  { keys: "F", labelKey: "present.scFilmstrip" },
  { keys: "S", labelKey: "present.scNotes" },
  { keys: "L", labelKey: "present.scLaser" },
  { keys: "D", labelKey: "present.scInk" },
  { keys: "C", labelKey: "present.scClearInk" },
  { keys: "B", labelKey: "present.scBlackout" },
  { keys: "W", labelKey: "present.scWhiteout" },
  { keys: "T", labelKey: "present.scTimer" },
  { keys: "R", labelKey: "present.scResetTimer" },
  { keys: "P", labelKey: "present.scPace" },
  { keys: "O", labelKey: "present.scSpeakerWindow" },
  { keys: "?", labelKey: "present.scHelp" },
  { keys: "Esc", labelKey: "present.scClose" },
];

const LASER_TRAIL = 5;
const INK_COLOR = "#ef4444";
const INK_WIDTH = 3.5;

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
  const { t } = useI18n();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [i, setI] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [showStrip, setShowStrip] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [whiteout, setWhiteout] = useState(false);
  const [laser, setLaser] = useState(false);
  const [laserTrail, setLaserTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [ink, setInk] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [paceMinutes, setPaceMinutes] = useState(0);
  const startedAt = useRef(Date.now());
  const accumulated = useRef(0);
  const speakerWin = useRef<Window | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inkCanvasRef = useRef<HTMLCanvasElement>(null);
  const inkDrawing = useRef(false);
  const presentHtml = prepareSandboxedPreviewHtml(
    html.replace("</head>", `<style>${PRESENT_CSS}</style></head>`)
  );
  const currentNotes = (notes[i] ?? "").trim();
  const hasAnyNotes = notes.some((n) => (n ?? "").trim().length > 0);
  const nextIndex = i + 1 < slideCount ? i + 1 : null;
  const nextHeading =
    nextIndex != null
      ? (slideHeadings[nextIndex] ?? "").trim() || t("present.slideN", { n: nextIndex + 1 })
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
    setWhiteout(false);
    setShowOverview(false);
    setShowHelp(false);
    setI(Math.max(0, Math.min(slideCount - 1, index)));
  };

  const clearLaserTrail = () => setLaserTrail([]);

  const clearInk = () => {
    const canvas = inkCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const resetTimer = () => {
    accumulated.current = 0;
    startedAt.current = Date.now();
    setElapsedMs(0);
    setTimerRunning(true);
  };

  const cyclePace = () => {
    setPaceMinutes((prev) => {
      const idx = PACE_PRESETS_MIN.findIndex((m) => m === prev);
      const nextIdx = (idx < 0 ? 0 : idx + 1) % PACE_PRESETS_MIN.length;
      return PACE_PRESETS_MIN[nextIdx] ?? 0;
    });
  };

  const targetMs = paceMinutes > 0 ? paceMinutes * 60 * 1000 : 0;
  const status = paceStatus(elapsedMs, targetMs, i, slideCount);
  const remainingMs = targetMs > 0 ? targetMs - elapsedMs : 0;
  const timerLabel = (() => {
    const elapsed = formatElapsed(elapsedMs);
    const paused = timerRunning ? "" : t("present.pausedSuffix");
    if (targetMs <= 0) return `${elapsed}${paused}`;
    if (status === "over") return t("present.timerOver", { elapsed, paused });
    const left = formatElapsed(remainingMs);
    const key: MessageKey =
      status === "ahead"
        ? "present.timerAhead"
        : status === "behind"
          ? "present.timerBehind"
          : "present.timerOnPace";
    return t(key, { elapsed, left, paused });
  })();
  const timerTitle =
    targetMs > 0
      ? t("present.timerTitlePace", { minutes: paceMinutes })
      : t("present.timerTitleElapsed");

  const paintSpeakerWindow = () => {
    const w = speakerWin.current;
    if (!w || w.closed) return;
    const heading = (slideHeadings[i] ?? "").trim() || t("present.slideN", { n: i + 1 });
    const next =
      nextIndex != null
        ? (slideHeadings[nextIndex] ?? "").trim() || t("present.slideN", { n: nextIndex + 1 })
        : t("present.speakerEnd");
    const notesText =
      currentNotes ||
      (hasAnyNotes ? t("present.noNotesSlide") : t("present.noNotesDeck"));
    const doc = w.document;
    doc.title = t("present.speakerTitle", { n: i + 1, total: slideCount });
    if (!doc.getElementById("pmd-speaker-root")) {
      doc.head.innerHTML = `<style>
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 20px 22px 28px;
          font: 15px/1.45 "DM Sans", "Avenir Next", system-ui, sans-serif;
          background: #0b1220; color: #e8eef4; min-height: 100vh;
        }
        .meta { display: flex; gap: 12px; flex-wrap: wrap; align-items: baseline;
          font: 600 12px/1.2 ui-monospace, Menlo, monospace; color: #9ca3af;
          letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 14px; }
        .timer { color: #e8eef4; font-variant-numeric: tabular-nums; }
        .timer.is-paused { color: #f59e0b; }
        .timer.is-ahead { color: #2dd4bf; }
        .timer.is-behind { color: #fb7185; }
        .timer.is-over { color: #f87171; }
        h1 { margin: 0 0 18px; font: 800 28px/1.15 Syne, "Avenir Next", sans-serif;
          letter-spacing: -0.03em; }
        .label { font: 600 11px/1 ui-monospace, Menlo, monospace; letter-spacing: 0.12em;
          text-transform: uppercase; color: #6b7280; margin: 0 0 8px; }
        .notes { white-space: pre-wrap; font-size: 18px; line-height: 1.5;
          color: #e8eef4; margin: 0 0 28px; min-height: 4.5em; }
        .notes.is-empty { color: #6b7280; font-style: italic; }
        .next { padding-top: 16px; border-top: 1px solid rgba(232,238,244,0.12); }
        .next p { margin: 0; font-size: 15px; color: #9ca3af; }
        .hint { margin-top: 28px; font: 500 11px/1.4 ui-monospace, Menlo, monospace;
          color: #5b6575; }
      </style>`;
      doc.body.innerHTML = `<div id="pmd-speaker-root">
        <div class="meta"><span data-count></span><span class="timer" data-timer></span></div>
        <h1 data-heading></h1>
        <div class="label" data-label-notes></div>
        <p class="notes" data-notes></p>
        <div class="next"><div class="label" data-label-next></div><p data-next></p></div>
        <p class="hint" data-hint></p>
      </div>`;
    }
    const root = doc.getElementById("pmd-speaker-root");
    if (!root) return;
    const setText = (sel: string, text: string) => {
      const el = root.querySelector(sel);
      if (el) el.textContent = text;
    };
    setText("[data-label-notes]", t("present.speakerNotes"));
    setText("[data-label-next]", t("present.upNext"));
    setText("[data-hint]", t("present.speakerHint"));
    setText("[data-count]", `${i + 1} / ${slideCount}`);
    const timerEl = root.querySelector("[data-timer]");
    if (timerEl) {
      timerEl.textContent = timerLabel;
      timerEl.className = `timer${timerRunning ? "" : " is-paused"}${
        status === "ahead"
          ? " is-ahead"
          : status === "behind"
            ? " is-behind"
            : status === "over"
              ? " is-over"
              : ""
      }`;
    }
    setText("[data-heading]", heading);
    const notesEl = root.querySelector("[data-notes]");
    if (notesEl) {
      notesEl.textContent = notesText;
      notesEl.classList.toggle("is-empty", !currentNotes);
    }
    setText("[data-next]", next);
  };

  const openSpeakerView = () => {
    if (speakerWin.current && !speakerWin.current.closed) {
      speakerWin.current.focus();
      paintSpeakerWindow();
      return;
    }
    const w = window.open(
      "",
      "pmd-speaker-view",
      "popup=yes,width=520,height=760"
    );
    if (!w) return;
    speakerWin.current = w;
    paintSpeakerWindow();
  };

  const syncInkCanvas = () => {
    const stage = stageRef.current;
    const canvas = inkCanvasRef.current;
    if (!stage || !canvas) return;
    const rect = stage.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const nextW = Math.max(1, Math.floor(rect.width * dpr));
    const nextH = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== nextW || canvas.height !== nextH) {
      canvas.width = nextW;
      canvas.height = nextH;
    }
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const inkPoint = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = inkCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onInkPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!ink || blackout || whiteout || showOverview || showHelp) return;
    e.preventDefault();
    const canvas = inkCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const pt = inkPoint(e);
    if (!canvas || !ctx || !pt) return;
    inkDrawing.current = true;
    canvas.setPointerCapture(e.pointerId);
    ctx.strokeStyle = INK_COLOR;
    ctx.lineWidth = INK_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
  };

  const onInkPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!inkDrawing.current) return;
    const ctx = inkCanvasRef.current?.getContext("2d");
    const pt = inkPoint(e);
    if (!ctx || !pt) return;
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
  };

  const onInkPointerUp = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!inkDrawing.current) return;
    inkDrawing.current = false;
    try {
      inkCanvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onStagePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!laser || blackout || whiteout || showOverview || showHelp) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setLaserTrail((prev) => {
      const next = [...prev, point];
      return next.length > LASER_TRAIL ? next.slice(next.length - LASER_TRAIL) : next;
    });
  };

  const onStagePointerLeave = () => {
    if (laser) clearLaserTrail();
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
      // Escape must win even if a closing command-palette capture handler marked
      // the event defaultPrevented — otherwise Present can get stuck open.
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
        if (whiteout) {
          setWhiteout(false);
          return;
        }
        if (laser) {
          setLaser(false);
          setLaserTrail([]);
          return;
        }
        if (ink) {
          setInk(false);
          inkDrawing.current = false;
          return;
        }
        onClose();
        return;
      }
      if (e.defaultPrevented) return;
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShowHelp((v) => !v);
      } else if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setShowHelp(false);
        setBlackout(false);
        setWhiteout(false);
        setLaser(false);
        setLaserTrail([]);
        setInk(false);
        inkDrawing.current = false;
        setShowOverview((v) => !v);
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        setShowOverview(false);
        setShowHelp(false);
        setBlackout(false);
        setWhiteout(false);
        setInk(false);
        inkDrawing.current = false;
        setLaser((v) => {
          if (v) setLaserTrail([]);
          return !v;
        });
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        setShowOverview(false);
        setShowHelp(false);
        setBlackout(false);
        setWhiteout(false);
        setLaser(false);
        setLaserTrail([]);
        setInk((v) => {
          if (v) inkDrawing.current = false;
          return !v;
        });
      } else if ((e.key === "c" || e.key === "C") && ink) {
        e.preventDefault();
        clearInk();
      } else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        setShowOverview(false);
        setWhiteout(false);
        setLaser(false);
        setLaserTrail([]);
        setInk(false);
        inkDrawing.current = false;
        setBlackout((v) => !v);
      } else if (e.key === "w" || e.key === "W") {
        e.preventDefault();
        setShowOverview(false);
        setBlackout(false);
        setLaser(false);
        setLaserTrail([]);
        setInk(false);
        inkDrawing.current = false;
        setWhiteout((v) => !v);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        resetTimer();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        cyclePace();
      } else if (e.key === "o" || e.key === "O") {
        e.preventDefault();
        openSpeakerView();
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
        setWhiteout(false);
        setI((p) => Math.min(slideCount - 1, p + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (showOverview || showHelp) return;
        e.preventDefault();
        setBlackout(false);
        setWhiteout(false);
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
  }, [onClose, slideCount, blackout, whiteout, laser, ink, timerRunning, showOverview, showHelp, paceMinutes]);

  useEffect(() => {
    paintSpeakerWindow();
  }, [i, elapsedMs, timerRunning, paceMinutes, timerLabel, currentNotes, slideHeadings, slideCount, nextIndex, status]);

  useEffect(() => {
    return () => {
      if (speakerWin.current && !speakerWin.current.closed) {
        speakerWin.current.close();
      }
      speakerWin.current = null;
    };
  }, []);

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

  useEffect(() => {
    clearInk();
    inkDrawing.current = false;
  }, [i]);

  useEffect(() => {
    syncInkCanvas();
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => syncInkCanvas());
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="present-overlay">
      <div className="present-main">
        <div
          ref={stageRef}
          className={`present-stage${laser ? " present-stage-laser" : ""}${ink ? " present-stage-ink" : ""}`}
        >
          <iframe
            ref={frameRef}
            className="present-frame"
            title={t("present.frameTitle")}
            srcDoc={presentHtml}
            sandbox="allow-same-origin"
          />
          <canvas
            ref={inkCanvasRef}
            className={`present-ink-canvas${ink && !blackout && !whiteout && !showOverview && !showHelp ? " is-active" : ""}`}
            aria-hidden
            onPointerDown={onInkPointerDown}
            onPointerMove={onInkPointerMove}
            onPointerUp={onInkPointerUp}
            onPointerCancel={onInkPointerUp}
          />
          {laser && !blackout && !whiteout && !showOverview && !showHelp ? (
            <div
              className="present-laser-layer"
              aria-hidden
              onPointerMove={onStagePointerMove}
              onPointerLeave={onStagePointerLeave}
            >
              {laserTrail.map((p, idx) => {
                const t = (idx + 1) / laserTrail.length;
                const isTip = idx === laserTrail.length - 1;
                return (
                  <span
                    key={idx}
                    className={`present-laser-dot${isTip ? " is-tip" : ""}`}
                    style={{
                      left: p.x,
                      top: p.y,
                      opacity: 0.25 + t * 0.75,
                      transform: `translate(-50%, -50%) scale(${0.45 + t * 0.55})`,
                    }}
                  />
                );
              })}
            </div>
          ) : null}
          {blackout ? (
            <div
              className="present-blackout"
              role="status"
              aria-live="polite"
              onClick={() => setBlackout(false)}
              title={t("present.blackoutTitle")}
            >
              <span className="present-blackout-hint">{t("present.blackoutHint")}</span>
            </div>
          ) : null}
          {whiteout ? (
            <div
              className="present-whiteout"
              role="status"
              aria-live="polite"
              onClick={() => setWhiteout(false)}
              title={t("present.whiteoutTitle")}
            >
              <span className="present-whiteout-hint">{t("present.whiteoutHint")}</span>
            </div>
          ) : null}
          {showOverview ? (
            <div className="present-overview" role="dialog" aria-label={t("present.overviewLabel")}>
              <div className="present-overview-head">
                <span>{t("present.overviewHead")}</span>
                <button type="button" className="btn btn-sm" onClick={() => setShowOverview(false)}>
                  {t("present.close")}
                </button>
              </div>
              <div className="present-overview-grid">
                {overviewThumbs.map((srcDoc, idx) => {
                  const heading =
                    (slideHeadings[idx] ?? "").trim() || t("present.slideN", { n: idx + 1 });
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`present-overview-card${idx === i ? " is-active" : ""}`}
                      onClick={() => jumpTo(idx)}
                      aria-label={t("present.goToSlide", { n: idx + 1, heading })}
                      aria-current={idx === i ? "true" : undefined}
                    >
                      <div className="present-overview-frame-wrap">
                        {srcDoc ? (
                          <iframe
                            className="present-overview-frame"
                            title={t("present.overviewSlide", { n: idx + 1 })}
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
            <div className="present-help" role="dialog" aria-label={t("present.helpLabel")}>
              <div className="present-help-card">
                <div className="present-overview-head">
                  <span>{t("present.helpTitle")}</span>
                  <button type="button" className="btn btn-sm" onClick={() => setShowHelp(false)}>
                    {t("present.close")}
                  </button>
                </div>
                <ul className="present-help-list">
                  {SHORTCUTS.map((row) => (
                    <li key={row.keys}>
                      <kbd>{row.keys}</kbd>
                      <span>{t(row.labelKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
        {showNotes && (
          <aside className="present-rail" aria-label={t("present.railLabel")}>
            <div className="present-notes">
              <div className="present-notes-label">{t("present.notesLabel")}</div>
              {currentNotes ? (
                <p className="present-notes-body">{currentNotes}</p>
              ) : (
                <p className="present-notes-empty">
                  {hasAnyNotes
                    ? t("present.noNotesSlide")
                    : t("present.noNotesYet")}
                </p>
              )}
            </div>
            {nextIndex != null && nextPeekHtml ? (
              <div className="present-next" aria-label={t("present.upNextAria", { heading: nextHeading ?? "" })}>
                <div className="present-notes-label">{t("present.upNextHead", { heading: nextHeading ?? "" })}</div>
                <div className="present-next-frame-wrap">
                  <iframe
                    className="present-next-frame"
                    title={t("present.nextSlide", { n: nextIndex + 1 })}
                    srcDoc={nextPeekHtml}
                    sandbox="allow-same-origin"
                    tabIndex={-1}
                  />
                </div>
              </div>
            ) : (
              <div className="present-next present-next-end">
                <div className="present-notes-label">{t("present.upNext")}</div>
                <p className="present-notes-empty">{t("present.lastSlide")}</p>
              </div>
            )}
          </aside>
        )}
      </div>
      {showStrip && slideCount > 1 ? (
        <div className="present-filmstrip" aria-label={t("present.filmstripPeek")}>
          <SlideFilmstrip html={html} count={slideCount} selected={i} onSelect={setI} />
        </div>
      ) : null}
      <div className="present-bar">
        <button className="btn btn-icon" title={t("present.prev")} onClick={() => go(-1)}>←</button>
        <span className="present-count">{i + 1} / {slideCount}</span>
        <button className="btn btn-icon" title={t("present.next")} onClick={() => go(1)}>→</button>
        <span
          className={`present-timer${timerRunning ? "" : " present-timer-paused"}${
            status === "ahead"
              ? " present-timer-ahead"
              : status === "behind"
                ? " present-timer-behind"
                : status === "over"
                  ? " present-timer-over"
                  : ""
          }`}
          title={timerTitle}
          onDoubleClick={resetTimer}
        >
          {timerLabel}
        </span>
        <button
          className="btn"
          title={t("present.speakerWindowTitle")}
          onClick={openSpeakerView}
        >
          {t("present.speakerButton")}
        </button>
        <button
          className="btn"
          title={t("present.toggleNotesTitle")}
          onClick={() => setShowNotes((v) => !v)}
        >
          {showNotes ? t("present.hideNotes") : t("present.showNotes")}
        </button>
        {slideCount > 1 ? (
          <button
            className="btn"
            title={t("present.toggleStripTitle")}
            onClick={() => setShowStrip((v) => !v)}
          >
            {showStrip ? t("present.hideStrip") : t("present.showStrip")}
          </button>
        ) : null}
        {slideCount > 1 ? (
          <button
            className="btn"
            title={t("present.overviewTitle")}
            onClick={() => {
              setBlackout(false);
              setWhiteout(false);
              setLaser(false);
              clearLaserTrail();
              setInk(false);
              inkDrawing.current = false;
              setShowHelp(false);
              setShowOverview((v) => !v);
            }}
          >
            {showOverview ? t("present.closeGrid") : t("present.overview")}
          </button>
        ) : null}
        <button
          className="btn"
          title={t("present.laserTitle")}
          onClick={() => {
            setShowOverview(false);
            setShowHelp(false);
            setBlackout(false);
            setWhiteout(false);
            setInk(false);
            inkDrawing.current = false;
            setLaser((v) => {
              if (v) clearLaserTrail();
              return !v;
            });
          }}
        >
          {laser ? t("present.laserOff") : t("present.laser")}
        </button>
        <button
          className="btn"
          title={t("present.inkTitle")}
          onClick={() => {
            setShowOverview(false);
            setShowHelp(false);
            setBlackout(false);
            setWhiteout(false);
            setLaser(false);
            clearLaserTrail();
            setInk((v) => {
              if (v) inkDrawing.current = false;
              return !v;
            });
          }}
        >
          {ink ? t("present.inkOff") : t("present.ink")}
        </button>
        {ink ? (
          <button className="btn" title={t("present.clearInkTitle")} onClick={clearInk}>
            {t("present.clearInk")}
          </button>
        ) : null}
        <button
          className="btn"
          title={t("present.blackoutButtonTitle")}
          onClick={() => {
            setWhiteout(false);
            setLaser(false);
            clearLaserTrail();
            setInk(false);
            inkDrawing.current = false;
            setBlackout((v) => !v);
          }}
        >
          {blackout ? t("present.restoreB") : t("present.blackout")}
        </button>
        <button
          className="btn"
          title={t("present.whiteoutButtonTitle")}
          onClick={() => {
            setBlackout(false);
            setLaser(false);
            clearLaserTrail();
            setInk(false);
            inkDrawing.current = false;
            setWhiteout((v) => !v);
          }}
        >
          {whiteout ? t("present.restoreW") : t("present.whiteout")}
        </button>
        <button
          className="btn"
          title={t("present.shortcutsTitle")}
          onClick={() => setShowHelp((v) => !v)}
        >
          {t("present.help")}
        </button>
        <button className="btn" onClick={onClose}>{t("present.exit")}</button>
      </div>
    </div>
  );
}
