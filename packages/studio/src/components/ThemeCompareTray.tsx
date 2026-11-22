import type { DeckJson } from "@presentation-md/export";
import { useI18n } from "../i18n/index.js";
import { NODE_SLOT, withNode } from "../i18n/richText.js";
import type { ThemeSummary } from "../render/themes.js";
import { COMPARE_LIMIT } from "../render/themePreview.js";
import { ThemeCraftShotStrip } from "./ThemeCraftShotStrip.js";
import { DeckRestylePreview } from "./DeckRestylePreview.js";

export type LiveCompareMode = "deck" | "proofs";


/**
 * Progressive pick-3 compare tray — swatches first, then live:
 * - My deck (default): selected slide re-themed in each slot (content-true restyle)
 * - Craft proofs: shared-iframe Title/Bento/Compare shot strip
 */
export function ThemeCompareTray({
  compare,
  themes,
  livePreview,
  liveMode,
  deck,
  slideIndex0,
  activeTheme,
  onLivePreview,
  onLiveMode,
  onRemove,
  onClear,
  onUse,
}: {
  compare: string[];
  themes: ThemeSummary[];
  livePreview: boolean;
  liveMode: LiveCompareMode;
  deck: DeckJson;
  slideIndex0: number;
  activeTheme: string;
  onLivePreview: (on: boolean) => void;
  onLiveMode: (mode: LiveCompareMode) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
  onUse: (name: string) => void;
}) {
  const { t } = useI18n();
  if (compare.length === 0) return null;

  const slots = compare.map((name) => {
    const found = themes.find((x) => x.name === name);
    return (
      found ?? {
        name,
        vibe: name,
        bg: "#0B1220",
        accent: "#FF3B1F",
      }
    );
  });

  const slideLabel = t("compare.slideLabel", { n: Math.max(1, slideIndex0 + 1) });

  return (
    <div className="theme-compare" role="region" aria-label={t("compare.label")}>
      <div className="theme-compare-head">
        <span className="theme-compare-title">
          {t("compare.title", { n: compare.length, max: COMPARE_LIMIT })}
        </span>
        <div className="theme-compare-actions">
          <button
            type="button"
            className={`chip${livePreview ? " active" : ""}`}
            onClick={() => onLivePreview(!livePreview)}
            title={t("compare.toggleLiveTitle")}
          >
            {livePreview ? t("compare.hideLive") : t("compare.showLive")}
          </button>
          <button type="button" className="chip" onClick={onClear} title={t("compare.clearTitle")}>
            {t("compare.clear")}
          </button>
        </div>
      </div>
      {livePreview ? (
        <div className="theme-compare-crop-bar" role="group" aria-label={t("compare.modeLabel")}>
          <span className="theme-compare-crop-label">{t("compare.live")}</span>
          <button
            type="button"
            className={`chip${liveMode === "deck" ? " active" : ""}`}
            onClick={() => onLiveMode("deck")}
            title={t("compare.deckModeTitle")}
          >
            {t("compare.deckMode", { slide: slideLabel })}
          </button>
          <button
            type="button"
            className={`chip${liveMode === "proofs" ? " active" : ""}`}
            onClick={() => onLiveMode("proofs")}
            title={t("compare.proofsModeTitle")}
          >
            {t("compare.proofsMode")}
          </button>
        </div>
      ) : null}
      <div className={`theme-compare-grid${livePreview ? " is-live" : ""}`}>
        {slots.map((slot) => (
          <article
            key={slot.name}
            className={`theme-compare-card${slot.name === activeTheme ? " is-active" : ""}`}
          >
            {livePreview ? (
              liveMode === "deck" ? (
                <DeckRestylePreview
                  deck={deck}
                  theme={slot.name}
                  slideIndex0={slideIndex0}
                  title={t("compare.deckFrameTitle", { theme: slot.name, slide: slideLabel })}
                  className="theme-compare-restyle"
                />
              ) : (
                <ThemeCraftShotStrip
                  theme={slot.name}
                  title={t("compare.proofFrameTitle", { theme: slot.name })}
                  className="theme-compare-shot-strip"
                />
              )
            ) : (
              <div
                className="theme-compare-swatch"
                style={{
                  ["--swatch-bg" as string]: slot.bg,
                  ["--swatch-accent" as string]: slot.accent,
                }}
                aria-hidden
              />
            )}
            <div className="theme-compare-meta">
              <strong>{slot.name}</strong>
              <span className="muted small">{slot.vibe}</span>
            </div>
            <div className="theme-compare-card-actions">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => onUse(slot.name)}
                title={t("compare.useTitle")}
              >
                {t("compare.use")}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => onRemove(slot.name)}
                title={t("compare.removeTitle", { theme: slot.name })}
              >
                ✕
              </button>
            </div>
          </article>
        ))}
        {Array.from({ length: COMPARE_LIMIT - slots.length }).map((_, i) => (
          <div key={`empty-${i}`} className="theme-compare-card is-empty" aria-hidden>
            <span className="muted small">{t("compare.pick", { n: slots.length + i + 1 })}</span>
          </div>
        ))}
      </div>
      <p className="theme-compare-hint muted small">
        {livePreview && liveMode === "deck"
          ? withNode(t("compare.hintDeck", { slide: NODE_SLOT }), <strong>{slideLabel}</strong>)
          : withNode(t("compare.hintProofs", { code: NODE_SLOT }), <code>meta.theme</code>)}
      </p>
    </div>
  );
}
