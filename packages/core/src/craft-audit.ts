/**
 * Shared craft gates for Studio Audit + MCP `audit_deck`.
 * Schema AJV validation stays separate; this is the agent-facing craft bar.
 */

/** Targeted repair action Studio / agents can apply for one issue. */
export type CraftFixId =
  | "image_hero"
  | "comparison"
  | "stat_row"
  | "logo_wall"
  | "quote"
  | "ranked_list"
  | "streak_grid"
  | "feature_grid"
  | "code"
  | "wrap_tones"
  | "safe_fields";

export interface CraftIssue {
  severity: "error" | "warning";
  message: string;
  /** 1-based slide index when the issue is slide-local. */
  slide?: number;
  /** When set, Studio can offer a per-issue Insert beat / Apply fix button. */
  fixId?: CraftFixId;
}

/** Minimal deck shape — avoids coupling core to export DeckJson. */
export interface CraftAuditDeck {
  meta?: { theme?: string; company?: string; title?: string; marquee?: string };
  slides?: unknown;
}

const HEADING_LAYOUTS = new Set(["title", "section", "closing"]);

export const CRAFT_VALID_LAYOUTS = new Set([
  "title",
  "two-column",
  "feature-grid",
  "quote",
  "data-table",
  "stat-row",
  "timeline",
  "section",
  "closing",
  "image-hero",
  "comparison",
  "code",
  "chart",
  "custom-html",
  "ranked-list",
  "logo-wall",
  "streak-grid",
  "metric-ring",
]);

function asSlides(deck: CraftAuditDeck): Array<Record<string, unknown>> {
  return Array.isArray(deck.slides)
    ? (deck.slides as Array<Record<string, unknown>>)
    : [];
}

/**
 * Structural craft checks (asymmetry, cadence, closing CTA, wrap tones, etc.).
 * Call after schema validation; safe on partially invalid decks.
 */
