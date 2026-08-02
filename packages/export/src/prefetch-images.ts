import type { DeckJson, Slide } from "./deck-types.js";

export interface PrefetchImagesOptions {
  /** Override fetch (tests / custom agents). Defaults to global `fetch`. */
  fetch?: typeof globalThis.fetch;
  /** Max bytes per image (default 8 MiB). Oversized sources are skipped with a warning. */
  maxBytes?: number;
  /** Max wall time per remote image, including redirects/body (default 10 seconds). */
  timeoutMs?: number;
  /** Override DNS resolution (tests / controlled runtimes). Node defaults to dns.lookup(all). */
  resolveHostname?: (hostname: string) => Promise<string[]>;
  /**
   * Directories under which local / `file:` paths may be read.
   * Defaults to `[process.cwd()]` when running in Node. Paths (and their
   * realpath targets) must stay inside one of these roots.
   */
  allowedRoots?: string[];
  /**
   * Override local file reads (tests). Defaults to `fs.promises.readFile`.
   * When unset and Node fs is unavailable (browser), local sources are skipped.
   */
  readFile?: (absolutePath: string) => Promise<Uint8Array>;
}

export interface PrefetchImagesResult {
  deck: DeckJson;
  warnings: string[];
}

const DEFAULT_MAX_BYTES = 8 * 1024 * 1024;
const DEFAULT_REMOTE_TIMEOUT_MS = 10_000;
const DNS_TIMEOUT_MS = 2_000;
const MAX_REMOTE_REDIRECTS = 5;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|bmp|svg)$/i;

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function sniffMime(bytes: Uint8Array, fallback: string): string {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes.length >= 6 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  if (fallback.startsWith("image/")) return fallback;
  if (fallback === "image/svg+xml" || fallback.endsWith("+xml")) return "image/svg+xml";
  return "image/png";
}

function mimeFromPath(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".bmp")) return "image/bmp";
  if (lower.endsWith(".avif")) return "image/avif";
  return "image/png";
}

function isHttpUrl(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

function isFileUrl(src: string): boolean {
  return /^file:/i.test(src);
}

/**
 * True for absolute/relative filesystem paths (and `file:` URLs).
 * Rejects other schemes (`http:`, `data:`, `blob:`, …).
 * Avoids Node APIs so this stays browser-safe for Studio bundling.
 */
function isLocalImageSource(src: string): boolean {
  if (!src || src.startsWith("data:") || isHttpUrl(src)) return false;
  if (isFileUrl(src)) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return false; // other scheme
  // Absolute POSIX / UNC / drive-letter paths
  if (src.startsWith("/") || src.startsWith("\\\\") || /^[A-Za-z]:[\\/]/.test(src)) return true;
  // Relative path — require an image extension or explicit ./ ../
  return IMAGE_EXT.test(src) || src.startsWith("./") || src.startsWith(".\\") || src.startsWith("../");
}

function defaultAllowedRoots(): string[] {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return [process.cwd()];
  }
  return [];
}

type NodePath = typeof import("node:path");
type NodeFsPromises = typeof import("node:fs/promises");
type NodeUrl = typeof import("node:url");

async function loadNodeApis(): Promise<{
  path: NodePath;
  fs: NodeFsPromises;
  url: NodeUrl;
}> {
  // Dynamic imports keep Studio's Vite bundle free of static node:* edges.
  const [path, fs, url] = await Promise.all([
    import("node:path"),
    import("node:fs/promises"),
    import("node:url"),
  ]);
  return { path, fs, url };
}

function normalizeRoot(root: string, path: NodePath): string {
  const resolved = path.resolve(root);
  return resolved.endsWith(path.sep) ? resolved : resolved + path.sep;
}

async function assertPathAllowed(
  absolutePath: string,
  allowedRoots: string[],
  path: NodePath,
  fs: NodeFsPromises
): Promise<string> {
  if (!allowedRoots.length) {
    throw new Error("local image prefetch requires allowedRoots (or process.cwd())");
  }
  if (absolutePath.includes("\0")) {
    throw new Error("path contains null byte");
  }

  let realTarget: string;
  try {
    realTarget = await fs.realpath(absolutePath);
  } catch {
    realTarget = path.resolve(absolutePath);
  }

  const roots = allowedRoots.map((r) => normalizeRoot(r, path));
  const ok = roots.some((root) => {
    const rootDir = root.slice(0, -1);
    return realTarget === rootDir || realTarget.startsWith(root);
  });
  if (!ok) {
    throw new Error(`path outside allowedRoots: ${absolutePath}`);
  }
  return realTarget;
}

async function resolveLocalPath(src: string, path: NodePath, url: NodeUrl): Promise<string> {
  if (isFileUrl(src)) {
    return url.fileURLToPath(src);
  }
  return path.resolve(src);
}

