import surfaces from "../../shared/theme-surfaces.json" with { type: "json" };

export const THEME_SURFACE: Record<string, string> = surfaces;

export function surfaceForTheme(themeName: string): string {
  return THEME_SURFACE[themeName] ?? "gradient";
}
