import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 10_000;
const DNS_TIMEOUT_MS = 2_000;

function parseIpv4(address: string): number[] | null {
  if (isIP(address) !== 4) return null;
  const octets = address.split(".").map(Number);
  return octets.length === 4 ? octets : null;
}

/** True only for ordinary globally routable unicast addresses. */
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
  if (address.includes(".")) {
    const mapped = address.slice(address.lastIndexOf(":") + 1);
    return address.startsWith("::ffff:") && isPublicNetworkAddress(mapped);
  }
  const first = Number.parseInt(address.split(":", 1)[0] || "0", 16);
  if (first < 0x2000 || first > 0x3fff) return false;
  if (address.startsWith("2001:db8:") || address.startsWith("2002:")) return false;
  return !address.startsWith("3fff:");
}

// DNS-rebinding caveat: this checks the resolved address at request time, but
// doesn't pin the connection to that exact address — a malicious DNS server
// with a very short TTL could theoretically re-resolve to a private address
// between this check and the actual fetch. A fully pinned fix would need a
// custom undici dispatcher; this precheck is the standard, much simpler
// mitigation and matches what most SSRF-prevention guidance recommends as a
// baseline.
export async function assertPublicHostname(hostname: string): Promise<void> {
  const normalized = hostname.trim().replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (
    !normalized ||
    normalized === "localhost" ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".local") ||
    normalized.endsWith(".internal") ||
    normalized.endsWith(".home.arpa")
  ) {
    throw new Error(`Refusing to fetch ${hostname}: private/internal hostname`);
  }
  if (isIP(normalized)) {
    if (!isPublicNetworkAddress(normalized)) {
      throw new Error(
        `Refusing to fetch ${hostname}: resolves to a private/internal address (${normalized})`
      );
    }
    return;
  }

  let addresses: Array<{ address: string; family: number }>;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    addresses = await Promise.race([
      lookup(normalized, { all: true, verbatim: true }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`DNS lookup timed out for ${normalized}`)),
          DNS_TIMEOUT_MS
        );
      }),
    ]);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("DNS lookup timed out")) throw error;
    throw new Error(`Could not resolve hostname: ${hostname}`);
  } finally {
    if (timer) clearTimeout(timer);
  }
  if (addresses.length === 0) {
    throw new Error(`Could not resolve hostname: ${hostname} returned no addresses`);
  }
  for (const { address } of addresses) {
    if (!isPublicNetworkAddress(address)) {
      throw new Error(
        `Refusing to fetch ${hostname}: resolves to a private/internal address (${address})`
      );
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

/**
 * Follow `url`'s redirect chain without keeping the body, validating every hop's
 * hostname, and return the final URL.
 *
 * Used by the computed-style fallback so Chromium can navigate straight to the
 * resolved URL. That keeps the document's base URL correct: the request guard
 * there fulfills responses against the *requesting* URL, which would otherwise
 * pin the document to the pre-redirect URL and silently break relative
 * subresource hrefs (`<link href="style.css">` on a `/` -> `/en/home` redirect).
 */
export async function resolvePublicUrl(url: string, redirectsLeft = MAX_REDIRECTS): Promise<string> {
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(`Unsupported URL scheme: ${url}`);
  }
  await assertPublicHostname(new URL(url).hostname);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: "manual", signal: controller.signal });
    try {
      await res.body?.cancel();
    } catch {
      // Body already consumed or unsupported by the runtime; nothing to release.
    }
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return url;
      if (redirectsLeft <= 0) throw new Error(`Too many redirects resolving ${url}`);
      return resolvePublicUrl(new URL(location, url).toString(), redirectsLeft - 1);
    }
    return url;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Timed out resolving ${url} (>${TIMEOUT_MS}ms)`);
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

  // Many frameworks (Next.js, Vite, Astro) inline critical CSS — including the
  // :root custom properties we're after — into a <style> block instead of a
  // linked stylesheet. The HTML is already in memory, so read it rather than
  // reporting "found nothing" and triggering the Chromium fallback.
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const inline = (match[1] ?? "").trim();
    if (inline) cssParts.push(inline);
  }

  return cssParts.join("\n");
}
