/**
 * Pick a quiet base theme for brand imports / scaffolds.
 * Light paper → claude (warm-paper surface); dark → default-tech (neon-glow).
 * Avoids light brand themes inheriting neon SaaS chrome by accident.
 * Lives in its own module so extract-brand.ts can use it without an import cycle.
 */
export function pickExtendsFromBg(bg: string): "claude" | "default-tech" {
  const hex = bg.trim().replace(/^#/, "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  if (!/^[0-9a-f]{6}$/i.test(full)) return "default-tech";
  const num = parseInt(full, 16);
  const channels = [(num >> 16) & 255, (num >> 8) & 255, num & 255].map((c) => {
    const cn = c / 255;
    return cn <= 0.03928 ? cn / 12.92 : Math.pow((cn + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
  return luminance >= 0.45 ? "claude" : "default-tech";
}
