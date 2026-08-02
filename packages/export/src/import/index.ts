import { extractPptx } from "./extract.js";
import { mapExtractedToDeck } from "./map.js";
import type { ExtractOptions, ImportOptions, MapOptions } from "./types.js";

export type {
  ExtractedImage,
  ExtractedSlide,
  ExtractedPresentation,
  ExtractOptions,
  MapOptions,
  ImportOptions,
} from "./types.js";

export { extractPptx } from "./extract.js";
export { mapExtractedToDeck } from "./map.js";
export { MAX_COMPRESSED_BYTES, assertZipArchiveSafe } from "./zip-limits.js";

export async function pptxToDeck(
  input: Uint8Array | Buffer,
  opts: ImportOptions = {}
): Promise<{
  deck: import("../deck-types.js").DeckJson;
  extracted: import("./types.js").ExtractedPresentation;
  warnings: string[];
}> {
  const extractOpts: ExtractOptions = { onWarn: opts.onWarn };
  const mapOpts: MapOptions = {
    theme: opts.theme,
    assetsDir: opts.assetsDir,
    onWarn: opts.onWarn,
  };
  const { extracted, warnings: extractWarnings } = await extractPptx(input, extractOpts);
  const { deck, warnings: mapWarnings } = await mapExtractedToDeck(extracted, mapOpts);
  return { deck, extracted, warnings: [...extractWarnings, ...mapWarnings] };
}
