import { useEffect, useMemo, useRef, useState } from "react";
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
import { decodeShareDeck, readShareTokenFromLocation } from "./share/shareDeck.js";
import {
  canRedo,
  canUndo,
  createDeckHistory,
  pushDeck,
  redoDeck,
  replaceDeck,
  undoDeck,
  type DeckHistory,
} from "./history.js";

const STORAGE_KEY = "pmd-studio-deck-v1";
const EXAMPLE_SLUG_KEY = "pmd-studio-example-slug";
/** Coalesce rapid SlideForm keystrokes into one undo step. */
const EDIT_COALESCE_MS = 700;

function readQuery(): {
  example: string | null;
  theme: string | null;
  fresh: boolean;
  shareToken: string | null;
} {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      example: resolveExampleSlug(params.get("example")),
      theme: params.get("theme")?.trim() || null,
      fresh: params.get("fresh") === "1" || params.get("fresh") === "true",
      shareToken: readShareTokenFromLocation(window.location.search, window.location.hash),
    };
  } catch {
    return { example: null, theme: null, fresh: false, shareToken: null };
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

function loadInitialDeck(): {
  deck: DeckJson;
  exampleSlug: string | null;
  pendingShare: string | null;
} {
  const { example, theme, fresh, shareToken } = readQuery();
  // Share token hydrates async — start with a placeholder; App effect swaps in.
  if (shareToken) {
    return {
      deck: applyTheme(EXAMPLE_DECK, theme),
      exampleSlug: null,
      pendingShare: shareToken,
    };
  }
  if (example) {
    const fromExample = getExampleDeck(example);
    if (fromExample) {
      return { deck: applyTheme(fromExample, theme), exampleSlug: example, pendingShare: null };
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
      return {
        deck: applyTheme(saved, theme),
        exampleSlug: resolveExampleSlug(slug),
        pendingShare: null,
      };
    }
  }
  return { deck: applyTheme(EXAMPLE_DECK, theme), exampleSlug: "acme", pendingShare: null };
}

function stripConsumedQuery(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    if (
      !params.has("example") &&
      !params.has("fresh") &&
      !params.has("theme") &&
      !params.has("d")
    ) {
      return;
    }
    // Keep example for curated deep-links; drop fresh + share token after hydrate
    // (deck is already in localStorage / state).
    params.delete("fresh");
    params.delete("d");
    const next = params.toString();
    const path = `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash.replace(/^#d=.*/, "")}`;
    window.history.replaceState({}, "", path);
  } catch {
    /* ignore */
  }
}

function clampSelected(index: number, slideCount: number): number {
  return Math.max(0, Math.min(index, Math.max(0, slideCount - 1)));
}

