import { extname, join, resolve, sep } from "node:path";
import { realpath } from "node:fs/promises";
import {
  extractBrand,
  buildThemeViewFromBrand,
  buildThemeManifestJson,
  scaffoldTheme,
  validateThemeName,
  deriveNameFromUrl,
} from "@presentation-skill-pack/create-theme";
import type { ToolDefinition } from "../server.js";

export const importBrandThemeTool: ToolDefinition = {
  name: "import_brand_theme",
  description:
    "Generate a presentation-skill-pack theme from a brand's website URL or a local CSS file. Extracts colors and fonts, maps them to the theme's 8 semantic roles, and applies a WCAG contrast-safety pass so the result stays legible. Use whenever the user wants a deck theme that matches an existing brand or product.",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string", description: "Brand website URL to extract colors and fonts from" },
      cssPath: { type: "string", description: "Local path to a CSS file to extract from, as an alternative to url" },
      name: {
        type: "string",
        description: "Theme name in kebab-case; derived from the URL's hostname if omitted (required when using cssPath)",
      },
      write: {
        type: "boolean",
        description:
          "Also scaffold the full installable theme package to disk under packages/themes/<name>. Defaults to false.",
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const url = input.url as string | undefined;
    const cssPath = input.cssPath as string | undefined;
    if (!url && !cssPath) throw new Error("Provide either 'url' or 'cssPath'.");
    if (url && cssPath) throw new Error("Provide only one of 'url' or 'cssPath', not both.");

    if (cssPath) {
      if (extname(cssPath).toLowerCase() !== ".css") {
        throw new Error("'cssPath' must point to a .css file.");
      }
      const root = await realpath(process.cwd());
      let resolvedPath: string;
      try {
        resolvedPath = await realpath(resolve(process.cwd(), cssPath));
      } catch {
        throw new Error(`'cssPath' not found: ${cssPath}`);
      }
      if (resolvedPath !== root && !resolvedPath.startsWith(root + sep)) {
        throw new Error(`'cssPath' must be within the current working directory (${root}).`);
      }
    }

    let name = input.name as string | undefined;
    if (!name) {
      if (!url) throw new Error("'name' is required when using 'cssPath'.");
      name = deriveNameFromUrl(url);
    }
    validateThemeName(name);

    const extraction = await extractBrand({ url, cssPath });
    const view = buildThemeViewFromBrand(name, extraction);
    const theme = JSON.parse(buildThemeManifestJson(view)) as Record<string, unknown>;

    let writtenTo: string | undefined;
    if (input.write === true) {
      const outputDir = join(process.cwd(), "packages", "themes", name);
      await scaffoldTheme(view, outputDir);
      writtenTo = outputDir;
    }

    return {
      theme,
      source: extraction.source,
      contrastAdjustments: extraction.adjustments,
      writtenTo,
    };
  },
};
