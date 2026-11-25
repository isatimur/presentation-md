export const MAX_COMPRESSED_BYTES = 64 * 1024 * 1024;
export const MAX_UNCOMPRESSED_BYTES = 50 * 1024 * 1024;
export const MAX_ZIP_ENTRIES = 200;
/**
 * Entry cap for template import. Chosen headroom for templates that ship
 * sample slides, many layouts and media; slide import keeps MAX_ZIP_ENTRIES.
 */
export const MAX_TEMPLATE_ZIP_ENTRIES = 2000;
export const MAX_MEDIA_BYTES = 10 * 1024 * 1024;

export function assertZipArchiveSafe(compressedBytes: number): void {
  if (!Number.isSafeInteger(compressedBytes) || compressedBytes < 0) {
    throw new Error("PPTX compressed size is invalid");
  }
  if (compressedBytes > MAX_COMPRESSED_BYTES) {
    throw new Error(`PPTX compressed size exceeds ${MAX_COMPRESSED_BYTES} bytes`);
  }
}

export function assertZipEntrySafe(opts: {
  entryCount: number;
  uncompressedSize: number;
  totalUncompressed: number;
  isMedia?: boolean;
  /** Entry cap for this caller. Defaults to MAX_ZIP_ENTRIES (slide import). */
  maxEntries?: number;
}): void {
  const maxEntries = opts.maxEntries ?? MAX_ZIP_ENTRIES;
  if (opts.entryCount > maxEntries) {
    throw new Error(`PPTX has too many entries (>${maxEntries})`);
  }
  if (opts.totalUncompressed > MAX_UNCOMPRESSED_BYTES) {
    throw new Error(`PPTX uncompressed size exceeds ${MAX_UNCOMPRESSED_BYTES} bytes`);
  }
  if (opts.isMedia && opts.uncompressedSize > MAX_MEDIA_BYTES) {
    throw new Error(`Media blob exceeds ${MAX_MEDIA_BYTES} bytes`);
  }
}
