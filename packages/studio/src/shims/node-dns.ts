/** Browser shim — Studio never resolves DNS; remote hostname SSRF is Node/CLI-only. */
export async function lookup(
  _hostname: string,
  _opts?: { all?: boolean; verbatim?: boolean }
): Promise<Array<{ address: string; family: number }>> {
  return [];
}