export function auditCraft(deck: CraftAuditDeck): CraftIssue[] {
  const issues: CraftIssue[] = [];
  const slides = asSlides(deck);

  if (!slides.length) {
    issues.push({ severity: "error", message: "Deck has no slides." });
    return issues;
  }

  if (slides.length < 2) {
    issues.push({
      severity: "warning",
      message: "Deck has fewer than 2 slides — consider adding more content",
    });
  }

  const layouts = slides.map((s) => s["layout"] as string | undefined);
  const theme = typeof deck.meta?.theme === "string" ? deck.meta.theme : "";
  const isWrap = theme === "kinetic-wrapped";
  const isCandy = theme === "candy-pop";
  const hasImageHero = layouts.includes("image-hero");
  const hasAsymmetry =
    layouts.includes("comparison") ||
    layouts.includes("code") ||
    layouts.includes("two-column") ||
    layouts.includes("custom-html") ||
    layouts.includes("ranked-list") ||
    layouts.includes("streak-grid") ||
    layouts.includes("metric-ring") ||
    layouts.includes("logo-wall") ||
    slides.some((s) => s["layout"] === "feature-grid" && s["columns"] === "bento");

  if (isCandy) {
    const hasBrand =
      (typeof deck.meta?.company === "string" && deck.meta.company.trim() !== "") ||
      (typeof deck.meta?.marquee === "string" && deck.meta.marquee.trim() !== "");
    if (!hasBrand) {
      issues.push({
        severity: "warning",
        message:
          'candy-pop marquee brands from meta.company (or meta.marquee) — set company so the ticker isn\'t a generic "CANDY POP" fallback.',
      });
    }
  }

  // Wrap decks use hue/ranked/streak/ring beats — image-hero is optional.
  if (slides.length >= 5 && !hasImageHero && !isWrap) {
    issues.push({
      severity: "warning",
      fixId: "image_hero",
      message:
        "No image-hero slide — investor/launch/brand decks need a cinematic visual beat (see references/stunning-25.md).",
    });
  }

  if (slides.length >= 5 && !hasAsymmetry) {
    issues.push({
      severity: "warning",
      fixId: "comparison",
      message:
        "Weak asymmetry — add comparison+emphasis, two-column (non-1-1 ratio), code, bento, ranked-list, streak-grid, metric-ring, or logo-wall.",
    });
  }

  // Cadence: ≥3 identical layouts in a row.
  let run = 1;
  let runStart = 0;
  for (let j = 1; j <= layouts.length; j++) {
    if (j < layouts.length && layouts[j] === layouts[j - 1]) {
      run++;
    } else {
      if (run >= 3) {
        issues.push({
          severity: "warning",
          message: `Slides ${runStart + 1}-${j}: '${layouts[runStart]}' repeats ${run}x in a row — vary the layout cadence.`,
        });
      }
      run = 1;
      runStart = j;
    }
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]!;
    const layout = slide["layout"] as string | undefined;
    const n = i + 1;

    if (layout && !CRAFT_VALID_LAYOUTS.has(layout)) {
      issues.push({
        severity: "error",
        slide: n,
        message: `Slide ${n}: unknown layout "${layout}"`,
      });
    }

    if (layout && HEADING_LAYOUTS.has(layout) && !slide["heading"]) {
      issues.push({
        severity: "warning",
        slide: n,
        message: `Slide ${n} (layout "${layout}") is missing a "heading" field`,
      });
    }

    if (layout === "comparison" && slide["emphasis"] !== "left" && slide["emphasis"] !== "right") {
      issues.push({
        severity: "warning",
        slide: n,
        message: `Slide ${n} (comparison): set "emphasis" to "left" or "right" — equal columns read as filler.`,
      });
    }

    if (layout === "two-column") {
      const ratio = slide["ratio"];
      if (ratio === undefined || ratio === "1-1") {
        issues.push({
          severity: "warning",
          slide: n,
          message: `Slide ${n} (two-column): prefer a non-1-1 ratio unless weight is truly equal.`,
        });
      }
    }

    if (layout === "feature-grid") {
      const columns = slide["columns"];
      const cards = slide["cards"];
      if (Array.isArray(cards) && cards.length === 5 && columns !== "bento") {
        issues.push({
          severity: "warning",
          slide: n,
          message: `Slide ${n} (feature-grid): 5 cards should use columns: "bento" for asymmetric craft.`,
        });
      }
      if (typeof columns === "number" && Array.isArray(cards)) {
        if (cards.length % columns !== 0) {
          issues.push({
            severity: "warning",
            slide: n,
            message: `Slide ${n} (feature-grid): "cards" count (${cards.length}) is not a multiple of "columns" (${columns})`,
          });
        }
      }
      if (Array.isArray(cards) && cards.length >= 3) {
        const featureLike = cards.filter((c) => {
          const card = c as Record<string, unknown>;
          const title = typeof card["title"] === "string" ? card["title"].trim() : "";
          // Skip mega-number tiles (community proof) — icons aren't the craft.
          if (/^[\d.,]+[%KkMmBx×+]*$/.test(title)) return false;
          return true;
        });
        if (featureLike.length >= 3) {
          const withIcon = featureLike.filter((c) => {
            const card = c as Record<string, unknown>;
            return typeof card["icon"] === "string" && card["icon"].trim() !== "";
          }).length;
          if (withIcon / featureLike.length < 0.5) {
            issues.push({
              severity: "warning",
              slide: n,
              message: `Slide ${n} (feature-grid): fewer than half the cards have icons — add FA icons for scannability.`,
            });
          }
        }
      }
    }

    if (layout === "closing") {
      const actions = slide["actions"];
      const cta = slide["cta"] as Record<string, unknown> | undefined;
      const hasAction =
        (Array.isArray(actions) && actions.length > 0) ||
        (cta && typeof cta["label"] === "string" && cta["label"].trim() !== "");
      if (!hasAction) {
        issues.push({
          severity: "warning",
          slide: n,
          message: `Slide ${n} (closing): missing CTA — set actions[] (or cta) so the ask is unmissable.`,
        });
      }
      if (Array.isArray(actions) && actions.length >= 2) {
        const blob = JSON.stringify(slide).toLowerCase();
        const social = /share|instagram|tiktok|twitter|\bx\b|linkedin|discord|github/.test(blob);
        const withIcon = actions.filter((a) => {
          const action = a as Record<string, unknown>;
          return typeof action["icon"] === "string" && action["icon"].trim() !== "";
        }).length;
        if (withIcon === 0) {
          issues.push({
            severity: "warning",
            slide: n,
            message: social
              ? `Slide ${n} (closing): social/share actions without icons — add FA brands so pills stay scannable in HTML + PPTX.`
              : `Slide ${n} (closing): dual actions without icons — add FA icons (rocket/download/calendar/share brands) so pills stay scannable in HTML + PPTX.`,
          });
        } else if (withIcon < actions.length) {
          issues.push({
            severity: "warning",
            slide: n,
            message: `Slide ${n} (closing): only ${withIcon}/${actions.length} actions have icons — icon every pill for stunning-25 parity.`,
          });
        }
      }
    }
  }

  const last = slides[slides.length - 1];
  if (last && last["layout"] === "closing") {
    const blob = JSON.stringify(last).toLowerCase();
    const actions = last["actions"];
    const actionCount = Array.isArray(actions)
      ? actions.length
      : last["cta"]
        ? 1
        : 0;
    if (/share|instagram|tiktok|wrapped/.test(blob) && !Array.isArray(actions)) {
      issues.push({
        severity: "warning",
        message:
          "Closing mentions share/social — prefer actions[] with solid + outline pills (not a single cta).",
      });
    }
    const launchy = isLaunchyDeckBlob(JSON.stringify(deck).toLowerCase());
    if (launchy && actionCount === 1) {
      issues.push({
        severity: "warning",
        slide: slides.length,
        message:
          "Launch/investor closing has a single CTA — prefer actions[] with solid + outline pills (stunning-25 dual ask).",
      });
    }
    // Stunning-25 themes: dual ask is the floor when the deck already uses actions[].
    const stunningThemes = new Set([
      "aurora-glass",
      "ft-editorial",
      "genz-bento",
      "luxury-minimalist",
      "crt-terminal",
      "swiss-typographic",
      "brutalist-acid",
      "candy-pop",
      "aerospace-hud",
      "heritage-editorial",
      "fintech-clean",
      "developer-dark",
      "data-editorial",
      "bauhaus",
      "y2k-aero",
      "risograph-zine",
      "neon-noir",
      "scandinavian",
      "art-deco",
      "vaporwave",
      "broadsheet",
      "glassmorphism",
      "kinetic-wrapped",
      "botanical-luxe",
      "blueprint",
    ]);
    if (stunningThemes.has(theme) && actionCount === 1) {
      issues.push({
        severity: "warning",
        slide: slides.length,
        message:
          "Stunning-25 theme closing has a single CTA — prefer actions[] with solid + outline pills (and icons).",
      });
    }
  }

  const withNotes = slides.filter((s) => typeof s["notes"] === "string" && String(s["notes"]).trim()).length;
  if (slides.length >= 6 && withNotes === 0) {
    issues.push({
      severity: "warning",
      fixId: "safe_fields",
      message: "No speaker notes — add brief notes on 2–4 key slides for present mode / PPTX.",
    });
  }

  if (
    slides.length >= 6 &&
    !layouts.includes("chart") &&
    !layouts.includes("stat-row") &&
    !layouts.includes("data-table") &&
    !layouts.includes("ranked-list") &&
    !layouts.includes("metric-ring") &&
    !layouts.includes("timeline")
  ) {
    issues.push({
      severity: "warning",
      fixId: "stat_row",
        message:
        "Long deck with no chart/stat-row/data-table/ranked-list/metric-ring/timeline — consider a data beat.",
    });
  }

  const copyBlob = JSON.stringify(slides).toLowerCase();
  if (
    /partner|customer|trusted by|logo wall|backers/.test(copyBlob) &&
    !layouts.includes("logo-wall")
  ) {
    issues.push({
      severity: "warning",
      fixId: "logo_wall",
      message: 'Social-proof / customer marks copy without logo-wall — prefer layout "logo-wall".',
    });
  }

  if (isWrap) {
    const toned = slides.filter((s) => {
      const t = s["tone"];
      return typeof t === "string" && t !== "default" && t.trim() !== "";
    }).length;
    if (toned < 3) {
      issues.push({
        severity: "warning",
        fixId: "wrap_tones",
      message:
        "kinetic-wrapped deck has fewer than 3 toned slides — set tone (lime/magenta/cyan/orange/violet) for wrap hue beats.",
      });
    }
    const hasVisual =
      layouts.includes("image-hero") ||
      layouts.includes("ranked-list") ||
      layouts.includes("streak-grid") ||
      layouts.includes("metric-ring") ||
      layouts.includes("custom-html") ||
      slides.some((s) => s["layout"] === "stat-row" && s["variant"] === "hero");
    if (!hasVisual) {
      issues.push({
        severity: "warning",
        fixId: "ranked_list",
      message:
        'kinetic-wrapped wrap needs a visual beat — use ranked-list, streak-grid, metric-ring, stat-row variant:"hero", or image-hero.',
      });
    }
    if (/streak/.test(copyBlob) && !layouts.includes("streak-grid")) {
      issues.push({
        severity: "warning",
        fixId: "streak_grid",
      message: 'kinetic-wrapped mentions streak without streak-grid — prefer layout "streak-grid".',
      });
    }
  }

  if (theme === "risograph-zine" && slides.length >= 5) {
    const hasPrintBeat =
      layouts.includes("comparison") ||
      layouts.includes("quote") ||
      layouts.includes("image-hero");
    if (!hasPrintBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "risograph-zine deck lacks a print beat — add comparison+emphasis, quote, or image-hero for zine energy.",
      });
    }
  }

  const paperThemes = new Set([
    "claude",
    "soft-editorial",
    "ft-editorial",
    "broadsheet",
    "heritage-editorial",
    "vellum",
    "paper-ink",
    "long-table",
    "editorial-serif",
    "editorial-forest",
    "emerald-editorial",
    "pin-and-paper",
    "vintage-editorial",
    "monochrome",
    "notebook-tabs",
    "blue-professional",
    "pink-script",
    "biennale-yellow",
    "pastel-dreamy",
    "scandinavian",
  ]);
  if (paperThemes.has(theme) && slides.length >= 5) {
    const hasEditorialBeat =
      layouts.includes("quote") ||
      (layouts.includes("comparison") &&
        slides.some(
          (s) => s["layout"] === "comparison" && (s["emphasis"] === "left" || s["emphasis"] === "right")
        ));
    if (!hasEditorialBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "Paper/editorial theme lacks a magazine beat — add quote or comparison+emphasis (not only soft cards).",
      });
    }
  }

  const atmosphereThemes = new Set(["neon-noir", "vaporwave", "y2k-aero", "retro-arcade"]);
  if (atmosphereThemes.has(theme) && slides.length >= 5) {
    const hasAtmosphereBeat =
      layouts.includes("image-hero") ||
      layouts.includes("quote") ||
      layouts.includes("custom-html");
    if (!hasAtmosphereBeat) {
      issues.push({
        severity: "warning",
        fixId: "image_hero",
      message:
        "Atmosphere theme (neon-noir / vaporwave / y2k-aero / retro-arcade) needs a cinematic beat — add image-hero, quote, or a composed custom-html moment.",
      });
    }
  }

  const posterThemes = new Set(["coral", "peoples-platform", "bold-signal", "broadside"]);
  if (posterThemes.has(theme) && slides.length >= 5) {
    const hasPosterBeat =
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("stat-row") ||
      layouts.includes("quote");
    if (!hasPosterBeat) {
      issues.push({
        severity: "warning",
        fixId: "comparison",
      message:
        "Poster theme lacks a bold beat — add image-hero, comparison+emphasis, punchy quote, or stat-row (not only soft grids).",
      });
    }
  }

  if (theme === "mat" && slides.length >= 5) {
    const hasMatBeat =
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("stat-row") ||
      layouts.includes("comparison");
    if (!hasMatBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "mat woodglow theme needs a mid-century beat — add quote, image-hero, comparison, or punchy stat-row (not only soft grids).",
      });
    }
  }

  if (theme === "cobalt-grid" && slides.length >= 5) {
    const hasGridBeat =
      layouts.includes("chart") ||
      layouts.includes("data-table") ||
      layouts.includes("stat-row") ||
      layouts.includes("ranked-list") ||
      layouts.includes("timeline");
    if (!hasGridBeat) {
      issues.push({
        severity: "warning",
        fixId: "stat_row",
      message:
        "cobalt-grid paper needs a drafted data beat — add chart, data-table, stat-row, ranked-list, or timeline.",
      });
    }
  }

  const hudThemes = new Set(["aerospace-hud", "crt-terminal", "blueprint"]);
  if (hudThemes.has(theme) && slides.length >= 5) {
    const hasHudBeat =
      layouts.includes("chart") ||
      layouts.includes("data-table") ||
      layouts.includes("stat-row") ||
      layouts.includes("ranked-list") ||
      layouts.includes("timeline") ||
      layouts.includes("metric-ring");
    if (!hasHudBeat) {
      issues.push({
        severity: "warning",
        fixId: "stat_row",
      message:
        "HUD/tech theme (aerospace-hud / crt-terminal / blueprint) needs an instrument beat — add chart, data-table, stat-row, ranked-list, timeline, or metric-ring.",
      });
    }
  }

  if (theme === "bauhaus" && slides.length >= 5) {
    const hasBauhausBeat =
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("feature-grid");
    if (!hasBauhausBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "bauhaus Primary needs a modernist beat — add quote, image-hero, comparison+emphasis, or icon feature-grid (not only soft SaaS stacks).",
      });
    }
  }

  if (theme === "genz-bento" && slides.length >= 5) {
    const hasBentoBeat =
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("stat-row") ||
      (layouts.includes("feature-grid") &&
        slides.some((s) => s["layout"] === "feature-grid" && s["columns"] === "bento"));
    if (!hasBentoBeat) {
      issues.push({
        severity: "warning",
        fixId: "feature_grid",
      message:
        "genz-bento Bounce needs a hard-bento beat — add image-hero, comparison+emphasis, punchy stats, or feature-grid columns:\"bento\".",
      });
    }
  }

  const glassThemes = new Set(["aurora-glass", "glassmorphism"]);
  if (glassThemes.has(theme) && slides.length >= 5) {
    const hasGlassBeat =
      layouts.includes("image-hero") ||
      layouts.includes("quote") ||
      layouts.includes("custom-html") ||
      layouts.includes("stat-row");
    if (!hasGlassBeat) {
      issues.push({
        severity: "warning",
        fixId: "image_hero",
      message:
        "Glass theme (aurora-glass / glassmorphism) needs a frosted product beat — add image-hero, quote, punchy stats, or a composed custom-html moment.",
      });
    }
  }

  const electricThemes = new Set(["electric-studio", "studio"]);
  if (electricThemes.has(theme) && slides.length >= 5) {
    const hasElectricBeat =
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("stat-row") ||
      layouts.includes("quote");
    if (!hasElectricBeat) {
      issues.push({
        severity: "warning",
        fixId: "comparison",
      message:
        "electric-studio / studio needs a loud brand beat — add image-hero, comparison+emphasis, punchy stats, or quote (not only soft grids).",
      });
    }
  }

  if (theme === "brutalist-mono" && slides.length >= 5) {
    const hasMonoBeat =
      layouts.includes("comparison") ||
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("stat-row");
    if (!hasMonoBeat) {
      issues.push({
        severity: "warning",
        fixId: "comparison",
      message:
        "brutalist-mono Concrete needs a hard mono beat — add comparison+emphasis, quote, image-hero, or punchy stats.",
      });
    }
  }

  if (theme === "cartesian" && slides.length >= 5) {
    const hasDraftBeat =
      layouts.includes("chart") ||
      layouts.includes("data-table") ||
      layouts.includes("timeline") ||
      layouts.includes("ranked-list") ||
      layouts.includes("stat-row");
    if (!hasDraftBeat) {
      issues.push({
        severity: "warning",
        fixId: "stat_row",
      message:
        "cartesian draft needs a plotted data beat — add chart, data-table, timeline, ranked-list, or stat-row.",
      });
    }
  }

  const modernistThemes = new Set(["swiss-typographic", "art-deco"]);
  if (modernistThemes.has(theme) && slides.length >= 5) {
    const hasModernistBeat =
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("feature-grid");
    if (!hasModernistBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "swiss-typographic / art-deco needs a modernist beat — add quote, image-hero, comparison+emphasis, or icon feature-grid.",
      });
    }
  }

  if (theme === "signal" && slides.length >= 5) {
    const hasBriefingBeat =
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("stat-row");
    if (!hasBriefingBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "signal briefing needs an editorial beat — add quote, image-hero, comparison+emphasis, or punchy stats (not only soft grids).",
      });
    }
  }

  if (theme === "luxury-minimalist" && slides.length >= 5) {
    const hasLuxeBeat =
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("comparison");
    if (!hasLuxeBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "luxury-minimalist (quiet-luxe) needs a restrained luxury beat — add quote, image-hero, or comparison+emphasis (top-rule cards, not soft SaaS stacks).",
      });
    }
  }

  const softProductThemes = new Set(["corporate", "fintech-clean"]);
  if (softProductThemes.has(theme) && slides.length >= 5) {
    const hasProductBeat =
      layouts.includes("stat-row") ||
      layouts.includes("comparison") ||
      layouts.includes("feature-grid") ||
      layouts.includes("chart");
    if (!hasProductBeat) {
      issues.push({
        severity: "warning",
        fixId: "stat_row",
      message:
        "corporate / fintech-clean needs a clean product beat — add stat-row, comparison+emphasis, feature-grid, or chart (not only soft sections).",
      });
    }
  }

  const playfulSoftThemes = new Set(["playful", "split-pastel"]);
  if (playfulSoftThemes.has(theme) && slides.length >= 5) {
    const hasPlayfulBeat =
      layouts.includes("feature-grid") ||
      layouts.includes("image-hero") ||
      layouts.includes("stat-row") ||
      layouts.includes("quote");
    if (!hasPlayfulBeat) {
      issues.push({
        severity: "warning",
        fixId: "feature_grid",
      message:
        "playful / split-pastel needs a soft-bento beat — add feature-grid, image-hero, punchy stats, or quote (not only soft sections).",
      });
    }
  }

  const neonTechThemes = new Set(["default-tech", "developer-dark"]);
  if (neonTechThemes.has(theme) && slides.length >= 5) {
    const hasTechBeat =
      layouts.includes("code") ||
      layouts.includes("feature-grid") ||
      layouts.includes("chart") ||
      layouts.includes("stat-row") ||
      layouts.includes("comparison");
    if (!hasTechBeat) {
      issues.push({
        severity: "warning",
        fixId: "code",
      message:
        "default-tech / developer-dark needs a tech product beat — add code, feature-grid, chart, comparison, or punchy stats.",
      });
    }
  }

  if (theme === "scatterbrain" && slides.length >= 5) {
    const hasWorkshopBeat =
      layouts.includes("feature-grid") ||
      layouts.includes("image-hero") ||
      layouts.includes("quote") ||
      layouts.includes("stat-row");
    if (!hasWorkshopBeat) {
      issues.push({
        severity: "warning",
        fixId: "feature_grid",
      message:
        "scatterbrain cork board needs a workshop beat — add feature-grid, image-hero, punchy quote, or stats (sticky energy, not soft SaaS).",
      });
    }
  }

  if (theme === "data-editorial" && slides.length >= 5) {
    const hasDataBeat =
      layouts.includes("chart") ||
      layouts.includes("data-table") ||
      layouts.includes("stat-row") ||
      layouts.includes("ranked-list") ||
      layouts.includes("timeline");
    if (!hasDataBeat) {
      issues.push({
        severity: "warning",
        fixId: "stat_row",
      message:
        "data-editorial needs a reported data beat — add chart, data-table, stat-row, ranked-list, or timeline.",
      });
    }
  }

  // Loud / hard-card pack themes not covered by more specific gates above.
  const loudPackThemes = new Set([
    "8-bit-orbit",
    "block-frame",
    "bold-poster",
    "capsule",
    "creative-mode",
    "creative-voltage",
    "daisy-days",
    "editorial-tri-tone",
    "neo-grid-bold",
    "raw-grid",
    "retro-windows",
    "retro-zine",
    "sakura-chroma",
    "stencil-tablet",
  ]);
  if (loudPackThemes.has(theme) && slides.length >= 5) {
    const hasLoudBeat =
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("stat-row") ||
      layouts.includes("quote") ||
      (layouts.includes("feature-grid") &&
        slides.some((s) => s["layout"] === "feature-grid" && s["columns"] === "bento"));
    if (!hasLoudBeat) {
      issues.push({
        severity: "warning",
        fixId: "comparison",
      message:
        "Loud/hard-card theme needs a punchy beat — add image-hero, comparison+emphasis, punchy stats, quote, or feature-grid columns:\"bento\" (not only soft sections).",
      });
    }
  }

  if (theme === "pastel-geometry" && slides.length >= 5) {
    const hasPastelBeat =
      layouts.includes("feature-grid") ||
      layouts.includes("image-hero") ||
      layouts.includes("stat-row") ||
      layouts.includes("quote");
    if (!hasPastelBeat) {
      issues.push({
        severity: "warning",
        fixId: "feature_grid",
      message:
        "pastel-geometry needs a soft-geometry beat — add feature-grid, image-hero, punchy stats, or quote (not only soft sections).",
      });
    }
  }

  const botanicalThemes = new Set(["grove", "dark-botanical"]);
  if (botanicalThemes.has(theme) && slides.length >= 5) {
    const hasBotanicalBeat =
      layouts.includes("quote") ||
      layouts.includes("image-hero") ||
      layouts.includes("comparison") ||
      layouts.includes("stat-row");
    if (!hasBotanicalBeat) {
      issues.push({
        severity: "warning",
        fixId: "quote",
      message:
        "grove / dark-botanical needs a botanical monograph beat — add quote, image-hero, comparison+emphasis, or punchy stats.",
      });
    }
  }

  return issues;
}

