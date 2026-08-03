import { Readable } from "node:stream";
import { mkdtemp, rm, truncate, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readUtf8FileBounded, readUtf8StreamBounded } from "../src/bounded-input.js";

describe("bounded text input", () => {
  const dirs: string[] = [];

  afterEach(async () => {
    for (const dir of dirs.splice(0)) {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("counts UTF-8 bytes across stream chunks", async () => {
    await expect(
      readUtf8StreamBounded(Readable.from(["é", "x"]), {
        label: "Deck JSON stdin",
        maxBytes: 3,
      })
    ).resolves.toBe("éx");

    await expect(
      readUtf8StreamBounded(Readable.from(["é", "xy"]), {
        label: "Deck JSON stdin",
        maxBytes: 3,
      })
    ).rejects.toThrow(/Deck JSON stdin exceeds 3 bytes/);
  });

  it("rejects an oversized file from metadata before collecting it", async () => {
    const dir = await mkdtemp(join(tmpdir(), "pmd-bounded-input-"));
    dirs.push(dir);
    const path = join(dir, "oversized.json");
    await writeFile(path, "{}");
    await truncate(path, 9);

    await expect(
      readUtf8FileBounded(path, { label: "Deck JSON input", maxBytes: 8 })
    ).rejects.toThrow(/Deck JSON input exceeds 8 bytes/);
  });
});
