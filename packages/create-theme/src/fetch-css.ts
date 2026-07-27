import { lookup } from "node:dns/promises";

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 10_000;

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
  const ranges: Array<[string, number]> = [
    ["0.0.0.0", 8],
    ["10.0.0.0", 8],
    ["100.64.0.0", 10],
    ["127.0.0.0", 8],
    ["169.254.0.0", 16],
    ["172.16.0.0", 12],
    ["192.168.0.0", 16],
    ["224.0.0.0", 4],
  ];
  const ipInt = ipToInt(ip);
  return ranges.some(([base, bits]) => {
    const baseInt = ipToInt(base);
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
    return (ipInt & mask) === (baseInt & mask);
  });
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (/^fe[89ab][0-9a-f]:/.test(lower)) return true; // link-local fe80::/10
  if (/^f[cd][0-9a-f]{2}:/.test(lower)) return true; // ULA fc00::/7
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]!);
  return false;
}

// DNS-rebinding caveat: this checks the resolved address at request time, but
// doesn't pin the connection to that exact address — a malicious DNS server
// with a very short TTL could theoretically re-resolve to a private address
// between this check and the actual fetch. A fully pinned fix would need a
// custom undici dispatcher; this precheck is the standard, much simpler
// mitigation and matches what most SSRF-prevention guidance recommends as a
// baseline.
async function assertPublicHostname(hostname: string): Promise<void> {
  let addresses: Array<{ address: string; family: number }>;
  try {
    addresses = await lookup(hostname, { all: true });
  } catch {
    throw new Error(`Could not resolve hostname: ${hostname}`);
  }
  for (const { address, family } of addresses) {
    const isPrivate = family === 4 ? isPrivateIPv4(address) : isPrivateIPv6(address);
    if (isPrivate) {
      throw new Error(`Refusing to fetch ${hostname}: resolves to a private/internal address (${address})`);
    }
  }
}

export async function fetchText(url: string, redirectsLeft = MAX_REDIRECTS): Promise<string> {
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(`Unsupported URL scheme: ${url}`);
  }
  await assertPublicHostname(new URL(url).hostname);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, { redirect: "manual", signal: controller.signal });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new Error(`Redirect with no Location header: ${url}`);
      if (redirectsLeft <= 0) throw new Error(`Too many redirects fetching ${url}`);
      return fetchText(new URL(location, url).toString(), redirectsLeft - 1);
    }
    if (!res.ok) {
      throw new Error(`Fetch failed (${res.status}): ${url}`);
    }
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) {
      throw new Error(`Response too large (${buf.byteLength} bytes) fetching ${url}`);
    }
    return new TextDecoder("utf-8").decode(buf);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Timed out fetching ${url} (>${TIMEOUT_MS}ms)`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchStylesheetsFromUrl(url: string): Promise<string> {
  const html = await fetchText(url);
  const hrefs = [...html.matchAll(/<link\b[^>]*rel=["']?stylesheet["']?[^>]*>/gi)]
    .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1])
    .filter((h): h is string => !!h)
    .map((h) => new URL(h, url).toString());

  const cssParts: string[] = [];
  for (const href of hrefs) {
    try {
      cssParts.push(await fetchText(href));
    } catch {
      // One bad stylesheet shouldn't abort the whole extraction.
    }
  }
  return cssParts.join("\n");
}
