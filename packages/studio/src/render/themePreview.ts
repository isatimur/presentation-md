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

export function toggleCompareSlot(current: string[], name: string): string[] {
  if (current.includes(name)) return current.filter((n) => n !== name);
  if (current.length >= COMPARE_LIMIT) return [...current.slice(1), name];
  return [...current, name];
}
