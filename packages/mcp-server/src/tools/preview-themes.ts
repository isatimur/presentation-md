import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  discoverInstalledThemes,
  findShortlist,
  isShareDeck,
  loadThemeSelectionIndex,
  loadThemeShortlists,
  studioShareLink,
  themeDiscoveryLinks,
  type ThemeShortlist,
} from "@presentation-md/core";
import {
  buildLayoutsPreviewDeck,
  buildTitlePreviewDeck,
  discoverySlideIndices,
  getBundledThemesDir,
  layoutsPreviewLayoutNames,
  layoutsPreviewSlideCount,
  renderDeck,
  screenshotSlides,
  DISCOVERY_SHOT_H,
  DISCOVERY_SHOT_W,
  type PreviewMode,
} from "@presentation-md/render";
import { resolveThemesDir } from "../lib/resolve-themes.js";
import { assertWritablePathInCwd } from "../lib/cwd-path.js";
import { richToolResult, type McpImagePayload } from "../lib/rich-result.js";
import type { ToolDefinition } from "../server.js";

const DEFAULT_PREVIEW_DIR = ".presentation-md/theme-previews";

type DeckLike = {
  type?: string;
  meta?: Record<string, unknown>;
  slides?: unknown[];
};

function parseUserDeck(raw: string): DeckLike {
  let deck: DeckLike;
  try {
    deck = JSON.parse(raw) as DeckLike;
  } catch {
    throw new Error("'json' must be valid Deck JSON");
  }
  if (deck?.type !== "deck" || !Array.isArray(deck.slides) || deck.slides.length === 0) {
    throw new Error("'json' must be a deck with at least one slide");
  }
  return deck;
}

function restyleDeckJson(deck: DeckLike, theme: string): string {
  return JSON.stringify({
    ...deck,
    meta: { ...(deck.meta ?? {}), theme },
  });
}

