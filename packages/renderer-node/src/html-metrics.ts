/**
 * HTML-mode deck metrics + gates — TypeScript port of deck-design-judge
 * scripts/deck_metrics.py analyze(). Used by judge_deck T2/T3 after render.
 */

export interface MetricFlag {
  id: string;
  severity: "gate" | "warn" | "error";
  detail: string;
  slide?: number;
}

const WORD_GATE = 40;
const TYPE_SIZE_WARN = 6;
const GENERIC_FONTS = new Set([
  "-apple-system",
  "blinkmacsystemfont",
  "system-ui",
  "segoe ui",
  "sans-serif",
  "serif",
  "ui-monospace",
  "monospace",
  "sf mono",
  "menlo",
  "consolas",
  "roboto",
  "helvetica",
  "arial",
  "ui-sans-serif",
  "ui-serif",
  "'sf mono'",
]);

function stripBlocks(html: string, tags: string[]): string {
  let out = html;
  for (const t of tags) {
    out = out.replace(new RegExp(`<${t}\\b[\\s\\S]*?</${t}>`, "gi"), " ");
  }
  return out;
}

function visibleText(chunk: string): string {
  let c = stripBlocks(chunk, ["script", "style", "svg"]);
  c = c.replace(/<[^>]+>/g, " ");
  c = c.replace(/&[a-z]+;|&#\d+;/gi, " ");
  return c.replace(/\s+/g, " ").trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

const BLOCK_SPLIT = /<\/(?:p|li|h[1-6]|div|section|a|blockquote|figcaption|td|th)>|<br\s*\/?>/i;

function maxBlockWords(chunk: string): number {
  const parts = chunk.split(BLOCK_SPLIT);
  let max = 0;
  for (const p of parts) {
    max = Math.max(max, countWords(visibleText(p)));
  }
  return max;
}

const OPEN_TAG_RE =
  /<(section|div)\b[^>]*class\s*=\s*("[^"]*"|'[^']*')[^>]*>/gi;

function hasSlideClass(quoted: string): boolean {
  const classes = quoted.slice(1, -1).split(/\s+/);
  return classes.includes("slide");
}

function findSlides(html: string): string[] {
  const opens: { end: number; start: number }[] = [];
  OPEN_TAG_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = OPEN_TAG_RE.exec(html))) {
    if (hasSlideClass(m[2]!)) {
      opens.push({ start: m.index, end: m.index + m[0].length });
    }
  }
  // Prefer ending the last slide at </main> so Present chrome / help / scripts
  // after the deck are not counted as wall-of-text on the closing slide.
  const mainClose = html.lastIndexOf("</main>");
  const slides: string[] = [];
  for (let i = 0; i < opens.length; i++) {
    const start = opens[i]!.end;
    let end = i + 1 < opens.length ? opens[i + 1]!.start : html.length;
    if (i === opens.length - 1 && mainClose > start) {
      end = mainClose;
    }
    slides.push(html.slice(start, end));
  }
  return slides;
}

function parseRootVars(css: string): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const block of css.matchAll(/:root\s*\{(.*?)\}/gs)) {
    const body = block[1] ?? "";
    for (const pair of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      vars[pair[1]!.trim()] = pair[2]!.trim();
    }
  }
  return vars;
}

function resolveVar(val: string, vars: Record<string, string>, depth = 0): string {
  if (depth > 5 || !val) return val;
  const m = val.match(/var\(\s*(--[\w-]+)\s*(?:,(.*))?\)/);
  if (!m) return val.trim();
  const name = m[1]!;
  if (name in vars) return resolveVar(vars[name]!, vars, depth + 1);
  if (m[2] != null) return resolveVar(m[2].trim(), vars, depth + 1);
  return val.trim();
}

type RGB = [number, number, number];

function toRgb(val: string, bg?: RGB): RGB | null {
  const v = val.trim();
  const hex = v.match(/^#([0-9a-fA-F]{3,8})$/);
  if (hex) {
    let h = hex[1]!;
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length === 6 || h.length === 8) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      if (h.length === 8) {
        const a = parseInt(h.slice(6, 8), 16) / 255;
        if (a < 1 && bg) {
          return [
            Math.round(r * a + bg[0] * (1 - a)),
            Math.round(g * a + bg[1] * (1 - a)),
            Math.round(b * a + bg[2] * (1 - a)),
          ];
        }
      }
      return [r, g, b];
    }
  }
  const rgb = v.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1]!.trim().split(/[\s,/]+/).filter(Boolean);
    try {
      const r = Number(parts[0]);
      const g = Number(parts[1]);
      const b = Number(parts[2]);
      const a = parts[3] != null ? Number(parts[3]) : 1;
      if (a < 1 && bg) {
        return [
          Math.round(r * a + bg[0] * (1 - a)),
          Math.round(g * a + bg[1] * (1 - a)),
          Math.round(b * a + bg[2] * (1 - a)),
        ];
      }
      return [Math.round(r), Math.round(g), Math.round(b)];
    } catch {
      return null;
    }
  }
  return null;
}

