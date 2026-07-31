/** Browser shim for `node:path` — path math only; no real filesystem. */
export const sep = "/";
export const join = (...parts: string[]) =>
  parts
    .filter((p) => p != null && p !== "")
    .join("/")
    .replace(/\/{2,}/g, "/");
export const resolve = (...parts: string[]) => join(...parts);
export const dirname = (p: string) => {
  const i = p.replace(/\\/g, "/").lastIndexOf("/");
  return i <= 0 ? "." : p.slice(0, i);
};
export const basename = (p: string, ext?: string) => {
  const base = p.replace(/\\/g, "/").split("/").pop() ?? "";
  return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base;
};
export const extname = (p: string) => {
  const base = basename(p);
  const i = base.lastIndexOf(".");
  return i > 0 ? base.slice(i) : "";
};
export const relative = (from: string, to: string) => {
  if (to.startsWith(from)) return to.slice(from.length).replace(/^\//, "");
  return to;
};
export default { sep, join, resolve, dirname, basename, extname, relative };
