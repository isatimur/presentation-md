import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

export const MAX_CLI_TEXT_INPUT_BYTES = 10 * 1024 * 1024;

function assertInputSize(size: number, label: string, maxBytes: number): void {
  if (!Number.isSafeInteger(size) || size < 0) {
    throw new Error(`${label} size is invalid`);
  }
  if (size > maxBytes) {
    throw new Error(`${label} exceeds ${maxBytes} bytes`);
  }
}

export async function readUtf8StreamBounded(
  input: AsyncIterable<Uint8Array | string>,
  options: { label: string; maxBytes?: number }
): Promise<string> {
  const maxBytes = options.maxBytes ?? MAX_CLI_TEXT_INPUT_BYTES;
  assertInputSize(maxBytes, "Input limit", Number.MAX_SAFE_INTEGER);

  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of input) {
    const bytes = typeof chunk === "string" ? Buffer.from(chunk, "utf8") : Buffer.from(chunk);
    total += bytes.byteLength;
    assertInputSize(total, options.label, maxBytes);
    chunks.push(bytes);
  }
  return Buffer.concat(chunks, total).toString("utf8");
}

export async function readUtf8FileBounded(
  path: string,
  options: { label: string; maxBytes?: number }
): Promise<string> {
  const maxBytes = options.maxBytes ?? MAX_CLI_TEXT_INPUT_BYTES;
  const file = await stat(path);
  assertInputSize(file.size, options.label, maxBytes);
  return readUtf8StreamBounded(createReadStream(path), { ...options, maxBytes });
}
