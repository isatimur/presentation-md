import { extname, join } from "node:path";
import {
  extractBrand,
  buildThemeViewFromBrand,
  buildThemeManifestJson,
  scaffoldTheme,
  validateThemeName,
  deriveNameFromUrl,
  deriveNameFromPath,
  assertNotOfficeDefault,
} from "@presentation-md/create-theme";
import type { ToolDefinition } from "../server.js";
import {
  assertExistingPathInCwd,
  assertOoxmlPathInCwd,
  assertWritablePathInCwd,
} from "../lib/cwd-path.js";

export const importBrandThemeTool: ToolDefinition = {
  name: "import_brand_theme",
  description:
    "Generate a presentation-md theme from a brand's website URL, a local CSS file, or a company PowerPoint template (.pptx or .potx). Extracts colors and fonts, maps them to the theme's 8 semantic roles, and applies a WCAG contrast-safety pass so the result stays legible. Use whenever the user wants a deck theme that matches an existing brand or product. Prefer pptxPath when the user has a company PowerPoint template; it reads the template's colours and fonts and reports whether it has a logo.",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string", description: "Brand website URL to extract colors and fonts from" },
      cssPath: {
        type: "string",
        description: "Local path to a CSS file to extract from, as an alternative to url",
      },
      pptxPath: {
        type: "string",
        description:
          "Path to a PowerPoint template (.pptx or .potx) within the current working directory. Reads its colour scheme and fonts.",
      },
      allowOfficeDefault: {
        type: "boolean",
        description:
          "With pptxPath and write=true: write the theme even when the template keeps an Office default colour scheme. Defaults to false.",
      },
      name: {
        type: "string",
        description:
          "Theme name in kebab-case; derived from the URL's hostname or the template's file name if omitted (required when using cssPath)",
      },
      write: {
        type: "boolean",
        description:
          "Also scaffold the full installable theme package to disk. Defaults to false.",
      },
      output_dir: {
        type: "string",
        description:
          "Directory within the current working directory for the scaffolded package when write=true (default: packages/themes/<name>).",
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const url = input.url as string | undefined;
    const cssPath = input.cssPath as string | undefined;
    const pptxPath = input.pptxPath as string | undefined;
    const given = [url, cssPath, pptxPath].filter(Boolean).length;
    if (given === 0) throw new Error("Provide one of 'url', 'cssPath' or 'pptxPath'.");
    if (given > 1) throw new Error("Provide only one of 'url', 'cssPath' or 'pptxPath'.");

    let resolvedPptx: string | undefined;
    if (cssPath) {
      if (extname(cssPath).toLowerCase() !== ".css") {
        throw new Error("'cssPath' must point to a .css file.");
      }
      await assertExistingPathInCwd(cssPath, "cssPath");
    }
    if (pptxPath) {
      // extractBrand owns the size check.
      resolvedPptx = await assertOoxmlPathInCwd(pptxPath, "pptxPath", [".pptx", ".potx"]);
    }

    let name = input.name as string | undefined;
    if (!name) {
      if (url) name = deriveNameFromUrl(url);
      else if (pptxPath) name = deriveNameFromPath(pptxPath);
      else throw new Error("'name' is required when using 'cssPath'.");
    }
    validateThemeName(name);

    const extraction = await extractBrand({ url, cssPath, pptxPath: resolvedPptx });
    const view = buildThemeViewFromBrand(name, extraction);
    const theme = JSON.parse(buildThemeManifestJson(view)) as Record<string, unknown>;

    let writtenTo: string | undefined;
    if (input.write === true) {
      assertNotOfficeDefault(extraction, input.allowOfficeDefault === true);
      const outputDirInput =
        typeof input.output_dir === "string" && input.output_dir.trim()
          ? input.output_dir
          : join("packages", "themes", name);
      const outputDir = await assertWritablePathInCwd(outputDirInput, "output_dir");
      await scaffoldTheme(view, outputDir);
      writtenTo = outputDir;
    }

    return {
      theme,
      source: extraction.source,
      contrastAdjustments: extraction.adjustments,
      // Pairs that remain below WCAG AA (4.5:1) even after the contrast pass.
      // Always present so the response shape is stable; empty means fully safe.
      contrastStillFailing: extraction.stillFailing,
      writtenTo,
      fonts: extraction.fontPlan.rows,
      warnings: extraction.warnings,
      // Template only (null for url and cssPath). Metadata, never image bytes.
      logo: extraction.logo,
      scheme: extraction.scheme,
    };
  },
};
