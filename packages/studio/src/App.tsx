import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { DeckJson, Slide } from "@presentation-md/export";
import { EXAMPLE_DECK } from "./deck.js";
import { parseStudioDeckJson } from "./deckGuard.js";
import { loadExampleDeck, resolveExampleSlug } from "./examples.js";
import { resolveTheme } from "./render/themes.js";
import { renderDeckHtml } from "./render/renderDeck.js";
import { Toolbar } from "./components/Toolbar.js";
import { SlideList } from "./components/SlideList.js";
import { SlideForm } from "./components/SlideForm.js";
import { Preview } from "./components/Preview.js";
import { SlideFilmstrip } from "./components/SlideFilmstrip.js";
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
import { createAutosaveScheduler, type AutosaveScheduler } from "./autosave.js";
import { createAsyncOwnership } from "./asyncOwnership.js";

const STORAGE_KEY = "pmd-studio-deck-v1";
const RECOVERY_STORAGE_KEY = "pmd-studio-deck-v1-recovery";
const EXAMPLE_SLUG_KEY = "pmd-studio-example-slug";
/** Coalesce rapid SlideForm keystrokes into one undo step. */
const EDIT_COALESCE_MS = 700;
const AUTOSAVE_DELAY_MS = 300;

const PresentMode = lazy(async () => {
  const module = await import("./components/PresentMode.js");
  return { default: module.PresentMode };
});

const GenerateModal = lazy(async () => {
  const module = await import("./components/GenerateModal.js");
  return { default: module.GenerateModal };
});

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

function loadSavedDeck(): {
  deck: DeckJson | null;
  recoveryText: string | null;
  recoveryWarning: string | null;
  recoveryStored: boolean;
  autosaveBlocked: boolean;
} {
  let saved: string | null;
  let existingRecovery: string | null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
    existingRecovery = localStorage.getItem(RECOVERY_STORAGE_KEY);
  } catch {
    return {
      deck: null,
      recoveryText: null,
      recoveryWarning: null,
      recoveryStored: false,
      autosaveBlocked: false,
    };
  }
  const availableRecovery = existingRecovery
    ? {
        recoveryText: existingRecovery,
        recoveryWarning: "A saved-deck recovery is available",
        recoveryStored: true,
      }
    : { recoveryText: null, recoveryWarning: null, recoveryStored: false };
  if (!saved) {
    return { deck: null, ...availableRecovery, autosaveBlocked: false };
  }

  try {
    return {
      deck: parseStudioDeckJson(saved),
      ...availableRecovery,
      autosaveBlocked: false,
    };
  } catch {
    let backedUp = false;
    try {
      localStorage.setItem(RECOVERY_STORAGE_KEY, saved);
      backedUp = true;
    } catch {
      /* Keep the original primary key untouched by blocking autosave below. */
    }
    return {
      deck: null,
      recoveryText: saved,
      recoveryWarning: backedUp
        ? "Saved deck was invalid — loaded defaults and preserved the original"
        : "Saved deck was invalid — autosave paused so the original remains recoverable",
      recoveryStored: backedUp,
      autosaveBlocked: !backedUp,
    };
  }
}

function applyTheme(deck: DeckJson, theme: string | null): DeckJson {
  if (!theme) return deck;
  return { ...deck, meta: { ...deck.meta, theme } };
}

