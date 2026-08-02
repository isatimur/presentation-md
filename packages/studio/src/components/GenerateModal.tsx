import { useEffect, useMemo, useRef, useState } from "react";
import type { DeckJson } from "@presentation-md/export";
import {
  listScaffoldPurposes,
  scaffoldDeck,
  type ScaffoldPurpose,
} from "@presentation-md/core";
import {
  THEME_BROWSE_FILTERS,
  findThemeShortlist,
  listThemeNames,
  listThemeShortlists,
  listThemeSummaries,
  pickDiscoveryPreviewTrio,
  resolveTheme,
  themePassesBrowseFilter,
  type ThemeBrowseFilterId,
} from "../render/themes.js";
import { ThemeCraftShotStrip } from "./ThemeCraftShotStrip.js";
import { DeckRestylePreview } from "./DeckRestylePreview.js";
import type { LiveCompareMode } from "./ThemeCompareTray.js";
import { GEN_MODELS, type GenModelId, type DensityMode, buildAgentPrompt, generateDeck } from "../ai/generate.js";
import {
  persistApiKeyPreference,
  readRememberedApiKey,
} from "../apiKeyStorage.js";

const EXAMPLE_BRIEFS = [
  "Q3 all-hands: momentum, key metrics, roadmap, and what's next.",
  "Seed pitch for an AI-native analytics tool — problem, product, traction, ask.",
  "Launch deck for a developer CLI: what it is, how it works, why it's fast.",
];

/** Same recipe catalog as MCP `scaffold_deck` — craft floor without an API key. */
const SCAFFOLD_PURPOSE_CHIPS = listScaffoldPurposes();

