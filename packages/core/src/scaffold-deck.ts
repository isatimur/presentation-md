/**
 * Scaffold a schema-native Deck JSON skeleton from layout recipes.
 * Agents fill copy; layouts / asymmetry / closing duals / notes are pre-wired
 * so the first draft clears craft floors faster than freeform vibe HTML.
 */

import { CRAFT_VALID_LAYOUTS } from "./craft-audit.js";

export type ScaffoldPurpose =
  | "pitch"
  | "sales"
  | "keynote"
  | "investor"
  | "launch"
  | "wrap"
  | "neon"
  | "poster"
  | "paper"
  | "hud"
  | "modernist"
  | "hard-bento"
  | "glass"
  | "electric"
  | "briefing"
  | "quiet-luxe"
  | "soft-product"
  | "playful"
  | "neon-tech"
  | "data"
  | "scatterbrain";

export interface ScaffoldDeckOptions {
  purpose: ScaffoldPurpose;
  theme?: string;
  title?: string;
  company?: string;
}

export interface ScaffoldSlideSpec {
  layout: string;
  /** Short craft hint left in `notes` for the agent. */
  hint: string;
  fields?: Record<string, unknown>;
}

export interface ScaffoldRecipe {
  id: ScaffoldPurpose;
  label: string;
  /** Default theme when caller omits one. */
  defaultTheme: string;
  slides: ScaffoldSlideSpec[];
}

export interface ScaffoldDeckResult {
  deck: {
    type: "deck";
    meta: { title: string; theme: string; company?: string };
    slides: Array<Record<string, unknown>>;
  };
  purpose: ScaffoldPurpose;
  recipe_label: string;
  slide_count: number;
  hint: string;
}

const WRAP_TONES = ["lime", "magenta", "cyan", "orange", "violet"] as const;

