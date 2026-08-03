/**
 * Candy-pop / candy-blob marquee copy for HTML + PPTX.
 * Brand comes from deck meta (company → title → fallback), not Jellybean-hardcoded.
 */

export interface CandyMarqueeMeta {
  company?: string;
  title?: string;
  /** Optional custom ticker unit; repeated for scroll length. */
  marquee?: string;
}

/** Brand token shown in the yellow ticker (uppercased, truncated). */
export function candyMarqueeBrand(meta?: CandyMarqueeMeta): string {
  const raw = (meta?.company || meta?.title || "CANDY POP").trim();
  const cleaned = raw.replace(/\s+/g, " ").slice(0, 48);
  return cleaned.toUpperCase() || "CANDY POP";
}

/**
 * Full ticker string (repeated units) for CSS content / PPTX text / data-marquee.
 * HTML animates; PPTX uses a static strip with the same wording.
 */
export function candyMarqueeText(meta?: CandyMarqueeMeta): string {
  const custom = typeof meta?.marquee === "string" ? meta.marquee.trim() : "";
  const brand = candyMarqueeBrand(meta);
  const unit = custom
    ? `${custom.replace(/\s+/g, " ")}  ·  ${brand}  ·  `
    : `★ SAVE TOGETHER  ·  WIN TOGETHER  ·  ${brand}  ·  `;
  return unit.repeat(4);
}
