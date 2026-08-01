import { useEffect, useMemo, useRef, useState } from "react";
import type { Slide } from "@presentation-md/export";
import { LAYOUTS, LAYOUT_LABELS, blankSlide } from "../deck.js";
import type { LayoutType } from "../deck.js";
import { restyleSlideHtml } from "./DeckRestylePreview.js";

/** Lazy-mounted scaled slide thumb — one iframe only when the row is near the viewport. */
function SlideThumb({
  html,
  index,
  label,
}: {
  html: string;
  index: number;
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const srcDoc = useMemo(() => {
    if (!visible || !html) return null;
    try {
      return restyleSlideHtml(html, index);
    } catch {
      return null;
    }
  }, [html, index, visible]);

  return (
    <div ref={wrapRef} className="slide-thumb" aria-hidden>
      {srcDoc ? (
        <iframe
          className="slide-thumb-frame"
          title={label}
          srcDoc={srcDoc}
          sandbox="allow-same-origin"
          referrerPolicy="no-referrer"
          tabIndex={-1}
        />
      ) : (
        <span className="slide-thumb-placeholder" />
      )}
    </div>
  );
}

export function SlideList({
  slides,
  selected,
  html,
  onSelect,
  onChange,
}: {
  slides: Slide[];
  selected: number;
  /** Live rendered deck HTML — filmstrip thumbs crop one slide each. */
  html?: string;
  onSelect: (i: number) => void;
  onChange: (next: Slide[], select?: number) => void;
}) {
  const [addLayout, setAddLayout] = useState<LayoutType>("title");

  const add = () => {
    const at = selected + 1;
    const next = [...slides.slice(0, at), blankSlide(addLayout), ...slides.slice(at)];
    onChange(next, at);
  };
  const duplicate = (i: number) => {
    const copy = JSON.parse(JSON.stringify(slides[i])) as Slide;
    onChange([...slides.slice(0, i + 1), copy, ...slides.slice(i + 1)], i + 1);
  };
  const remove = (i: number) => {
    if (slides.length <= 1) return;
    const next = slides.filter((_, idx) => idx !== i);
    onChange(next, Math.max(0, Math.min(i, next.length - 1)));
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= slides.length) return;
    const next = slides.slice();
    [next[i], next[j]] = [next[j]!, next[i]!];
    onChange(next, j);
  };

  return (
    <div className="slide-list">
      <div className="add-row">
        <select className="text-input" value={addLayout} onChange={(e) => setAddLayout(e.target.value as LayoutType)}>
          {LAYOUTS.map((l) => (
            <option key={l} value={l}>{LAYOUT_LABELS[l]}</option>
          ))}
        </select>
        <button className="btn btn-sm" onClick={add}>+ Add</button>
      </div>
      <ul className="slides" aria-label="Slide filmstrip">
        {slides.map((slide, i) => (
          <li key={i} className={`slide-row ${i === selected ? "active" : ""}`} onClick={() => onSelect(i)}>
            <div className="slide-row-main">
              <span className="slide-row-num">{i + 1}</span>
              {html ? (
                <SlideThumb
                  html={html}
                  index={i}
                  label={`Slide ${i + 1} thumbnail`}
                />
              ) : null}
              <div className="slide-row-text">
                <span className="slide-row-layout">
                  {LAYOUT_LABELS[slide.layout as LayoutType] ?? slide.layout}
                  {(slide.notes ?? "").trim() ? <span className="notes-dot" title="Has speaker notes" aria-label="Has speaker notes">N</span> : null}
                </span>
                <span className="slide-row-title">{slide.heading ?? slide.quote ?? slide.eyebrow ?? "—"}</span>
              </div>
            </div>
            <div className="slide-row-actions" onClick={(e) => e.stopPropagation()}>
              <button className="btn btn-icon" title="Move up" onClick={() => move(i, -1)}>↑</button>
              <button className="btn btn-icon" title="Move down" onClick={() => move(i, 1)}>↓</button>
              <button className="btn btn-icon" title="Duplicate" onClick={() => duplicate(i)}>⧉</button>
              <button className="btn btn-icon btn-danger" title="Delete" onClick={() => remove(i)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
