import { afterEach, describe, expect, it } from "vitest";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, join, relative } from "node:path";
import { editDeckTool } from "../src/tools/edit-deck.js";
import { outlineDeckTool } from "../src/tools/outline-deck.js";

const DECK = {
  type: "deck",
  meta: { title: "Edit me", theme: "default-tech" },
  slides: [
    { layout: "title", heading: "Hello", lead: "Start" },
    { layout: "section", heading: "Middle" },
    { layout: "closing", heading: "Thanks", actions: [{ label: "Go", style: "solid" }] },
  ],
};

describe("outline_deck / edit_deck tools", () => {
  const dirs: string[] = [];
  afterEach(async () => {
    for (const d of dirs.splice(0)) await rm(d, { recursive: true, force: true });
  });
  async function deckFile(): Promise<string> {
    const dir = await mkdtemp(join(process.cwd(), "mcp-edit-test-"));
    dirs.push(dir);
    const file = join(dir, "deck.json");
    await writeFile(file, JSON.stringify(DECK));
    return relative(process.cwd(), file);
  }

  it("outline_deck reads from deck_path and returns full JSON only for included slides", async () => {
    const path = await deckFile();
    const out = (await outlineDeckTool.handler({ deck_path: path, include: [2] })) as {
      slide_count: number;
      slides: Array<{ n: number; layout: string; title: string }>;
      slide_json: Record<string, unknown>;
    };
    expect(out.slide_count).toBe(3);
    expect(out.slides.map((s) => s.title)).toEqual(["Hello", "Middle", "Thanks"]);
    expect(out.slide_json).toEqual({ 2: DECK.slides[1] });
  });

  it("edit_deck updates the file in place and reports touched slides", async () => {
    const path = await deckFile();
    const res = (await editDeckTool.handler({
      deck_path: path,
      operations: [
        { op: "update_slide", slide: 2, fields: { heading: "New middle" } },
        { op: "insert_slide", at: 3, value: { layout: "quote", quote: "Inserted" } },
      ],
    })) as { touched: number[]; written_path: string; outline: { slide_count: number }; json?: string };
    expect(res.touched).toEqual([2, 3]);
    expect(res.outline.slide_count).toBe(4);
    expect(res.json).toBeUndefined();
    const saved = JSON.parse(await readFile(path, "utf-8"));
    expect(saved.slides[1].heading).toBe("New middle");
    expect(saved.slides[2]).toEqual({ layout: "quote", quote: "Inserted" });
    expect(saved.slides[0]).toEqual(DECK.slides[0]);
  });

  it("edit_deck with json returns the new deck and writes nothing", async () => {
    const res = (await editDeckTool.handler({
      json: JSON.stringify(DECK),
      operations: [{ op: "move_slide", slide: 3, to: 1 }],
    })) as { json: string; written_path?: string };
    expect(res.written_path).toBeUndefined();
    expect(JSON.parse(res.json).slides[0].layout).toBe("closing");
  });

  it("edit_deck saves nothing when the result fails schema validation or an op fails", async () => {
    const path = await deckFile();
    const before = await readFile(path, "utf-8");
    await expect(
      editDeckTool.handler({
        deck_path: path,
        operations: [{ op: "update_slide", slide: 1, fields: { layout: "not-a-layout" } }],
      })
    ).rejects.toThrow(/invalid deck; nothing was saved/);
    await expect(
      editDeckTool.handler({ deck_path: path, operations: [{ op: "delete_slide", slide: 7 }] })
    ).rejects.toThrow(/operation 1/);
    expect(await readFile(path, "utf-8")).toBe(before);
  });

  it("rejects paths outside cwd and needs exactly one deck source", async () => {
    await expect(outlineDeckTool.handler({ deck_path: "../../../etc/hosts" })).rejects.toThrow(
      /within the current working directory|not found/
    );
    await expect(outlineDeckTool.handler({})).rejects.toThrow(/exactly one/);
    await expect(
      outlineDeckTool.handler({ json: JSON.stringify(DECK), deck_path: "x.json" })
    ).rejects.toThrow(/exactly one/);
  });

  it("refuses a directory (including cwd itself) as output_path and leaves no temp files", async () => {
    const parent = dirname(process.cwd());
    const before = await readdir(parent);
    for (const target of [".", "./"]) {
      await expect(
        editDeckTool.handler({ json: JSON.stringify(DECK), output_path: target, operations: [{ op: "delete_slide", slide: 2 }] })
      ).rejects.toThrow(/directory/);
    }
    const path = await deckFile();
    const dir = dirname(path);
    await expect(
      editDeckTool.handler({ json: JSON.stringify(DECK), output_path: dir, operations: [{ op: "delete_slide", slide: 2 }] })
    ).rejects.toThrow(/directory/);
    expect(await readdir(parent)).toEqual(before);
    expect((await readdir(dir)).filter((n) => n.endsWith(".tmp"))).toEqual([]);
  });

  it("will not overwrite an existing file that is not a deck", async () => {
    const path = await deckFile();
    const other = join(dirname(path), "package.json");
    await writeFile(other, '{"name":"victim"}');
    await expect(
      editDeckTool.handler({ json: JSON.stringify(DECK), output_path: other, operations: [{ op: "delete_slide", slide: 2 }] })
    ).rejects.toThrow(/not a deck/);
    expect(await readFile(other, "utf-8")).toBe('{"name":"victim"}');
    await expect(
      editDeckTool.handler({ json: JSON.stringify(DECK), output_path: join(dirname(path), "notes.txt"), operations: [{ op: "delete_slide", slide: 2 }] })
    ).rejects.toThrow(/\.json/);
  });

  it("refuses a deck_path that is not a regular file (no hang on a FIFO)", async () => {
    const path = await deckFile();
    const dir = dirname(path);
    await mkdir(join(dir, "sub"));
    await expect(outlineDeckTool.handler({ deck_path: join(dir, "sub") })).rejects.toThrow(/regular file/);
    if (process.platform !== "win32") {
      execFileSync("mkfifo", [join(dir, "pipe.json")]);
      await expect(outlineDeckTool.handler({ deck_path: join(dir, "pipe.json") })).rejects.toThrow(/regular file/);
    }
  });
});
