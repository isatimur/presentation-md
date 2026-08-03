import { spawn } from "node:child_process";
import { access, constants } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BoundedProcessOutput } from "./process-output.js";
import { killProcessTree } from "./process-tree.js";

const require = createRequire(import.meta.url);

export const DEFAULT_DEPLOY_TIMEOUT_MS = 300_000;

function deployTimeoutMs(): number {
  const raw = process.env["PRESENTATION_MD_DEPLOY_TIMEOUT_MS"];
  if (raw == null || raw === "") return DEFAULT_DEPLOY_TIMEOUT_MS;
  const timeoutMs = Number(raw);
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
    throw new Error("PRESENTATION_MD_DEPLOY_TIMEOUT_MS must be a positive integer");
  }
  return timeoutMs;
}

export type DeployDeckOptions = {
  /** Absolute or cwd-relative path to deck.html or a deck directory. */
  path: string;
  /** Publish permanently (deploy.sh --prod). Default: preview. */
  prod?: boolean;
  /**
   * Opt-in gate — without this, only validates + prints a dry-run plan.
   * Agents must confirm with a human before setting true (externally visible).
   */
  confirm?: boolean;
  /** Extra gate for --prod (production is permanent). */
  confirmProd?: boolean;
};

export type DeployDeckResult = {
  dry_run: boolean;
  path: string;
  prod: boolean;
  script: string;
  url?: string;
  message: string;
  hint?: string;
};

/** Locate packages/core/scripts/deploy.sh from the installed @presentation-md/core package. */
export function resolveDeployScript(): string {
  const coreMain = require.resolve("@presentation-md/core");
  return join(dirname(coreMain), "..", "scripts", "deploy.sh");
}

async function assertReadable(path: string): Promise<void> {
  try {
    await access(path, constants.R_OK);
  } catch {
    throw new Error(`Deploy path not found or unreadable: ${path}`);
  }
}

/**
 * Thin wrapper around core's deploy.sh.
 * Defaults to dry-run unless `confirm` is true — avoids thrashing remote Vercel from agents.
 */
export async function deployDeck(opts: DeployDeckOptions): Promise<DeployDeckResult> {
  const script = resolveDeployScript();
  await assertReadable(script);
  await assertReadable(opts.path);

  const prod = opts.prod === true;

  if (opts.confirm !== true) {
    return {
      dry_run: true,
      path: opts.path,
      prod,
      script,
      message:
        "Dry-run only — deploy.sh was not invoked. Re-run with confirm=true / --confirm-deploy after the human approves a shareable (usually preview) URL.",
      hint: `Would run: bash ${script} ${opts.path}${prod ? " --prod" : ""}${
        prod ? " (also requires confirmProd/confirm_prod)" : ""
      }`,
    };
  }

  if (prod && opts.confirmProd !== true) {
    throw new Error(
      "Production deploy refused: pass confirmProd/confirm_prod (and confirm) after the human explicitly approves a permanent publish."
    );
  }

  const url = await runDeployScript(script, opts.path, prod);
  return {
    dry_run: false,
    path: opts.path,
    prod,
    script,
    url,
    message: prod
      ? `Deployed to production → ${url}`
      : `Deployed preview → ${url} (pass --prod / prod:true only after human confirmation)`,
  };
}

function runDeployScript(script: string, inputPath: string, prod: boolean): Promise<string> {
  const timeoutMs = deployTimeoutMs();
  return new Promise((resolve, reject) => {
    const args = [script, inputPath];
    if (prod) args.push("--prod");
    const child = spawn("bash", args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
      detached: process.platform !== "win32",
    });
    const output = new BoundedProcessOutput("Deploy process");
    let outputError: Error | undefined;
    let settled = false;
    let timedOut = false;
    const timeout = setTimeout(() => {
      if (child.exitCode != null || child.signalCode != null) return;
      timedOut = true;
      killProcessTree(child);
    }, timeoutMs);
    child.stdout.on("data", (chunk: Buffer | string) => {
      if (outputError) return;
      try {
        output.append("stdout", chunk);
      } catch (error) {
        outputError = error as Error;
        killProcessTree(child);
      }
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      if (outputError) return;
      try {
        output.append("stderr", chunk);
      } catch (error) {
        outputError = error as Error;
        killProcessTree(child);
      }
    });
    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(err);
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (outputError) {
        reject(outputError);
        return;
      }
      if (timedOut) {
        reject(new Error(`Deploy timed out after ${timeoutMs}ms`));
        return;
      }
      const stdout = output.text("stdout");
      const stderr = output.text("stderr");
      const combined = `${stdout}\n${stderr}`.trim();
      const url = stdout.match(/^Deployed -> (https:\/\/[^\s]+)\s*$/m)?.[1];
      if (code !== 0) {
        reject(
          new Error(
            `deploy.sh exited ${code}${combined ? `:\n${combined}` : ""}`
          )
        );
        return;
      }
      if (!url || !url.startsWith("https://")) {
        reject(
          new Error(
            `deploy.sh completed but no trusted deployment URL marker was found${combined ? `:\n${combined}` : ""}`
          )
        );
        return;
      }
      resolve(url);
    });
  });
}

/** Test-only: package-relative path used when resolving the script in monorepo. */
export function deployScriptRelativeFromHere(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, "..", "..", "core", "scripts", "deploy.sh");
}
