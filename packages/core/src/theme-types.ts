/**
 * Theme shape types — fs-free so browser consumers (Studio) can import types
 * without pulling `theme-loader` (node:fs) into the bundle.
 */

export interface Palette {
  bg: string;
  bg2: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  cardBg: string;
  border: string;
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  headingWeight: string | number;
  googleFonts: string[];
}

export interface Geometry {
  radius: string;
  slideWidth: string;
}

export interface ThemeManifest {
  name: string;
  version: string;
  extends?: string;
  description?: string;
  vibe?: string;
  roles?: Partial<Palette>;
  typography?: Partial<Typography>;
  geometry?: Partial<Geometry>;
}

export interface ResolvedTheme {
  name: string;
  version: string;
  manifest: ThemeManifest;
  palette: Palette;
  typography: Typography;
  geometry: Geometry;
}

export interface LoadOptions {
  themesDir: string;
  /** Additional directories when resolving themes (e.g. core bundled themes for `extends`). */
  fallbackThemesDirs?: string[];
}

export interface DiscoveredTheme {
  name: string;
  version: string;
  manifest: ThemeManifest;
  source: "bundled" | "installed";
}

export interface DiscoveryOptions {
  bundledThemesDir: string;
  nodeModulesRoot?: string;
}
