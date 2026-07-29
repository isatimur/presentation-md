import { readFile, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { realpath } from "node:fs/promises";
import { pptxToDeck } from "@presentation-md/export/import";
import type { ToolDefinition } from "../server.js";

async function assertPptxPathInCwd(pptxPath: string): Promise<string> {
  if (extname(pptxPath).toLowerCase() !== ".pptx") {
    throw new Error("'pptx_path' must point to a .pptx file.");
  }
  const root = await realpath(process.cwd());
  let resolvedPath: string;
  try {
    resolvedPath = await realpath(resolve(process.cwd(), pptxPath));
  } catch {
    throw new Error(`'pptx_path' not found: ${pptxPath}`);
  }
  if (resolvedPath !== root && !resolvedPath.startsWith(root + sep)) {
    throw new Error(`'pptx_path' must be within the current working directory (${root}).`);
  }
  return resolvedPath;
}

export const importPptxTool: ToolDefinition = {
  name: "import_pptx",
  description:
    "Import a PowerPoint (.pptx) file into a presentation-md deck JSON spec. Extracts text, tables, images, and notes, then maps them onto the structured layouts so you can theme, edit, and re-export. Prefer this whenever the user already has a .pptx and wants a deck in this pack's format.",
  inputSchema: {
    type: "object",
    properties: {
      pptx_path: {
        type: "string",
        description: "Path to a .pptx file within the current working directory",
      },
      pptx_base64: {
        type: "string",
        description: "Base64-encoded .pptx bytes, as an alternative to pptx_path",
      },
      theme: {
        type: "string",
        description: "Theme name to set on meta.theme (default: claude)",
      },
      output_path: {
        type: "string",
        description: "Optional path to write the deck JSON",
      },
      assets_dir: {
        type: "string",
        description:
          "Optional directory to write extracted images; when omitted, images become data URIs",
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const pptxPath = input["pptx_path"] as string | undefined;
    const pptxBase64 = input["pptx_base64"] as string | undefined;
    if (!pptxPath && !pptxBase64) throw new Error("Provide either 'pptx_path' or 'pptx_base64'.");
    if (pptxPath && pptxBase64) {
      throw new Error("Provide only one of 'pptx_path' or 'pptx_base64', not both.");
    }

    let buffer: Buffer;
    if (pptxPath) {
      const safePath = await assertPptxPathInCwd(pptxPath);
      buffer = await readFile(safePath);
    } else {
      buffer = Buffer.from(pptxBase64!, "base64");
    }

    const theme = input["theme"] as string | undefined;
    const assetsDir = input["assets_dir"] as string | undefined;
    const outputPath = input["output_path"] as string | undefined;

    if (assetsDir) {
      const root = await realpath(process.cwd());
      const resolvedAssets = resolve(process.cwd(), assetsDir);
      if (resolvedAssets !== root && !resolvedAssets.startsWith(root + sep)) {
        throw new Error(`'assets_dir' must be within the current working directory (${root}).`);
      }
    }

    if (outputPath) {
      const root = await realpath(process.cwd());
      const resolvedOut = resolve(process.cwd(), outputPath);
      if (resolvedOut !== root && !resolvedOut.startsWith(root + sep)) {
        throw new Error(`'output_path' must be within the current working directory (${root}).`);
      }
    }

    const warnings: string[] = [];
    const { deck } = await pptxToDeck(buffer, {
      theme,
      assetsDir: assetsDir ? resolve(process.cwd(), assetsDir) : undefined,
      onWarn: (msg: string) => warnings.push(msg),
    });

    const result: {
      deck: unknown;
      warnings: string[];
      slide_count: number;
      path?: string;
    } = {
      deck,
      warnings,
      slide_count: deck.slides.length,
    };

    if (outputPath) {
      const resolvedOut = resolve(process.cwd(), outputPath);
      await writeFile(resolvedOut, JSON.stringify(deck, null, 2), "utf-8");
      result.path = resolvedOut;
    }

    return result;
  },
};
