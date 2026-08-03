/**
 * Optional multimodal tool result — JSON payload + MCP image content blocks.
 * Handlers return this when vision clients should see PNGs in-chat (show-don't-tell).
 */

export type McpImagePayload = {
  data: string;
  mimeType: string;
  /** Short label for the accompanying text line (not sent as MCP annotations). */
  label?: string;
};

/** Bound each inline image before base64 expansion into an MCP response. */
export const MAX_MCP_INLINE_IMAGE_BYTES = 8 * 1024 * 1024;

export function isMcpInlineImageSizeAllowed(bytes: number): boolean {
  return Number.isSafeInteger(bytes) && bytes > 0 && bytes <= MAX_MCP_INLINE_IMAGE_BYTES;
}

export function encodeMcpInlineImage(bytes: Uint8Array): string | null {
  if (!isMcpInlineImageSizeAllowed(bytes.byteLength)) return null;
  return Buffer.from(bytes).toString("base64");
}

export type RichToolResult = {
  __pmd_rich: true;
  payload: Record<string, unknown>;
  images?: McpImagePayload[];
};

export function richToolResult(
  payload: Record<string, unknown>,
  images?: McpImagePayload[]
): RichToolResult {
  return {
    __pmd_rich: true,
    payload,
    ...(images && images.length > 0 ? { images } : {}),
  };
}

export function isRichToolResult(value: unknown): value is RichToolResult {
  return Boolean(
    value &&
      typeof value === "object" &&
      (value as RichToolResult).__pmd_rich === true &&
      typeof (value as RichToolResult).payload === "object" &&
      (value as RichToolResult).payload !== null
  );
}
