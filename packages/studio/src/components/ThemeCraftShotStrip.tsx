import { useI18n, type MessageKey } from "../i18n/index.js";
import {
  PREVIEW_CROPS,
  PREVIEW_STRIP_HEIGHT_PX,
  PREVIEW_STRIP_START_PX,
  themePreviewUrl,
  type PreviewCrop,
} from "../render/themePreview.js";

const CROP_LABEL_KEYS: Record<PreviewCrop, MessageKey> = {
  title: "craftStrip.cropTitle",
  bento: "craftStrip.cropBento",
  comparison: "craftStrip.cropCompare",
};

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
  const { t } = useI18n();
  const classes = [
    "craft-shot-strip",
    compact ? "is-compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-label={t("craftStrip.label", { theme })}>
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
              {t(CROP_LABEL_KEYS[crop])}
            </span>
          ))}
        </div>
        <iframe
          src={themePreviewUrl(theme)}
          title={title ?? t("craftStrip.previewTitle", { theme })}
          loading="lazy"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