function luminance(rgb: RGB): number {
  const ch = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(rgb[0]) + 0.7152 * ch(rgb[1]) + 0.0722 * ch(rgb[2]);
}

function contrast(c1: RGB, c2: RGB): number {
  const l1 = luminance(c1);
  const l2 = luminance(c2);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

export function analyzeHtmlDeck(
  html: string,
  tokensCss?: string
): { metrics: Record<string, unknown>; flags: MetricFlag[] } {
  const flags: MetricFlag[] = [];
  const metrics: Record<string, unknown> = { mode: "html" };

  const inlineVars = /:root\s*\{/.test(html) ? parseRootVars(html) : {};
  const tokensVars = tokensCss ? parseRootVars(tokensCss) : {};
  const mergedVars = { ...tokensVars, ...inlineVars };

  const slides = findSlides(html);
  metrics.slide_count = slides.length;
  if (slides.length < 2) {
    flags.push({
      id: "slides",
      severity: "warn",
      detail:
        "Found <2 slides — slide detection may have missed this deck's structure; inspect manually.",
    });
  }

  const measureUnits = slides.length ? slides : [html];
  const unitLabel = slides.length ? "Slide" : "Document (no .slide containers found)";
  const wps: number[] = [];
  const mbs: number[] = [];
  for (let i = 0; i < measureUnits.length; i++) {
    const s = measureUnits[i]!;
    const total = countWords(visibleText(s));
    const mb = maxBlockWords(s);
    wps.push(total);
    mbs.push(mb);
    if (mb > WORD_GATE) {
      flags.push({
        id: "G1",
        severity: "gate",
        slide: i + 1,
        detail: `${unitLabel} ${i + 1}: one text block has ${mb} words (>${WORD_GATE}) — wall of text.`,
      });
    } else if (total > 70) {
      flags.push({
        id: "words",
        severity: "warn",
        slide: i + 1,
        detail: `${unitLabel} ${i + 1}: ${total} words total (dense) — verify it isn't over-stuffed.`,
      });
    }
  }
  metrics.words_per_slide = wps;
  metrics.max_block_per_slide = mbs;
  metrics.words_max = wps.length ? Math.max(...wps) : 0;
  metrics.words_mean = wps.length
    ? Math.round((wps.reduce((a, b) => a + b, 0) / wps.length) * 10) / 10
    : 0;
  metrics.max_block_words = mbs.length ? Math.max(...mbs) : 0;

  const fams = new Set<string>();
  for (const decl of html.matchAll(/font-family\s*:\s*([^;}{]+)/gi)) {
    const first = decl[1]!.split(",")[0]!.trim().replace(/^["']|["']$/g, "").toLowerCase();
    if (first && !first.includes("var(")) fams.add(first);
  }
  for (const fam of html.matchAll(/family=([^&:"']+)/g)) {
    fams.add(fam[1]!.replace(/\+/g, " ").split(":")[0]!.trim().toLowerCase());
  }
  const real = [...fams].filter((f) => !GENERIC_FONTS.has(f)).sort();
  metrics.font_families = real;
  if (real.length > 2) {
    flags.push({
      id: "fonts",
      severity: "warn",
      detail: `${real.length} real type families (${real.join(", ")}); a tight system uses 1–2.`,
    });
  }

  const sizes = new Set<string>();
  for (const v of html.matchAll(/font-size\s*:\s*([^;}{]+)/gi)) {
    const s = v[1]!.trim().toLowerCase();
    sizes.add(s.startsWith("clamp") ? "clamp" : s);
  }
  metrics.type_sizes_distinct = sizes.size;
  if (sizes.size > TYPE_SIZE_WARN) {
    flags.push({
      id: "type_sizes",
      severity: "warn",
      detail: `${sizes.size} distinct font-size declarations; great decks use ~4.`,
    });
  }

  const elevation: string[] = [];
  for (const v of html.matchAll(/box-shadow\s*:\s*([^;}{]+)/gi)) {
    const val = v[1]!.trim().toLowerCase();
    if (["none", "0", "inherit", "initial"].includes(val)) continue;
    if (/^(inset\s+)?0(px|rem|em)?\s+0(px|rem|em)?(\s|$)/.test(val)) continue;
    elevation.push(val);
  }
  metrics.elevation_shadows = elevation;
  let flat = false;
  if (tokensCss) {
    flat =
      /shadow[^:]*:\s*none/i.test(tokensCss) || /FLAT/.test(tokensCss);
  }
  if (elevation.length) {
    if (flat) {
      flags.push({
        id: "G2",
        severity: "gate",
        detail: `${elevation.length} elevation shadow(s) in a FLAT brand system — e.g. '${elevation[0]!.slice(0, 60)}'.`,
      });
    } else {
      flags.push({
        id: "shadows",
        severity: "warn",
        detail: `${elevation.length} elevation shadow(s); confirm the brand system permits depth.`,
      });
    }
  }

  const resolved: Record<string, string> = {};
  for (const [k, v] of Object.entries(mergedVars)) {
    resolved[k] = resolveVar(v, mergedVars);
  }
  let bg: RGB | null = null;
  for (const cand of ["--void", "--bg-primary", "--background", "--bg", "--surface"]) {
    if (cand in resolved) {
      const rgb = toRgb(resolved[cand]!);
      if (rgb) {
        bg = rgb;
        metrics.bg_token = `${cand}=${resolved[cand]}`;
        break;
      }
    }
  }
  if (!bg) {
    const bodyBg = html.match(/body\s*\{[^}]*background\s*:\s*([^;}{]+)/i);
    if (bodyBg) bg = toRgb(resolveVar(bodyBg[1]!, mergedVars));
  }
  const contrasts: Record<string, number> = {};
  if (bg) {
    for (const [name, val] of Object.entries(resolved)) {
      const low = name.toLowerCase();
      if (!/(text|ink|fg)/.test(low)) continue;
      if (/(bg|border|button|nav|brand-solid|section|overlay|white)/.test(low)) continue;
      const rgb = toRgb(val, bg);
      if (!rgb) continue;
      const ratio = contrast(rgb, bg);
      contrasts[name] = ratio;
      const isMinor = /(tertiary|quaternary|placeholder|disabled|ink-3|ink-4|muted|subtle|caption|hint)/.test(
        low
      );
      const isBody =
        !isMinor &&
        (/(primary|secondary|body|copy)/.test(low) ||
          ["--ink", "--ink-2", "--text", "--fg", "--foreground"].includes(low));
      if (isBody && ratio < 4.5) {
        flags.push({
          id: "G3",
          severity: "gate",
          detail: `Body text token ${name} (${val}) = ${ratio}:1 on bg (<4.5).`,
        });
      } else if (isMinor && ratio < 3.0) {
        flags.push({
          id: "contrast",
          severity: "warn",
          detail: `Minor text token ${name} = ${ratio}:1 (<3.0).`,
        });
      }
    }
  }
  metrics.contrast_ratios = contrasts;

  const htmlWithoutJson = html.replace(
    /<script\b[^>]*type\s*=\s*["']application\/(?:ld\+)?json["'][^>]*>[\s\S]*?<\/script>/gi,
    " "
  );
  const codeSurface = [
    ...htmlWithoutJson.matchAll(
      /<script\b[^>]*>[\s\S]*?<\/script>|<script\b[^>]*\/?>|<link\b[^>]*\/?>|<style\b[^>]*>[\s\S]*?<\/style>/gi
    ),
  ]
    .map((m) => m[0])
    .join(" ");
  const fw: string[] = [];
  const fwChecks: [RegExp, string][] = [
    [/tailwind/i, "Tailwind"],
    [/bootstrap/i, "Bootstrap"],
    [/\breact\b|react-dom/i, "React"],
    [/vue(\.js|@)/i, "Vue"],
    [/@angular|ng-version/i, "Angular"],
    [/cdn\.jsdelivr.*(tailwind|bootstrap)/i, "CDN-framework"],
  ];
  for (const [pat, label] of fwChecks) {
    if (pat.test(codeSurface)) fw.push(label);
  }
  metrics.frameworks = fw;
  if (fw.length) {
    flags.push({
      id: "G5",
      severity: "gate",
      detail: `External framework(s) present: ${fw.join(", ")} — decks must be self-contained.`,
    });
  }

  const isHtml = /<html/i.test(html) || /<!doctype/i.test(html);
  const feats = {
    print_css: /@media\s+print/i.test(html),
    keyboard_nav:
      /addEventListener\(\s*['"]key(down|up)/.test(html) ||
      /ArrowDown|ArrowRight|key(Code|)\s*===?\s*['"]Arrow/.test(html),
    reduced_motion: /prefers-reduced-motion/i.test(html),
    scroll_snap: /scroll-snap/i.test(html),
    viewport_meta: /<meta[^>]+viewport/i.test(html),
  };
  metrics.craft_features = feats;
  if (isHtml) {
    const missing = (
      ["print_css", "keyboard_nav", "reduced_motion", "viewport_meta"] as const
    ).filter((k) => !feats[k]);
    if (missing.length) {
      flags.push({
        id: "G4",
        severity: "gate",
        detail: "Missing craft essential(s): " + missing.join(", ") + ".",
      });
    }
    if (!feats.scroll_snap) {
      flags.push({
        id: "scroll_snap",
        severity: "warn",
        detail: "No scroll-snap (not required, but typical for full-viewport decks).",
      });
    }
  }

  const hides = /\.(anim|fade|reveal)[^{]*\{[^}]*opacity\s*:\s*0/i.test(html);
  const gated =
    /\.no-js|\.js\s|classList\.(add|remove)\(\s*['"](no-)?js/.test(html) ||
    feats.reduced_motion;
  if (hides && !gated) {
    flags.push({
      id: "anim_safety",
      severity: "warn",
      detail:
        "Reveal elements set opacity:0 without a JS-gated/reduced-motion fallback — risk of permanently-invisible text if JS fails.",
    });
  }

  metrics.gate_hits = flags.filter((f) => f.severity === "gate").length;
  return { metrics, flags };
}
