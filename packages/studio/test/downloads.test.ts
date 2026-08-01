import { afterEach, describe, expect, it, vi } from "vitest";
import { EXAMPLE_DECK } from "../src/deck.js";
import { fetchHeadlessPdfBlob } from "../src/export/downloads.js";

// Re-test fetchHeadlessPdfBlob in isolation (no Chromium).
describe("fetchHeadlessPdfBlob", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns null when the API is missing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("Not Found", { status: 404 }))
    );
    await expect(fetchHeadlessPdfBlob("<html></html>")).resolves.toBeNull();
  });

  it("returns a PDF blob when the API responds with PDF bytes", async () => {
    const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]); // %PDF-1.4
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(bytes, {
          status: 200,
          headers: { "Content-Type": "application/pdf" },
        })
      )
    );
    const blob = await fetchHeadlessPdfBlob("<html></html>");
    expect(blob).not.toBeNull();
    expect(blob!.type).toMatch(/pdf/i);
    expect(blob!.size).toBe(bytes.byteLength);
  });

  it("accepts PDF magic bytes when Content-Type is missing", async () => {
    const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(bytes, { status: 200 }))
    );
    const blob = await fetchHeadlessPdfBlob("<html></html>");
    expect(blob).not.toBeNull();
    expect(blob!.type).toBe("application/pdf");
  });

  it("rejects non-PDF bodies", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("not a pdf", { status: 200 }))
    );
    await expect(fetchHeadlessPdfBlob("<html></html>")).resolves.toBeNull();
  });
});

describe("EXAMPLE_DECK stays exportable", () => {
  it("is a valid deck with slides", () => {
    expect(EXAMPLE_DECK.type).toBe("deck");
    expect(EXAMPLE_DECK.slides.length).toBeGreaterThan(0);
  });
});
