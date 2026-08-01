import { useEffect, useMemo, useState } from "react";
import type { DeckJson, Slide } from "@presentation-md/export";
import { EXAMPLE_DECK } from "./deck.js";
import { getExampleDeck, resolveExampleSlug } from "./examples.js";
import { resolveTheme } from "./render/themes.js";
import { renderDeckHtml } from "./render/renderDeck.js";
import { Toolbar } from "./components/Toolbar.js";
import { SlideList } from "./components/SlideList.js";
import { SlideForm } from "./components/SlideForm.js";
import { Preview } from "./components/Preview.js";
import { PresentMode } from "./components/PresentMode.js";
import { GenerateModal } from "./components/GenerateModal.js";
import { repairCraft } from "./craft/auditCraft.js";

const STORAGE_KEY = "pmd-studio-deck-v1";
const EXAMPLE_SLUG_KEY = "pmd-studio-example-slug";

function readQuery(): { example: string | null; theme: string | null; fresh: boolean } {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      example: resolveExampleSlug(params.get("example")),
      theme: params.get("theme")?.trim() || null,
      fresh: params.get("fresh") === "1" || params.get("fresh") === "true",
    };
  } catch {
    return { example: null, theme: null, fresh: false };
  }
}

function loadSavedDeck(): DeckJson | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as DeckJson;
      if (parsed?.type === "deck" && Array.isArray(parsed.slides) && parsed.slides.length) {
        return parsed;
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return null;
}

function applyTheme(deck: DeckJson, theme: string | null): DeckJson {
  if (!theme) return deck;
  return { ...deck, meta: { ...deck.meta, theme } };
}

function loadInitialDeck(): { deck: DeckJson; exampleSlug: string | null } {
  const { example, theme, fresh } = readQuery();
  if (example) {
    const fromExample = getExampleDeck(example);
    if (fromExample) {
      return { deck: applyTheme(fromExample, theme), exampleSlug: example };
    }
  }
  if (!fresh) {
    const saved = loadSavedDeck();
    if (saved) {
      const slug = (() => {
        try {
          return localStorage.getItem(EXAMPLE_SLUG_KEY);
        } catch {
          return null;
        }
      })();
      return { deck: applyTheme(saved, theme), exampleSlug: resolveExampleSlug(slug) };
    }
  }
  return { deck: applyTheme(EXAMPLE_DECK, theme), exampleSlug: "acme" };
}

function stripConsumedQuery(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("example") && !params.has("fresh") && !params.has("theme")) return;
    // Keep example in the URL for shareability; drop one-shot fresh flag.
    params.delete("fresh");
    const next = params.toString();
    const path = `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", path);
  } catch {
    /* ignore */
  }
}

export function App() {
  const initial = useMemo(() => loadInitialDeck(), []);
  const [deck, setDeck] = useState<DeckJson>(initial.deck);
  const [exampleSlug, setExampleSlug] = useState<string | null>(initial.exampleSlug);
  const [selected, setSelected] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    stripConsumedQuery();
  }, []);

  // Autosave to localStorage so work survives refreshes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
      if (exampleSlug) localStorage.setItem(EXAMPLE_SLUG_KEY, exampleSlug);
      else localStorage.removeItem(EXAMPLE_SLUG_KEY);
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [deck, exampleSlug]);

  const html = useMemo(() => {
    try {
      return renderDeckHtml(deck, resolveTheme(deck.meta?.theme ?? "default-tech"));
    } catch (err) {
      return `<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(err)}</pre>`;
    }
  }, [deck]);

  const setSlides = (slides: Slide[], select?: number) => {
    setDeck({ ...deck, slides });
    if (select !== undefined) setSelected(select);
  };

  const updateSlide = (next: Slide) => {
    setDeck({ ...deck, slides: deck.slides.map((s, i) => (i === selected ? next : s)) });
  };

  const loadExample = (slug = "acme") => {
    const next = getExampleDeck(slug) ?? EXAMPLE_DECK;
    setDeck(next);
    setExampleSlug(resolveExampleSlug(slug) ?? "acme");
    setSelected(0);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("example", resolveExampleSlug(slug) ?? "acme");
      url.searchParams.delete("fresh");
      window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
    } catch {
      /* ignore */
    }
  };

  const current = deck.slides[Math.min(selected, deck.slides.length - 1)];

  return (
    <div className="app">
      <Toolbar
        deck={deck}
        html={html}
        exampleSlug={exampleSlug}
        onChange={(next) => {
          setDeck(next);
          setExampleSlug(null);
        }}
        onLoadExample={loadExample}
        onPresent={() => setPresenting(true)}
        onGenerate={() => setGenerating(true)}
        onSelectSlide={(slideIndex1Based) => {
          const idx = Math.max(0, Math.min(deck.slides.length - 1, slideIndex1Based - 1));
          setSelected(idx);
        }}
      />
      <div className="studio-strip" role="note">
        <span>Live preview · Deep-link examples · Open HTML / JSON / PPTX · Present with notes · Export editable PPTX</span>
        <a href="https://presentation-md.vercel.app/" target="_blank" rel="noopener noreferrer">Docs &amp; gallery</a>
      </div>
      <div className="workspace">
        <aside className="panel panel-left">
          <SlideList slides={deck.slides} selected={selected} onSelect={setSelected} onChange={setSlides} />
        </aside>
        <main className="panel panel-center">
          <Preview html={html} />
        </main>
        <aside className="panel panel-right">
          {current ? (
            <SlideForm slide={current} onChange={updateSlide} />
          ) : (
            <p className="muted">No slide selected.</p>
          )}
        </aside>
      </div>
      {presenting && (
        <PresentMode
          html={html}
          slideCount={deck.slides.length}
          notes={deck.slides.map((s) => s.notes)}
          onClose={() => setPresenting(false)}
        />
      )}
      {generating && (
        <GenerateModal
          currentTheme={deck.meta?.theme ?? "claude"}
          onGenerate={(next) => {
            const { deck: repaired } = repairCraft(next);
            setDeck(repaired as DeckJson);
            setExampleSlug(null);
            setSelected(0);
          }}
          onClose={() => setGenerating(false)}
        />
      )}
    </div>
  );
}
