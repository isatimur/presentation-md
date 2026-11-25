/**
 * Fonts installed with Microsoft 365 / Office on Windows and macOS. PowerPoint
 * shows any other family with a substitute unless the viewer installed it.
 * Lower-cased. The PPTX fidelity report and create-theme's font classes share
 * this one list.
 */
export const OFFICE_FONTS: ReadonlySet<string> = new Set(
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

/** True when the family ships with Office (case-insensitive). */
export function isOfficeFont(name: string): boolean {
  return OFFICE_FONTS.has(name.trim().toLowerCase());
}
