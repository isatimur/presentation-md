import { useState } from "react";
import type { Slide } from "@presentation-md/export";
import { LAYOUTS, LAYOUT_LABELS, blankSlide } from "../deck.js";
import type { LayoutType } from "../deck.js";

export function SlideList({
  slides,
  selected,
  onSelect,
  onChange,
}: {
  slides: Slide[];
  selected: number;
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
        <select
          className="text-input"
          aria-label="New slide layout"
          value={addLayout}
          onChange={(e) => setAddLayout(e.target.value as LayoutType)}
        >
          {LAYOUTS.map((l) => (
            <option key={l} value={l}>
              {LAYOUT_LABELS[l]}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn-sm" onClick={add}>
          + Add slide
        </button>
      </div>
      <ul className="slides" aria-label="Slide list">
        {slides.map((slide, i) => {
          const title = slide.heading ?? slide.quote ?? slide.eyebrow ?? "Untitled";
          return (
            <li key={i} className={`slide-row ${i === selected ? "active" : ""}`}>
              <button
                type="button"
                className="slide-row-main"
                aria-label={`Select slide ${i + 1}: ${title}`}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => onSelect(i)}
              >
                <span className="slide-row-num">{i + 1}</span>
                <span className="slide-row-text">
                  <span className="slide-row-layout">
                    {LAYOUT_LABELS[slide.layout as LayoutType] ?? slide.layout}
                    {(slide.notes ?? "").trim() ? (
                      <span
                        className="notes-dot"
                        title="Has speaker notes"
                        aria-label="Has speaker notes"
                      >
                        N
                      </span>
                    ) : null}
                  </span>
                  <span className="slide-row-title">{title}</span>
                </span>
              </button>
              <div className="slide-row-actions">
                <button
                  type="button"
                  className="btn btn-icon"
                  aria-label={`Move slide ${i + 1} up`}
                  title="Move up"
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn btn-icon"
                  aria-label={`Move slide ${i + 1} down`}
                  title="Move down"
                  disabled={i === slides.length - 1}
                  onClick={() => move(i, 1)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="btn btn-icon"
                  aria-label={`Duplicate slide ${i + 1}`}
                  title="Duplicate"
                  onClick={() => duplicate(i)}
                >
                  ⧉
                </button>
                <button
                  type="button"
                  className="btn btn-icon btn-danger"
                  aria-label={`Delete slide ${i + 1}`}
                  title="Delete"
                  disabled={slides.length <= 1}
                  onClick={() => remove(i)}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
