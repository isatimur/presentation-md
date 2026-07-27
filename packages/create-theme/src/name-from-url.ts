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
