import { spawn } from "node:child_process";
import { chmod, mkdir, mkdtemp, rm, truncate, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const deployScript = resolve(__dirname, "../scripts/deploy.sh");

function runDeploy(paths: string | string[], env: NodeJS.ProcessEnv): Promise<{
  code: number;
  stdout: string;
  stderr: string;
}> {
  return new Promise((resolveRun) => {
    const child = spawn("bash", [deployScript, ...(Array.isArray(paths) ? paths : [paths])], {
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => (stdout += chunk.toString("utf8")));
    child.stderr.on("data", (chunk: Buffer) => (stderr += chunk.toString("utf8")));
    child.on("close", (code) => resolveRun({ code: code ?? 1, stdout, stderr }));
  });
}

describe("deploy.sh single-file asset guard", () => {
  const dirs: string[] = [];

  async function fixture(html: string): Promise<{ htmlPath: string; env: NodeJS.ProcessEnv }> {
    const dir = await mkdtemp(join(tmpdir(), "pmd-deploy-script-"));
    dirs.push(dir);
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeNpx = join(binDir, "npx");
    await writeFile(
      fakeNpx,
      '#!/bin/sh\nif [ "$3" = "whoami" ]; then exit "${FAKE_NPX_WHOAMI_EXIT:-0}"; fi\necho https://fake.invalid/deploy\n'
    );
    await chmod(fakeNpx, 0o755);
    const htmlPath = join(dir, "deck.html");
    await writeFile(htmlPath, html);
    return {
      htmlPath,
      env: { ...process.env, PATH: `${binDir}:${process.env["PATH"] ?? ""}` },
    };
  }

  afterEach(async () => {
    for (const dir of dirs.splice(0)) {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("refuses a single-quoted local image before invoking deploy", async () => {
    const { htmlPath, env } = await fixture("<!doctype html><img src='./local.png'>");
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("reports invalid local input before checking Vercel authentication", async () => {
    const { htmlPath, env } = await fixture("<!doctype html><img src='./local.png'>");
    const result = await runDeploy(htmlPath, { ...env, FAKE_NPX_WHOAMI_EXIT: "1" });

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stderr).not.toMatch(/not logged into/i);
  });

  it("refuses multiple deploy targets instead of silently choosing the last one", async () => {
    const { htmlPath, env } = await fixture("<!doctype html><h1>First</h1>");
    const otherPath = join(dirname(htmlPath), "other.html");
    await writeFile(otherPath, "<!doctype html><h1>Second</h1>");
    const result = await runDeploy([htmlPath, otherPath], env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/exactly one|multiple|unexpected argument/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("refuses an unquoted local image before invoking deploy", async () => {
    const { htmlPath, env } = await fixture("<!doctype html><img src=./local.png>");
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("refuses a local CSS url before invoking deploy", async () => {
    const { htmlPath, env } = await fixture(
      "<!doctype html><style>.hero{background:url('./local.png')}</style>"
    );
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("refuses a local quoted CSS import before invoking deploy", async () => {
    const { htmlPath, env } = await fixture(
      '<!doctype html><style>@import "./theme.css";</style>'
    );
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("refuses a local responsive image source before invoking deploy", async () => {
    const { htmlPath, env } = await fixture(
      '<!doctype html><img src="data:image/png;base64,eA==" srcset="./large.png 2x">'
    );
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("refuses a local candidate after an external srcset candidate", async () => {
    const { htmlPath, env } = await fixture(
      '<!doctype html><img srcset="https://cdn.example.com/small.png 1x, ./large.png 2x">'
    );
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/references local files/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });

  it("allows external, embedded, fragment, and contact links", async () => {
    const { htmlPath, env } = await fixture(`<!doctype html>
      <a href="mailto:hello@example.com">Email</a>
      <a href='tel:+12025550123'>Call</a>
      <a href="#details">Details</a>
      <img src="https://cdn.example.com/hero.png">
      <script src=https://cdn.example.com/runtime.js></script>
      <style>@import "https://cdn.example.com/theme.css";
        .mark{background:url(data:image/png;base64,eA==)}</style>`);
    const result = await runDeploy(htmlPath, env);

    expect(result.code).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("https://fake.invalid/deploy");
  });

  it("refuses oversized single-file HTML before collecting or deploying it", async () => {
    const { htmlPath, env } = await fixture("<!doctype html>");
    await truncate(htmlPath, 64 * 1024 * 1024 + 1);
    const result = await runDeploy(htmlPath, env);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/too large|exceeds/i);
    expect(result.stdout).not.toContain("fake.invalid");
  });
});