export interface CraftRepairResult {
  /** Deep-cloned deck with safe structural craft fixes applied. */
  deck: CraftAuditDeck;
  /** Human-readable descriptions of each mutation (empty when already clean). */
  fixes: string[];
}

const STUNNING_25_FOR_REPAIR = new Set([
  "aurora-glass",
  "ft-editorial",
  "genz-bento",
  "luxury-minimalist",
  "crt-terminal",
  "swiss-typographic",
  "brutalist-acid",
  "candy-pop",
  "aerospace-hud",
  "heritage-editorial",
  "fintech-clean",
  "developer-dark",
  "data-editorial",
  "bauhaus",
  "y2k-aero",
  "risograph-zine",
  "neon-noir",
  "scandinavian",
  "art-deco",
  "vaporwave",
  "broadsheet",
  "glassmorphism",
  "kinetic-wrapped",
  "botanical-luxe",
  "blueprint",
]);

function cloneDeck(deck: CraftAuditDeck): CraftAuditDeck {
  return JSON.parse(JSON.stringify(deck)) as CraftAuditDeck;
}

/** Launch / investor / raise language that expects a dual CTA close. */
function isLaunchyDeckBlob(blob: string): boolean {
  return /launch|waitlist|download|investor|series [abc]|seed (round|raise)|funding round|demo day|get the app|join the|pre-order|book a|request (access|membership|rates)|term sheet|raise capital|investor (update|deck|pitch)|pitch deck/.test(
    blob
  );
}