async function readLocalBytes(
  src: string,
  opts: PrefetchImagesOptions,
  maxBytes: number
): Promise<{ bytes: Uint8Array; mimeHint: string }> {
  const { path, fs, url } = await loadNodeApis();
  const allowedRoots = opts.allowedRoots ?? defaultAllowedRoots();
  const absolute = await resolveLocalPath(src, path, url);
  const safePath = await assertPathAllowed(absolute, allowedRoots, path, fs);

  const reader =
    opts.readFile ??
    (async (p: string) => {
      const info = await fs.stat(p);
      if (info.size > maxBytes) {
        throw new Error(`image exceeds ${maxBytes} byte limit (${info.size} bytes)`);
      }
      const buf = await fs.readFile(p);
      return new Uint8Array(buf);
    });

  const bytes = await reader(safePath);
  return { bytes, mimeHint: mimeFromPath(safePath) };
}

function toDataUri(bytes: Uint8Array, mimeHint: string): string {
  if (bytes.byteLength === 0) throw new Error("empty image");
  const mime = sniffMime(bytes, mimeHint || "image/png");
  return `data:${mime};base64,${bytesToBase64(bytes)}`;
}

function isNodeRuntime(): boolean {
  return (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    typeof process.versions?.node === "string"
  );
}

function parseIpv4(address: string): number[] | null {
  const parts = address.split(".");
  if (parts.length !== 4) return null;
  const octets = parts.map((p) => {
    if (!/^\d{1,3}$/.test(p)) return NaN;
    return Number(p);
  });
  if (octets.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return octets;
}

function classifyIp(rawAddress: string): 0 | 4 | 6 {
  const address = rawAddress.trim().replace(/^\[|\]$/g, "").toLowerCase();
  if (parseIpv4(address)) return 4;
  // Loose IPv6: contains colon and only hex/colon/dot chars.
  if (address.includes(":") && /^[0-9a-f:.]+$/i.test(address)) return 6;
  return 0;
}

/** True only for ordinary globally routable unicast addresses. */
function isPublicNetworkAddress(rawAddress: string): boolean {
  const address = rawAddress.trim().replace(/^\[|\]$/g, "").toLowerCase();
  const family = classifyIp(address);
  if (family === 4) {
    const [a = 0, b = 0, c = 0] = parseIpv4(address) ?? [];
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
  if (family !== 6) return false;
  if (address.includes(".")) {
    const mapped = address.slice(address.lastIndexOf(":") + 1);
    return address.startsWith("::ffff:") && isPublicNetworkAddress(mapped);
  }
  const first = Number.parseInt(address.split(":", 1)[0] || "0", 16);
  if (first < 0x2000 || first > 0x3fff) return false;
  if (address.startsWith("2001:db8:") || address.startsWith("2002:")) return false;
  return !address.startsWith("3fff:");
}

async function defaultResolveHostname(hostname: string): Promise<string[]> {
  // Dynamic import keeps browser bundlers from requiring Node built-ins at
  // evaluate-time; Studio also aliases node:dns/promises to an empty shim.
  const { lookup } = await import("node:dns/promises");
  return (await lookup(hostname, { all: true, verbatim: true })).map(({ address }) => address);
}

async function isAllowedRemoteUrl(
  rawUrl: string,
  resolver: (hostname: string) => Promise<string[]>,
  cache: Map<string, Promise<boolean>>,
  /** When true (browser Studio), skip DNS and allow hostnames that passed name filters. */
  skipDns = !isNodeRuntime()
): Promise<boolean> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return false;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  const hostname = url.hostname
    .replace(/^\[|\]$/g, "")
    .replace(/\.$/, "")
    .toLowerCase();
  if (
    !hostname ||
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".home.arpa")
  ) {
    return false;
  }

  if (classifyIp(hostname)) return isPublicNetworkAddress(hostname);
  // Browser / non-Node: hostname already cleared private-name filters; DNS pin
  // is a Node SSRF control and would blank-screen if forced through Vite externals.
  if (skipDns) return true;

  let decision = cache.get(hostname);
  if (!decision) {
    decision = (async () => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      try {
        const addresses = await Promise.race([
          resolver(hostname),
          new Promise<never>((_, reject) => {
            timer = setTimeout(
              () => reject(new Error(`DNS lookup timed out for ${hostname}`)),
              DNS_TIMEOUT_MS
            );
          }),
        ]);
        if (addresses.length === 0) return false;
        return addresses.every((address) => isPublicNetworkAddress(address));
      } catch {
        return false;
      } finally {
        if (timer) clearTimeout(timer);
      }
    })();
    cache.set(hostname, decision);
  }
  return decision;
}

async function cancelResponseBody(response: Response): Promise<void> {
  try {
    await response.body?.cancel();
  } catch {
    // Already consumed/locked or unsupported; nothing else to release.
  }
}

