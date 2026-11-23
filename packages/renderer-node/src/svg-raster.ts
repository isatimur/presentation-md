/**
 * Node-side SVG → PNG for PPTX export.
 *
 * pptxgenjs embeds an SVG with a PNG fallback for viewers that cannot draw SVG
 * (Google Slides, Keynote, older PowerPoint). In a browser it renders that PNG
 * through a canvas; in Node it has no canvas and writes a broken-image icon.
 * So before a Node export we replace every SVG data-URI `image` with a PNG
 * rendered by resvg. resvg is an optional dependency: without it the SVG stays,
 * and the caller reports which viewers will show a placeholder.
 */

const SVG_DATA_URI = /^data:image\/svg\+xml((?:;[^;,]*)*),([\s\S]*)$/i;
/** Width of the PNG copy, in pixels. Matches the 1600px hero art in the examples. */
const RASTER_WIDTH = 1600;

type Resvg = new (
  svg: string,
  opts?: { fitTo?: { mode: "width"; value: number }; font?: { loadSystemFonts?: boolean } }
) => { render(): { asPng(): Uint8Array } };

let resvgPromise: Promise<Resvg | null> | undefined;

/** Load resvg once; `null` when the optional package is missing or its binary fails. */
function loadResvg(): Promise<Resvg | null> {
  resvgPromise ??= import("@resvg/resvg-js")
    .then((m) => (m as unknown as { Resvg: Resvg }).Resvg)
    .catch(() => null);
  return resvgPromise;
}

function svgText(uri: string): string | null {
  const m = SVG_DATA_URI.exec(uri.trim());
  if (!m) return null;
  const params = m[1] ?? "";
  const payload = m[2] ?? "";
  try {
    return /;base64/i.test(params)
      ? Buffer.from(payload, "base64").toString("utf-8")
      : decodeURIComponent(payload);
  } catch {
    return null;
  }
}

export interface SvgRasterResult<T> {
  deck: T;
  /** SVG images replaced by PNG copies. */
  rasterized: number;
  /** SVG images left as SVG (resvg missing or the SVG failed to render). */
  leftAsSvg: number;
}

/**
 * Return a copy of `deck` where every `image` string holding an SVG data URI
 * (slide images, card images, at any depth) is a PNG data URI instead.
 */
export async function rasterizeSvgImages<T>(deck: T): Promise<SvgRasterResult<T>> {
  let rasterized = 0;
  let leftAsSvg = 0;
  const pending: Array<{ holder: Record<string, unknown>; svg: string }> = [];

  const copy = JSON.parse(JSON.stringify(deck)) as T;
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      for (const v of node) walk(v);
    } else if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>;
      for (const [key, value] of Object.entries(obj)) {
        if (key === "image" && typeof value === "string") {
          const svg = svgText(value);
          if (svg !== null) pending.push({ holder: obj, svg });
        } else {
          walk(value);
        }
      }
    }
  };
  walk(copy);
  if (!pending.length) return { deck: copy, rasterized, leftAsSvg };

  const Resvg = await loadResvg();
  for (const { holder, svg } of pending) {
    if (!Resvg) {
      leftAsSvg++;
      continue;
    }
    try {
      const png = new Resvg(svg, {
        fitTo: { mode: "width", value: RASTER_WIDTH },
        font: { loadSystemFonts: true },
      })
        .render()
        .asPng();
      holder["image"] = `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
      rasterized++;
    } catch {
      leftAsSvg++;
    }
  }
  return { deck: copy, rasterized, leftAsSvg };
}
