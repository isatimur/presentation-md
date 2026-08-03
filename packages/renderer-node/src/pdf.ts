/**
 * HTML → vector PDF via the skill/core export-pdf.sh pipeline (Playwright
 * Chromium print, one page per .slide). Keeps Playwright out of the render
 * package dependency tree — first run installs into core/scripts.
 */
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getCorePackageRoot } from "@presentation-md/core";
import { BoundedProcessOutput } from "./process-output.js";
import { killProcessTree } from "./process-tree.js";

export function resolveExportPdfScript(): string {
  return join(getCorePackageRoot(), "scripts", "export-pdf.sh");
}

export const DEFAULT_PDF_EXPORT_TIMEOUT_MS = 180_000;
export const MAX_PDF_HTML_BYTES = 64 * 1024 * 1024;

function assertPdfHtmlSize(byteLength: number): void {
  if (byteLength > MAX_PDF_HTML_BYTES) {
    throw new Error(
      `PDF HTML exceeds ${MAX_PDF_HTML_BYTES} bytes (received ${byteLength} bytes)`
    );
  }
}

function pdfExportTimeoutMs(): number {
  const raw = process.env["PRESENTATION_MD_PDF_TIMEOUT_MS"];
  if (raw == null || raw === "") return DEFAULT_PDF_EXPORT_TIMEOUT_MS;
  const timeoutMs = Number(raw);
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
    throw new Error("PRESENTATION_MD_PDF_TIMEOUT_MS must be a positive integer");
  }
  return timeoutMs;
}

function runExportPdf(script: string, htmlPath: string, pdfPath: string): Promise<void> {
  const timeoutMs = pdfExportTimeoutMs();
  return new Promise((resolve, reject) => {
    const child = spawn("bash", [script, htmlPath, pdfPath], {
      // Capture install chatter — MCP stdio must stay clean.
      stdio: ["ignore", "pipe", "pipe"],
      detached: process.platform !== "win32",
    });
    const output = new BoundedProcessOutput("PDF export process");
    let outputError: Error | undefined;
    let settled = false;
    let timedOut = false;
    const timeout = setTimeout(() => {
      if (child.exitCode != null || child.signalCode != null) return;
      timedOut = true;
      killProcessTree(child);
    }, timeoutMs);
    child.stdout.on("data", (d: Buffer) => {
      if (outputError) return;
      try {
        output.append("stdout", d);
      } catch (error) {
        outputError = error as Error;
        killProcessTree(child);
      }
    });
    child.stderr.on("data", (d: Buffer) => {
      if (outputError) return;
      try {
        output.append("stderr", d);
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
        reject(new Error(`PDF export timed out after ${timeoutMs}ms`));
        return;
      }
      if (code === 0) {
        resolve();
        return;
      }
      const stdout = output.text("stdout");
      const stderr = output.text("stderr");
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
    const input = await stat(htmlPath);
    assertPdfHtmlSize(input.size);
    await runExportPdf(script, htmlPath, pdfPath);
    return await readFile(pdfPath);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/** Write HTML string to a temp file, print to PDF, return bytes. */
export async function htmlStringToPdfBuffer(html: string): Promise<Buffer> {
  assertPdfHtmlSize(Buffer.byteLength(html, "utf8"));
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
