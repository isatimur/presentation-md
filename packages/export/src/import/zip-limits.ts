export const MAX_UNCOMPRESSED_BYTES = 50 * 1024 * 1024;
export const MAX_ZIP_ENTRIES = 200;
export const MAX_MEDIA_BYTES = 10 * 1024 * 1024;

export function assertZipEntrySafe(opts: {
  entryCount: number;
  uncompressedSize: number;
  totalUncompressed: number;
  isMedia?: boolean;
}): void {
  if (opts.entryCount > MAX_ZIP_ENTRIES) {
    throw new Error(`PPTX has too many entries (>${MAX_ZIP_ENTRIES})`);
  }
  if (opts.totalUncompressed > MAX_UNCOMPRESSED_BYTES) {
    throw new Error(`PPTX uncompressed size exceeds ${MAX_UNCOMPRESSED_BYTES} bytes`);
  }
  if (opts.isMedia && opts.uncompressedSize > MAX_MEDIA_BYTES) {
    throw new Error(`Media blob exceeds ${MAX_MEDIA_BYTES} bytes`);
  }
}
