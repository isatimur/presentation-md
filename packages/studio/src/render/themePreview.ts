/**
 * Resolve a theme preview HTML URL for Studio's pick-3 compare tray.
 * Same-origin `/previews/` when hosted with the site; otherwise production CDN.
 */
export function themePreviewUrl(name: string): string {
  const safe = encodeURIComponent(name);
  if (typeof window === "undefined") {
    return `https://presentation-md.vercel.app/previews/${safe}.html`;
  }
  const { origin, pathname } = window.location;
  // Hosted studio lives under /studio/ next to /previews/
  if (
    pathname.startsWith("/studio") ||
    /presentation-md|vercel\.app/i.test(origin)
  ) {
    return `${origin}/previews/${safe}.html`;
  }
  // Local Vite / Playwright preview — load production craft proofs
  return `https://presentation-md.vercel.app/previews/${safe}.html`;
}

/** Cap for pick-3 compare (frontend-slides style progressive disclosure). */
export const COMPARE_LIMIT = 3;

/**
 * Live-iframe crop depths for multi-layout craft judgment.
 * Matches gallery theme-preview math (`web/previews/`): body pad 48 + 720 slide + 48 gap.
 * Theme previews bake title → feature-grid (bento) → comparison so Title/Bento/Compare
 * crops land on the right slide. Flagship Deck JSON in examples/decks/ leads with the
 * same proof trio for Studio deep-links (site HTML may lag until next structured regen).
 */
export type PreviewCrop = "title" | "bento" | "comparison";

export const PREVIEW_CROPS: readonly PreviewCrop[] = [
  "title",
  "bento",
  "comparison",
] as const;

const BODY_PAD = 48;
const SLIDE_H = 720;
const GAP = 48;

export const PREVIEW_CROP_OFFSET_PX: Record<PreviewCrop, number> = {
  title: BODY_PAD,
  bento: BODY_PAD + SLIDE_H + GAP,
  comparison: BODY_PAD + 2 * (SLIDE_H + GAP),
};

export const PREVIEW_CROP_LABEL: Record<PreviewCrop, string> = {
  title: "Title",
  bento: "Bento",
  comparison: "Compare",
};

export function isPreviewCrop(value: string): value is PreviewCrop {
  return (PREVIEW_CROPS as readonly string[]).includes(value);
}

export function toggleCompareSlot(current: string[], name: string): string[] {
  if (current.includes(name)) return current.filter((n) => n !== name);
  if (current.length >= COMPARE_LIMIT) return [...current.slice(1), name];
  return [...current, name];
}