export const previewThemesTool: ToolDefinition = {
  name: "preview_themes",
  description:
    "Render 1–3 theme preview HTML files for visual discovery (show-don't-tell). Returns file paths + file:// URLs, mood/scheme/swatches, proof deep-links (preview_url, studio_url, studio_share_url for the exact bake via ?d=), layout bake list, and — by default — inline PNG screenshots as MCP image content (title cover; layouts mode also captures bento + comparison — Studio Title/Bento/Compare parity). Pass include_screenshots:false to skip Chrome. Pass themes[] and/or a shortlist id from theme-shortlists.json. Pick-3 / duo compares (≥2 themes) default to mode=\"layouts\"; pass mode=\"title\" for a fast cover-only skim. Single-theme default remains title. Pass json (Deck JSON) for Studio My deck restyle parity — re-themes YOUR slides across the pick (mode=\"deck\"); optional slide_index (1-based) picks which slide to screenshot. kinetic-wrapped canned previews inject tone + hero mega-stat + share pills.",
  inputSchema: {
    type: "object",
    properties: {
      themes: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        maxItems: 3,
        description:
          "1–3 theme names to preview (e.g. corporate, editorial-serif, default-tech). Optional when shortlist is set.",
      },
      shortlist: {
        type: "string",
        description:
          "Optional shortlist id from theme-shortlists.json (e.g. editorial-report, core-defaults). Used when themes is omitted; ignored when themes is provided.",
      },
      title: {
        type: "string",
        description: "Deck title shown on the preview slide (defaults to 'Your Deck Title')",
      },
      company: {
        type: "string",
        description: "Optional company/brand name for the preview slide",
      },
      mode: {
        type: "string",
        enum: ["title", "layouts", "deck"],
        description:
          'Preview depth. Omit to auto-pick: "deck" when json is provided; else layouts when ≥2 themes (pick-3), title for a single theme. "title" = one cover slide. "layouts" = multi-slide craft bake. "deck" = re-theme the caller\'s Deck JSON (requires json).',
      },
      json: {
        type: "string",
        description:
          "Optional Deck JSON string. When set, previews re-theme YOUR slides across the pick (Studio My deck restyle / content-true compare) instead of canned title/layouts proofs.",
      },
      slide_index: {
        type: "number",
        description:
          "1-based slide to screenshot in deck mode (default: 1). Ignored for title/layouts canned proofs (those use discovery densify).",
      },
      include_screenshots: {
        type: "boolean",
        description:
          "When true (default), capture discovery PNGs via headless Chrome and return them as MCP image content so vision agents can compare themes in-chat. Set false to skip (HTML + swatches only). Gracefully degrades when Chrome is missing.",
      },
      output_dir: {
        type: "string",
        description: `Directory within the current working directory to write preview HTML files (default: ${DEFAULT_PREVIEW_DIR})`,
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const shortlistId =
      typeof input["shortlist"] === "string" ? input["shortlist"].trim() : "";
    const themesInput = Array.isArray(input["themes"])
      ? (input["themes"] as unknown[]).filter((t): t is string => typeof t === "string")
      : [];

    let matchedShortlist: ThemeShortlist | undefined;
    let shortlistError: string | undefined;
    let themes = themesInput.slice(0, 3);

    if (themes.length === 0 && shortlistId) {
      const shortlistsDoc = await loadThemeShortlists();
      matchedShortlist = findShortlist(shortlistsDoc, shortlistId);
      if (!matchedShortlist) {
        shortlistError = `Unknown shortlist id "${shortlistId}". Call list_themes with include_shortlists:true to see ids.`;
      } else {
        themes = matchedShortlist.themes.slice(0, 3);
      }
    } else if (themes.length === 0) {
      return {
        error:
          "Provide themes (1–3 names) or a shortlist id from theme-shortlists.json (e.g. core-defaults, editorial-report).",
      };
    }

    if (themes.length === 0) {
      return {
        error: shortlistError ?? "No themes to preview.",
        shortlist_error: shortlistError,
      };
    }

    const title = (input["title"] as string | undefined) ?? "Your Deck Title";
    const company = input["company"] as string | undefined;
    const userDeckRaw = typeof input["json"] === "string" ? input["json"] : undefined;
    let userDeck: DeckLike | undefined;
    if (userDeckRaw !== undefined) {
      try {
        userDeck = parseUserDeck(userDeckRaw);
      } catch (err) {
        return { error: (err as Error).message };
      }
    }

    const explicitMode = input["mode"];
    type PreviewModeExt = PreviewMode | "deck";
    const mode: PreviewModeExt =
      explicitMode === "layouts" || explicitMode === "title" || explicitMode === "deck"
        ? explicitMode
        : userDeck
          ? "deck"
          : themes.length >= 2
            ? "layouts"
            : "title";

    if (mode === "deck" && !userDeck) {
      return { error: 'mode "deck" requires json (Deck JSON to restyle).' };
    }

    const slideCountUser = userDeck?.slides?.length ?? 0;
    const slideIndexRaw =
      typeof input["slide_index"] === "number" ? input["slide_index"] : Number(input["slide_index"]);
    const slideIndex1 = Number.isFinite(slideIndexRaw)
      ? Math.max(1, Math.min(slideCountUser || 1, Math.floor(slideIndexRaw)))
      : 1;

    const includeScreenshots = input["include_screenshots"] !== false;
    const outputDir = await assertWritablePathInCwd(
      (input["output_dir"] as string | undefined) ?? DEFAULT_PREVIEW_DIR,
      "output_dir"
    );

    await mkdir(outputDir, { recursive: true });

    const [selectionIndex, discovered] = await Promise.all([
      loadThemeSelectionIndex(),
      discoverInstalledThemes({
        bundledThemesDir: getBundledThemesDir(),
        nodeModulesRoot: process.cwd(),
      }),
    ]);
    const selectionByName = new Map(selectionIndex.themes.map((t) => [t.name, t] as const));
    const discoveredByName = new Map(discovered.map((d) => [d.name, d] as const));

    const previews: Array<Record<string, unknown>> = [];
    const mcpImages: McpImagePayload[] = [];
    let screenshotsOk = 0;
    let chromeMissing = false;
    let screenshotsDetail: string | undefined;

    for (const theme of themes) {
      const deckJson =
        mode === "deck" && userDeck
          ? restyleDeckJson(userDeck, theme)
          : mode === "layouts"
            ? buildLayoutsPreviewDeck(theme, title, company)
            : buildTitlePreviewDeck(theme, title, company);
      const html = await renderDeck(deckJson, resolveThemesDir());
      const filename =
        mode === "deck"
          ? `${theme}-deck-restyle.html`
          : mode === "layouts"
            ? `${theme}-layouts-preview.html`
            : `${theme}-preview.html`;
      const path = join(outputDir, filename);
      await writeFile(path, html, "utf-8");

      const sel = selectionByName.get(theme);
      const disc = discoveredByName.get(theme);
      const links = themeDiscoveryLinks(theme, sel?.gallery);
      const layouts =
        mode === "deck"
          ? ((userDeck?.slides ?? []) as Array<{ layout?: string }>).map(
              (s, i) => s.layout ?? `slide-${i + 1}`
            )
          : layoutsPreviewLayoutNames(theme, mode);
      const fileUrl = pathToFileURL(path).href;
      const slideCount =
        mode === "deck"
          ? slideCountUser
          : mode === "layouts"
            ? layoutsPreviewSlideCount(theme)
            : 1;

      let studio_share_url: string | undefined;
      try {
        const baked = JSON.parse(deckJson) as unknown;
        if (isShareDeck(baked)) {
          studio_share_url = await studioShareLink(baked);
        }
      } catch {
        /* share optional — HTML + preview_url still usable */
      }

      const preview: Record<string, unknown> = {
        theme,
        path,
        filename,
        file_url: fileUrl,
        open_hint: `Open ${fileUrl} in a browser (or drag the file onto a tab).`,
        mode,
        slides: slideCount,
        layouts,
        vibe: disc?.manifest.vibe ?? disc?.manifest.description ?? sel?.aliases?.[0],
        scheme: sel?.scheme,
        mood: sel?.mood,
        formality: sel?.formality,
        swatches: sel?.swatches,
        best_for: sel?.best_for,
        ...(mode === "deck" ? { slide_index: slideIndex1 } : {}),
        ...links,
        ...(studio_share_url ? { studio_share_url } : {}),
      };

      if (includeScreenshots) {
        const shotsDir = join(outputDir, `${theme}-shots`);
        const shotResult = await screenshotSlides(html, {
          shotsDir,
          width: DISCOVERY_SHOT_W,
          height: DISCOVERY_SHOT_H,
          slideIndices:
            mode === "deck" ? [slideIndex1] : discoverySlideIndices(mode, slideCount),
        });
        if (shotResult.chrome_missing) {
          chromeMissing = true;
          screenshotsDetail = shotResult.detail;
        } else {
          const shotMetas: Array<Record<string, unknown>> = [];
          for (const shot of shotResult.shots) {
            if (shot.bytes <= 0) continue;
            screenshotsOk += 1;
            const layoutName = layouts[shot.slide - 1] ?? `slide-${shot.slide}`;
            shotMetas.push({
              slide: shot.slide,
              layout: layoutName,
              path: shot.path,
              bytes: shot.bytes,
              width: shot.width,
              height: shot.height,
              ...(shot.warn ? { warn: shot.warn } : {}),
            });
            try {
              const buf = await readFile(shot.path);
              mcpImages.push({
                data: buf.toString("base64"),
                mimeType: "image/png",
                label:
                  mode === "deck"
                    ? `${theme} · your slide ${shot.slide} (${layoutName})`
                    : `${theme} · ${layoutName}`,
              });
            } catch {
              /* path listed even if read fails */
            }
          }
          preview.screenshots = shotMetas;
        }
      }

      previews.push(preview);
    }

    const payload: Record<string, unknown> = {
      previews,
      mode,
      output_dir: outputDir,
      include_screenshots: includeScreenshots,
      ...(mode === "deck" ? { slide_index: slideIndex1, restyle: true } : {}),
      compare_summary: previews.map((p) => ({
        theme: p.theme,
        scheme: p.scheme,
        mood: p.mood,
        swatches: p.swatches,
        vibe: p.vibe,
        file_url: p.file_url,
        preview_url: p.preview_url,
        studio_url: p.studio_url,
        studio_share_url: p.studio_share_url,
        screenshots: p.screenshots,
        ...(mode === "deck" ? { slide_index: p.slide_index } : {}),
      })),
      ...(matchedShortlist ? { shortlist: matchedShortlist } : {}),
      ...(shortlistError ? { shortlist_error: shortlistError } : {}),
      ...(mode === "title" && themes.length >= 2
        ? {
            layouts_recommended: true,
            layouts_hint:
              "Pick-3 compares: re-run preview_themes with mode=\"layouts\" so body craft (cards, comparison, stats, quote, code) is visible before locking meta.theme — or pass json for content-true My deck restyle.",
          }
        : {}),
    };

    if (includeScreenshots) {
      payload.screenshots = {
        ok: screenshotsOk > 0,
        count: screenshotsOk,
        chrome_missing: chromeMissing || undefined,
        detail: chromeMissing
          ? screenshotsDetail
          : screenshotsOk > 0
            ? mode === "deck"
              ? `Attached ${screenshotsOk} restyle PNG(s) of your slide ${slideIndex1} as MCP image content.`
              : `Attached ${screenshotsOk} discovery PNG(s) as MCP image content (title${mode === "layouts" ? " + bento + comparison" : ""}).`
            : "No screenshots captured.",
      };
      payload.dx_hint =
        screenshotsOk > 0
          ? mode === "deck"
            ? "Inline PNGs show YOUR slide re-themed (Studio My deck restyle parity). Call apply_theme on the winner (defaults to repairCraft)."
            : "Inline PNGs are attached as MCP image content — compare themes visually in-chat (title / bento / comparison), then lock meta.theme. file_url still available for full HTML scroll."
          : chromeMissing
            ? "Chrome missing — open each file_url or preview_url; use compare_summary swatches + mood. Install Chrome for inline PNGs."
            : "Screenshots unavailable — open each file_url or preview_url; use compare_summary swatches + mood.";
    } else {
      payload.dx_hint =
        mode === "deck"
          ? "Screenshots skipped — open each *-deck-restyle.html file_url to judge your content across themes, then apply_theme."
          : "Screenshots skipped (include_screenshots:false) — open each file_url or preview_url. Use compare_summary swatches + mood to narrate the pick.";
    }

    payload.instruction =
      mode === "deck"
        ? screenshotsOk > 0
          ? `Compare the attached restyle PNGs of your slide ${slideIndex1}. After they pick a theme, call apply_theme (repairCraft on by default) or set meta.theme.`
          : `Open each *-deck-restyle.html (file_url) and judge YOUR content across themes. After they pick a theme, call apply_theme (repairCraft on by default).`
        : mode === "layouts"
          ? screenshotsOk > 0
            ? "Compare the attached title + bento + comparison PNGs (and/or open file_url). After they pick a theme, set meta.theme and generate the full deck."
            : "Open each multi-layout preview (file_url) and scroll past the title — judge cards, comparison, stats, quote, and code. Or skim compare_summary swatches/mood first. After they pick a theme, set meta.theme and generate the full deck."
          : themes.length >= 2
            ? screenshotsOk > 0
              ? "Compare the attached title PNGs. For pick-3 craft judgment, re-run with mode=\"layouts\" or pass json for My deck restyle. After they pick a theme, set meta.theme and generate the full deck."
              : "Open each title preview via file_url. For pick-3 craft judgment, re-run with mode=\"layouts\" (recommended) or pass json for My deck restyle. After they pick a theme, set meta.theme and generate the full deck."
            : screenshotsOk > 0
              ? "Review the attached title PNG (or open file_url). For deeper craft judgment, re-run with mode=\"layouts\". After they pick a theme, set meta.theme and generate the full deck."
              : "Open the preview HTML via file_url (or show the user the path). For deeper craft judgment, re-run with mode=\"layouts\". After they pick a theme, set meta.theme and generate the full deck.";

    return richToolResult(payload, mcpImages);
  },
};
