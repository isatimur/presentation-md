import { describe, it, expect } from "vitest";
import {
  assertZipArchiveSafe,
  assertZipEntrySafe,
  MAX_COMPRESSED_BYTES,
  MAX_ZIP_ENTRIES,
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
    ).toThrow(/too many entries/i);
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
