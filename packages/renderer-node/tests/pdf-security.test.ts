import { createServer } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { htmlStringToPdfBuffer, MAX_PDF_HTML_BYTES } from "../src/pdf.js";

describe("shared CLI/MCP PDF security", () => {
  const servers: ReturnType<typeof createServer>[] = [];

  afterEach(async () => {
    await Promise.all(
      servers.splice(0).map(
        (server) =>
          new Promise<void>((resolve, reject) =>
            server.close((error) => (error ? reject(error) : resolve()))
          )
      )
    );
  });

  it("prints valid HTML without issuing loopback subresource requests", async () => {
    let requests = 0;
    const sentinel = createServer((_request, response) => {
      requests += 1;
      response.statusCode = 200;
      response.end("private response");
    });
    servers.push(sentinel);
    await new Promise<void>((resolve, reject) => {
      sentinel.once("error", reject);
      sentinel.listen(0, "127.0.0.1", resolve);
    });
    const address = sentinel.address();
    if (!address || typeof address === "string") throw new Error("Sentinel did not bind TCP");

    const pdf = await htmlStringToPdfBuffer(`<!doctype html>
<html><head><style>
@page { size: 1920px 1080px; margin: 0; }
.slide { width: 1920px; height: 1080px; page-break-after: always; }
</style></head><body>
<section class="slide"><h1>Guarded CLI PDF</h1><img src="http://127.0.0.1:${address.port}/private.png"></section>
<script>fetch("http://127.0.0.1:${address.port}/script-fetch")</script>
</body></html>`);

    expect(pdf.subarray(0, 4).toString("utf8")).toBe("%PDF");
    expect(pdf.byteLength).toBeGreaterThan(500);
    expect(requests).toBe(0);
  }, 120_000);

  it("rejects oversized direct HTML before starting Playwright", async () => {
    const html = "x".repeat(MAX_PDF_HTML_BYTES + 1);
    await expect(htmlStringToPdfBuffer(html)).rejects.toThrow(
      `PDF HTML exceeds ${MAX_PDF_HTML_BYTES} bytes`
    );
  });
});
