const MAX_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 10_000;

export async function fetchText(url: string, redirectsLeft = MAX_REDIRECTS): Promise<string> {
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(`Unsupported URL scheme: ${url}`);
  }
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
