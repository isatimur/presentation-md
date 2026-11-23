/**
 * Script fonts for non-Latin decks in PPTX.
 *
 * pptxgenjs writes one font name into all three run slots:
 *   <a:latin typeface="Inter"/><a:ea typeface="Inter"/><a:cs typeface="Inter"/>
 * PowerPoint draws Arabic, Hebrew and Thai with the `cs` (complex script) font
 * and Chinese, Japanese and Korean with the `ea` (East Asian) font. Theme fonts
 * are mostly Latin-only, so PowerPoint has to guess a substitute. We point those
 * slots at the font Office's own default theme uses for the script, which every
 * Office install has. The Latin slot keeps the theme font.
 */
import JSZip from "jszip";
import { normalizeDeckLang } from "@presentation-md/core/deck-lang";

export interface ScriptFontSlots {
  /** Complex-script font (Arabic, Hebrew, Thai). */
  cs?: string;
  /** East Asian font (Chinese, Japanese, Korean). */
  ea?: string;
}

/** Office default-theme font for the deck language's script, or null when the theme font is fine. */
export function scriptFontSlots(lang: string): ScriptFontSlots | null {
  const tag = normalizeDeckLang(lang).toLowerCase();
  const primary = tag.split("-")[0];
  switch (primary) {
    case "ar":
    case "fa":
    case "ur":
    case "ps":
    case "sd":
    case "ug":
    case "ckb":
    case "he":
    case "yi":
      return { cs: "Arial" };
    case "th":
      return { cs: "Tahoma" };
    case "ja":
      return { ea: "Yu Gothic" };
    case "ko":
      return { ea: "Malgun Gothic" };
    case "zh":
      return { ea: /-(hant|tw|hk|mo)\b/.test(tag) ? "Microsoft JhengHei" : "DengXian" };
    default:
      return null;
  }
}

function xmlAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/**
 * Point explicit `cs` / `ea` typefaces at the script fonts. Theme references
 * such as "+mn-cs" are left alone; only concrete font names are replaced.
 */
export function applyScriptFontsToXml(xml: string, slots: ScriptFontSlots): string {
  let out = xml;
  for (const slot of ["cs", "ea"] as const) {
    const font = slots[slot];
    if (!font) continue;
    const re = new RegExp(`<a:${slot} typeface="(?!\\+)[^"]*"`, "g");
    out = out.replace(re, `<a:${slot} typeface="${xmlAttr(font)}"`);
  }
  return out;
}

type Output = "arraybuffer" | "nodebuffer" | "blob";

/**
 * Rewrite script fonts in every slide of a serialized PPTX. Returns the input
 * unchanged (same object) when the language needs no script font.
 */
export async function applyScriptFonts<T extends ArrayBuffer | Uint8Array | Blob>(
  file: T,
  lang: string,
  outputType: Output
): Promise<T> {
  const slots = scriptFontSlots(lang);
  if (!slots) return file;
  const zip = await JSZip.loadAsync(file);
  const slideNames = Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n));
  for (const name of slideNames) {
    const xml = await zip.file(name)!.async("string");
    zip.file(name, applyScriptFontsToXml(xml, slots));
  }
  return (await zip.generateAsync({
    type: outputType,
    compression: "DEFLATE",
    mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  })) as T;
}
