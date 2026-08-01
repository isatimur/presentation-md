import { useEffect, useRef } from "react";

/** Selection chrome injected into the sandboxed preview (parent owns the DOM). */
const SELECT_CSS = `
section.slide { cursor: pointer; }
section.slide.pmd-studio-selected {
  outline: 3px solid #3b82f6;
  outline-offset: -3px;
}
`;

/**
 * Live deck preview with selection sync:
 * - Slide list selection scrolls the matching `section.slide` into view
 * - Click a slide in the iframe to select it (form + list update)
 *
 * Sandbox has no `allow-scripts` — parent attaches listeners via `contentDocument`.
 */
export function Preview({
  html,
  selectedSlide = 0,
  onSelectSlide,
}: {
  html: string;
  /** 0-based slide index mirrored from the Studio list / form. */
  selectedSlide?: number;
  onSelectSlide?: (index: number) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const selectedRef = useRef(selectedSlide);
  const onSelectRef = useRef(onSelectSlide);
  selectedRef.current = selectedSlide;
  onSelectRef.current = onSelectSlide;

  const syncSelection = () => {
    const doc = frameRef.current?.contentDocument;
    if (!doc?.body) return;
    let style = doc.getElementById("pmd-studio-preview-select") as HTMLStyleElement | null;
    if (!style) {
      style = doc.createElement("style");
      style.id = "pmd-studio-preview-select";
      style.textContent = SELECT_CSS;
      (doc.head ?? doc.documentElement).appendChild(style);
    }
    const sections = doc.querySelectorAll<HTMLElement>("section.slide");
    const idx = Math.max(0, Math.min(sections.length - 1, selectedRef.current));
    sections.forEach((el, i) => {
      el.classList.toggle("pmd-studio-selected", i === idx);
    });
    sections[idx]?.scrollIntoView({ behavior: "auto", block: "nearest" });
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let removeClick: (() => void) | undefined;

    const wire = () => {
      removeClick?.();
      removeClick = undefined;
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const slide = target?.closest?.("section.slide") as HTMLElement | null;
        if (!slide || !doc.body.contains(slide)) return;
        const sections = [...doc.querySelectorAll<HTMLElement>("section.slide")];
        const index = sections.indexOf(slide);
        if (index >= 0) onSelectRef.current?.(index);
      };
      doc.addEventListener("click", onClick);
      removeClick = () => doc.removeEventListener("click", onClick);
      syncSelection();
    };

    frame.addEventListener("load", wire);
    // srcDoc may already be ready when React reuses the iframe.
    if (frame.contentDocument?.readyState === "complete" && frame.contentDocument.body) {
      wire();
    }

    return () => {
      frame.removeEventListener("load", wire);
      removeClick?.();
    };
  }, [html]);

  useEffect(() => {
    syncSelection();
  }, [selectedSlide, html]);

  return (
    <div className="preview">
      <iframe
        ref={frameRef}
        className="preview-frame"
        title="Deck preview"
        srcDoc={html}
        sandbox="allow-same-origin"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
