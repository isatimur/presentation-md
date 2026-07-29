import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { loadTheme } from "@presentation-md/core";
import { deckToPptxBuffer, type DeckJson } from "../src/index.js";
import { extractPptx } from "../src/import/index.js";

const themesDir = resolve(__dirname, "../../core/themes");

describe("extractPptx", () => {
  it("extracts titles and tables from an exported deck", async () => {
    const theme = await loadTheme("default-tech", { themesDir });
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Round Trip", company: "Acme", theme: "default-tech" },
      slides: [
        { layout: "title", heading: "Hello Title", lead: "Welcome lead" },
        {
          layout: "data-table",
          heading: "KPIs",
          columns: ["Metric", "Value"],
          rows: [
            ["ARR", "$1M"],
            ["NPS", "72"],
          ],
        },
      ],
    };
    const buf = await deckToPptxBuffer(deck, theme);
    const { extracted, warnings } = await extractPptx(buf);
    expect(extracted.meta.title).toBe("Round Trip");
    expect(extracted.slides).toHaveLength(2);
    expect(extracted.slides[0]!.title).toBe("Hello Title");
    expect(extracted.slides[0]!.texts.join(" ")).toContain("Welcome lead");
    expect(extracted.slides[1]!.title).toBe("KPIs");
    expect(extracted.slides[1]!.tables[0]).toEqual(["Metric", "Value"]);
    expect(extracted.slides[1]!.tables).toContainEqual(["ARR", "$1M"]);
    expect(Array.isArray(warnings)).toBe(true);
  });

  it("throws on invalid buffer", async () => {
    await expect(extractPptx(Buffer.from("not-a-pptx"))).rejects.toThrow();
  });

  it("throws when the zip has no slides", async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    zip.file("[Content_Types].xml", `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>`);
    zip.file("ppt/presentation.xml", `<?xml version="1.0"?><presentation xmlns="http://schemas.openxmlformats.org/presentationml/2006/main"><sldIdLst/></presentation>`);
    const buf = await zip.generateAsync({ type: "nodebuffer" });
    await expect(extractPptx(buf)).rejects.toThrow(/No slides found/i);
  });

  it("rejects oversized media blobs during extract", async () => {
    const JSZip = (await import("jszip")).default;
    const { MAX_MEDIA_BYTES } = await import("../src/import/zip-limits.js");
    const zip = new JSZip();
    zip.file(
      "[Content_Types].xml",
      `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
        <Default Extension="xml" ContentType="application/xml"/>
        <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
        <Default Extension="bin" ContentType="image/png"/>
        <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
      </Types>`
    );
    zip.file(
      "ppt/presentation.xml",
      `<?xml version="1.0"?><presentation xmlns="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sldIdLst><sldId id="256" r:id="rId1"/></sldIdLst></presentation>`
    );
    zip.file(
      "ppt/_rels/presentation.xml.rels",
      `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
      </Relationships>`
    );
    zip.file(
      "ppt/slides/slide1.xml",
      `<?xml version="1.0"?><sld xmlns="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
        <cSld><spTree>
          <sp><txBody><a:p><a:r><a:t>Title</a:t></a:r></a:p></txBody></sp>
          <pic><blipFill><a:blip r:embed="rId1"/></blipFill></pic>
        </spTree></cSld>
      </sld>`
    );
    zip.file(
      "ppt/slides/_rels/slide1.xml.rels",
      `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/huge.bin"/>
      </Relationships>`
    );
    zip.file("ppt/media/huge.bin", Buffer.alloc(MAX_MEDIA_BYTES + 1, 1));
    const buf = await zip.generateAsync({ type: "nodebuffer" });
    await expect(extractPptx(buf)).rejects.toThrow(/Media blob exceeds/i);
  });
});
