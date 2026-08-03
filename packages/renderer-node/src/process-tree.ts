import type { ChildProcess } from "node:child_process";

export function killProcessTree(child: ChildProcess): void {
  if (process.platform !== "win32" && child.pid != null) {
    try {
      process.kill(-child.pid, "SIGKILL");
      return;
    } catch {
      // Fall through if the process group has already exited.
    }
  }
  child.kill("SIGKILL");
}
