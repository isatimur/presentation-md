import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname } from "node:path";
import { pptxToDeck } from "@presentation-md/export/import";
import type { ToolDefinition } from "../server.js";
import { assertExistingPathInCwd, assertWritablePathInCwd } from "../lib/cwd-path.js";

async function assertPptxPathInCwd(pptxPath: string): Promise<string> {
  if (extname(pptxPath).toLowerCase() !== ".pptx") {
    throw new Error("'pptx_path' must point to a .pptx file.");
  }
  return assertExistingPathInCwd(pptxPath, "pptx_path");
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
      if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4b) {
        throw new Error("'pptx_base64' does not look like a valid PPTX (ZIP) file.");
      }
    }

    const theme = input["theme"] as string | undefined;
    const assetsDirInput = input["assets_dir"] as string | undefined;
    const outputPathInput = input["output_path"] as string | undefined;

    let assetsDir: string | undefined;
    if (assetsDirInput) {
      assetsDir = await assertWritablePathInCwd(assetsDirInput, "assets_dir");
      await mkdir(assetsDir, { recursive: true });
    }

    let outputPath: string | undefined;
    if (outputPathInput) {
      outputPath = await assertWritablePathInCwd(outputPathInput, "output_path");
    }

    const warnings: string[] = [];
    const { deck } = await pptxToDeck(buffer, {
      theme,
      assetsDir,
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
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, JSON.stringify(deck, null, 2), "utf-8");
      result.path = outputPath;
    }

    return result;
  },
};
