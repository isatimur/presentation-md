import type { ThemeSummary } from "../render/themes.js";
import { COMPARE_LIMIT, themePreviewUrl } from "../render/themePreview.js";

/**
 * Progressive pick-3 compare tray — swatches first, optional live iframe
 * previews (frontend-slides style discovery, structured themes).
 */
export function ThemeCompareTray({
  compare,
  themes,
  livePreview,
  activeTheme,
  onLivePreview,
  onRemove,
  onClear,
  onUse,
}: {
  compare: string[];
  themes: ThemeSummary[];
  livePreview: boolean;
  activeTheme: string;
  onLivePreview: (on: boolean) => void;
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
            title="Load live title-slide previews (progressive disclosure)"
          >
            {livePreview ? "Hide live" : "Show live"}
          </button>
          <button type="button" className="chip" onClick={onClear} title="Clear compare tray">
            Clear
          </button>
        </div>
      </div>
      <div className={`theme-compare-grid${livePreview ? " is-live" : ""}`}>
        {slots.map((t) => (
          <article
            key={t.name}
            className={`theme-compare-card${t.name === activeTheme ? " is-active" : ""}`}
          >
            {livePreview ? (
              <div className="theme-compare-frame" data-crop="title">
                <iframe
                  src={themePreviewUrl(t.name)}
                  title={`${t.name} preview`}
                  loading="lazy"
                  tabIndex={-1}
                />
              </div>
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
        Click ⊕ on themes to fill slots · Show live for title craft · Use to lock{" "}
        <code>meta.theme</code>
      </p>
    </div>
  );
}
