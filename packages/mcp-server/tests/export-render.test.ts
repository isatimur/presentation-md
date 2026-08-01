import { describe, it, expect, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { exportDeckTool } from "../src/tools/export-deck.js";
import { renderDeckTool } from "../src/tools/render-deck.js";
import { importMarkdownTool } from "../src/tools/import-markdown.js";

const MINI_DECK = JSON.stringify({
  type: "deck",
  meta: { title: "MCP Export", theme: "default-tech" },
  slides: [
    { layout: "title", heading: "Hello", lead: "From MCP" },
    { layout: "closing", heading: "Thanks", actions: [{ label: "Done", style: "solid" }] },
  ],
});

describe("export_deck / render_deck tools", () => {
  const dirs: string[] = [];

  afterEach(async () => {
    for (const dir of dirs.splice(0)) {
      await rm(dir, { recursive: true, force: true });
    }
  });

  async function tempDir(): Promise<string> {
    const dir = await mkdtemp(join(process.cwd(), "mcp-export-test-"));
    dirs.push(dir);
    return dir;
  }

  it("export_deck returns pptx base64 with slide_count and warnings", async () => {
    const result = (await exportDeckTool.handler({ json: MINI_DECK })) as {
      format: string;
      slide_count: number;
      byte_length: number;
      warnings: string[];
      bytes_base64?: string;
    };
    expect(result.format).toBe("pptx");
    expect(result.slide_count).toBe(2);
    expect(result.byte_length).toBeGreaterThan(100);
    expect(Array.isArray(result.warnings)).toBe(true);
    expect(result.bytes_base64).toBeTruthy();
    const buf = Buffer.from(result.bytes_base64!, "base64");
    expect(buf[0]).toBe(0x50);
    expect(buf[1]).toBe(0x4b);
  });

  it("export_deck writes within cwd and rejects escapes", async () => {
    const dir = await tempDir();
    const rel = join(dir.replace(process.cwd() + "/", ""), "out.pptx");
    const ok = (await exportDeckTool.handler({
      json: MINI_DECK,
      output_path: rel,
    })) as { path?: string };
    expect(ok.path).toBeTruthy();
    const bytes = await readFile(ok.path!);
    expect(bytes[0]).toBe(0x50);

    await expect(
      exportDeckTool.handler({
        json: MINI_DECK,
        output_path: resolve(process.cwd(), "..", "escape.pptx"),
      })
    ).rejects.toThrow(/current working directory/i);
  });

  it("export_deck rejects unknown formats", async () => {
    await expect(exportDeckTool.handler({ json: MINI_DECK, format: "docx" })).rejects.toThrow(
      /unknown format/i
    );
  });

  it("export_deck format=pdf returns PDF bytes", async () => {
    const result = (await exportDeckTool.handler({ json: MINI_DECK, format: "pdf" })) as {
      format: string;
      slide_count: number;
      byte_length: number;
      bytes_base64?: string;
    };
    expect(result.format).toBe("pdf");
    expect(result.slide_count).toBe(2);
    expect(result.byte_length).toBeGreaterThan(500);
    expect(result.bytes_base64).toBeTruthy();
    const buf = Buffer.from(result.bytes_base64!, "base64");
    expect(buf.subarray(0, 4).toString("utf-8")).toBe("%PDF");
  }, 120_000);

  it("render_deck returns html and honors theme override", async () => {
    const result = (await renderDeckTool.handler({
      json: MINI_DECK,
      theme: "claude",
    })) as { html: string; slide_count: number };
    expect(result.slide_count).toBe(2);
    expect(result.html).toMatch(/<!DOCTYPE html>/i);
    expect(result.html.length).toBeGreaterThan(500);
  });

  it("render_deck rejects output_path escapes", async () => {
    await expect(
      renderDeckTool.handler({
        json: MINI_DECK,
        output_path: resolve(process.cwd(), "..", "escape.html"),
      })
    ).rejects.toThrow(/current working directory/i);
  });

  it("import_markdown maps wrap craft and rejects path escapes", async () => {
    const md = `---
title: Wrap
theme: kinetic-wrapped
---

# Pulse Wrap

---

## 47 days straight

Habit grid for launch week.

---

## Thanks — share it

- Open App
- Share Story
`;
    const result = (await importMarkdownTool.handler({ markdown: md })) as {
      slide_count: number;
      json: string;
    };
    expect(result.slide_count).toBeGreaterThanOrEqual(3);
    const deck = JSON.parse(result.json) as { slides: Array<{ layout: string }> };
    expect(deck.slides.some((s) => s.layout === "streak-grid")).toBe(true);

    const dir = await tempDir();
    const rel = join(dir.replace(process.cwd() + "/", ""), "deck.json");
    await importMarkdownTool.handler({ markdown: md, output_path: rel });
    await expect(
      importMarkdownTool.handler({
        markdown: md,
        output_path: resolve(process.cwd(), "..", "escape.json"),
      })
    ).rejects.toThrow(/current working directory/i);
  });
});
