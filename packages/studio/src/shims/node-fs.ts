/** Browser shim for `node:fs` / `node:fs/promises` — Studio never reads the filesystem. */
function unavailable(api: string): never {
  throw new Error(`${api} is unavailable in the browser`);
}

export const readFile = async (..._args: unknown[]) => unavailable("fs.readFile");
export const writeFile = async (..._args: unknown[]) => unavailable("fs.writeFile");
export const mkdir = async (..._args: unknown[]) => unavailable("fs.mkdir");
export const readdir = async (..._args: unknown[]) => unavailable("fs.readdir");
export const stat = async (..._args: unknown[]) => unavailable("fs.stat");
export const realpath = async (..._args: unknown[]) => unavailable("fs.realpath");
export const access = async (..._args: unknown[]) => unavailable("fs.access");
export const readFileSync = (..._args: unknown[]) => unavailable("fs.readFileSync");
export const existsSync = (..._args: unknown[]) => false;
export const realpathSync = (..._args: unknown[]) => unavailable("fs.realpathSync");
export const constants = {};
export default {
  readFile,
  writeFile,
  mkdir,
  readdir,
  stat,
  realpath,
  access,
  readFileSync,
  existsSync,
  realpathSync,
  constants,
};
