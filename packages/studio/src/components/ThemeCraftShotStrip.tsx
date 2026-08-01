import {
  PREVIEW_CROP_LABEL,
  PREVIEW_CROPS,
  PREVIEW_STRIP_HEIGHT_PX,
  PREVIEW_STRIP_START_PX,
  themePreviewUrl,
} from "../render/themePreview.js";

/**
 * One shared iframe per theme, scroll-cropped to the Title → Bento → Compare
 * proof stack. Densifies discovery surfaces that previously mounted 3 iframes
 * (one crop each) into a single live document.
 */
export function ThemeCraftShotStrip({
  theme,
  title,
  className,
  compact = false,
}: {
  theme: string;
  title?: string;
  /** Extra class for surface-specific e2e hooks (example / compare / generate). */
  className?: string;
  compact?: boolean;
}) {
  const classes = [
    "craft-shot-strip",
    compact ? "is-compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-label={`${theme} craft shot strip`}>
      <div
        className="craft-shot-strip-viewport"
        style={{
          ["--strip-start" as string]: `${PREVIEW_STRIP_START_PX}px`,
          ["--strip-height" as string]: `${PREVIEW_STRIP_HEIGHT_PX}px`,
        }}
      >
        <div className="craft-shot-strip-labels" aria-hidden>
          {PREVIEW_CROPS.map((crop) => (
            <span key={crop} className="craft-shot-strip-label" data-crop={crop}>
              {PREVIEW_CROP_LABEL[crop]}
            </span>
          ))}
        </div>
        <iframe
          src={themePreviewUrl(theme)}
          title={title ?? `${theme} craft preview (Title / Bento / Compare)`}
          loading="lazy"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
