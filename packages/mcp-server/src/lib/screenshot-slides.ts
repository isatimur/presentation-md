/**
 * Re-export shared Chrome isolate/screenshot helpers from @presentation-md/render
 * so CLI `--preview-compare` and MCP `preview_themes` / `judge_deck` share one path.
 */
export {
  extractSlideChunks,
  findChrome,
  isolateSlideHtml,
  screenshotSlides,
  type ShotMeta,
  type ScreenshotResult,
} from "@presentation-md/render";
