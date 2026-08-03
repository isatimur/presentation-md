import { spawn } from "node:child_process";
import { access, constants } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

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
  return new Promise((resolve, reject) => {
    const args = [script, inputPath];
    if (prod) args.push("--prod");
    const child = spawn("bash", args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer | string) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      const combined = `${stdout}\n${stderr}`.trim();
      const urlMatch = combined.match(/https:\/\/[^\s]+/g);
      const url = urlMatch ? urlMatch[urlMatch.length - 1] : undefined;
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
            `deploy.sh completed but no https URL was found${combined ? `:\n${combined}` : ""}`
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