function actionIconForLabel(label: string): string {
  const l = label.toLowerCase();
  if (/download|install|get the app/.test(l)) return "fa-solid fa-download";
  if (/book|calendar|schedule|demo|sync/.test(l)) return "fa-solid fa-calendar";
  if (/share|tweet|post/.test(l)) return "fa-solid fa-share-nodes";
  if (/github/.test(l)) return "fa-brands fa-github";
  if (/linkedin/.test(l)) return "fa-brands fa-linkedin";
  if (/instagram/.test(l)) return "fa-brands fa-instagram";
  if (/discord/.test(l)) return "fa-brands fa-discord";
  if (/read|docs|story|learn/.test(l)) return "fa-solid fa-book-open";
  if (/join|waitlist|sign|email|newsletter/.test(l)) return "fa-solid fa-envelope";
  if (/rocket|launch|start/.test(l)) return "fa-solid fa-rocket";
  return "fa-solid fa-arrow-right";
}

function promoteClosingToDualActions(
  slide: Record<string, unknown>,
  primary: { label: string; href: string; icon?: string }
): void {
  slide["actions"] = [
    {
      label: primary.label,
      href: primary.href,
      style: "solid",
      icon: primary.icon?.trim() || actionIconForLabel(primary.label),
    },
    {
      label: "Learn more",
      href: "#",
      style: "outline",
      icon: "fa-solid fa-book-open",
    },
  ];
  delete slide["cta"];
}

const WRAP_TONES = ["lime", "magenta", "cyan", "orange", "violet"] as const;

