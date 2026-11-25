import { describe, it, expect } from "vitest";
import {
  assertZipArchiveSafe,
  assertZipEntrySafe,
  MAX_COMPRESSED_BYTES,
  MAX_ZIP_ENTRIES,
  MAX_TEMPLATE_ZIP_ENTRIES,
  MAX_UNCOMPRESSED_BYTES,
  MAX_MEDIA_BYTES,
} from "../src/import/zip-limits.js";

describe("assertZipEntrySafe", () => {
  it("rejects oversized or invalid compressed archives before JSZip parses them", () => {
    expect(() => assertZipArchiveSafe(MAX_COMPRESSED_BYTES)).not.toThrow();
    expect(() => assertZipArchiveSafe(MAX_COMPRESSED_BYTES + 1)).toThrow(
      /compressed size exceeds/i
    );
    expect(() => assertZipArchiveSafe(Number.NaN)).toThrow(/compressed size is invalid/i);
  });

  it("allows normal entries", () => {
    expect(() =>
      assertZipEntrySafe({ entryCount: 10, uncompressedSize: 1000, totalUncompressed: 5000 })
    ).not.toThrow();
  });

  it("rejects too many entries", () => {
    expect(() =>
      assertZipEntrySafe({
        entryCount: MAX_ZIP_ENTRIES + 1,
        uncompressedSize: 1,
        totalUncompressed: 1,
      })
    ).toThrow(`PPTX has too many entries (>${MAX_ZIP_ENTRIES})`);
  });

  it("uses MAX_ZIP_ENTRIES when maxEntries is absent", () => {
    expect(() =>
      assertZipEntrySafe({ entryCount: MAX_ZIP_ENTRIES, uncompressedSize: 1, totalUncompressed: 1 })
    ).not.toThrow();
  });

  it("applies a caller's maxEntries and names it in the message", () => {
    const opts = { uncompressedSize: 1, totalUncompressed: 1, maxEntries: MAX_TEMPLATE_ZIP_ENTRIES };
    expect(() => assertZipEntrySafe({ ...opts, entryCount: MAX_ZIP_ENTRIES + 1 })).not.toThrow();
    expect(() => assertZipEntrySafe({ ...opts, entryCount: MAX_TEMPLATE_ZIP_ENTRIES })).not.toThrow();
    expect(() => assertZipEntrySafe({ ...opts, entryCount: MAX_TEMPLATE_ZIP_ENTRIES + 1 })).toThrow(
      "PPTX has too many entries (>2000)"
    );
  });

  it("rejects oversized uncompressed total", () => {
    expect(() =>
      assertZipEntrySafe({
        entryCount: 1,
        uncompressedSize: MAX_UNCOMPRESSED_BYTES + 1,
        totalUncompressed: MAX_UNCOMPRESSED_BYTES + 1,
      })
    ).toThrow(/uncompressed size exceeds/i);
  });

  it("rejects oversized media blobs", () => {
    expect(() =>
      assertZipEntrySafe({
        entryCount: 1,
        uncompressedSize: MAX_MEDIA_BYTES + 1,
        totalUncompressed: MAX_MEDIA_BYTES + 1,
        isMedia: true,
      })
    ).toThrow(/Media blob exceeds/i);
  });
});