async function readBoundedResponseBytes(response: Response, maxBytes: number): Promise<Uint8Array> {
  const declaredRaw = response.headers?.get?.("content-length");
  const declared = declaredRaw && /^\d+$/.test(declaredRaw) ? Number(declaredRaw) : undefined;
  if (declared !== undefined && declared > maxBytes) {
    await cancelResponseBody(response);
    throw new Error(`image exceeds ${maxBytes} byte limit (${declared} declared bytes)`);
  }

  const reader = response.body?.getReader?.();
  if (!reader) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > maxBytes) {
      throw new Error(`image exceeds ${maxBytes} byte limit (${bytes.byteLength} bytes)`);
    }
    return bytes;
  }

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      try {
        await reader.cancel();
      } catch {
        // The stream may already have closed while crossing the limit.
      }
      throw new Error(`image exceeds ${maxBytes} byte limit (stream exceeded limit)`);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

async function fetchRemoteImage(
  src: string,
  fetchImpl: typeof globalThis.fetch,
  opts: PrefetchImagesOptions,
  maxBytes: number,
  hostnameCache: Map<string, Promise<boolean>>
): Promise<{ bytes: Uint8Array; mimeHint: string }> {
  const enforceServerPolicy = isNodeRuntime() || opts.resolveHostname !== undefined;
  const resolver = opts.resolveHostname ?? defaultResolveHostname;
  const controller = new AbortController();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_REMOTE_TIMEOUT_MS;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let currentUrl = src;
  try {
    for (let hop = 0; ; hop += 1) {
      if (
        enforceServerPolicy &&
        !(await isAllowedRemoteUrl(currentUrl, resolver, hostnameCache))
      ) {
        throw new Error(`remote image URL is not public: ${currentUrl}`);
      }
      const response = await fetchImpl(currentUrl, {
        redirect: enforceServerPolicy ? "manual" : "follow",
        signal: controller.signal,
      });
      if (enforceServerPolicy && response.status >= 300 && response.status < 400) {
        const location = response.headers?.get?.("location");
        await cancelResponseBody(response);
        if (!location) throw new Error(`redirect has no Location header: ${currentUrl}`);
        if (hop >= MAX_REMOTE_REDIRECTS) {
          throw new Error(`too many redirects fetching remote image: ${src}`);
        }
        currentUrl = new URL(location, currentUrl).toString();
        continue;
      }
      if (!response.ok) {
        await cancelResponseBody(response);
        throw new Error(`HTTP ${response.status}`);
      }
      const bytes = await readBoundedResponseBytes(response, maxBytes);
      const headerType =
        (response.headers?.get?.("content-type") ?? "").split(";")[0]?.trim() ?? "";
      return { bytes, mimeHint: headerType || "image/png" };
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`remote image timed out after ${timeoutMs}ms: ${src}`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Prefetch slide images to `data:` URIs so PPTX export can embed them.
 * Supports remote `http(s)` URLs and local `file:` / filesystem paths (Node),
 * with path confinement to `allowedRoots`. Data URIs are left untouched.
 *
 * Browser-safe: Node builtins are loaded only on the local-file path via
 * dynamic `import()`, so Studio can bundle the http(s) path.
 */
export async function prefetchDeckImages(
  deck: DeckJson,
  opts: PrefetchImagesOptions = {}
): Promise<PrefetchImagesResult> {
  const warnings: string[] = [];
  const fetchImpl = opts.fetch ?? globalThis.fetch;
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BYTES;
  const hostnameCache = new Map<string, Promise<boolean>>();

  const slides: Slide[] = [];
  for (const slide of deck.slides ?? []) {
    const src = slide.image;
    if (!src || src.startsWith("data:")) {
      slides.push(slide);
      continue;
    }

    try {
      if (isHttpUrl(src)) {
        if (typeof fetchImpl !== "function") {
          warnings.push(
            `Remote image prefetch unavailable (no fetch); remote URL will not embed in PPTX: ${src}`
          );
          slides.push(slide);
          continue;
        }
        const { bytes, mimeHint } = await fetchRemoteImage(
          src,
          fetchImpl,
          opts,
          maxBytes,
          hostnameCache
        );
        const dataUri = toDataUri(bytes, mimeHint);
        slides.push({ ...slide, image: dataUri });
        continue;
      }

      if (isLocalImageSource(src)) {
        const { bytes, mimeHint } = await readLocalBytes(src, opts, maxBytes);
        if (bytes.byteLength > maxBytes) {
          throw new Error(`image exceeds ${maxBytes} byte limit (${bytes.byteLength} bytes)`);
        }
        const dataUri = toDataUri(bytes, mimeHint);
        slides.push({ ...slide, image: dataUri });
        continue;
      }

      slides.push(slide);
    } catch (err) {
      warnings.push(`Could not prefetch image (${(err as Error).message}): ${src}`);
      slides.push(slide);
    }
  }

  return { deck: { ...deck, slides }, warnings };
}

/** @internal Exported for unit tests. */
export const __prefetchTestUtils = {
  isLocalImageSource,
};