/** Canonical recipe map — mirrors `references/layout-recipes.md` (OR picks first). */
export const SCAFFOLD_RECIPES: Record<ScaffoldPurpose, ScaffoldRecipe> = {
  pitch: {
    id: "pitch",
    label: "Pitch Deck (12)",
    defaultTheme: "default-tech",
    slides: [
      { layout: "title", hint: "Company name + one-line positioning" },
      { layout: "image-hero", hint: "Manifesto visual: the world as it should be" },
      { layout: "stat-row", hint: "The size of the problem (3 shocking numbers)" },
      {
        layout: "comparison",
        hint: "Life without you vs life with you",
        fields: { emphasis: "right", leftLabel: "Without", rightLabel: "With" },
      },
      {
        layout: "two-column",
        hint: "How it works + visual",
        fields: { ratio: "2-1" },
      },
      {
        layout: "feature-grid",
        hint: "3 core capabilities",
        fields: {
          cards: [
            { title: "Capability one", body: "Replace with proof.", icon: "fa-solid fa-bolt" },
            { title: "Capability two", body: "Replace with proof.", icon: "fa-solid fa-layer-group" },
            { title: "Capability three", body: "Replace with proof.", icon: "fa-solid fa-compass" },
          ],
        },
      },
      {
        layout: "stat-row",
        hint: "Single most impressive traction stat",
        fields: { variant: "hero" },
      },
      { layout: "logo-wall", hint: "Customers / design partners" },
      { layout: "data-table", hint: "Why not the incumbents (your column last)" },
      { layout: "data-table", hint: "Financials + projections" },
      { layout: "timeline", hint: "GTM roadmap (4 quarters)" },
      { layout: "closing", hint: "The ask + dual CTA" },
    ],
  },
  sales: {
    id: "sales",
    label: "Sales Demo (10)",
    defaultTheme: "corporate",
    slides: [
      { layout: "title", hint: "Customer-personalised opener" },
      { layout: "image-hero", hint: "Their world / product moment" },
      {
        layout: "comparison",
        hint: "Status quo vs with you",
        fields: { emphasis: "right", leftLabel: "Status quo", rightLabel: "With you" },
      },
      { layout: "stat-row", hint: "Cost of the problem (their numbers)" },
      { layout: "timeline", hint: "How it works (5 steps)" },
      {
        layout: "feature-grid",
        hint: "3 modules mapped to pains",
        fields: {
          cards: [
            { title: "Module A", body: "Maps to pain 1.", icon: "fa-solid fa-bolt" },
            { title: "Module B", body: "Maps to pain 2.", icon: "fa-solid fa-layer-group" },
            { title: "Module C", body: "Maps to pain 3.", icon: "fa-solid fa-compass" },
          ],
        },
      },
      { layout: "quote", hint: "Customer who looks like them" },
      { layout: "data-table", hint: "Pricing + what's included" },
      { layout: "timeline", hint: "Implementation milestones" },
      { layout: "closing", hint: "Next step — dual ask OK" },
    ],
  },
  keynote: {
    id: "keynote",
    label: "Keynote / Conference Talk (10)",
    defaultTheme: "bold-poster",
    slides: [
      { layout: "title", hint: "Provocative thesis" },
      { layout: "image-hero", hint: "The tension visual" },
      {
        layout: "comparison",
        hint: "Conventional wisdom vs the truth",
        fields: { emphasis: "right", leftLabel: "Conventional", rightLabel: "Truth" },
      },
      { layout: "section", hint: "Part 1: The Problem", fields: { number: "01" } },
      { layout: "two-column", hint: "Old way vs new way", fields: { ratio: "2-1" } },
      { layout: "section", hint: "Part 2: The Principle", fields: { number: "02" } },
      {
        layout: "feature-grid",
        hint: "3 things that change",
        fields: {
          cards: [
            { title: "Change one", body: "Replace.", icon: "fa-solid fa-bolt" },
            { title: "Change two", body: "Replace.", icon: "fa-solid fa-layer-group" },
            { title: "Change three", body: "Replace.", icon: "fa-solid fa-compass" },
          ],
        },
      },
      { layout: "quote", hint: "Authority who agrees" },
      { layout: "stat-row", hint: "The one number that proves it" },
      { layout: "closing", hint: "Invitation to act" },
    ],
  },
  investor: {
    id: "investor",
    label: "Investor Update (10)",
    defaultTheme: "ft-editorial",
    slides: [
      { layout: "title", hint: "Fund / company + period" },
      { layout: "image-hero", hint: "Portfolio or thesis visual" },
      { layout: "stat-row", hint: "Quarter in numbers" },
      { layout: "data-table", hint: "Portfolio / KPI performance" },
      { layout: "two-column", hint: "Key initiative deep dive", fields: { ratio: "2-1" } },
      { layout: "logo-wall", hint: "Portfolio marks / LPs / customers" },
      { layout: "timeline", hint: "Forward guidance" },
      { layout: "data-table", hint: "Risk register" },
      {
        layout: "comparison",
        hint: "Tailwinds vs headwinds",
        fields: { emphasis: "left", leftLabel: "Tailwinds", rightLabel: "Headwinds" },
      },
      { layout: "closing", hint: "Contact + data room" },
    ],
  },
  launch: {
    id: "launch",
    label: "Product Launch (10)",
    defaultTheme: "genz-bento",
    slides: [
      { layout: "title", hint: "Product name + launch promise" },
      { layout: "image-hero", hint: "Hero product moment" },
      {
        layout: "comparison",
        hint: "Before vs after the product",
        fields: { emphasis: "right", leftLabel: "Before", rightLabel: "After" },
      },
      {
        layout: "feature-grid",
        hint: "3 launch pillars",
        fields: {
          cards: [
            { title: "Pillar one", body: "Replace.", icon: "fa-solid fa-rocket" },
            { title: "Pillar two", body: "Replace.", icon: "fa-solid fa-bolt" },
            { title: "Pillar three", body: "Replace.", icon: "fa-solid fa-users" },
          ],
        },
      },
      { layout: "stat-row", hint: "Proof metrics" },
      { layout: "quote", hint: "Design partner or early user" },
      { layout: "timeline", hint: "Launch week beats" },
      { layout: "logo-wall", hint: "Press / partners / stack" },
      { layout: "two-column", hint: "Pricing or access + visual", fields: { ratio: "2-1" } },
      { layout: "closing", hint: "Dual ask: primary + secondary" },
    ],
  },
  wrap: {
    id: "wrap",
    label: "Year Wrap / Kinetic Wrapped (8–10)",
    defaultTheme: "kinetic-wrapped",
    slides: [
      { layout: "title", hint: "Year / persona + manifesto", fields: { tone: "lime" } },
      {
        layout: "stat-row",
        hint: "Mega number",
        fields: { variant: "hero", tone: "magenta" },
      },
      { layout: "ranked-list", hint: "Top-N moments", fields: { tone: "cyan" } },
      { layout: "streak-grid", hint: "Day streak proof", fields: { filled: 21, total: 30, cols: 10 } },
      { layout: "metric-ring", hint: "Percentile KPI", fields: { pct: 100, value: "Top 1%", label: "Percentile" } },
      { layout: "image-hero", hint: "Signature visual beat", fields: { tone: "orange" } },
      {
        layout: "quote",
        hint: "The line that stuck",
        fields: { tone: "violet" },
      },
      { layout: "closing", hint: "Share dual ask" },
    ],
  },
  neon: {
    id: "neon",
    label: "Neon / Atmosphere short (8)",
    defaultTheme: "neon-noir",
    slides: [
      { layout: "title", hint: "Mood-forward positioning" },
      { layout: "image-hero", hint: "Cinematic atmosphere still" },
      { layout: "quote", hint: "One sharp line" },
      {
        layout: "comparison",
        hint: "Old night vs new night",
        fields: { emphasis: "right", leftLabel: "Old night", rightLabel: "New night" },
      },
      {
        layout: "feature-grid",
        hint: "3 capabilities — keep sparse",
        fields: {
          cards: [
            { title: "Signal", body: "Replace.", icon: "fa-solid fa-bolt" },
            { title: "Glow", body: "Replace.", icon: "fa-solid fa-moon" },
            { title: "Pulse", body: "Replace.", icon: "fa-solid fa-wave-square" },
          ],
        },
      },
      { layout: "stat-row", hint: "1–3 proof numbers" },
      { layout: "two-column", hint: "Product moment + copy", fields: { ratio: "2-1" } },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  poster: {
    id: "poster",
    label: "Poster / activist short (8)",
    defaultTheme: "coral",
    slides: [
      { layout: "title", hint: "Poster manifesto" },
      { layout: "image-hero", hint: "Single iconic visual" },
      {
        layout: "comparison",
        hint: "Us vs them / now vs next",
        fields: { emphasis: "right", leftLabel: "Them", rightLabel: "Us" },
      },
      { layout: "stat-row", hint: "Numbers that punch" },
      { layout: "quote", hint: "Rally line" },
      {
        layout: "feature-grid",
        hint: "3 demands / pillars",
        fields: {
          cards: [
            { title: "Demand one", body: "Replace.", icon: "fa-solid fa-bullhorn" },
            { title: "Demand two", body: "Replace.", icon: "fa-solid fa-flag" },
            { title: "Demand three", body: "Replace.", icon: "fa-solid fa-hand-fist" },
          ],
        },
      },
      { layout: "timeline", hint: "Movement beats" },
      { layout: "closing", hint: "Dual ask (join + share)" },
    ],
  },
  paper: {
    id: "paper",
    label: "Paper / editorial short (8)",
    defaultTheme: "soft-editorial",
    slides: [
      { layout: "title", hint: "Literary cover lead" },
      { layout: "quote", hint: "Opening epigraph" },
      {
        layout: "comparison",
        hint: "Thesis vs foil",
        fields: { emphasis: "right", leftLabel: "Foil", rightLabel: "Thesis" },
      },
      { layout: "image-hero", hint: "Editorial photograph" },
      { layout: "two-column", hint: "Essay beat", fields: { ratio: "2-1" } },
      { layout: "feature-grid", hint: "Sparse evidence", fields: {
        cards: [
          { title: "Evidence one", body: "Replace.", icon: "fa-solid fa-book-open" },
          { title: "Evidence two", body: "Replace.", icon: "fa-solid fa-pen-nib" },
          { title: "Evidence three", body: "Replace.", icon: "fa-solid fa-quote-left" },
        ],
      } },
      { layout: "stat-row", hint: "One quiet proof number" },
      { layout: "closing", hint: "Dual ask (read more / subscribe)" },
    ],
  },
  hud: {
    id: "hud",
    label: "HUD / tech short (8)",
    defaultTheme: "aerospace-hud",
    slides: [
      { layout: "title", hint: "Mission / system callsign" },
      { layout: "image-hero", hint: "Status visual / terse readout" },
      { layout: "stat-row", hint: "Telemetry numbers" },
      { layout: "chart", hint: "Instrument proof" },
      { layout: "timeline", hint: "Sequence / priority stack" },
      {
        layout: "feature-grid",
        hint: "3 modules — keep sparse",
        fields: {
          cards: [
            { title: "Module α", body: "Replace.", icon: "fa-solid fa-satellite" },
            { title: "Module β", body: "Replace.", icon: "fa-solid fa-satellite-dish" },
            { title: "Module γ", body: "Replace.", icon: "fa-solid fa-microchip" },
          ],
        },
      },
      { layout: "two-column", hint: "Ops note + visual", fields: { ratio: "2-1" } },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  modernist: {
    id: "modernist",
    label: "Modernist short (8)",
    defaultTheme: "bauhaus",
    slides: [
      { layout: "title", hint: "Manifesto / system name" },
      { layout: "quote", hint: "Primary visual / epigraph" },
      {
        layout: "comparison",
        hint: "Old craft vs new craft",
        fields: { emphasis: "right", leftLabel: "Old craft", rightLabel: "New craft" },
      },
      {
        layout: "feature-grid",
        hint: "3 pillars",
        fields: {
          cards: [
            { title: "Form", body: "Replace.", icon: "fa-solid fa-shapes" },
            { title: "Type", body: "Replace.", icon: "fa-solid fa-font" },
            { title: "Grid", body: "Replace.", icon: "fa-solid fa-border-all" },
          ],
        },
      },
      { layout: "two-column", hint: "Principle + diagram", fields: { ratio: "2-1" } },
      { layout: "stat-row", hint: "1–3 proof numbers" },
      { layout: "timeline", hint: "Build sequence" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  "hard-bento": {
    id: "hard-bento",
    label: "Hard-bento short (8)",
    defaultTheme: "genz-bento",
    slides: [
      { layout: "title", hint: "Loud product promise" },
      { layout: "image-hero", hint: "Hero product / lifestyle still" },
      {
        layout: "comparison",
        hint: "Before vs after",
        fields: { emphasis: "right", leftLabel: "Before", rightLabel: "After" },
      },
      {
        layout: "feature-grid",
        hint: "5 cards bento",
        fields: {
          columns: "bento",
          cards: [
            { title: "Tile one", body: "Replace.", icon: "fa-solid fa-bolt" },
            { title: "Tile two", body: "Replace.", icon: "fa-solid fa-star" },
            { title: "Tile three", body: "Replace.", icon: "fa-solid fa-heart" },
            { title: "Tile four", body: "Replace.", icon: "fa-solid fa-fire" },
                { title: "Tile five", body: "Replace.", icon: "fa-solid fa-wand-magic-sparkles" },
          ],
        },
      },
      { layout: "stat-row", hint: "Punchy launch numbers" },
      { layout: "quote", hint: "Community / founder line" },
      { layout: "logo-wall", hint: "Partners / ship plan" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  glass: {
    id: "glass",
    label: "Glass product short (8)",
    defaultTheme: "aurora-glass",
    slides: [
      { layout: "title", hint: "Soft product promise" },
      { layout: "image-hero", hint: "Product in atmosphere" },
      { layout: "quote", hint: "One sharp product line" },
      {
        layout: "feature-grid",
        hint: "3 capabilities",
        fields: {
          cards: [
            { title: "Frost", body: "Replace.", icon: "fa-solid fa-droplet" },
            { title: "Depth", body: "Replace.", icon: "fa-solid fa-layer-group" },
            { title: "Glow", body: "Replace.", icon: "fa-solid fa-sun" },
          ],
        },
      },
      { layout: "stat-row", hint: "Trust / adoption numbers" },
      { layout: "two-column", hint: "Moment + copy", fields: { ratio: "2-1" } },
      {
        layout: "comparison",
        hint: "Status quo vs glass",
        fields: { emphasis: "right", leftLabel: "Status quo", rightLabel: "Glass" },
      },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  electric: {
    id: "electric",
    label: "Electric brand short (8)",
    defaultTheme: "electric-studio",
    slides: [
      { layout: "title", hint: "Brand call to action" },
      { layout: "image-hero", hint: "Signature brand visual" },
      {
        layout: "comparison",
        hint: "Noise vs signal",
        fields: { emphasis: "right", leftLabel: "Noise", rightLabel: "Signal" },
      },
      {
        layout: "feature-grid",
        hint: "3 offerings",
        fields: {
          cards: [
            { title: "Offer one", body: "Replace.", icon: "fa-solid fa-bolt" },
            { title: "Offer two", body: "Replace.", icon: "fa-solid fa-wand-magic-sparkles" },
            { title: "Offer three", body: "Replace.", icon: "fa-solid fa-palette" },
          ],
        },
      },
      { layout: "quote", hint: "Brand manifesto line" },
      { layout: "stat-row", hint: "Proof numbers" },
      { layout: "timeline", hint: "Work / clients" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  briefing: {
    id: "briefing",
    label: "Signal briefing short (8)",
    defaultTheme: "signal",
    slides: [
      { layout: "title", hint: "Briefing cover lead" },
      { layout: "quote", hint: "Opening line" },
      {
        layout: "comparison",
        hint: "Thesis vs foil",
        fields: { emphasis: "right", leftLabel: "Foil", rightLabel: "Thesis" },
      },
      { layout: "image-hero", hint: "Composed still / map moment" },
      { layout: "two-column", hint: "Analysis beat", fields: { ratio: "2-1" } },
      { layout: "stat-row", hint: "1–3 proof numbers" },
      {
        layout: "feature-grid",
        hint: "3 sparse pillars",
        fields: {
          cards: [
            { title: "Finding one", body: "Replace.", icon: "fa-solid fa-flag" },
            { title: "Finding two", body: "Replace.", icon: "fa-solid fa-compass" },
            { title: "Finding three", body: "Replace.", icon: "fa-solid fa-chart-line" },
          ],
        },
      },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  "quiet-luxe": {
    id: "quiet-luxe",
    label: "Quiet-luxe short (8)",
    defaultTheme: "luxury-minimalist",
    slides: [
      { layout: "title", hint: "Quiet manifesto" },
      { layout: "quote", hint: "One cream line on dark" },
      { layout: "image-hero", hint: "Singular photograph" },
      {
        layout: "comparison",
        hint: "Discretion vs noise",
        fields: { emphasis: "left", leftLabel: "Discretion", rightLabel: "Noise" },
      },
      { layout: "two-column", hint: "Thesis + proof", fields: { ratio: "2-1" } },
      {
        layout: "feature-grid",
        hint: "3 sparse pillars",
        fields: {
          cards: [
            { title: "Craft", body: "Replace.", icon: "fa-solid fa-gem" },
            { title: "Space", body: "Replace.", icon: "fa-solid fa-minimize" },
            { title: "Time", body: "Replace.", icon: "fa-solid fa-hourglass" },
          ],
        },
      },
      { layout: "stat-row", hint: "One quiet proof number" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  "soft-product": {
    id: "soft-product",
    label: "Soft-product short (8)",
    defaultTheme: "corporate",
    slides: [
      { layout: "title", hint: "Product cover" },
      {
        layout: "feature-grid",
        hint: "3 pillars",
        fields: {
          cards: [
            { title: "Pillar one", body: "Replace.", icon: "fa-solid fa-shield-halved" },
            { title: "Pillar two", body: "Replace.", icon: "fa-solid fa-chart-line" },
            { title: "Pillar three", body: "Replace.", icon: "fa-solid fa-users" },
          ],
        },
      },
      {
        layout: "comparison",
        hint: "Before vs after",
        fields: { emphasis: "right", leftLabel: "Before", rightLabel: "After" },
      },
      { layout: "stat-row", hint: "1–3 proof numbers" },
      { layout: "chart", hint: "Mechanism / proof" },
      { layout: "two-column", hint: "Detail", fields: { ratio: "2-1" } },
      { layout: "quote", hint: "Customer line" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  playful: {
    id: "playful",
    label: "Playful soft-bento short (8)",
    defaultTheme: "playful",
    slides: [
      { layout: "title", hint: "Bright cover" },
      { layout: "image-hero", hint: "Product / place moment" },
      {
        layout: "feature-grid",
        hint: "3–5 playful tiles",
        fields: {
          columns: "bento",
          cards: [
            { title: "Play one", body: "Replace.", icon: "fa-solid fa-face-smile" },
            { title: "Play two", body: "Replace.", icon: "fa-solid fa-puzzle-piece" },
            { title: "Play three", body: "Replace.", icon: "fa-solid fa-paintbrush" },
            { title: "Play four", body: "Replace.", icon: "fa-solid fa-star" },
            { title: "Play five", body: "Replace.", icon: "fa-solid fa-gift" },
          ],
        },
      },
      { layout: "quote", hint: "Brand line" },
      { layout: "stat-row", hint: "Punchy numbers" },
      {
        layout: "comparison",
        hint: "Us vs them",
        fields: { emphasis: "right", leftLabel: "Them", rightLabel: "Us" },
      },
      { layout: "two-column", hint: "Story beat", fields: { ratio: "2-1" } },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  "neon-tech": {
    id: "neon-tech",
    label: "Neon-tech short (8)",
    defaultTheme: "default-tech",
    slides: [
      { layout: "title", hint: "Product / SDK cover" },
      {
        layout: "code",
        hint: "One-file aha",
        fields: {
          language: "ts",
          filename: "aha.ts",
          code: "// Replace with the one-file aha\nexport const ready = true;",
        },
      },
      {
        layout: "feature-grid",
        hint: "3 capabilities",
        fields: {
          cards: [
            { title: "Ship", body: "Replace.", icon: "fa-solid fa-rocket" },
            { title: "Type", body: "Replace.", icon: "fa-solid fa-code" },
            { title: "Observe", body: "Replace.", icon: "fa-solid fa-chart-line" },
          ],
        },
      },
      {
        layout: "comparison",
        hint: "Before vs after",
        fields: { emphasis: "right", leftLabel: "Before", rightLabel: "After" },
      },
      { layout: "stat-row", hint: "Proof numbers" },
      { layout: "two-column", hint: "Architecture beat", fields: { ratio: "2-1" } },
      { layout: "image-hero", hint: "Signature moment" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  data: {
    id: "data",
    label: "Data-editorial short (8)",
    defaultTheme: "data-editorial",
    slides: [
      { layout: "title", hint: "Report cover lead" },
      { layout: "stat-row", hint: "Headline numbers" },
      { layout: "chart", hint: "Primary finding" },
      { layout: "data-table", hint: "Supporting cut" },
      { layout: "ranked-list", hint: "Order / sequence" },
      {
        layout: "comparison",
        hint: "Thesis vs foil",
        fields: { emphasis: "right", leftLabel: "Foil", rightLabel: "Thesis" },
      },
      { layout: "quote", hint: "Analyst line" },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
  scatterbrain: {
    id: "scatterbrain",
    label: "Scatterbrain workshop short (8)",
    defaultTheme: "scatterbrain",
    slides: [
      { layout: "title", hint: "Workshop cover" },
      {
        layout: "feature-grid",
        hint: "3–5 sticky ideas",
        fields: {
          columns: "bento",
          cards: [
            { title: "Sticky one", body: "Replace.", icon: "fa-solid fa-note-sticky" },
            { title: "Sticky two", body: "Replace.", icon: "fa-solid fa-lightbulb" },
            { title: "Sticky three", body: "Replace.", icon: "fa-solid fa-thumbtack" },
            { title: "Sticky four", body: "Replace.", icon: "fa-solid fa-scissors" },
            { title: "Sticky five", body: "Replace.", icon: "fa-solid fa-marker" },
          ],
        },
      },
      { layout: "image-hero", hint: "Wall / board moment" },
      { layout: "quote", hint: "Sharpie manifesto" },
      { layout: "stat-row", hint: "Punchy counts" },
      {
        layout: "comparison",
        hint: "Keep vs kill",
        fields: { emphasis: "left", leftLabel: "Keep", rightLabel: "Kill" },
      },
      { layout: "two-column", hint: "Next actions", fields: { ratio: "2-1" } },
      { layout: "closing", hint: "Dual ask with icons" },
    ],
  },
};

export const SCAFFOLD_PURPOSE_IDS = Object.keys(SCAFFOLD_RECIPES) as ScaffoldPurpose[];

const PURPOSE_ALIASES: Record<string, ScaffoldPurpose> = {
  pitch: "pitch",
  "pitch-deck": "pitch",
  sales: "sales",
  demo: "sales",
  "sales-demo": "sales",
  keynote: "keynote",
  talk: "keynote",
  conference: "keynote",
  investor: "investor",
  "investor-update": "investor",
  launch: "launch",
  "product-launch": "launch",
  wrap: "wrap",
  wrapped: "wrap",
  "year-wrap": "wrap",
  kinetic: "wrap",
  neon: "neon",
  atmosphere: "neon",
  noir: "neon",
  poster: "poster",
  activist: "poster",
  paper: "paper",
  editorial: "paper",
  magazine: "paper",
  hud: "hud",
  tech: "hud",
  instrument: "hud",
  modernist: "modernist",
  bauhaus: "modernist",
  swiss: "modernist",
  "hard-bento": "hard-bento",
  bento: "hard-bento",
  genz: "hard-bento",
  glass: "glass",
  frosted: "glass",
  electric: "electric",
  voltage: "electric",
  briefing: "briefing",
  signal: "briefing",
  "quiet-luxe": "quiet-luxe",
  luxe: "quiet-luxe",
  luxury: "quiet-luxe",
  "soft-product": "soft-product",
  corporate: "soft-product",
  fintech: "soft-product",
  playful: "playful",
  pastel: "playful",
  "neon-tech": "neon-tech",
  developer: "neon-tech",
  sdk: "neon-tech",
  data: "data",
  "data-editorial": "data",
  report: "data",
  scatterbrain: "scatterbrain",
  workshop: "scatterbrain",
};

export function resolveScaffoldPurpose(raw: string): ScaffoldPurpose | null {
  const key = raw.trim().toLowerCase().replace(/[_\s]+/g, "-");
  return PURPOSE_ALIASES[key] ?? null;
}

function craftHeroDataUri(title: string): string {
  const safe = title.replace(/[<>&"]/g, "").slice(0, 48) || "Craft";
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/><text x="96" y="780" fill="#F8FAFC" font-family="Georgia,serif" font-size="54" font-weight="700">${safe}</text></svg>`
    )
  );
}

function defaultFieldsForLayout(
  layout: string,
  title: string,
  company: string,
  index: number,
  total: number
): Record<string, unknown> {
  switch (layout) {
    case "title":
      return {
        heading: title,
        lead: "Replace with one-line positioning.",
        eyebrow: company || "Draft",
      };
    case "section":
      return {
        heading: `Part ${index}`,
        number: String(index).padStart(2, "0"),
      };
    case "image-hero":
      return {
        eyebrow: "Visual beat",
        heading: title,
        lead: "Show the product, place, or atmosphere — replace this placeholder.",
        image: craftHeroDataUri(title),
        imageAlt: `${title} scaffold field`,
      };
    case "comparison":
      return {
        heading: "Before vs after",
        leftLabel: "Before",
        left: "Replace with the loser column.",
        rightLabel: "After",
        right: `Replace with how ${title} wins.`,
        emphasis: "right",
      };
    case "two-column":
      return {
        heading: "How it works",
        left: "Replace with the primary column.",
        right: "Replace with supporting detail or visual cue.",
        ratio: "2-1",
      };
    case "feature-grid":
      return {
        heading: "Three pillars",
        cards: [
          { title: "Pillar one", body: "Replace.", icon: "fa-solid fa-bolt" },
          { title: "Pillar two", body: "Replace.", icon: "fa-solid fa-layer-group" },
          { title: "Pillar three", body: "Replace.", icon: "fa-solid fa-compass" },
        ],
      };
    case "quote":
      return {
        quote: `The line that makes ${title} stick.`,
        by: company || "Team",
      };
    case "stat-row":
      return {
        heading: "By the numbers",
        stats: [
          { value: "3×", label: "Faster path" },
          { value: "1", label: "Schema" },
          { value: "100%", label: "Editable" },
        ],
      };
    case "data-table":
      return {
        heading: "Evidence table",
        headers: ["Metric", "Before", "After"],
        rows: [
          ["Cycle time", "Days", "Hours"],
          ["Rewrites", "Many", "One schema"],
          ["Export", "Screenshot", "Editable PPTX"],
        ],
      };
    case "timeline":
      return {
        heading: "Roadmap",
        items: [
          { title: "Now", body: "Replace." },
          { title: "Next", body: "Replace." },
          { title: "Later", body: "Replace." },
          { title: "Horizon", body: "Replace." },
        ],
      };
    case "chart":
      return {
        heading: "Primary finding",
        chart: {
          type: "bar",
          labels: ["A", "B", "C"],
          series: [{ name: "Signal", values: [42, 68, 91] }],
        },
      };
    case "code":
      return {
        heading: "One-file aha",
        language: "ts",
        filename: "aha.ts",
        code: `// ${title}\nexport const ready = true;`,
      };
    case "logo-wall":
      return {
        eyebrow: "Trusted by",
        heading: "Teams that ship with us.",
        columns: 4,
        cards: [
          { title: "Northstar", body: "Partner" },
          { title: "Harbor", body: "Partner" },
          { title: "Fieldkit", body: "Partner" },
          { title: "Lumen", body: "Partner" },
        ],
      };
    case "ranked-list":
      return {
        heading: "Top moments",
        items: [
          { label: title, widthPct: 92 },
          { label: "The beat that stuck", widthPct: 74 },
          { label: "Share-worthy closer", widthPct: 58 },
        ],
      };
    case "streak-grid":
      return {
        heading: "Streak board",
        filled: 21,
        total: 30,
        cols: 10,
      };
    case "metric-ring":
      return {
        heading: "Percentile",
        value: "Top 1%",
        label: "Craft bar",
        pct: 100,
      };
    case "closing":
      return {
        heading: total > 8 ? "Let's build" : "Next step",
        lead: "Replace with the ask.",
        actions: [
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
        ],
      };
    default:
      return { heading: title };
  }
}

function noteForSlide(layout: string, hint: string, index: number, total: number): string {
  if (layout === "title") return `Cold open — land the thesis. (${hint})`;
  if (layout === "closing") return `Close on the ask — pause. (${hint})`;
  if (index === Math.floor(total / 2)) return `Hold the midpoint beat. (${hint})`;
  if (layout === "comparison") return `Name the loser column first. (${hint})`;
  if (layout === "image-hero") return `Let the visual breathe. (${hint})`;
  return hint;
}

/**
 * Build a schema-valid deck skeleton for `purpose` + theme.
 * Placeholder copy is intentional — agents rewrite voice; craft structure is locked.
 */
export function scaffoldDeck(options: ScaffoldDeckOptions): ScaffoldDeckResult {
  const recipe = SCAFFOLD_RECIPES[options.purpose];
  if (!recipe) {
    throw new Error(`Unknown scaffold purpose: ${String(options.purpose)}`);
  }

  const title = (options.title?.trim() || "Untitled deck").slice(0, 120);
  const company = options.company?.trim() || "";
  const theme =
    options.theme?.trim() ||
    (options.purpose === "wrap" ? "kinetic-wrapped" : recipe.defaultTheme);

  const slides: Array<Record<string, unknown>> = recipe.slides.map((spec, i) => {
    if (!CRAFT_VALID_LAYOUTS.has(spec.layout)) {
      throw new Error(`Recipe ${recipe.id} has invalid layout "${spec.layout}"`);
    }
    const defaults = defaultFieldsForLayout(
      spec.layout,
      title,
      company,
      i + 1,
      recipe.slides.length
    );
    const slide: Record<string, unknown> = {
      layout: spec.layout,
      ...defaults,
      ...(spec.fields ?? {}),
    };
    // Prefer recipe-provided heading/eyebrow over generic defaults when present.
    if (spec.fields?.["heading"]) slide["heading"] = spec.fields["heading"];
    if (!slide["notes"]) {
      const keyNotes =
        i === 0 ||
        spec.layout === "closing" ||
        i === Math.floor(recipe.slides.length / 2) ||
        spec.layout === "comparison" ||
        spec.layout === "image-hero";
      if (keyNotes) {
        slide["notes"] = noteForSlide(spec.layout, spec.hint, i, recipe.slides.length);
      }
    }
    return slide;
  });

  // Ensure wrap scaffolds already satisfy tone gate.
  if (options.purpose === "wrap" || theme === "kinetic-wrapped") {
    let toned = slides.filter((s) => {
      const t = s["tone"];
      return typeof t === "string" && t !== "default" && t.trim() !== "";
    }).length;
    for (let i = 0; i < slides.length && toned < 3; i++) {
      const t = slides[i]!["tone"];
      if (typeof t === "string" && t !== "default" && t.trim() !== "") continue;
      slides[i]!["tone"] = WRAP_TONES[toned % WRAP_TONES.length]!;
      toned += 1;
    }
  }

  const meta: { title: string; theme: string; company?: string } = { title, theme };
  if (company) meta.company = company;
  else if (theme === "candy-pop") meta.company = title;

  return {
    deck: {
      type: "deck",
      meta,
      slides,
    },
    purpose: options.purpose,
    recipe_label: recipe.label,
    slide_count: slides.length,
    hint: "Replace placeholder copy with theme-native voice, then audit_deck → judge_deck. Structure already clears craft floors (asymmetry, image-hero, data, dual CTA, notes).",
  };
}

export function listScaffoldPurposes(): Array<{
  id: ScaffoldPurpose;
  label: string;
  defaultTheme: string;
  slide_count: number;
}> {
  return SCAFFOLD_PURPOSE_IDS.map((id) => {
    const r = SCAFFOLD_RECIPES[id];
    return {
      id,
      label: r.label,
      defaultTheme: r.defaultTheme,
      slide_count: r.slides.length,
    };
  });
}