export function GenerateModal({
  currentTheme,
  deck,
  slideIndex0 = 0,
  onGenerate,
  onClose,
}: {
  currentTheme: string;
  /** Current Studio deck — My deck restyle discovery uses YOUR selected slide. */
  deck: DeckJson;
  slideIndex0?: number;
  onGenerate: (deck: DeckJson) => void;
  onClose: () => void;
}) {
  const initialKeyStorage = useMemo(() => readRememberedApiKey(), []);
  const [brief, setBrief] = useState("");
  const [theme, setTheme] = useState(currentTheme);
  const [moodFilter, setMoodFilter] = useState<ThemeBrowseFilterId>("all");
  const [shortlistId, setShortlistId] = useState("");
  const [density, setDensity] = useState<DensityMode>("speaker");
  const [purpose, setPurpose] = useState<ScaffoldPurpose>("pitch");
  const [model, setModel] = useState<GenModelId>(GEN_MODELS[0].id);
  const [apiKey, setApiKey] = useState(initialKeyStorage.key);
  const [remember, setRemember] = useState(initialKeyStorage.remembered);
  const [storageWarning, setStorageWarning] = useState<string | null>(
    initialKeyStorage.warning
  );
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  /** Show-don't-tell: live previews on by default (My deck restyle / craft proofs). */
  const [liveDiscover, setLiveDiscover] = useState(true);
  /** Match pick-3 tray: content-true My deck first; Craft proofs one toggle away. */
  const [liveMode, setLiveMode] = useState<LiveCompareMode>("deck");
  const dialogRef = useRef<HTMLDivElement>(null);
  const generationRef = useRef<AbortController | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const slideLabel = `Slide ${Math.max(1, slideIndex0 + 1)}`;

  const abortGeneration = () => {
    const active = generationRef.current;
    generationRef.current = null;
    active?.abort();
  };

  const requestClose = () => {
    abortGeneration();
    onCloseRef.current();
  };

  const themeNames = listThemeNames();
  const themes = useMemo(() => listThemeSummaries(), []);
  const shortlists = useMemo(() => listThemeShortlists(), []);
  const activeShortlist = shortlistId ? findThemeShortlist(shortlistId) : undefined;

  useEffect(() => {
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeys);
    return () => {
      window.removeEventListener("keydown", handleDialogKeys);
      abortGeneration();
    };
  }, []);
  const selectableThemes = useMemo(() => {
    const base = activeShortlist
      ? themeNames.filter((t) => activeShortlist.themes.includes(t))
      : themeNames;
    return base.filter((name) => {
      const summary = themes.find((t) => t.name === name);
      if (!summary) return moodFilter === "all";
      return themePassesBrowseFilter(summary, moodFilter);
    });
  }, [activeShortlist, moodFilter, themeNames, themes]);

  /** Pick-3 visual compare — safe/bold/wildcard from shortlist or mood filter (frontend-slides mix). */
  const discoverThree = useMemo(() => {
    const poolNames = activeShortlist?.themes?.length
      ? activeShortlist.themes.filter((n) => themeNames.includes(n))
      : moodFilter === "all"
        ? ["default-tech", "aurora-glass", "soft-editorial"].filter((n) =>
            themeNames.includes(n)
          )
        : selectableThemes;
    const trio =
      pickDiscoveryPreviewTrio(
        poolNames.map((name) => {
          const summary = themes.find((t) => t.name === name);
          return {
            name,
            scheme: summary?.scheme,
            mood: summary?.mood,
            formality: summary?.formality,
            popular: summary?.popular,
          };
        })
      )?.themes ?? poolNames.slice(0, 3);
    const names = [...trio];
    while (names.length < 3) {
      const fallback = themeNames.find((n) => !names.includes(n));
      if (!fallback) break;
      names.push(fallback);
    }
    return names.map((name) => {
      const summary = themes.find((t) => t.name === name);
      if (summary) return summary;
      const resolved = resolveTheme(name);
      return {
        name,
        vibe: resolved.manifest.description ?? name,
        bg: resolved.palette.bg,
        accent: resolved.palette.accent,
      };
    });
  }, [activeShortlist, moodFilter, selectableThemes, themeNames, themes]);

  const runGenerate = async () => {
    generationRef.current?.abort();
    const controller = new AbortController();
    generationRef.current = controller;
    setBusy(true);
    setStatus("Generating your deck…");
    setStorageWarning(persistApiKeyPreference({ remember, key: apiKey }));
    try {
      const deck = await generateDeck({
        apiKey,
        model,
        brief,
        theme,
        density,
        signal: controller.signal,
      });
      if (generationRef.current !== controller || controller.signal.aborted) return;
      generationRef.current = null;
      onGenerate(deck);
      onCloseRef.current();
    } catch (err) {
      if (generationRef.current !== controller || controller.signal.aborted) return;
      generationRef.current = null;
      setStatus((err as Error).message);
      setBusy(false);
    }
  };

  const landScaffold = () => {
    try {
      const title =
        brief.trim().split(/[.!?\n]/)[0]?.trim().slice(0, 80) || "Untitled deck";
      const result = scaffoldDeck({
        purpose,
        theme,
        title,
      });
      onGenerate(result.deck as DeckJson);
      requestClose();
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  const copyAgentPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildAgentPrompt(brief, theme, density));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus("Couldn't copy — select the prompt manually.");
    }
  };

  return (
    <div className="modal-overlay" onClick={requestClose}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="generate-modal-title"
        aria-describedby="generate-modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <div>
            <h2 id="generate-modal-title">Generate a deck</h2>
            <span id="generate-modal-description" className="muted small">
              Describe it — get an editable deck in seconds.
            </span>
          </div>
          <button className="btn btn-sm" onClick={requestClose} aria-label="Close">✕</button>
        </header>

        <div className="modal-body">
          <label className="field-label" htmlFor="generate-brief">What's the deck about?</label>
          <textarea
            id="generate-brief"
            className="text-input brief-input"
            value={brief}
            placeholder="e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter."
            rows={4}
            autoFocus
            onChange={(e) => setBrief(e.target.value)}
          />
          <div className="chip-row">
            {EXAMPLE_BRIEFS.map((ex) => (
              <button key={ex} className="chip" onClick={() => setBrief(ex)} title="Use this brief">
                {ex.split(/[:—]/)[0]!.trim()}
              </button>
            ))}
          </div>

          <label className="field-label">Density</label>
          <div className="theme-shortlist-row" role="listbox" aria-label="Deck density">
            <button
              type="button"
              className={`chip${density === "speaker" ? " active" : ""}`}
              onClick={() => setDensity("speaker")}
              title="One idea per slide, large type, live talks"
            >
              Speaker-led
            </button>
            <button
              type="button"
              className={`chip${density === "reading" ? " active" : ""}`}
              onClick={() => setDensity("reading")}
              title="Self-contained slides for async / board packs"
            >
              Reading-first
            </button>
          </div>

          <label className="field-label">Browse by mood</label>
          <div className="theme-mood-row" role="toolbar" aria-label="Filter themes by mood">
            {THEME_BROWSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${moodFilter === f.id ? " active" : ""}`}
                aria-pressed={moodFilter === f.id}
                onClick={() => setMoodFilter(f.id)}
                title={f.id === "all" ? "Show all themes" : `Filter by ${f.label.toLowerCase()}`}
              >
                {f.id === "all" ? `All ${themes.length}` : f.label}
              </button>
            ))}
          </div>

          <label className="field-label">Theme shortlist</label>
          <div className="theme-shortlist-row" role="listbox" aria-label="Theme shortlists">
            <button
              type="button"
              className={`chip${shortlistId === "" ? " active" : ""}`}
              onClick={() => setShortlistId("")}
            >
              All themes
            </button>
            {shortlists.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`chip${shortlistId === s.id ? " active" : ""}${s.popular ? " chip-popular" : ""}`}
                title={s.why ?? s.label}
                onClick={() => {
                  const next = s.id === shortlistId ? "" : s.id;
                  setShortlistId(next);
                  if (next) {
                    const pick = findThemeShortlist(next);
                    if (pick && !pick.themes.includes(theme) && pick.themes[0]) {
                      setTheme(pick.themes[0]);
                    }
                  }
                }}
              >
                {s.popular ? "★ " : ""}
                {s.label.split(/[/(]/)[0]!.trim()}
              </button>
            ))}
          </div>

          <div className="gen-discover-head">
            <label className="field-label">Pick visually (show, don’t tell)</label>
            <button
              type="button"
              className={`chip${liveDiscover ? " active" : ""}`}
              onClick={() => setLiveDiscover((v) => !v)}
              title="Toggle live discover (My deck restyle or craft proof shot strip)"
            >
              {liveDiscover ? "Hide live" : "Show live"}
            </button>
          </div>
          {liveDiscover ? (
            <div className="gen-discover-crop-bar" role="group" aria-label="Live discover mode">
              <span className="gen-discover-crop-label">Live</span>
              <button
                type="button"
                className={`chip${liveMode === "deck" ? " active" : ""}`}
                onClick={() => setLiveMode("deck")}
                title="Re-theme your selected Studio slide in each slot — content-true restyle"
              >
                My deck · {slideLabel}
              </button>
              <button
                type="button"
                className={`chip${liveMode === "proofs" ? " active" : ""}`}
                onClick={() => setLiveMode("proofs")}
                title="Shared-iframe Title / Bento / Compare craft proofs"
              >
                Craft proofs
              </button>
            </div>
          ) : null}
          <div
            className={`gen-discover-grid${liveDiscover ? " is-live" : ""}`}
            role="listbox"
            aria-label="Pick 3 theme compare"
          >
            {discoverThree.map((t) => (
              <button
                key={t.name}
                type="button"
                role="option"
                aria-selected={t.name === theme}
                className={`gen-discover-card${t.name === theme ? " active" : ""}`}
                onClick={() => setTheme(t.name)}
                title={t.vibe}
              >
                {liveDiscover ? (
                  liveMode === "deck" ? (
                    <DeckRestylePreview
                      deck={deck}
                      theme={t.name}
                      slideIndex0={slideIndex0}
                      title={`${t.name} · your ${slideLabel}`}
                      className="gen-discover-restyle"
                    />
                  ) : (
                    <ThemeCraftShotStrip
                      theme={t.name}
                      title={`${t.name} craft preview`}
                      className="gen-discover-shot-strip"
                      compact
                    />
                  )
                ) : (
                  <span
                    className="gen-discover-swatch"
                    style={{
                      ["--swatch-bg" as string]: t.bg,
                      ["--swatch-accent" as string]: t.accent,
                    }}
                    aria-hidden
                  />
                )}
                <span className="gen-discover-name">{t.name}</span>
                <span className="gen-discover-vibe muted small">{t.vibe}</span>
              </button>
            ))}
          </div>
          {liveDiscover && liveMode === "deck" ? (
            <p className="muted small" style={{ margin: 0 }}>
              My deck restyles <strong>{slideLabel}</strong> live — judge your content across themes
              before generating (pick-3 tray parity).
            </p>
          ) : null}

          <div className="field-grid">
            <label className="inline-field">
              <span className="muted small">Theme</span>
              <select className="text-input" value={theme} onChange={(e) => setTheme(e.target.value)}>
                {selectableThemes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="inline-field">
              <span className="muted small">Model</span>
              <select className="text-input" value={model} onChange={(e) => setModel(e.target.value as GenModelId)}>
                {GEN_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="gen-panel">
            <label className="field-label">Your Anthropic API key</label>
            <input
              className="text-input"
              type="password"
              value={apiKey}
              placeholder="sk-ant-…"
              autoComplete="off"
              onChange={(e) => setApiKey(e.target.value)}
            />
            <label className="checkbox-field">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="muted small">Remember on this device (stored only in your browser)</span>
            </label>
            {storageWarning ? (
              <p className="status muted small gen-storage-warning" role="status" aria-live="polite">
                {storageWarning}
              </p>
            ) : null}
            <p className="muted small privacy-note">
              Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers.
              Get a key at <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">console.anthropic.com</a>.
            </p>
            <button className="btn btn-primary btn-block" disabled={busy} onClick={runGenerate}>
              {busy ? "Generating…" : "Generate deck"}
            </button>
          </div>

          <div className="gen-divider"><span>or land a craft scaffold (no key)</span></div>

          <div className="gen-panel">
            <p className="muted small">
              Same recipes as MCP <code>scaffold_deck</code> — layouts, asymmetry, dual CTAs, and notes
              pre-wired. Beats freeform vibe drafts; rewrite placeholder copy, then Audit craft.
            </p>
            <label className="field-label">Recipe</label>
            <div className="theme-shortlist-row" role="listbox" aria-label="Scaffold recipe">
              {SCAFFOLD_PURPOSE_CHIPS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`chip${purpose === p.id ? " active" : ""}`}
                  title={`${p.label} · ${p.slide_count} slides · default ${p.defaultTheme}`}
                  onClick={() => setPurpose(p.id)}
                >
                  {p.id}
                </button>
              ))}
            </div>
            <button
              className="btn btn-block"
              type="button"
              disabled={busy}
              onClick={landScaffold}
              title="Land schema-native Deck JSON skeleton — no Anthropic key"
            >
              Land {purpose} scaffold
            </button>
          </div>

          <div className="gen-divider"><span>or hand it to your agent</span></div>

          <div className="gen-panel">
            <p className="muted small">
              No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the
              presentation skill installed — then open the resulting deck here.
            </p>
            <button className="btn btn-block" onClick={copyAgentPrompt} disabled={!brief.trim()}>
              {copied ? "Copied ✓" : "Copy prompt for your agent"}
            </button>
          </div>

          {status && <p className="status muted small gen-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}
