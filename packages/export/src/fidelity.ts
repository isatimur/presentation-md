/**
 * PPTX fidelity report: what in the exported file differs from the HTML deck.
 * Agents read it from `export_deck` and can fix a slide before a person opens
 * the file in PowerPoint or Google Slides.
 */
import type { ResolvedTheme } from "@presentation-md/core/theme-types";
import { parseFontFamily } from "./font.js";

/**
 * - image: an image became a placeholder.
 * - approximated: the layout is rebuilt from simpler shapes.
 * - skipped: content was left out (for example an empty chart).
 * - fallback: a simpler rendering replaced the layout (table for a chart, text for HTML).
 * - font: a theme font the viewer's app will probably replace.
 * - other: a warning with no kind.
 */
export type FidelityKind = "image" | "approximated" | "skipped" | "fallback" | "font" | "other";

export interface FidelityItem {
  kind: FidelityKind;
  /** 1-based slide number; absent for deck-wide items such as fonts. */
  slide?: number;
  message: string;
}

/**
 * Fonts installed with Microsoft 365 / Office on Windows and macOS. PowerPoint
 * shows any other family with a substitute unless the viewer installed it.
 */
const OFFICE_FONTS = new Set(
  [
    "Aptos",
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Book Antiqua",
    "Bookman Old Style",
    "Calibri",
    "Calibri Light",
    "Cambria",
    "Candara",
    "Century Gothic",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Courier New",
    "Franklin Gothic Medium",
    "Garamond",
    "Georgia",
    "Gill Sans MT",
    "Impact",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Palatino Linotype",
    "Rockwell",
    "Segoe UI",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
  ].map((f) => f.toLowerCase())
);

/** How PPTX export picks fonts: the theme's own, or Office fonts of the same style. */
export type FontMode = "theme" | "office-safe";

/**
 * Office font for a CSS font stack. The first family in the stack that ships
 * with Office wins (so a theme's own fallback such as Impact or Georgia is
 * kept). Otherwise pick by style: monospace → Consolas, serif → Georgia,
 * anything else → Arial, judged from the stack's generic, then the name.
 */
export function officeSafeFamily(cssStack: string): string {
  const family = parseFontFamily(cssStack);
  const parts = cssStack.split(",").map((p) => p.trim().replace(/^['"]|['"]$/g, ""));
  const office = parts.find((p) => OFFICE_FONTS.has(p.toLowerCase()));
  if (office) return office;
  const generics = parts.map((p) => p.toLowerCase());
  const name = family.toLowerCase();
  if (generics.includes("monospace") || generics.includes("ui-monospace") || /\bmono\b|\bcode\b|courier/.test(name)) {
    return "Consolas";
  }
  if (
    (generics.includes("serif") || generics.includes("ui-serif")) ||
    (/serif|garamond|playfair|times|baskerville|caslon|didot|bodoni|fraunces|lora|merriweather/.test(name) &&
      !/sans/.test(name))
  ) {
    return "Georgia";
  }
  return "Arial";
}

/**
 * Theme copy whose heading and body fonts are Office fonts of the same style,
 * plus one `font` item per family that changed, so the report says what moved.
 */
export function officeSafeTheme(theme: ResolvedTheme): { theme: ResolvedTheme; items: FidelityItem[] } {
  const items: FidelityItem[] = [];
  const reported = new Set<string>();
  const swap = (role: string, stack: string): string => {
    const from = parseFontFamily(stack);
    const to = officeSafeFamily(stack);
    if (to !== from && !reported.has(from)) {
      reported.add(from);
      items.push({ kind: "font", message: `${role} font "${from}" replaced by "${to}" (office-safe font mode).` });
    }
    return to;
  };
  const headingFont = swap("Heading", theme.typography.headingFont);
  const bodyFont = swap("Body", theme.typography.bodyFont);
  return { theme: { ...theme, typography: { ...theme.typography, headingFont, bodyFont } }, items };
}

/** Family names from theme `googleFonts` specs such as "Inter:wght@400;600". */
function googleFamilies(theme: ResolvedTheme): Set<string> {
  const specs = theme.typography.googleFonts ?? [];
  return new Set(specs.map((spec) => spec.split(":")[0]!.replace(/\+/g, " ").trim().toLowerCase()));
}

/**
 * One item per theme font (heading, body) that PowerPoint will probably replace.
 * The message says whether Google Slides has the family, because it ignores
 * fonts embedded in a PPTX and uses its own Google Fonts library instead.
 */
export function fontFidelity(theme: ResolvedTheme): FidelityItem[] {
  const google = googleFamilies(theme);
  const roles: Array<[string, string]> = [
    ["Heading", parseFontFamily(theme.typography.headingFont)],
    ["Body", parseFontFamily(theme.typography.bodyFont)],
  ];
  const items: FidelityItem[] = [];
  const seen = new Set<string>();
  for (const [role, family] of roles) {
    const key = family.toLowerCase();
    if (OFFICE_FONTS.has(key) || seen.has(key)) continue;
    seen.add(key);
    const where = google.has(key)
      ? "Google Slides has it (Google Fonts)."
      : "Google Slides will also substitute it.";
    items.push({
      kind: "font",
      message: `${role} font "${family}" is not installed with Office; PowerPoint shows a substitute unless the viewer installs it. ${where}`,
    });
  }
  return items;
}
