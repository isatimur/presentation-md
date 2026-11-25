const NAME_RE = /^[a-z][a-z0-9-]*$/;

export function deriveNameFromUrl(url: string): string {
  const hostname = new URL(url).hostname.replace(/^www\./, "");
  const slug = hostname.replace(/\./g, "-").toLowerCase();
  if (!NAME_RE.test(slug)) {
    throw new Error(
      `Could not derive a valid theme name from "${url}" (got "${slug}"). Pass a name explicitly.`
    );
  }
  return slug;
}

/**
 * Theme name from a file name: `Acme Brand.potx` → `acme-brand`. Base name
 * without extension, lower-case, runs outside [a-z0-9] become "-", trimmed of
 * "-", then checked against the theme-name rule.
 */
export function deriveNameFromPath(path: string): string {
  const file = path.split(/[\\/]/).pop() ?? "";
  const dot = file.lastIndexOf(".");
  const stem = dot > 0 ? file.slice(0, dot) : file;
  const slug = stem
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!NAME_RE.test(slug)) {
    throw new Error(`Could not derive a valid theme name from '${file}'. Pass 'name' explicitly.`);
  }
  return slug;
}
