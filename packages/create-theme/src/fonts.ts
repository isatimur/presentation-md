/**
 * Font plan for brand themes (URL, CSS and template sources). See "Fonts" in
 * docs/superpowers/specs/2026-11-23-template-theme-import-design.md
 *
 * The brand family stays first in each stack, then the base theme's family and
 * fallback tail. Only families Google Fonts has go into `googleFonts`.
 */
import { createRequire } from "node:module";
import { isOfficeFont } from "@presentation-md/export/import";
import { GOOGLE_FONT_FAMILIES } from "./google-font-families.js";

export type FontStatus = "google" | "office" | "unavailable";
export type BaseThemeName = "claude" | "default-tech";

export interface FontRow {
  role: "heading" | "body";
  /** The family the theme puts first in the stack. */
  family: string;
  status: FontStatus;
  /** The base theme's family, which the browser draws where `family` is not available. */
  fallback: string;
}

export interface FontPlan {
  headingStack: string;
  bodyStack: string;
  googleFonts: string[];
  rows: FontRow[];
  warnings: string[];
}

interface BaseTypography {
  headingFont: string;
  bodyFont: string;
  googleFonts?: string[];
}

const require = createRequire(import.meta.url);
const baseCache = new Map<BaseThemeName, BaseTypography>();

function baseTypography(base: BaseThemeName): BaseTypography {
  let typo = baseCache.get(base);
  if (!typo) {
    const manifest = require(`@presentation-md/core/themes/${base}`) as { typography: BaseTypography };
    typo = manifest.typography;
    baseCache.set(base, typo);
  }
  return typo;
}

/** Keep only letters, digits, spaces, ".", "_" and "-"; collapse runs of spaces. */
export function sanitizeFamily(name: string): string {
  return name
    .replace(/[^\p{L}\p{N} ._-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function classifyFont(name: string): FontStatus {
  const key = name.trim().toLowerCase();
  if (GOOGLE_FONT_FAMILIES.has(key)) return "google";
  if (isOfficeFont(key)) return "office";
  return "unavailable";
}

function stripQuotes(s: string): string {
  return s.trim().replace(/^['"]|['"]$/g, "").trim();
}

/** First family of a stack and the tail: every item after its first comma, verbatim. */
function splitStack(stack: string): { family: string; tail: string } {
  const comma = stack.indexOf(",");
  if (comma < 0) return { family: stripQuotes(stack), tail: "" };
  return { family: stripQuotes(stack.slice(0, comma)), tail: stack.slice(comma + 1).trim() };
}

function specFamily(spec: string): string {
  const colon = spec.indexOf(":");
  return (colon < 0 ? spec : spec.slice(0, colon)).replace(/\+/g, " ").trim().toLowerCase();
}

function brandSpec(family: string, role: "heading" | "body"): string {
  const weights = role === "heading" ? "400;700" : "400;500";
  return `${family.replace(/ /g, "+")}:wght@${weights}`;
}

export function buildFontPlan(
  heading: string | undefined,
  body: string | undefined,
  base: BaseThemeName
): FontPlan {
  const typo = baseTypography(base);
  const warnings: string[] = [];
  const rows: FontRow[] = [];
  const specs: string[] = [];
  const stacks: Record<"heading" | "body", string> = { heading: "", body: "" };

  for (const role of ["heading", "body"] as const) {
    const baseStack = role === "heading" ? typo.headingFont : typo.bodyFont;
    const { family: baseFamily, tail } = splitStack(baseStack);
    const baseSpec = (typo.googleFonts ?? []).find((s) => specFamily(s) === baseFamily.toLowerCase());

    const raw = role === "heading" ? heading : body;
    let family = sanitizeFamily(raw ?? "");
    if (!family) {
      warnings.push(
        `No usable ${role} font in the source; using the base theme's '${baseFamily}'.`
      );
      family = baseFamily;
    }
    const status = classifyFont(family);
    rows.push({ role, family, status, fallback: baseFamily });

    // The base family itself keeps the base stack and the base spec verbatim.
    const isBase = family.toLowerCase() === baseFamily.toLowerCase();
    stacks[role] = isBase
      ? baseStack
      : [`'${family}'`, `'${baseFamily}'`, tail].filter(Boolean).join(", ");

    if (status === "google" && !(isBase && baseSpec)) specs.push(brandSpec(family, role));
    else if (baseSpec) specs.push(baseSpec);
  }

  return {
    headingStack: stacks.heading,
    bodyStack: stacks.body,
    googleFonts: [...new Set(specs)],
    rows,
    warnings,
  };
}
