/**
 * HTML → vector PDF via the skill/core export-pdf.sh pipeline (Playwright
 * Chromium print, one page per .slide). Keeps Playwright out of the render
 * package dependency tree — first run installs into core/scripts.
 */
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getCorePackageRoot } from "@presentation-md/core";

export function resolveExportPdfScript(): string {
  return join(getCorePackageRoot(), "scripts", "export-pdf.sh");
}

function runExportPdf(script: string, htmlPath: string, pdfPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("bash", [script, htmlPath, pdfPath], {
      // Capture install chatter — MCP stdio must stay clean.
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d: Buffer) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d: Buffer) => {
      stderr += d.toString();
    });
    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      const detail = [stderr.trim(), stdout.trim()].filter(Boolean).join("\n");
      reject(
        new Error(
          `PDF export failed (exit ${code ?? "null"})${detail ? `:\n${detail}` : ""}`
        )
      );
    });
  });
}

/** Render an existing deck HTML file to a PDF Buffer (vector print pipeline). */
export async function htmlFileToPdfBuffer(htmlPath: string): Promise<Buffer> {
  const script = resolveExportPdfScript();
  const dir = await mkdtemp(join(tmpdir(), "pmd-pdf-"));
  const pdfPath = join(dir, "deck.pdf");
  try {
    await runExportPdf(script, htmlPath, pdfPath);
    return await readFile(pdfPath);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/** Write HTML string to a temp file, print to PDF, return bytes. */
export async function htmlStringToPdfBuffer(html: string): Promise<Buffer> {
  const dir = await mkdtemp(join(tmpdir(), "pmd-pdf-html-"));
  const htmlPath = join(dir, "deck.html");
  try {
    await writeFile(htmlPath, html, "utf-8");
    const script = resolveExportPdfScript();
    const pdfPath = join(dir, "deck.pdf");
    await runExportPdf(script, htmlPath, pdfPath);
    return await readFile(pdfPath);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
