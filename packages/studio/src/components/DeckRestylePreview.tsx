import { useMemo } from "react";
import type { DeckJson } from "@presentation-md/export";
import { resolveTheme } from "../render/themes.js";
import { renderDeckHtml } from "../render/renderDeck.js";

/**
 * Inject CSS so only one slide fills the restyle card — side-by-side theme
 * judgment on the user's actual content (vs canned Title/Bento/Compare proofs).
 */
export function restyleSlideHtml(
  deckHtml: string,
  slideIndex0: number
): string {
  const n = Math.max(0, Math.floor(slideIndex0)) + 1;
  const css = `
html, body { margin: 0 !important; padding: 0 !important; gap: 0 !important; background: transparent !important; overflow: hidden !important; width: 1280px !important; }
main.deck { display: block !important; padding: 0 !important; gap: 0 !important; margin: 0 !important; }
.slide { display: none !important; }
.slide:nth-of-type(${n}) {
  display: flex !important;
  width: 1280px !important;
  height: 720px !important;
  min-height: 720px !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.nav-hint, .pmd-attribution { display: none !important; }
`;
  if (deckHtml.includes("</head>")) {
    return deckHtml.replace("</head>", `<style data-pmd-restyle>${css}</style></head>`);
  }
  return `<style data-pmd-restyle>${css}</style>${deckHtml}`;
}

export function renderRestyleHtml(
  deck: DeckJson,
  themeName: string,
  slideIndex0: number
): string {
  const themed: DeckJson = {
    ...deck,
    meta: { ...deck.meta, theme: themeName },
  };
  const html = renderDeckHtml(themed, resolveTheme(themeName));
  return restyleSlideHtml(html, slideIndex0);
}

/**
 * Live iframe of the selected Studio slide re-themed — pick-3 "My deck" mode.
 * Beats frontend-slides fixed style galleries: judge YOUR content across themes.
 */
export function DeckRestylePreview({
  deck,
  theme,
  slideIndex0,
  title,
  className,
}: {
  deck: DeckJson;
  theme: string;
  slideIndex0: number;
  title?: string;
  className?: string;
}) {
  const srcDoc = useMemo(() => {
    try {
      return renderRestyleHtml(deck, theme, slideIndex0);
    } catch (err) {
      return `<pre style="padding:12px;font:12px/1.4 monospace;color:#d9695a">${String(err)}</pre>`;
    }
  }, [deck, theme, slideIndex0]);

  const classes = ["theme-compare-restyle", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-label={`${theme} restyle of slide ${slideIndex0 + 1}`}>
      <iframe
        className="theme-compare-restyle-frame"
        title={title ?? `${theme} · your slide ${slideIndex0 + 1}`}
        srcDoc={srcDoc}
        sandbox="allow-same-origin"
        referrerPolicy="no-referrer"
        tabIndex={-1}
      />
    </div>
  );
}
