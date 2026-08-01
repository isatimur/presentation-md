import type { DeckJson } from "@presentation-md/export";
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
  if (compare.length === 0) return null;

  const slots = compare.map((name) => {
    const t = themes.find((x) => x.name === name);
    return (
      t ?? {
        name,
        vibe: name,
        bg: "#0B1220",
        accent: "#FF3B1F",
      }
    );
  });

  const slideLabel = `Slide ${Math.max(1, slideIndex0 + 1)}`;

  return (
    <div className="theme-compare" role="region" aria-label="Compare themes">
      <div className="theme-compare-head">
        <span className="theme-compare-title">
          Compare {compare.length}/{COMPARE_LIMIT}
        </span>
        <div className="theme-compare-actions">
          <button
            type="button"
            className={`chip${livePreview ? " active" : ""}`}
            onClick={() => onLivePreview(!livePreview)}
            title="Toggle live compare (My deck restyle or craft proof shot strip)"
          >
            {livePreview ? "Hide live" : "Show live"}
          </button>
          <button type="button" className="chip" onClick={onClear} title="Clear compare tray">
            Clear
          </button>
        </div>
      </div>
      {livePreview ? (
        <div className="theme-compare-crop-bar" role="group" aria-label="Live compare mode">
          <span className="theme-compare-crop-label">Live</span>
          <button
            type="button"
            className={`chip${liveMode === "deck" ? " active" : ""}`}
            onClick={() => onLiveMode("deck")}
            title="Re-theme your selected slide in each slot — content-true restyle vs fixed galleries"
          >
            My deck · {slideLabel}
          </button>
          <button
            type="button"
            className={`chip${liveMode === "proofs" ? " active" : ""}`}
            onClick={() => onLiveMode("proofs")}
            title="Shared-iframe Title / Bento / Compare craft proofs"
          >
            Craft proofs
          </button>
        </div>
      ) : null}
      <div className={`theme-compare-grid${livePreview ? " is-live" : ""}`}>
        {slots.map((t) => (
          <article
            key={t.name}
            className={`theme-compare-card${t.name === activeTheme ? " is-active" : ""}`}
          >
            {livePreview ? (
              liveMode === "deck" ? (
                <DeckRestylePreview
                  deck={deck}
                  theme={t.name}
                  slideIndex0={slideIndex0}
                  title={`${t.name} · your ${slideLabel}`}
                  className="theme-compare-restyle"
                />
              ) : (
                <ThemeCraftShotStrip
                  theme={t.name}
                  title={`${t.name} craft preview`}
                  className="theme-compare-shot-strip"
                />
              )
            ) : (
              <div
                className="theme-compare-swatch"
                style={{
                  ["--swatch-bg" as string]: t.bg,
                  ["--swatch-accent" as string]: t.accent,
                }}
                aria-hidden
              />
            )}
            <div className="theme-compare-meta">
              <strong>{t.name}</strong>
              <span className="muted small">{t.vibe}</span>
            </div>
            <div className="theme-compare-card-actions">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => onUse(t.name)}
                title="Apply theme and run safe craft repair for theme honesty"
              >
                Use
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => onRemove(t.name)}
                title={`Remove ${t.name} from compare`}
              >
                ✕
              </button>
            </div>
          </article>
        ))}
        {Array.from({ length: COMPARE_LIMIT - slots.length }).map((_, i) => (
          <div key={`empty-${i}`} className="theme-compare-card is-empty" aria-hidden>
            <span className="muted small">Pick {slots.length + i + 1}</span>
          </div>
        ))}
      </div>
      <p className="theme-compare-hint muted small">
        {livePreview && liveMode === "deck" ? (
          <>
            My deck restyles <strong>{slideLabel}</strong> live in each theme — judge your content,
            not a canned gallery. Use applies theme + safe craft repair.
          </>
        ) : (
          <>
            Click ⊕ on themes to fill slots · live auto-on at pick-3 · Craft proofs show Title /
            Bento / Compare · Use locks <code>meta.theme</code> + repairs craft
          </>
        )}
      </p>
    </div>
  );
}
