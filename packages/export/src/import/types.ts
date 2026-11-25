/**
 * Intermediate types for PPTX → Deck JSON import.
 * See docs/superpowers/specs/2026-07-28-pptx-import-design.md
 */

export interface ExtractedImage {
  name: string;
  contentType: string;
  bytes: Uint8Array;
  widthEmu?: number;
  heightEmu?: number;
}

export interface ExtractedSlide {
  number: number;
  title?: string;
  texts: string[];
  tables: string[][];
  images: ExtractedImage[];
  notes?: string;
}

export interface ExtractedPresentation {
  meta: { title?: string; author?: string; subject?: string };
  slides: ExtractedSlide[];
}

export interface ExtractOptions {
  onWarn?: (msg: string) => void;
}

export interface MapOptions {
  theme?: string;
  /** If set, write images here and use relative paths instead of data URIs. */
  assetsDir?: string;
  onWarn?: (msg: string) => void;
}

export interface ImportOptions extends ExtractOptions, MapOptions {}

/** The 12 colour slots of a DrawingML colour scheme (`a:clrScheme`). */
export type SchemeColorKey =
  | "dk1"
  | "lt1"
  | "dk2"
  | "lt2"
  | "accent1"
  | "accent2"
  | "accent3"
  | "accent4"
  | "accent5"
  | "accent6"
  | "hlink"
  | "folHlink";

/** A scheme slot a master's `p:clrMap` can point a role at. */
export type ClrMapTarget = "lt1" | "dk1" | "lt2" | "dk2";

export type OfficeDefaultLabel = "Office 2007–2010" | "Office 2013–2022" | "Office 2023+";

export type LogoCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/**
 * Brand values read from a .pptx / .potx theme part and its first slide
 * master. See docs/superpowers/specs/2026-11-23-template-theme-import-design.md
 */
export interface TemplateBrand {
  /** Each value is lower-case "#rrggbb". */
  scheme: Record<SchemeColorKey, string>;
  schemeName: string;
  clrMap: { bg1: ClrMapTarget; tx1: ClrMapTarget; bg2: ClrMapTarget; tx2: ClrMapTarget };
  officeDefault: OfficeDefaultLabel | null;
  /** Set when `a:clrScheme@name` is one of PowerPoint's built-in scheme names. */
  builtInName: string | null;
  fonts: { heading?: string; body?: string; ea?: string; cs?: string };
  /** Logo metadata only; no image bytes are read. */
  logo: {
    found: boolean;
    mime?: string;
    hasSvg?: boolean;
    corner?: LogoCorner;
    widthPct?: number;
    sizeBytes?: number;
  };
  warnings: string[];
}
