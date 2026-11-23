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
