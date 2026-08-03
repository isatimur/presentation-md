export const DEFAULT_CHILD_OUTPUT_MAX_BYTES = 1024 * 1024;

export function childOutputMaxBytes(): number {
  const raw = process.env["PRESENTATION_MD_CHILD_OUTPUT_MAX_BYTES"];
  if (raw == null || raw === "") return DEFAULT_CHILD_OUTPUT_MAX_BYTES;
  const maxBytes = Number(raw);
  if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0) {
    throw new Error("PRESENTATION_MD_CHILD_OUTPUT_MAX_BYTES must be a positive integer");
  }
  return maxBytes;
}

type OutputStream = "stdout" | "stderr";

export class BoundedProcessOutput {
  readonly #chunks: Record<OutputStream, Buffer[]> = { stdout: [], stderr: [] };
  #totalBytes = 0;

  constructor(
    readonly label: string,
    readonly maxBytes = childOutputMaxBytes()
  ) {}

  append(stream: OutputStream, chunk: Uint8Array | string): void {
    const bytes = typeof chunk === "string" ? Buffer.from(chunk) : Buffer.from(chunk);
    const nextTotal = this.#totalBytes + bytes.byteLength;
    if (nextTotal > this.maxBytes) {
      throw new Error(`${this.label} output exceeds ${this.maxBytes} bytes`);
    }
    this.#totalBytes = nextTotal;
    this.#chunks[stream].push(bytes);
  }

  text(stream: OutputStream): string {
    return Buffer.concat(this.#chunks[stream]).toString("utf8");
  }
}
