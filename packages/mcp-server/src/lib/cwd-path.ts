import { basename, dirname, join, resolve, sep } from "node:path";
import { realpath } from "node:fs/promises";

/**
 * Resolve a path under cwd using realpath on the nearest existing ancestor so
 * cwd-relative symlinks / `../` escapes cannot leave the workspace on write.
 */
export async function assertWritablePathInCwd(relPath: string, label: string): Promise<string> {
  const root = await realpath(process.cwd());
  const resolved = resolve(process.cwd(), relPath);
  const segments: string[] = [];
  let probe = resolved;
  for (;;) {
    try {
      const real = await realpath(probe);
      if (real !== root && !real.startsWith(root + sep)) {
        throw new Error(`'${label}' must be within the current working directory (${root}).`);
      }
      const finalPath = segments.length ? join(real, ...segments.reverse()) : real;
      if (finalPath !== root && !finalPath.startsWith(root + sep)) {
        throw new Error(`'${label}' must be within the current working directory (${root}).`);
      }
      return finalPath;
    } catch (err) {
      if (err instanceof Error && /must be within/.test(err.message)) throw err;
      const parent = dirname(probe);
      if (parent === probe) {
        throw new Error(`'${label}' not found: ${relPath}`);
      }
      segments.push(basename(probe));
      probe = parent;
    }
  }
}

export async function assertExistingPathInCwd(relPath: string, label: string): Promise<string> {
  const root = await realpath(process.cwd());
  let resolvedPath: string;
  try {
    resolvedPath = await realpath(resolve(process.cwd(), relPath));
  } catch {
    throw new Error(`'${label}' not found: ${relPath}`);
  }
  if (resolvedPath !== root && !resolvedPath.startsWith(root + sep)) {
    throw new Error(`'${label}' must be within the current working directory (${root}).`);
  }
  return resolvedPath;
}