export function App() {
  const initial = useMemo(() => loadInitialDeck(), []);
  const [history, setHistory] = useState<DeckHistory>(() => createDeckHistory(initial.deck));
  const [exampleSlug, setExampleSlug] = useState<string | null>(initial.exampleSlug);
  const [selected, setSelected] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const coalescingRef = useRef(false);
  const coalesceTimerRef = useRef<number | null>(null);

  const deck = history.present;
  const undoAvailable = canUndo(history);
  const redoAvailable = canRedo(history);

  const endCoalesce = () => {
    coalescingRef.current = false;
    if (coalesceTimerRef.current != null) {
      window.clearTimeout(coalesceTimerRef.current);
      coalesceTimerRef.current = null;
    }
  };

  const bumpCoalesce = () => {
    if (coalesceTimerRef.current != null) window.clearTimeout(coalesceTimerRef.current);
    coalesceTimerRef.current = window.setTimeout(() => {
      coalescingRef.current = false;
      coalesceTimerRef.current = null;
    }, EDIT_COALESCE_MS);
  };

  /** Significant deck change — always a new undo step (theme, open, generate, list ops). */
  const commitDeck = (next: DeckJson, mode: "push" | "replace" = "push") => {
    endCoalesce();
    setHistory((h) => (mode === "replace" ? replaceDeck(h, next) : pushDeck(h, next)));
    setSelected((s) => clampSelected(s, next.slides.length));
  };

  /** SlideForm typing — coalesce into one undo step while keys keep coming. */
  const editDeck = (next: DeckJson) => {
    setHistory((h) => {
      if (!coalescingRef.current) {
        coalescingRef.current = true;
        return pushDeck(h, next);
      }
      return { ...h, present: next, future: [] };
    });
    setSelected((s) => clampSelected(s, next.slides.length));
    bumpCoalesce();
  };

  const undo = () => {
    endCoalesce();
    setHistory((h) => {
      const next = undoDeck(h);
      setSelected((s) => clampSelected(s, next.present.slides.length));
      return next;
    });
    setShareStatus("Undo");
  };

  const redo = () => {
    endCoalesce();
    setHistory((h) => {
      const next = redoDeck(h);
      setSelected((s) => clampSelected(s, next.present.slides.length));
      return next;
    });
    setShareStatus("Redo");
  };

  useEffect(() => {
    let cancelled = false;
    const token = initial.pendingShare;
    if (!token) {
      stripConsumedQuery();
      return;
    }
    void (async () => {
      const shared = await decodeShareDeck(token);
      if (cancelled) return;
      if (shared) {
        commitDeck(shared, "replace");
        setExampleSlug(null);
        setSelected(0);
        setShareStatus("Opened shared deck");
      } else {
        setShareStatus("Shared deck link was invalid — loaded defaults");
      }
      stripConsumedQuery();
    })();
    return () => {
      cancelled = true;
    };
  }, [initial.pendingShare]);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const typing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        !!target?.isContentEditable;
      // Let the browser undo text in fields; deck undo when focus is elsewhere.
      if (typing) return;
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key === "z" || e.key === "Z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (e.key === "y" || e.key === "Y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const html = useMemo(() => {
    try {
      return renderDeckHtml(deck, resolveTheme(deck.meta?.theme ?? "default-tech"));
    } catch (err) {
      return `<pre style="color:#d9695a;font-family:monospace;padding:24px">${String(err)}</pre>`;
    }
  }, [deck]);

  const setSlides = (slides: Slide[], select?: number) => {
    commitDeck({ ...deck, slides });
    if (select !== undefined) setSelected(select);
  };

  const updateSlide = (next: Slide) => {
    editDeck({ ...deck, slides: deck.slides.map((s, i) => (i === selected ? next : s)) });
  };

  const loadExample = (slug = "acme") => {
    const next = getExampleDeck(slug) ?? EXAMPLE_DECK;
    commitDeck(next, "replace");
    setExampleSlug(resolveExampleSlug(slug) ?? "acme");
    setSelected(0);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("example", resolveExampleSlug(slug) ?? "acme");
      url.searchParams.delete("fresh");
      url.searchParams.delete("d");
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
        selectedSlide={selected}
        statusHint={shareStatus}
        canUndo={undoAvailable}
        canRedo={redoAvailable}
        onUndo={undo}
        onRedo={redo}
        onChange={(next) => {
          commitDeck(next);
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
        <span>
          Live preview · Filmstrip thumbs · Click a slide to edit · Undo/Redo · Paste MD · Share
          link · Present with notes · Export editable PPTX
        </span>
        <a href="https://presentation-md.vercel.app/" target="_blank" rel="noopener noreferrer">
          Docs &amp; gallery
        </a>
      </div>
      <div className="workspace">
        <aside className="panel panel-left">
          <SlideList
            slides={deck.slides}
            selected={selected}
            html={html}
            onSelect={setSelected}
            onChange={setSlides}
          />
        </aside>
        <main className="panel panel-center">
          <Preview html={html} selectedSlide={selected} onSelectSlide={setSelected} />
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
          slideHeadings={deck.slides.map(
            (s) => s.heading ?? s.quote ?? s.eyebrow ?? s.layout
          )}
          onClose={() => setPresenting(false)}
        />
      )}
      {generating && (
        <GenerateModal
          currentTheme={deck.meta?.theme ?? "claude"}
          deck={deck}
          slideIndex0={selected}
          onGenerate={(next) => {
            const { deck: repaired } = repairCraft(next);
            commitDeck(repaired as DeckJson);
            setExampleSlug(null);
            setSelected(0);
          }}
          onClose={() => setGenerating(false)}
        />
      )}
    </div>
  );
}
