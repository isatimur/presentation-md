/** Browser shim for `node:url` — Studio never resolves file: URLs to disk. */
export function fileURLToPath(url: string | URL): string {
  const href = typeof url === "string" ? url : url.href;
  if (href.startsWith("file:")) {
    return decodeURIComponent(href.replace(/^file:\/\//, ""));
  }
  // Core schema helpers call this with `import.meta.url` at module init.
  // In the browser that is an http(s) URL — return the pathname so SPA boot
  // does not crash; fs reads stay unavailable via the node-fs shim.
  try {
    return new URL(href).pathname;
  } catch {
    return href;
  }
}
export function pathToFileURL(path: string): URL {
  return new URL(`file://${path}`);
}
export default { fileURLToPath, pathToFileURL };
