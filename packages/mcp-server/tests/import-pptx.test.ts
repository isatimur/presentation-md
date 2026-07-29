import { describe, it, expect, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { loadTheme } from "@presentation-md/core";
import { deckToPptxBuffer } from "@presentation-md/export";
import { importPptxTool } from "../src/tools/import-pptx.js";

describe("import_pptx tool", () => {
  const dirs: string[] = [];

  afterEach(async () => {
    for (const dir of dirs.splice(0)) {
      await rm(dir, { recursive: true, force: true });
    }
  });

  async function tempDir(): Promise<string> {
    const dir = await mkdtemp(join(process.cwd(), "import-pptx-test-"));
    dirs.push(dir);
    return dir;
  }

  it("rejects when neither path nor base64 is given", async () => {
    await expect(importPptxTool.handler({})).rejects.toThrow(/provide either/i);
  });

  it("rejects when both path and base64 are given", async () => {
    await expect(
      importPptxTool.handler({ pptx_path: "a.pptx", pptx_base64: "YQ==" })
    ).rejects.toThrow(/only one of/i);
  });

  it("rejects non-pptx paths", async () => {
    const dir = await tempDir();
    const txt = join(dir, "notes.txt");
    await writeFile(txt, "hi");
    await expect(importPptxTool.handler({ pptx_path: txt })).rejects.toThrow(/\.pptx/i);
  });

  it("imports a pptx via path and returns a valid deck", async () => {
    const dir = await tempDir();
    const themesDir = resolve(process.cwd(), "../core/themes");
    const theme = await loadTheme("default-tech", { themesDir });
    const buf = await deckToPptxBuffer(
      {
        type: "deck",
        meta: { title: "Imported", theme: "default-tech" },
        slides: [
          { layout: "title", heading: "Hello Import", lead: "From PPTX" },
          { layout: "closing", heading: "Thank you" },
        ],
      },
      theme
    );
    const pptxPath = join(dir, "deck.pptx");
    const outPath = join(dir, "out.json");
    await writeFile(pptxPath, buf);

    const result = (await importPptxTool.handler({
      pptx_path: pptxPath,
      theme: "corporate",
      output_path: outPath,
    })) as {
      deck: { meta?: { theme?: string }; slides: Array<{ heading?: string }> };
      slide_count: number;
      path?: string;
      warnings: string[];
    };

    expect(result.slide_count).toBe(2);
    expect(result.deck.meta?.theme).toBe("corporate");
    expect(result.deck.slides[0]?.heading).toBe("Hello Import");
    expect(result.path).toBeDefined();
    const written = JSON.parse(await readFile(outPath, "utf-8")) as { slides: unknown[] };
    expect(written.slides).toHaveLength(2);
  });

  it("imports via base64", async () => {
    const themesDir = resolve(process.cwd(), "../core/themes");
    const theme = await loadTheme("default-tech", { themesDir });
    const buf = await deckToPptxBuffer(
      {
        type: "deck",
        slides: [{ layout: "title", heading: "Base64 Slide", lead: "ok" }],
      },
      theme
    );
    const result = (await importPptxTool.handler({
      pptx_base64: buf.toString("base64"),
    })) as { slide_count: number; deck: { slides: Array<{ heading?: string }> } };
    expect(result.slide_count).toBe(1);
    expect(result.deck.slides[0]?.heading).toBe("Base64 Slide");
  });
});