/** Abstract composed SVG for repair-inserted image-hero beats (gallery-class data URI). */
function craftHeroDataUri(title: string): string {
  const safe = title.replace(/[<>&"]/g, "").slice(0, 48) || "Craft";
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/><text x="96" y="780" fill="#F8FAFC" font-family="Georgia,serif" font-size="54" font-weight="700">${safe}</text></svg>`
    )
  );
}

function deckTitle(meta: Record<string, unknown>, slides: Array<Record<string, unknown>>): string {
  if (typeof meta["title"] === "string" && meta["title"].trim()) return meta["title"].trim();
  const titleSlide = slides.find((s) => s["layout"] === "title");
  if (titleSlide && typeof titleSlide["heading"] === "string" && titleSlide["heading"].trim()) {
    return String(titleSlide["heading"]).trim();
  }
  return "Presentation";
}

function insertBeforeClosing(
  slides: Array<Record<string, unknown>>,
  slide: Record<string, unknown>
): number {
  const closeIdx = slides.findIndex((s) => s["layout"] === "closing");
  const at = closeIdx >= 0 ? closeIdx : slides.length;
  slides.splice(at, 0, slide);
  return at;
}

function insertAfterTitle(
  slides: Array<Record<string, unknown>>,
  slide: Record<string, unknown>
): number {
  const titleIdx = slides.findIndex((s) => s["layout"] === "title");
  const at = titleIdx >= 0 ? titleIdx + 1 : Math.min(1, slides.length);
  slides.splice(at, 0, slide);
  return at;
}

function layoutList(slides: Array<Record<string, unknown>>): Array<string | undefined> {
  return slides.map((s) => s["layout"] as string | undefined);
}

function hasAsymmetryLayouts(slides: Array<Record<string, unknown>>): boolean {
  const layouts = layoutList(slides);
  return (
    layouts.includes("comparison") ||
    layouts.includes("code") ||
    layouts.includes("two-column") ||
    layouts.includes("custom-html") ||
    layouts.includes("ranked-list") ||
    layouts.includes("streak-grid") ||
    layouts.includes("metric-ring") ||
    layouts.includes("logo-wall") ||
    slides.some((s) => s["layout"] === "feature-grid" && s["columns"] === "bento")
  );
}

function hasDataBeat(slides: Array<Record<string, unknown>>): boolean {
  const layouts = layoutList(slides);
  return (
    layouts.includes("chart") ||
    layouts.includes("stat-row") ||
    layouts.includes("data-table") ||
    layouts.includes("ranked-list") ||
    layouts.includes("metric-ring") ||
    layouts.includes("timeline")
  );
}

function extractNumericStats(
  slides: Array<Record<string, unknown>>
): Array<{ value: string; label: string }> {
  const found: Array<{ value: string; label: string }> = [];
  const re = /\b(\d[\d.,]*[%KkMmBx×+]?)\b/g;
  for (const slide of slides) {
    const heading = typeof slide["heading"] === "string" ? slide["heading"] : "";
    const blob = `${heading} ${JSON.stringify(slide)}`;
    let m: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((m = re.exec(blob)) !== null && found.length < 3) {
      const value = m[1]!;
      if (found.some((s) => s.value === value)) continue;
      const label =
        heading.trim().slice(0, 28) ||
        (typeof slide["layout"] === "string" ? slide["layout"] : "Metric");
      found.push({ value, label });
    }
    if (found.length >= 3) break;
  }
  return found;
}

function extractPartnerLabels(slides: Array<Record<string, unknown>>): string[] {
  const labels: string[] = [];
  for (const slide of slides) {
    const cards = slide["cards"];
    if (Array.isArray(cards)) {
      for (const c of cards) {
        const card = c as Record<string, unknown>;
        const title = typeof card["title"] === "string" ? card["title"].trim() : "";
        if (title && !/^[\d.,]+[%KkMmBx×+]*$/.test(title) && !labels.includes(title)) {
          labels.push(title.slice(0, 24));
        }
        if (labels.length >= 4) return labels;
      }
    }
    const items = slide["items"];
    if (Array.isArray(items)) {
      for (const it of items) {
        const item = it as Record<string, unknown>;
        const label =
          (typeof item["label"] === "string" && item["label"].trim()) ||
          (typeof item["title"] === "string" && item["title"].trim()) ||
          "";
        if (label && !labels.includes(label)) labels.push(label.slice(0, 24));
        if (labels.length >= 4) return labels;
      }
    }
  }
  return labels;
}

/**
 * Apply safe structural craft fixes agents / Studio can accept in one hop.
 * Fills missing craft fields AND inserts beat slides when audit gates require
 * them (image-hero, asymmetry, data, logo-wall, wrap tones) — never invents
 * themes or long body copy.
 */
export function repairCraft(deck: CraftAuditDeck): CraftRepairResult {
  const next = cloneDeck(deck);
  const fixes: string[] = [];
  const slides = asSlides(next);
  if (!slides.length) return { deck: next, fixes };

  if (!next.meta || typeof next.meta !== "object") {
    next.meta = {};
  }
  const meta = next.meta as Record<string, unknown>;
  const theme = typeof meta["theme"] === "string" ? meta["theme"] : "";
  const isWrap = theme === "kinetic-wrapped";
  const title = deckTitle(meta, slides);

  if (theme === "candy-pop") {
    const hasBrand =
      (typeof meta["company"] === "string" && String(meta["company"]).trim() !== "") ||
      (typeof meta["marquee"] === "string" && String(meta["marquee"]).trim() !== "");
    if (!hasBrand) {
      if (title) {
        meta["company"] = title;
        fixes.push(`meta.company ← "${title}" (candy-pop marquee brand)`);
      }
    }
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]!;
    const layout = slide["layout"] as string | undefined;
    const n = i + 1;

    if (layout && HEADING_LAYOUTS.has(layout) && !slide["heading"]) {
      const fromLead =
        typeof slide["lead"] === "string" && String(slide["lead"]).trim()
          ? String(slide["lead"]).trim().slice(0, 80)
          : "";
      const fromEyebrow =
        typeof slide["eyebrow"] === "string" && String(slide["eyebrow"]).trim()
          ? String(slide["eyebrow"]).trim()
          : "";
      slide["heading"] = fromLead || fromEyebrow || title;
      fixes.push(`Slide ${n} (${layout}): set heading from ${fromLead ? "lead" : fromEyebrow ? "eyebrow" : "meta.title"}`);
    }

    if (layout === "comparison") {
      if (slide["emphasis"] !== "left" && slide["emphasis"] !== "right") {
        slide["emphasis"] = "right";
        fixes.push(`Slide ${n} (comparison): set emphasis "right"`);
      }
    }

    if (layout === "two-column") {
      const ratio = slide["ratio"];
      if (ratio === undefined || ratio === "1-1") {
        slide["ratio"] = "2-1";
        fixes.push(`Slide ${n} (two-column): set ratio "2-1"`);
      }
    }

    if (layout === "feature-grid") {
      const cards = slide["cards"];
      if (Array.isArray(cards) && cards.length === 5 && slide["columns"] !== "bento") {
        slide["columns"] = "bento";
        fixes.push(`Slide ${n} (feature-grid): set columns "bento" for 5 cards`);
      }
      if (Array.isArray(cards) && cards.length >= 3) {
        const DEFAULT_ICONS = [
          "fa-solid fa-bolt",
          "fa-solid fa-layer-group",
          "fa-solid fa-compass",
          "fa-solid fa-shield-halved",
          "fa-solid fa-scissors",
          "fa-solid fa-chart-line",
        ];
        let filled = 0;
        cards.forEach((c, ci) => {
          const card = c as Record<string, unknown>;
          const cardTitle = typeof card["title"] === "string" ? card["title"].trim() : "";
          if (/^[\d.,]+[%KkMmBx×+]*$/.test(cardTitle)) return;
          if (typeof card["icon"] === "string" && card["icon"].trim() !== "") return;
          card["icon"] = DEFAULT_ICONS[ci % DEFAULT_ICONS.length]!;
          filled += 1;
        });
        if (filled > 0) {
          fixes.push(`Slide ${n} (feature-grid): added icons on ${filled} card(s)`);
        }
      }
    }

    if (layout === "closing") {
      const actions = slide["actions"];
      const cta = slide["cta"] as Record<string, unknown> | undefined;
      const hasAction =
        (Array.isArray(actions) && actions.length > 0) ||
        (cta && typeof cta["label"] === "string" && String(cta["label"]).trim() !== "");

      const deckBlob = JSON.stringify(next).toLowerCase();
      const launchy = isLaunchyDeckBlob(deckBlob);
      const wantsDual = STUNNING_25_FOR_REPAIR.has(theme) || launchy;

      if (!hasAction) {
        promoteClosingToDualActions(slide, {
          label: "Get started",
          href: "#",
          icon: "fa-solid fa-arrow-right",
        });
        fixes.push(`Slide ${n} (closing): added dual actions[] CTA`);
      } else if (Array.isArray(actions) && actions.length >= 2) {
        let iconed = 0;
        for (const a of actions) {
          const action = a as Record<string, unknown>;
          if (typeof action["icon"] === "string" && String(action["icon"]).trim() !== "") continue;
          const label = typeof action["label"] === "string" ? action["label"] : "Continue";
          action["icon"] = actionIconForLabel(label);
          iconed += 1;
        }
        if (iconed > 0) {
          fixes.push(`Slide ${n} (closing): added icons on ${iconed} action(s)`);
        }
      } else if (Array.isArray(actions) && actions.length === 1 && wantsDual) {
        const primary = actions[0] as Record<string, unknown>;
        const primaryLabel =
          typeof primary["label"] === "string" && String(primary["label"]).trim()
            ? String(primary["label"]).trim()
            : "Get started";
        const primaryHref =
          typeof primary["href"] === "string" && String(primary["href"]).trim()
            ? String(primary["href"])
            : "#";
        const primaryIcon =
          typeof primary["icon"] === "string" && String(primary["icon"]).trim()
            ? String(primary["icon"])
            : undefined;
        promoteClosingToDualActions(slide, {
          label: primaryLabel,
          href: primaryHref,
          icon: primaryIcon,
        });
        fixes.push(`Slide ${n} (closing): expanded single actions[] → dual ask`);
      } else if (
        !Array.isArray(actions) &&
        cta &&
        typeof cta["label"] === "string" &&
        String(cta["label"]).trim() !== ""
      ) {
        if (wantsDual) {
          const primaryLabel = String(cta["label"]).trim();
          const primaryHref =
            typeof cta["href"] === "string" && String(cta["href"]).trim()
              ? String(cta["href"])
              : "#";
          promoteClosingToDualActions(slide, {
            label: primaryLabel,
            href: primaryHref,
            icon:
              typeof cta["icon"] === "string" && String(cta["icon"]).trim()
                ? String(cta["icon"])
                : undefined,
          });
          fixes.push(`Slide ${n} (closing): promoted cta → dual actions[]`);
        } else if (
          !(typeof cta["icon"] === "string" && String(cta["icon"]).trim() !== "")
        ) {
          cta["icon"] = actionIconForLabel(String(cta["label"]));
          fixes.push(`Slide ${n} (closing): added icon on cta`);
        }
      }
    }
  }

  // ── Beat inserts — only gates auditCraft would flag on the pre-insert deck ──
  const originalCount = slides.length;
  const originalLayouts = layoutList(slides);
  const needImageHero =
    originalCount >= 5 && !originalLayouts.includes("image-hero") && !isWrap;
  const needAsymmetry = originalCount >= 5 && !hasAsymmetryLayouts(slides);
  const needDataBeat = originalCount >= 6 && !hasDataBeat(slides);
  const originalCopy = JSON.stringify(slides).toLowerCase();
  const needLogoWall =
    /partner|customer|trusted by|logo wall|backers/.test(originalCopy) &&
    !originalLayouts.includes("logo-wall");
  const needWrapTones =
    isWrap &&
    slides.filter((s) => {
      const t = s["tone"];
      return typeof t === "string" && t !== "default" && t.trim() !== "";
    }).length < 3;
  const needWrapVisual =
    isWrap &&
    !(
      originalLayouts.includes("image-hero") ||
      originalLayouts.includes("ranked-list") ||
      originalLayouts.includes("streak-grid") ||
      originalLayouts.includes("metric-ring") ||
      originalLayouts.includes("custom-html") ||
      slides.some((s) => s["layout"] === "stat-row" && s["variant"] === "hero")
    );
  const needStreakGrid =
    isWrap && /streak/.test(originalCopy) && !originalLayouts.includes("streak-grid");

  if (needImageHero) {
    const at = insertAfterTitle(slides, {
      layout: "image-hero",
      eyebrow: "Visual beat",
      heading: title,
      lead: "Show the product, place, or atmosphere — not an icon grid.",
      image: craftHeroDataUri(title),
      imageAlt: `${title} craft field`,
    });
    fixes.push(`Inserted image-hero at slide ${at + 1} (cinematic visual beat)`);
  }

  if (needAsymmetry && !hasAsymmetryLayouts(slides)) {
    const at = insertBeforeClosing(slides, {
      layout: "comparison",
      heading: "Before vs after",
      leftLabel: "Before",
      left: "Flat cadence — same layout repeated, no tension.",
      rightLabel: "After",
      right: `${title} — asymmetric craft that holds on first glance.`,
      emphasis: "right",
    });
    fixes.push(`Inserted comparison at slide ${at + 1} (asymmetry beat)`);
  }

  if (needDataBeat && !hasDataBeat(slides)) {
    const extracted = extractNumericStats(slides);
    const stats =
      extracted.length >= 2
        ? extracted
        : [
            { value: "3×", label: "Faster path" },
            { value: "1", label: "Schema" },
            { value: "100%", label: "Editable PPTX" },
          ];
    const at = insertBeforeClosing(slides, {
      layout: "stat-row",
      heading: "By the numbers",
      stats,
    });
    fixes.push(
      `Inserted stat-row at slide ${at + 1} (data beat${extracted.length >= 2 ? " from deck numbers" : " · placeholder stats — replace"})`
    );
  }

  if (needLogoWall && !layoutList(slides).includes("logo-wall")) {
    const partners = extractPartnerLabels(slides);
    const names =
      partners.length >= 3
        ? partners.slice(0, 4)
        : ["Northstar", "Harbor", "Fieldkit", "Lumen"];
    const at = insertBeforeClosing(slides, {
      layout: "logo-wall",
      eyebrow: "Trusted by",
      heading: "Teams that ship with us.",
      columns: 4,
      cards: names.map((name) => ({ title: name, body: "Partner" })),
    });
    fixes.push(
      `Inserted logo-wall at slide ${at + 1} (social-proof beat${partners.length >= 3 ? " from deck labels" : ""})`
    );
  }

  if (needWrapTones) {
    const already = slides.filter((s) => {
      const t = s["tone"];
      return typeof t === "string" && t !== "default" && t.trim() !== "";
    }).length;
    let assigned = 0;
    for (let i = 0; i < slides.length && already + assigned < 3; i++) {
      const slide = slides[i]!;
      const t = slide["tone"];
      if (typeof t === "string" && t !== "default" && t.trim() !== "") continue;
      slide["tone"] = WRAP_TONES[(already + assigned) % WRAP_TONES.length]!;
      assigned += 1;
      fixes.push(`Slide ${i + 1}: set tone "${slide["tone"]}" (wrap hue beat)`);
    }
  }

  if (needWrapVisual) {
    const at = insertBeforeClosing(slides, {
      layout: "ranked-list",
      heading: "Top moments",
      items: [
        { label: title, widthPct: 92 },
        { label: "The beat that stuck", widthPct: 74 },
        { label: "Share-worthy closer", widthPct: 58 },
      ],
    });
    fixes.push(`Inserted ranked-list at slide ${at + 1} (wrap visual beat)`);
  }

  if (needStreakGrid && !layoutList(slides).includes("streak-grid")) {
    const at = insertBeforeClosing(slides, {
      layout: "streak-grid",
      heading: "Streak board",
      filled: 21,
      total: 30,
      cols: 10,
    });
    fixes.push(`Inserted streak-grid at slide ${at + 1} (wrap streak honesty)`);
  }

  // Cadence: break ≥3 identical layouts when a lossless swap exists.
  {
    const layouts = layoutList(slides);
    let run = 1;
    let runStart = 0;
    for (let j = 1; j <= layouts.length; j++) {
      if (j < layouts.length && layouts[j] === layouts[j - 1]) {
        run++;
      } else {
        if (run >= 3) {
          const mid = runStart + Math.floor(run / 2);
          const slide = slides[mid]!;
          const layout = layouts[runStart];
          const keepTone =
            typeof slide["tone"] === "string" && slide["tone"].trim()
              ? { tone: slide["tone"] }
              : {};
          const keepNotes =
            typeof slide["notes"] === "string" && slide["notes"].trim()
              ? { notes: slide["notes"] }
              : {};
          if (layout === "feature-grid") {
            const heading =
              typeof slide["heading"] === "string" && slide["heading"].trim()
                ? String(slide["heading"]).trim()
                : title;
            slides[mid] = {
              layout: "section",
              number: String(mid + 1).padStart(2, "0"),
              heading,
              ...(typeof slide["eyebrow"] === "string" ? { eyebrow: slide["eyebrow"] } : {}),
              ...keepTone,
              ...keepNotes,
            };
            fixes.push(`Slide ${mid + 1}: feature-grid → section (break ${run}× cadence)`);
          } else if (layout === "section") {
            const heading =
              typeof slide["heading"] === "string" && slide["heading"].trim()
                ? String(slide["heading"]).trim()
                : title;
            slides[mid] = {
              layout: "quote",
              quote: heading,
              by:
                (typeof meta["company"] === "string" && meta["company"].trim()) ||
                "Team",
              ...keepTone,
              ...keepNotes,
            };
            fixes.push(`Slide ${mid + 1}: section → quote (break ${run}× cadence)`);
          }
        }
        run = 1;
        runStart = j;
      }
    }
  }

  const withNotes = slides.filter(
    (s) => typeof s["notes"] === "string" && String(s["notes"]).trim()
  ).length;
  if (slides.length >= 6 && withNotes === 0) {
    const targets: number[] = [];
    const titleIdx = slides.findIndex((s) => s["layout"] === "title");
    const closeIdx = slides.findIndex((s) => s["layout"] === "closing");
    const midIdx = Math.floor(slides.length / 2);
    for (const idx of [titleIdx, midIdx, closeIdx]) {
      if (idx >= 0 && !targets.includes(idx)) targets.push(idx);
    }
    const visualIdx = slides.findIndex(
      (s) => s["layout"] === "comparison" || s["layout"] === "image-hero"
    );
    if (visualIdx >= 0 && !targets.includes(visualIdx) && targets.length < 4) {
      targets.push(visualIdx);
    }
    for (const idx of targets.slice(0, 4)) {
      const slide = slides[idx]!;
      const heading =
        typeof slide["heading"] === "string" && String(slide["heading"]).trim()
          ? String(slide["heading"]).trim()
          : `Slide ${idx + 1}`;
      const layout = slide["layout"] as string | undefined;
      if (layout === "title") {
        slide["notes"] = `Cold open — land "${heading}" before logos.`;
      } else if (layout === "closing") {
        slide["notes"] = `Close on the ask — pause after "${heading}".`;
      } else if (layout === "comparison") {
        slide["notes"] = "Name the loser column first, then punch the winner.";
      } else {
        slide["notes"] = `Hold the beat — one breath on "${heading}".`;
      }
      fixes.push(`Slide ${idx + 1}: added speaker notes`);
    }
  }

  // ── Theme-honesty leftovers — insert cheapest beat when gate still fails ──
  {
    const layoutsNow = layoutList(slides);
    const hasQuote = layoutsNow.includes("quote");
    const hasComparison = layoutsNow.includes("comparison");
    const hasImageHeroNow = layoutsNow.includes("image-hero");
    const hasStat = layoutsNow.includes("stat-row");
    const hasFeature = layoutsNow.includes("feature-grid");
    const hasCode = layoutsNow.includes("code");
    const hasDataish =
      hasStat ||
      layoutsNow.includes("chart") ||
      layoutsNow.includes("data-table") ||
      layoutsNow.includes("ranked-list") ||
      layoutsNow.includes("timeline") ||
      layoutsNow.includes("metric-ring");
    const paperThemes = new Set([
      "claude",
      "soft-editorial",
      "ft-editorial",
      "broadsheet",
      "heritage-editorial",
      "vellum",
      "paper-ink",
      "long-table",
      "editorial-serif",
      "editorial-forest",
      "emerald-editorial",
      "pin-and-paper",
      "vintage-editorial",
      "monochrome",
      "notebook-tabs",
      "blue-professional",
      "pink-script",
      "biennale-yellow",
      "pastel-dreamy",
      "scandinavian",
    ]);
    const atmosphereThemes = new Set(["neon-noir", "vaporwave", "y2k-aero", "retro-arcade"]);
    const posterThemes = new Set(["coral", "peoples-platform", "bold-signal", "broadside"]);
    const hudThemes = new Set(["aerospace-hud", "crt-terminal", "blueprint"]);
    const glassThemes = new Set(["aurora-glass", "glassmorphism"]);
    const electricThemes = new Set(["electric-studio", "studio"]);
    const modernistThemes = new Set(["swiss-typographic", "art-deco"]);
    const softProductThemes = new Set(["corporate", "fintech-clean"]);
    const playfulSoftThemes = new Set(["playful", "split-pastel"]);
    const neonTechThemes = new Set(["default-tech", "developer-dark"]);
    const loudPackThemes = new Set([
      "8-bit-orbit",
      "block-frame",
      "bold-poster",
      "capsule",
      "creative-mode",
      "creative-voltage",
      "daisy-days",
      "editorial-tri-tone",
      "neo-grid-bold",
      "raw-grid",
      "retro-windows",
      "retro-zine",
      "sakura-chroma",
      "stencil-tablet",
    ]);
    const botanicalThemes = new Set(["grove", "dark-botanical"]);

    const needQuote =
      slides.length >= 5 &&
      !hasQuote &&
      !hasComparison &&
      (paperThemes.has(theme) ||
        theme === "risograph-zine" ||
        theme === "mat" ||
        theme === "bauhaus" ||
        modernistThemes.has(theme) ||
        theme === "signal" ||
        theme === "luxury-minimalist" ||
        botanicalThemes.has(theme));

    const needCinematic =
      slides.length >= 5 &&
      !hasImageHeroNow &&
      !hasQuote &&
      (atmosphereThemes.has(theme) || glassThemes.has(theme));

    const needPunchy =
      slides.length >= 5 &&
      !hasImageHeroNow &&
      !hasComparison &&
      !hasStat &&
      !hasQuote &&
      (posterThemes.has(theme) ||
        electricThemes.has(theme) ||
        theme === "brutalist-mono" ||
        loudPackThemes.has(theme) ||
        theme === "genz-bento");

    const needHonestyData =
      slides.length >= 5 &&
      !hasDataish &&
      (theme === "cobalt-grid" ||
        hudThemes.has(theme) ||
        theme === "cartesian" ||
        theme === "data-editorial" ||
        softProductThemes.has(theme));

    const needFeature =
      slides.length >= 5 &&
      !hasFeature &&
      !hasImageHeroNow &&
      !hasStat &&
      !hasQuote &&
      (playfulSoftThemes.has(theme) ||
        theme === "scatterbrain" ||
        theme === "pastel-geometry" ||
        theme === "genz-bento");

    const needCode =
      slides.length >= 5 &&
      !hasCode &&
      !hasFeature &&
      !hasStat &&
      !hasComparison &&
      !layoutsNow.includes("chart") &&
      neonTechThemes.has(theme);

    if (needQuote) {
      const company =
        (typeof meta["company"] === "string" && meta["company"].trim()) || "Team";
      const at = insertBeforeClosing(slides, {
        layout: "quote",
        quote: `The line that makes ${title} stick.`,
        by: company,
      });
      fixes.push(`Inserted quote at slide ${at + 1} (theme-honesty magazine/editorial beat)`);
    } else if (needCinematic && !layoutList(slides).includes("image-hero")) {
      const at = insertAfterTitle(slides, {
        layout: "image-hero",
        eyebrow: "Visual beat",
        heading: title,
        lead: "Show the product, place, or atmosphere — not an icon grid.",
        image: craftHeroDataUri(title),
        imageAlt: `${title} craft field`,
      });
      fixes.push(`Inserted image-hero at slide ${at + 1} (theme-honesty cinematic beat)`);
    } else if (needPunchy && !hasAsymmetryLayouts(slides)) {
      const at = insertBeforeClosing(slides, {
        layout: "comparison",
        heading: "Before vs after",
        leftLabel: "Before",
        left: "Flat cadence — same layout repeated, no tension.",
        rightLabel: "After",
        right: `${title} — asymmetric craft that holds on first glance.`,
        emphasis: "right",
      });
      fixes.push(`Inserted comparison at slide ${at + 1} (theme-honesty punchy beat)`);
    } else if (needPunchy && !layoutList(slides).includes("quote") && !layoutList(slides).includes("comparison")) {
      const at = insertBeforeClosing(slides, {
        layout: "comparison",
        heading: "Before vs after",
        leftLabel: "Before",
        left: "Flat cadence — same layout repeated, no tension.",
        rightLabel: "After",
        right: `${title} — asymmetric craft that holds on first glance.`,
        emphasis: "right",
      });
      fixes.push(`Inserted comparison at slide ${at + 1} (theme-honesty punchy beat)`);
    }

    if (needHonestyData && !hasDataBeat(slides)) {
      const at = insertBeforeClosing(slides, {
        layout: "stat-row",
        heading: "By the numbers",
        stats: [
          { value: "3×", label: "Faster path" },
          { value: "1", label: "Schema" },
          { value: "100%", label: "Editable PPTX" },
        ],
      });
      fixes.push(`Inserted stat-row at slide ${at + 1} (theme-honesty data beat · placeholder — replace)`);
    }

    if (needFeature && !layoutList(slides).includes("feature-grid")) {
      const at = insertBeforeClosing(slides, {
        layout: "feature-grid",
        heading: "Three pillars",
        columns: theme === "genz-bento" || theme === "pastel-geometry" ? "bento" : undefined,
        cards:
          theme === "genz-bento"
            ? [
                { title: "Tile one", body: "Replace.", icon: "fa-solid fa-bolt" },
                { title: "Tile two", body: "Replace.", icon: "fa-solid fa-star" },
                { title: "Tile three", body: "Replace.", icon: "fa-solid fa-heart" },
                { title: "Tile four", body: "Replace.", icon: "fa-solid fa-fire" },
                { title: "Tile five", body: "Replace.", icon: "fa-solid fa-wand-magic-sparkles" },
              ]
            : [
                { title: "Pillar one", body: "Replace.", icon: "fa-solid fa-bolt" },
                { title: "Pillar two", body: "Replace.", icon: "fa-solid fa-layer-group" },
                { title: "Pillar three", body: "Replace.", icon: "fa-solid fa-compass" },
              ],
      });
      if (at >= 0) {
        const slide = slides[at]!;
        if (!slide["columns"]) delete slide["columns"];
        fixes.push(`Inserted feature-grid at slide ${at + 1} (theme-honesty soft-bento/workshop beat)`);
      }
    }

    if (needCode && !layoutList(slides).includes("code")) {
      const at = insertBeforeClosing(slides, {
        layout: "code",
        heading: "One-file aha",
        language: "ts",
        filename: "aha.ts",
        code: `// ${title}\nexport const ready = true;`,
      });
      fixes.push(`Inserted code at slide ${at + 1} (theme-honesty neon-tech beat)`);
    }
  }

  next.slides = slides;
  return { deck: next, fixes };
}

