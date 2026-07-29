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
