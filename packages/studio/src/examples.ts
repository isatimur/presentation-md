import type { DeckJson } from "@presentation-md/export";
import { EXAMPLE_DECK } from "./deck.js";
import briefing from "../../../examples/decks/briefing-signal.json";
import posterforge from "../../../examples/decks/posterforge-campaign.json";

export interface StudioExample {
  slug: string;
  label: string;
  deck: DeckJson;
}

/**
 * Canonical #1 showcase set (gallery flagships). Order matches the site
 * stunning-twenty-five strip: NovaSpark → Apsis.
 */
const FLAGSHIP_EXAMPLES: { slug: string; label: string; file: string }[] = [
  { slug: "novaspark-pitch", label: "NovaSpark (aurora-glass)", file: "novaspark-pitch.json" },
  { slug: "meridian-sales", label: "Meridian (ft-editorial)", file: "meridian-sales.json" },
  { slug: "bounce-launch", label: "Bounce (genz-bento)", file: "bounce-launch.json" },
  { slug: "solstice-update", label: "Solstice (ultra-luxury)", file: "solstice-update.json" },
  { slug: "retronet-demo", label: "RetroNet (crt-terminal)", file: "retronet-demo.json" },
  { slug: "gridsystems-studio", label: "Grid Systems (swiss)", file: "gridsystems-studio.json" },
  { slug: "monolith-seriesa", label: "MONOLITH (brutalist)", file: "monolith-seriesa.json" },
  { slug: "jellybean-launch", label: "Jellybean (candy-pop)", file: "jellybean-launch.json" },
  { slug: "axiom-robotics", label: "Axiom (aerospace-hud)", file: "axiom-robotics.json" },
  { slug: "atelier-brand", label: "Atelier No. 9 (heritage)", file: "atelier-brand.json" },
  { slug: "ledgerline-payout", label: "Ledgerline (fintech)", file: "ledgerline-payout.json" },
  { slug: "forge-api", label: "Forge (developer-dark)", file: "forge-api.json" },
  { slug: "signalbox-report", label: "Signalbox (data-editorial)", file: "signalbox-report.json" },
  { slug: "primary-keynote", label: "Primary (bauhaus)", file: "primary-keynote.json" },
  { slug: "bubbleflow-launch", label: "BubbleFlow (y2k)", file: "bubbleflow-launch.json" },
  { slug: "inkwell-pitch", label: "Inkwell (risograph)", file: "inkwell-pitch.json" },
  { slug: "neondistrict-platform", label: "Neon District (neon-noir)", file: "neondistrict-platform.json" },
  { slug: "hygge-brand", label: "Hygge (scandinavian)", file: "hygge-brand.json" },
  { slug: "meridianclub-investor", label: "Meridian Club (art-deco)", file: "meridianclub-investor.json" },
  { slug: "mallsoft-launch", label: "Mallsoft (vaporwave)", file: "mallsoft-launch.json" },
  { slug: "dailyledger-mediakit", label: "Daily Ledger (broadsheet)", file: "dailyledger-mediakit.json" },
  { slug: "cloudpeak-pricing", label: "CloudPeak (glass)", file: "cloudpeak-pricing.json" },
  { slug: "pulse-wrapped", label: "Pulse (kinetic-wrapped)", file: "pulse-wrapped.json" },
  { slug: "verdant-impact", label: "Verdant (botanical-luxe)", file: "verdant-impact.json" },
  { slug: "apsis-mission", label: "Apsis (blueprint)", file: "apsis-mission.json" },
];

const flagshipModules = import.meta.glob("../../../examples/decks/*.json", {
  eager: true,
}) as Record<string, { default: DeckJson } | DeckJson>;

function loadDeckJson(file: string): DeckJson {
  const key = Object.keys(flagshipModules).find((k) => k.endsWith(`/${file}`));
  if (!key) {
    throw new Error(`Missing flagship deck JSON: ${file}`);
  }
  const mod = flagshipModules[key]!;
  return ("default" in mod ? mod.default : mod) as DeckJson;
}

/** Allowlisted deep-link examples (`?example=<slug>`). Flagships first. */
export const STUDIO_EXAMPLES: StudioExample[] = [
  { slug: "acme", label: "Acme Q3 (signal)", deck: EXAMPLE_DECK },
  ...FLAGSHIP_EXAMPLES.map(({ slug, label, file }) => ({
    slug,
    label,
    deck: loadDeckJson(file),
  })),
  { slug: "briefing-signal", label: "Northline briefing", deck: briefing as DeckJson },
  { slug: "posterforge-campaign", label: "Posterforge", deck: posterforge as DeckJson },
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

export function getExampleDeck(slug: string): DeckJson | null {
  const resolved = resolveExampleSlug(slug);
  if (!resolved) return null;
  const entry = STUDIO_EXAMPLES.find((e) => e.slug === resolved);
  return entry ? structuredClone(entry.deck) : null;
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
