import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export type PdfHostnameResolver = (hostname: string) => Promise<string[]>;

export const MAX_PDF_HTML_BYTES = 64 * 1024 * 1024;

export class PdfHtmlBodyTooLargeError extends Error {
  constructor(maxBytes: number) {
    super(`PDF HTML body exceeds ${maxBytes} bytes`);
    this.name = "PdfHtmlBodyTooLargeError";
  }
}

export function isAllowedPdfRequestOrigin(
  originHeader: string | undefined,
  hostHeader: string | undefined
): boolean {
  if (!originHeader) return true;
  if (!hostHeader) return false;
  try {
    const origin = new URL(originHeader);
    return (
      (origin.protocol === "http:" || origin.protocol === "https:") &&
      origin.host.toLowerCase() === hostHeader.trim().toLowerCase()
    );
  } catch {
    return false;
  }
}

export function isPdfHtmlContentType(contentType: string | undefined): boolean {
  return /^text\/html(?:\s*;|\s*$)/i.test(contentType ?? "");
}

export interface ConcurrencyLimiter {
  tryAcquire: () => (() => void) | null;
  active: () => number;
}

export function createConcurrencyLimiter(maxConcurrent: number): ConcurrencyLimiter {
  if (!Number.isInteger(maxConcurrent) || maxConcurrent < 1) {
    throw new Error("maxConcurrent must be a positive integer");
  }
  let active = 0;
  return {
    tryAcquire: () => {
      if (active >= maxConcurrent) return null;
      active += 1;
      let released = false;
      return () => {
        if (released) return;
        released = true;
        active -= 1;
      };
    },
    active: () => active,
  };
}

/** Collect an HTTP body without allowing an unbounded Buffer.concat allocation. */
export async function readBoundedPdfHtmlBody(
  source: AsyncIterable<unknown>,
  maxBytes = MAX_PDF_HTML_BYTES
): Promise<string> {
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const rawChunk of source) {
    const chunk = Buffer.isBuffer(rawChunk) ? rawChunk : Buffer.from(rawChunk as Uint8Array);
    total += chunk.byteLength;
    if (total > maxBytes) throw new PdfHtmlBodyTooLargeError(maxBytes);
    chunks.push(chunk);
  }
  return Buffer.concat(chunks, total).toString("utf8");
}

function parseIpv4(address: string): number[] | null {
  if (isIP(address) !== 4) return null;
  const octets = address.split(".").map(Number);
  return octets.length === 4 ? octets : null;
}

/** Conservative global-unicast check for browser subresources in headless PDF. */
export function isPublicNetworkAddress(rawAddress: string): boolean {
  const address = rawAddress.trim().replace(/^\[|\]$/g, "").toLowerCase();
  const ipv4 = parseIpv4(address);
  if (ipv4) {
    const [a = 0, b = 0, c = 0] = ipv4;
    if (a === 0 || a === 10 || a === 127 || a >= 224) return false;
    if (a === 100 && b >= 64 && b <= 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && (b === 168 || (b === 0 && (c === 0 || c === 2)))) return false;
    if (a === 192 && b === 88 && c === 99) return false;
    if (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) return false;
    if (a === 203 && b === 0 && c === 113) return false;
    return true;
  }

  if (isIP(address) !== 6) return false;
  // IPv4-mapped forms, loopback, ULA, link-local, multicast, documentation,
  // and transition mechanisms are outside the direct global-unicast envelope.
  if (address.includes(".")) {
    const mapped = address.slice(address.lastIndexOf(":") + 1);
    return isPublicNetworkAddress(mapped) && address.startsWith("::ffff:");
  }
  const first = Number.parseInt(address.split(":", 1)[0] || "0", 16);
  if (first < 0x2000 || first > 0x3fff) return false;
  if (address.startsWith("2001:db8:") || address.startsWith("2002:")) return false;
  return true;
}

const defaultResolver: PdfHostnameResolver = async (hostname) =>
  (await lookup(hostname, { all: true, verbatim: true })).map(({ address }) => address);

/**
 * Allow inline browser assets and HTTP(S) hosts whose complete DNS answer set is
 * globally routable. Local/file/special protocols fail closed.
 */
export async function isAllowedPdfSubresourceUrl(
  rawUrl: string,
  resolveHostname: PdfHostnameResolver = defaultResolver
): Promise<boolean> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return false;
  }

  if (url.protocol === "data:" || url.protocol === "blob:" || url.protocol === "about:") {
    return true;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;

  const hostname = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".home.arpa")
  ) {
    return false;
  }
  if (isIP(hostname)) return isPublicNetworkAddress(hostname);

  try {
    const addresses = await resolveHostname(hostname);
    return addresses.length > 0 && addresses.every(isPublicNetworkAddress);
  } catch {
    return false;
  }
}
