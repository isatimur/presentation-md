import { describe, it, expect, afterEach } from "vitest";
import { mkdtemp, rm, truncate, writeFile, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { loadTheme } from "@presentation-md/core";
import { deckToPptxBuffer } from "@presentation-md/export";
import { MAX_COMPRESSED_BYTES } from "@presentation-md/export/import";
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

  it("rejects oversized path input before reading it into memory", async () => {
    const dir = await tempDir();
    const pptxPath = join(dir, "oversized.pptx");
    await writeFile(pptxPath, "PK\x03\x04");
    await truncate(pptxPath, MAX_COMPRESSED_BYTES + 1);

    await expect(importPptxTool.handler({ pptx_path: pptxPath })).rejects.toThrow(
      /compressed size exceeds/i
    );
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

  it("rejects pptx_path outside the current working directory", async () => {
    const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const { tmpdir } = await import("node:os");
    const outsideDir = await mkdtemp(join(tmpdir(), "import-pptx-outside-"));
    try {
      const outsideFile = join(outsideDir, "deck.pptx");
      await writeFile(outsideFile, "PK\x03\x04fake");
      await expect(importPptxTool.handler({ pptx_path: outsideFile })).rejects.toThrow(
        /must be within the current working directory|not found/i
      );
    } finally {
      await rm(outsideDir, { recursive: true, force: true });
    }
  });

  it("rejects assets_dir that escapes via symlink", async () => {
    const { mkdtemp, symlink, writeFile, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const { tmpdir } = await import("node:os");
    const dir = await tempDir();
    const outsideDir = await mkdtemp(join(tmpdir(), "import-pptx-link-target-"));
    const linkPath = join(dir, "escape-link");
    try {
      await symlink(outsideDir, linkPath);
      const themesDir = resolve(process.cwd(), "../core/themes");
      const theme = await loadTheme("default-tech", { themesDir });
      const buf = await deckToPptxBuffer(
        { type: "deck", slides: [{ layout: "title", heading: "X" }] },
        theme
      );
      const pptxPath = join(dir, "deck.pptx");
      await writeFile(pptxPath, buf);
      await expect(
        importPptxTool.handler({
          pptx_path: pptxPath,
          assets_dir: linkPath,
        })
      ).rejects.toThrow(/must be within the current working directory/i);
    } finally {
      await rm(outsideDir, { recursive: true, force: true });
    }
  });

  it("rejects garbage pptx_base64 that is not a ZIP", async () => {
    await expect(
      importPptxTool.handler({ pptx_base64: Buffer.from("hello").toString("base64") })
    ).rejects.toThrow(/does not look like a valid PPTX/i);
  });
});