/**
 * Apply a single beat-class repair (Studio per-issue Insert). Falls back to full
 * `repairCraft` for `safe_fields`. Idempotent when the beat already exists.
 */
export function repairCraftBeat(deck: CraftAuditDeck, fixId: CraftFixId): CraftRepairResult {
  if (fixId === "safe_fields") {
    return repairCraft(deck);
  }

  const next = cloneDeck(deck);
  const fixes: string[] = [];
  const slides = asSlides(next);
  if (!slides.length) return { deck: next, fixes };

  if (!next.meta || typeof next.meta !== "object") next.meta = {};
  const meta = next.meta as Record<string, unknown>;
  const title = deckTitle(meta, slides);
  const layouts = layoutList(slides);

  const insertQuote = () => {
    if (layouts.includes("quote")) return;
    const company =
      (typeof meta["company"] === "string" && meta["company"].trim()) || "Team";
    const at = insertBeforeClosing(slides, {
      layout: "quote",
      quote: `The line that makes ${title} stick.`,
      by: company,
    });
    fixes.push(`Inserted quote at slide ${at + 1}`);
  };

  switch (fixId) {
    case "image_hero":
      if (!layouts.includes("image-hero")) {
        const at = insertAfterTitle(slides, {
          layout: "image-hero",
          eyebrow: "Visual beat",
          heading: title,
          lead: "Show the product, place, or atmosphere — not an icon grid.",
          image: craftHeroDataUri(title),
          imageAlt: `${title} craft field`,
        });
        fixes.push(`Inserted image-hero at slide ${at + 1}`);
      }
      break;
    case "comparison":
      if (!layouts.includes("comparison")) {
        const at = insertBeforeClosing(slides, {
          layout: "comparison",
          heading: "Before vs after",
          leftLabel: "Before",
          left: "Flat cadence — same layout repeated, no tension.",
          rightLabel: "After",
          right: `${title} — asymmetric craft that holds on first glance.`,
          emphasis: "right",
        });
        fixes.push(`Inserted comparison at slide ${at + 1}`);
      }
      break;
    case "stat_row":
      if (!layouts.includes("stat-row")) {
        const at = insertBeforeClosing(slides, {
          layout: "stat-row",
          heading: "By the numbers",
          stats: [
            { value: "3×", label: "Faster path" },
            { value: "1", label: "Schema" },
            { value: "100%", label: "Editable PPTX" },
          ],
        });
        fixes.push(`Inserted stat-row at slide ${at + 1}`);
      }
      break;
    case "logo_wall":
      if (!layouts.includes("logo-wall")) {
        const at = insertBeforeClosing(slides, {
          layout: "logo-wall",
          eyebrow: "Trusted by",
          heading: "Teams that ship with us.",
          columns: 4,
          cards: ["Northstar", "Harbor", "Fieldkit", "Lumen"].map((name) => ({
            title: name,
            body: "Partner",
          })),
        });
        fixes.push(`Inserted logo-wall at slide ${at + 1}`);
      }
      break;
    case "quote":
      insertQuote();
      break;
    case "ranked_list":
      if (!layouts.includes("ranked-list")) {
        const at = insertBeforeClosing(slides, {
          layout: "ranked-list",
          heading: "Top moments",
          items: [
            { label: title, widthPct: 92 },
            { label: "The beat that stuck", widthPct: 74 },
            { label: "Share-worthy closer", widthPct: 58 },
          ],
        });
        fixes.push(`Inserted ranked-list at slide ${at + 1}`);
      }
      break;
    case "streak_grid":
      if (!layouts.includes("streak-grid")) {
        const at = insertBeforeClosing(slides, {
          layout: "streak-grid",
          heading: "Streak board",
          filled: 21,
          total: 30,
          cols: 10,
        });
        fixes.push(`Inserted streak-grid at slide ${at + 1}`);
      }
      break;
    case "feature_grid":
      if (!layouts.includes("feature-grid")) {
        const at = insertBeforeClosing(slides, {
          layout: "feature-grid",
          heading: "Three pillars",
          cards: [
            { title: "Pillar one", body: "Replace.", icon: "fa-solid fa-bolt" },
            { title: "Pillar two", body: "Replace.", icon: "fa-solid fa-layer-group" },
            { title: "Pillar three", body: "Replace.", icon: "fa-solid fa-compass" },
          ],
        });
        fixes.push(`Inserted feature-grid at slide ${at + 1}`);
      }
      break;
    case "code":
      if (!layouts.includes("code")) {
        const at = insertBeforeClosing(slides, {
          layout: "code",
          heading: "One-file aha",
          language: "ts",
          filename: "aha.ts",
          code: `// ${title}\nexport const ready = true;`,
        });
        fixes.push(`Inserted code at slide ${at + 1}`);
      }
      break;
    case "wrap_tones": {
      let assigned = 0;
      const already = slides.filter((s) => {
        const t = s["tone"];
        return typeof t === "string" && t !== "default" && t.trim() !== "";
      }).length;
      for (let i = 0; i < slides.length && already + assigned < 3; i++) {
        const slide = slides[i]!;
        const t = slide["tone"];
        if (typeof t === "string" && t !== "default" && t.trim() !== "") continue;
        slide["tone"] = WRAP_TONES[(already + assigned) % WRAP_TONES.length]!;
        assigned += 1;
        fixes.push(`Slide ${i + 1}: set tone "${slide["tone"]}"`);
      }
      break;
    }
    default:
      break;
  }

  next.slides = slides;
  return { deck: next, fixes };
}
