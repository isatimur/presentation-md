import type { DeckJson } from "@presentation-md/export";
import { EXAMPLE_DECK } from "./deck.js";

export interface StudioExample {
  slug: string;
  label: string;
  theme: string;
  load: () => Promise<DeckJson>;
}

type DeckModule = { default: DeckJson } | DeckJson;

function lazyExample(
  slug: string,
  label: string,
  theme: string,
  loader: () => Promise<unknown>
): StudioExample {
  return {
    slug,
    label,
    theme,
    load: async () => {
      const module = (await loader()) as DeckModule;
      return "default" in module ? module.default : module;
    },
  };
}

/**
 * Canonical #1 showcase set (gallery flagships). Order matches the site
 * stunning-twenty-five strip: NovaSpark → Apsis.
 */
const FLAGSHIP_EXAMPLES: StudioExample[] = [
  lazyExample("novaspark-pitch", "NovaSpark (aurora-glass)", "aurora-glass", () => import("../../../examples/decks/novaspark-pitch.json")),
  lazyExample("meridian-sales", "Meridian (ft-editorial)", "ft-editorial", () => import("../../../examples/decks/meridian-sales.json")),
  lazyExample("bounce-launch", "Bounce (genz-bento)", "genz-bento", () => import("../../../examples/decks/bounce-launch.json")),
  lazyExample("solstice-update", "Solstice (ultra-luxury)", "luxury-minimalist", () => import("../../../examples/decks/solstice-update.json")),
  lazyExample("retronet-demo", "RetroNet (crt-terminal)", "crt-terminal", () => import("../../../examples/decks/retronet-demo.json")),
  lazyExample("gridsystems-studio", "Grid Systems (swiss)", "swiss-typographic", () => import("../../../examples/decks/gridsystems-studio.json")),
  lazyExample("monolith-seriesa", "MONOLITH (brutalist)", "brutalist-acid", () => import("../../../examples/decks/monolith-seriesa.json")),
  lazyExample("jellybean-launch", "Jellybean (candy-pop)", "candy-pop", () => import("../../../examples/decks/jellybean-launch.json")),
  lazyExample("axiom-robotics", "Axiom (aerospace-hud)", "aerospace-hud", () => import("../../../examples/decks/axiom-robotics.json")),
  lazyExample("atelier-brand", "Atelier No. 9 (heritage)", "heritage-editorial", () => import("../../../examples/decks/atelier-brand.json")),
  lazyExample("ledgerline-payout", "Ledgerline (fintech)", "fintech-clean", () => import("../../../examples/decks/ledgerline-payout.json")),
  lazyExample("forge-api", "Forge (developer-dark)", "developer-dark", () => import("../../../examples/decks/forge-api.json")),
  lazyExample("signalbox-report", "Signalbox (data-editorial)", "data-editorial", () => import("../../../examples/decks/signalbox-report.json")),
  lazyExample("primary-keynote", "Primary (bauhaus)", "bauhaus", () => import("../../../examples/decks/primary-keynote.json")),
  lazyExample("bubbleflow-launch", "BubbleFlow (y2k)", "y2k-aero", () => import("../../../examples/decks/bubbleflow-launch.json")),
  lazyExample("inkwell-pitch", "Inkwell (risograph)", "risograph-zine", () => import("../../../examples/decks/inkwell-pitch.json")),
  lazyExample("neondistrict-platform", "Neon District (neon-noir)", "neon-noir", () => import("../../../examples/decks/neondistrict-platform.json")),
  lazyExample("hygge-brand", "Hygge (scandinavian)", "scandinavian", () => import("../../../examples/decks/hygge-brand.json")),
  lazyExample("meridianclub-investor", "Meridian Club (art-deco)", "art-deco", () => import("../../../examples/decks/meridianclub-investor.json")),
  lazyExample("mallsoft-launch", "Mallsoft (vaporwave)", "vaporwave", () => import("../../../examples/decks/mallsoft-launch.json")),
  lazyExample("dailyledger-mediakit", "Daily Ledger (broadsheet)", "broadsheet", () => import("../../../examples/decks/dailyledger-mediakit.json")),
  lazyExample("cloudpeak-pricing", "CloudPeak (glass)", "glassmorphism", () => import("../../../examples/decks/cloudpeak-pricing.json")),
  lazyExample("pulse-wrapped", "Pulse (kinetic-wrapped)", "kinetic-wrapped", () => import("../../../examples/decks/pulse-wrapped.json")),
  lazyExample("verdant-impact", "Verdant (botanical-luxe)", "botanical-luxe", () => import("../../../examples/decks/verdant-impact.json")),
  lazyExample("apsis-mission", "Apsis (blueprint)", "blueprint", () => import("../../../examples/decks/apsis-mission.json")),
];

/** Allowlisted deep-link examples (`?example=<slug>`). Flagships first. */
export const STUDIO_EXAMPLES: StudioExample[] = [
  { slug: "acme", label: "Acme Q3 (signal)", theme: "signal", load: async () => EXAMPLE_DECK },
  ...FLAGSHIP_EXAMPLES,
  lazyExample("briefing-signal", "Northline briefing", "signal", () => import("../../../examples/decks/briefing-signal.json")),
  lazyExample("posterforge-campaign", "Posterforge", "bold-poster", () => import("../../../examples/decks/posterforge-campaign.json")),
];

const ALIASES: Record<string, string> = {
  default: "novaspark-pitch",
  example: "novaspark-pitch",
  signal: "briefing-signal",
  candy: "jellybean-launch",
  vapor: "mallsoft-launch",
  neon: "neondistrict-platform",
  bounce: "bounce-launch",
  aurora: "novaspark-pitch",
  meridian: "meridian-sales",
  solstice: "solstice-update",
  retronet: "retronet-demo",
  swiss: "gridsystems-studio",
  monolith: "monolith-seriesa",
  forge: "forge-api",
  signalbox: "signalbox-report",
  primary: "primary-keynote",
  pulse: "pulse-wrapped",
  apsis: "apsis-mission",
  verdant: "verdant-impact",
  hygge: "hygge-brand",
  inkwell: "inkwell-pitch",
};

export function resolveExampleSlug(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (!key) return null;
  const slug = ALIASES[key] ?? key;
  return STUDIO_EXAMPLES.some((e) => e.slug === slug) ? slug : null;
}

export async function loadExampleDeck(slug: string): Promise<DeckJson | null> {
  const resolved = resolveExampleSlug(slug);
  if (!resolved) return null;
  const entry = STUDIO_EXAMPLES.find((e) => e.slug === resolved);
  if (!entry) return null;
  return structuredClone(await entry.load());
}

export function studioExampleLink(slug: string): string {
  const resolved = resolveExampleSlug(slug) ?? "novaspark-pitch";
  const base = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "/studio/";
  const url = new URL(base, "https://presentation-md.vercel.app");
  url.searchParams.set("example", resolved);
  url.searchParams.set("fresh", "1");
  return url.pathname.startsWith("/studio")
    ? `${url.pathname}?${url.searchParams.toString()}`
    : `/studio/?example=${resolved}&fresh=1`;
}