function loadInitialDeck(): {
  deck: DeckJson;
  exampleSlug: string | null;
  pendingShare: string | null;
  pendingExample: string | null;
  pendingTheme: string | null;
  recoveryText?: string | null;
  recoveryWarning?: string | null;
  recoveryStored?: boolean;
  autosaveBlocked?: boolean;
} {
  const { example, theme, fresh, shareToken } = readQuery();
  // Share token hydrates async — start with a placeholder; App effect swaps in.
  if (shareToken) {
    return {
      deck: applyTheme(EXAMPLE_DECK, theme),
      exampleSlug: null,
      pendingShare: shareToken,
      pendingExample: null,
      pendingTheme: null,
    };
  }
  if (example) {
    return {
      deck: applyTheme(EXAMPLE_DECK, theme),
      exampleSlug: null,
      pendingShare: null,
      pendingExample: example,
      pendingTheme: theme,
    };
  }
  if (!fresh) {
    const saved = loadSavedDeck();
    if (saved.deck) {
      const slug = (() => {
        try {
          return localStorage.getItem(EXAMPLE_SLUG_KEY);
        } catch {
          return null;
        }
      })();
      return {
        deck: applyTheme(saved.deck, theme),
        exampleSlug: resolveExampleSlug(slug),
        pendingShare: null,
        pendingExample: null,
        pendingTheme: null,
        recoveryText: saved.recoveryText,
        recoveryWarning: saved.recoveryWarning,
        recoveryStored: saved.recoveryStored,
      };
    }
    if (saved.recoveryText) {
      return {
        deck: applyTheme(EXAMPLE_DECK, theme),
        exampleSlug: "acme",
        pendingShare: null,
        pendingExample: null,
        pendingTheme: null,
        recoveryText: saved.recoveryText,
        recoveryWarning: saved.recoveryWarning,
        recoveryStored: saved.recoveryStored,
        autosaveBlocked: saved.autosaveBlocked,
      };
    }
  }
  return {
    deck: applyTheme(EXAMPLE_DECK, theme),
    exampleSlug: "acme",
    pendingShare: null,
    pendingExample: null,
    pendingTheme: null,
  };
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
  const [persistenceWarning, setPersistenceWarning] = useState<string | null>(null);
  const [storageConflict, setStorageConflict] = useState<string | null>(null);
  const [recoveryText, setRecoveryText] = useState<string | null>(
    initial.recoveryText ?? null
  );
  const [recoveryWarning, setRecoveryWarning] = useState<string | null>(
    initial.recoveryWarning ?? null
  );
  const [recoveryStored, setRecoveryStored] = useState(initial.recoveryStored ?? false);
  const coalescingRef = useRef(false);
  const coalesceTimerRef = useRef<number | null>(null);
  const exampleOwnership = useMemo(() => createAsyncOwnership<DeckJson>(), []);
  const presentTriggerRef = useRef<HTMLElement | null>(null);
  const generateTriggerRef = useRef<HTMLElement | null>(null);
  const storageConflictRef = useRef(initial.autosaveBlocked ?? false);
  const latestDeckRef = useRef(initial.deck);
  const latestExampleSlugRef = useRef(exampleSlug);
  const autosaveRef = useRef<AutosaveScheduler | null>(null);

  const deck = history.present;
  latestDeckRef.current = deck;
  latestExampleSlugRef.current = exampleSlug;
  const undoAvailable = canUndo(history);
  const redoAvailable = canRedo(history);

  useEffect(() => () => exampleOwnership.invalidate(), [exampleOwnership]);

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

  const loadExample = async (
    slug = "acme",
    options?: { theme?: string | null }
  ): Promise<void> => {
    const resolved = resolveExampleSlug(slug) ?? "acme";
    const ticket = exampleOwnership.begin(latestDeckRef.current);
    setShareStatus(`Loading example: ${resolved}…`);
    try {
      const loaded = await loadExampleDeck(resolved);
      const decision = exampleOwnership.classify(ticket, latestDeckRef.current);
      if (decision === "stale") return;
      if (!loaded) throw new Error(`Unknown example: ${resolved}`);
      if (decision === "conflict") {
        setShareStatus(
          `Example ready: ${resolved} — current deck changed while loading; choose it again to replace`
        );
        return;
      }
      commitDeck(applyTheme(loaded, options?.theme ?? null), "replace");
      setExampleSlug(resolved);
      setSelected(0);
      setShareStatus(`Loaded example: ${resolved}`);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("example", resolved);
        url.searchParams.delete("fresh");
        url.searchParams.delete("d");
        window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
      } catch {
        /* ignore */
      }
    } catch (error) {
      if (exampleOwnership.classify(ticket, latestDeckRef.current) === "stale") return;
      const reason = error instanceof Error ? error.message : String(error);
      setShareStatus(`Could not load example: ${reason}`);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const token = initial.pendingShare;
    if (!token) {
      if (!initial.pendingExample) stripConsumedQuery();
      return;
    }
    const baseline = latestDeckRef.current;
    void (async () => {
      const shared = await decodeShareDeck(token);
      if (cancelled) return;
      if (shared) {
        if (latestDeckRef.current !== baseline) {
          setShareStatus(
            "Shared deck ready — current deck changed while opening; reload this link to replace it"
          );
          return;
        }
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

  useEffect(() => {
    if (!initial.pendingExample) return;
    void loadExample(initial.pendingExample, { theme: initial.pendingTheme });
  }, [initial.pendingExample, initial.pendingTheme]);

  // Coalesce localStorage writes so large decks do not serialize on every key.
  // Page lifecycle events synchronously flush the latest state before exit.
  useEffect(() => {
    const scheduler = createAutosaveScheduler({
      delayMs: AUTOSAVE_DELAY_MS,
      save: () => {
        if (storageConflictRef.current) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(latestDeckRef.current));
        const slug = latestExampleSlugRef.current;
        if (slug) localStorage.setItem(EXAMPLE_SLUG_KEY, slug);
        else localStorage.removeItem(EXAMPLE_SLUG_KEY);
      },
      onSuccess: () => setPersistenceWarning(null),
      onError: () =>
        setPersistenceWarning("Autosave unavailable — download a copy to avoid losing changes"),
    });
    autosaveRef.current = scheduler;

    const flush = () => scheduler.flush();
    const flushWhenHidden = () => {
      if (document.visibilityState === "hidden") scheduler.flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flushWhenHidden);
    return () => {
      scheduler.cancel();
      if (autosaveRef.current === scheduler) autosaveRef.current = null;
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flushWhenHidden);
    };
  }, []);

  useEffect(() => {
    if (storageConflictRef.current) return;
    autosaveRef.current?.schedule();
  }, [deck, exampleSlug]);

  useEffect(() => {
    const detectExternalDeckChange = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      let current: string;
      try {
        current = JSON.stringify(latestDeckRef.current);
      } catch {
        return;
      }
      if (event.newValue === current) return;

      autosaveRef.current?.cancel();
      storageConflictRef.current = true;
      setStorageConflict(
        "Autosave paused — this deck changed in another tab. Download this copy or reload before continuing"
      );
    };
    window.addEventListener("storage", detectExternalDeckChange);
    return () => window.removeEventListener("storage", detectExternalDeckChange);
  }, []);

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

  const openOverlay = (
    triggerRef: { current: HTMLElement | null },
    setOpen: (open: boolean) => void
  ) => {
    triggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setOpen(true);
  };

  const discardRecovery = () => {
    if (!recoveryStored) return;
    if (
      !window.confirm(
        "Permanently delete the saved-deck recovery? This cannot be undone."
      )
    ) {
      return;
    }
    try {
      localStorage.removeItem(RECOVERY_STORAGE_KEY);
      if (localStorage.getItem(RECOVERY_STORAGE_KEY) !== null) {
        throw new Error("Recovery key remained after deletion");
      }
      setRecoveryText(null);
      setRecoveryWarning(null);
      setRecoveryStored(false);
      setShareStatus("Discarded saved-deck recovery");
    } catch {
      setRecoveryWarning("Could not discard recovery — browser storage is unavailable");
    }
  };

  const closeOverlay = (
    triggerRef: { current: HTMLElement | null },
    setOpen: (open: boolean) => void
  ) => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
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
        persistenceWarning={storageConflict ?? recoveryWarning ?? persistenceWarning}
        recoveryText={recoveryText}
        recoveryStored={recoveryStored}
        onDiscardRecovery={discardRecovery}
        canUndo={undoAvailable}
        canRedo={redoAvailable}
        onUndo={undo}
        onRedo={redo}
        onChange={(next) => {
          commitDeck(next);
          setExampleSlug(null);
        }}
        onLoadExample={loadExample}
        onPresent={() => openOverlay(presentTriggerRef, setPresenting)}
        onGenerate={() => openOverlay(generateTriggerRef, setGenerating)}
        onSelectSlide={(slideIndex1Based) => {
          const idx = Math.max(0, Math.min(deck.slides.length - 1, slideIndex1Based - 1));
          setSelected(idx);
        }}
      />
      <div className="studio-strip" role="note">
        <span>
          Live preview · Horizontal filmstrip · Click a slide to edit · Undo/Redo · Paste MD · Share
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
            onSelect={setSelected}
            onChange={setSlides}
          />
        </aside>
        <main className="panel panel-center">
          <Preview html={html} selectedSlide={selected} onSelectSlide={setSelected} />
          <SlideFilmstrip
            html={html}
            count={deck.slides.length}
            selected={selected}
            onSelect={setSelected}
          />
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
        <Suspense
          fallback={
            <div className="present-overlay present-loading" role="status" aria-live="polite">
              Loading presenter…
            </div>
          }
        >
          <PresentMode
            html={html}
            slideCount={deck.slides.length}
            notes={deck.slides.map((s) => s.notes)}
            slideHeadings={deck.slides.map(
              (s) => s.heading ?? s.quote ?? s.eyebrow ?? s.layout
            )}
            onClose={() => closeOverlay(presentTriggerRef, setPresenting)}
          />
        </Suspense>
      )}
      {generating && (
        <Suspense
          fallback={
            <div className="modal-overlay" role="status" aria-live="polite">
              <div className="modal">
                <div className="modal-body">Loading generator…</div>
              </div>
            </div>
          }
        >
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
            onClose={() => closeOverlay(generateTriggerRef, setGenerating)}
          />
        </Suspense>
      )}
    </div>
  );
}
