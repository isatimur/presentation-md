/**
 * Shared craft gates for Studio Audit + MCP `audit_deck`.
 * Schema AJV validation stays separate; this is the agent-facing craft bar.
 */

export interface CraftIssue {
  severity: "error" | "warning";
  message: string;
  /** 1-based slide index when the issue is slide-local. */
  slide?: number;
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
      message:
        "No image-hero slide — investor/launch/brand decks need a cinematic visual beat (see references/stunning-25.md).",
    });
  }

  if (slides.length >= 5 && !hasAsymmetry) {
    issues.push({
      severity: "warning",
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
    const deckBlob = JSON.stringify(deck).toLowerCase();
    const launchy =
      /launch|waitlist|download|investor|series [abc]|get the app|join the|pre-order|book a|request (access|membership|rates)/i.test(
        deckBlob
      );
    if (launchy && actionCount === 1) {
      issues.push({
        severity: "warning",
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
        message:
          'kinetic-wrapped wrap needs a visual beat — use ranked-list, streak-grid, metric-ring, stat-row variant:"hero", or image-hero.',
      });
    }
    if (/streak/.test(copyBlob) && !layouts.includes("streak-grid")) {
      issues.push({
        severity: "warning",
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

/**
 * Apply safe structural craft fixes agents / Studio can accept in one hop.
 * Never invents slide copy or themes — only fills missing craft fields that
 * `auditCraft` already flags (emphasis, ratio, bento, CTA, icons, notes, brand).
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

  if (theme === "candy-pop") {
    const hasBrand =
      (typeof meta["company"] === "string" && String(meta["company"]).trim() !== "") ||
      (typeof meta["marquee"] === "string" && String(meta["marquee"]).trim() !== "");
    if (!hasBrand) {
      const title = typeof meta["title"] === "string" ? String(meta["title"]).trim() : "";
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
          const title = typeof card["title"] === "string" ? card["title"].trim() : "";
          if (/^[\d.,]+[%KkMmBx×+]*$/.test(title)) return;
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

      if (!hasAction) {
        slide["actions"] = [
          {
            label: "Get started",
            href: "#",
            style: "solid",
            icon: "fa-solid fa-arrow-right",
          },
          {
            label: "Learn more",
            href: "#",
            style: "outline",
            icon: "fa-solid fa-book-open",
          },
        ];
        delete slide["cta"];
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
      } else if (
        !Array.isArray(actions) &&
        cta &&
        typeof cta["label"] === "string" &&
        String(cta["label"]).trim() !== ""
      ) {
        const deckBlob = JSON.stringify(next).toLowerCase();
        const launchy =
          /launch|waitlist|download|investor|series [abc]|get the app|join the|pre-order|book a|request (access|membership|rates)/i.test(
            deckBlob
          );
        if (STUNNING_25_FOR_REPAIR.has(theme) || launchy) {
          const primaryLabel = String(cta["label"]).trim();
          const primaryHref =
            typeof cta["href"] === "string" && String(cta["href"]).trim()
              ? String(cta["href"])
              : "#";
          slide["actions"] = [
            {
              label: primaryLabel,
              href: primaryHref,
              style: "solid",
              icon:
                typeof cta["icon"] === "string" && String(cta["icon"]).trim()
                  ? String(cta["icon"])
                  : actionIconForLabel(primaryLabel),
            },
            {
              label: "Learn more",
              href: "#",
              style: "outline",
              icon: "fa-solid fa-book-open",
            },
          ];
          delete slide["cta"];
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

  next.slides = slides;
  return { deck: next, fixes };
}
