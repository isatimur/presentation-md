import type { DeckJson } from "@presentation-md/export";
import { EXAMPLE_DECK } from "./deck.js";
import jellybean from "../../../examples/decks/jellybean-launch.json";
import mallsoft from "../../../examples/decks/mallsoft-launch.json";
import neonDistrict from "../../../examples/decks/neondistrict-platform.json";
import bounce from "../../../examples/decks/bounce-launch.json";
import novaspark from "../../../examples/decks/novaspark-pitch.json";
import briefing from "../../../examples/decks/briefing-signal.json";
import bubbleflow from "../../../examples/decks/bubbleflow-launch.json";
import primary from "../../../examples/decks/primary-keynote.json";
import posterforge from "../../../examples/decks/posterforge-campaign.json";

export interface StudioExample {
  slug: string;
  label: string;
  deck: DeckJson;
}

/** Allowlisted deep-link examples (`?example=<slug>`). */
export const STUDIO_EXAMPLES: StudioExample[] = [
  { slug: "acme", label: "Acme Q3 (signal)", deck: EXAMPLE_DECK },
  { slug: "briefing-signal", label: "Northline briefing", deck: briefing as DeckJson },
  { slug: "novaspark-pitch", label: "NovaSpark pitch", deck: novaspark as DeckJson },
  { slug: "jellybean-launch", label: "Jellybean (candy-pop)", deck: jellybean as DeckJson },
  { slug: "mallsoft-launch", label: "Mallsoft (vaporwave)", deck: mallsoft as DeckJson },
  { slug: "neondistrict-platform", label: "Neon District", deck: neonDistrict as DeckJson },
  { slug: "bounce-launch", label: "Bounce (genz-bento)", deck: bounce as DeckJson },
  { slug: "bubbleflow-launch", label: "BubbleFlow (y2k)", deck: bubbleflow as DeckJson },
  { slug: "primary-keynote", label: "Primary (bauhaus)", deck: primary as DeckJson },
  { slug: "posterforge-campaign", label: "Posterforge", deck: posterforge as DeckJson },
];

const ALIASES: Record<string, string> = {
  default: "acme",
  example: "acme",
  signal: "briefing-signal",
  candy: "jellybean-launch",
  vapor: "mallsoft-launch",
  neon: "neondistrict-platform",
  bounce: "bounce-launch",
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
  const resolved = resolveExampleSlug(slug) ?? "acme";
  const base = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "/studio/";
  const url = new URL(base, "https://presentation-md.vercel.app");
  url.searchParams.set("example", resolved);
  url.searchParams.set("fresh", "1");
  return url.pathname.startsWith("/studio")
    ? `${url.pathname}?${url.searchParams.toString()}`
    : `/studio/?example=${resolved}&fresh=1`;
}
