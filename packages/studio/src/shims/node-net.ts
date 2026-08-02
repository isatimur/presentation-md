/** Browser shim for `node:net` — IP classification lives in pure JS in export. */
export function isIP(_input: string): 0 | 4 | 6 {
  return 0;
}
