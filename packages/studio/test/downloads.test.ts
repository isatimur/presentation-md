import { afterEach, describe, expect, it, vi } from "vitest";
import { EXAMPLE_DECK } from "../src/deck.js";
import {
  fetchHeadlessPdfBlob,
  MAX_STUDIO_PDF_HTML_BYTES,
  MAX_STUDIO_PDF_RESPONSE_BYTES,
  STUDIO_PDF_TIMEOUT_MS,
} from "../src/export/downloads.js";

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

  it("rejects an oversized declared PDF before reading the body", async () => {
    const cancel = vi.fn(async () => undefined);
    const blob = vi.fn(async () => new Blob(["%PDF-1.4"]));
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        headers: new Headers({ "content-length": String(MAX_STUDIO_PDF_RESPONSE_BYTES + 1) }),
        body: { cancel },
        blob,
      }))
    );
    await expect(fetchHeadlessPdfBlob("<html></html>")).resolves.toBeNull();
    expect(cancel).toHaveBeenCalledOnce();
    expect(blob).not.toHaveBeenCalled();
  });

  it("rejects oversized HTML before making the PDF request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(
      fetchHeadlessPdfBlob("x".repeat(MAX_STUDIO_PDF_HTML_BYTES + 1))
    ).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized PDF after reading when length is not declared", async () => {
    const blob = vi.fn(async () => ({ size: MAX_STUDIO_PDF_RESPONSE_BYTES + 1 }) as unknown as Blob);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        headers: new Headers(),
        body: null,
        blob,
      }))
    );
    await expect(fetchHeadlessPdfBlob("<html></html>")).resolves.toBeNull();
    expect(blob).toHaveBeenCalledOnce();
  });

  it("keeps the timeout active while reading the response body", async () => {
    vi.useFakeTimers();
    try {
      const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => ({
        ok: true,
        headers: new Headers({ "content-type": "application/pdf" }),
        body: null,
        blob: () =>
          new Promise<Blob>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new DOMException("aborted", "AbortError"));
            });
          }),
      }));
      vi.stubGlobal("fetch", fetchMock);
      const pending = fetchHeadlessPdfBlob("<html></html>");
      await vi.advanceTimersByTimeAsync(STUDIO_PDF_TIMEOUT_MS);
      await expect(pending).resolves.toBeNull();
      expect(fetchMock).toHaveBeenCalledOnce();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("EXAMPLE_DECK stays exportable", () => {
  it("is a valid deck with slides", () => {
    expect(EXAMPLE_DECK.type).toBe("deck");
    expect(EXAMPLE_DECK.slides.length).toBeGreaterThan(0);
  });
});

describe("speaker-notes handout", () => {
  it("builds TXT blocks per slide", async () => {
    const { notesHandoutTxt } = await import("../src/export/downloads.js");
    const deck = {
      ...EXAMPLE_DECK,
      slides: [
        { ...EXAMPLE_DECK.slides[0]!, notes: "Open with the claim." },
        { ...EXAMPLE_DECK.slides[1]!, notes: "" },
      ],
    };
    const txt = notesHandoutTxt(deck);
    expect(txt).toContain("speaker notes");
    expect(txt).toContain("Slide 1:");
    expect(txt).toContain("Open with the claim.");
    expect(txt).toContain("(no speaker notes)");
  });

  it("builds WebVTT cues with timestamps", async () => {
    const { notesHandoutVtt, formatVttTime } = await import("../src/export/downloads.js");
    expect(formatVttTime(0)).toBe("00:00:00.000");
    expect(formatVttTime(30)).toBe("00:00:30.000");
    expect(formatVttTime(90)).toBe("00:01:30.000");
    const vtt = notesHandoutVtt({
      ...EXAMPLE_DECK,
      slides: [{ ...EXAMPLE_DECK.slides[0]!, notes: "Cue one" }],
    });
    expect(vtt.startsWith("WEBVTT")).toBe(true);
    expect(vtt).toContain("00:00:00.000 --> 00:00:30.000");
    expect(vtt).toContain("Cue one");
  });
});
