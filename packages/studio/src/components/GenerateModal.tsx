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
import { LOCALES, localeInfo, useI18n, type MessageKey } from "../i18n/index.js";
import { NODE_SLOT, withNode } from "../i18n/richText.js";

const EXAMPLE_BRIEFS: { briefKey: MessageKey; labelKey: MessageKey }[] = [
  { briefKey: "generate.example1", labelKey: "generate.example1Label" },
  { briefKey: "generate.example2", labelKey: "generate.example2Label" },
  { briefKey: "generate.example3", labelKey: "generate.example3Label" },
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
  const { t, locale } = useI18n();
  // Deck copy language: defaults to the UI language, independent of it after a pick.
  const [deckLang, setDeckLang] = useState<string>(localeInfo(locale).deckLang);
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
  const slideLabel = t("compare.slideLabel", { n: Math.max(1, slideIndex0 + 1) });

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
    setStatus(t("generate.statusGenerating"));
    setStorageWarning(persistApiKeyPreference({ remember, key: apiKey }));
    try {
      const deck = await generateDeck({
        apiKey,
        model,
        brief,
        theme,
        density,
        lang: deckLang,
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
        brief.trim().split(/[.!?\n]/)[0]?.trim().slice(0, 80) || t("generate.untitledDeck");
      const result = scaffoldDeck({
        purpose,
        theme,
        title,
      });
      const deck = result.deck as DeckJson;
      deck.meta = { ...deck.meta, lang: deckLang };
      onGenerate(deck);
      requestClose();
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  const copyAgentPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildAgentPrompt(brief, theme, density, deckLang));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus(t("generate.copyFailed"));
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
            <h2 id="generate-modal-title">{t("generate.title")}</h2>
            <span id="generate-modal-description" className="muted small">
              {t("generate.description")}
            </span>
          </div>
          <button className="btn btn-sm" onClick={requestClose} aria-label={t("generate.close")}>✕</button>
        </header>

        <div className="modal-body">
          <label className="field-label" htmlFor="generate-brief">{t("generate.briefLabel")}</label>
          <textarea
            id="generate-brief"
            className="text-input brief-input"
            value={brief}
            placeholder={t("generate.briefPlaceholder")}
            rows={4}
            autoFocus
            onChange={(e) => setBrief(e.target.value)}
          />
          <div className="chip-row">
            {EXAMPLE_BRIEFS.map((ex) => (
              <button
                key={ex.briefKey}
                className="chip"
                onClick={() => setBrief(t(ex.briefKey))}
                title={t("generate.useBrief")}
              >
                {t(ex.labelKey)}
              </button>
            ))}
          </div>

          <label className="field-label">{t("generate.density")}</label>
          <div className="theme-shortlist-row" role="listbox" aria-label={t("generate.densityLabel")}>
            <button
              type="button"
              className={`chip${density === "speaker" ? " active" : ""}`}
              onClick={() => setDensity("speaker")}
              title={t("generate.densitySpeakerTitle")}
            >
              {t("generate.densitySpeaker")}
            </button>
            <button
              type="button"
              className={`chip${density === "reading" ? " active" : ""}`}
              onClick={() => setDensity("reading")}
              title={t("generate.densityReadingTitle")}
            >
              {t("generate.densityReading")}
            </button>
          </div>

          <label className="field-label" htmlFor="generate-deck-lang">
            {t("language.deckLanguage")}
          </label>
          <select
            id="generate-deck-lang"
            className="language-select-deck"
            value={deckLang}
            onChange={(e) => setDeckLang(e.target.value)}
            title={t("language.deckLanguageHint")}
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.deckLang} lang={l.code} dir={l.dir}>
                {l.endonym}
              </option>
            ))}
          </select>

          <label className="field-label">{t("generate.browseMood")}</label>
          <div className="theme-mood-row" role="toolbar" aria-label={t("generate.moodLabel")}>
            {THEME_BROWSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${moodFilter === f.id ? " active" : ""}`}
                aria-pressed={moodFilter === f.id}
                onClick={() => setMoodFilter(f.id)}
                title={
                  f.id === "all"
                    ? t("generate.showAllThemes")
                    : t("generate.filterBy", { label: f.label.toLowerCase() })
                }
              >
                {f.id === "all" ? t("generate.allCount", { n: themes.length }) : f.label}
              </button>
            ))}
          </div>

          <label className="field-label">{t("generate.shortlist")}</label>
          <div className="theme-shortlist-row" role="listbox" aria-label={t("generate.shortlistsLabel")}>
            <button
              type="button"
              className={`chip${shortlistId === "" ? " active" : ""}`}
              onClick={() => setShortlistId("")}
            >
              {t("generate.allThemes")}
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
            <label className="field-label">{t("generate.pickVisually")}</label>
            <button
              type="button"
              className={`chip${liveDiscover ? " active" : ""}`}
              onClick={() => setLiveDiscover((v) => !v)}
              title={t("generate.toggleLiveTitle")}
            >
              {liveDiscover ? t("compare.hideLive") : t("compare.showLive")}
            </button>
          </div>
          {liveDiscover ? (
            <div className="gen-discover-crop-bar" role="group" aria-label={t("generate.liveModeLabel")}>
              <span className="gen-discover-crop-label">{t("compare.live")}</span>
              <button
                type="button"
                className={`chip${liveMode === "deck" ? " active" : ""}`}
                onClick={() => setLiveMode("deck")}
                title={t("generate.deckModeTitle")}
              >
                {t("compare.deckMode", { slide: slideLabel })}
              </button>
              <button
                type="button"
                className={`chip${liveMode === "proofs" ? " active" : ""}`}
                onClick={() => setLiveMode("proofs")}
                title={t("compare.proofsModeTitle")}
              >
                {t("compare.proofsMode")}
              </button>
            </div>
          ) : null}
          <div
            className={`gen-discover-grid${liveDiscover ? " is-live" : ""}`}
            role="listbox"
            aria-label={t("generate.pick3Label")}
          >
            {discoverThree.map((item) => (
              <button
                key={item.name}
                type="button"
                role="option"
                aria-selected={item.name === theme}
                className={`gen-discover-card${item.name === theme ? " active" : ""}`}
                onClick={() => setTheme(item.name)}
                title={item.vibe}
              >
                {liveDiscover ? (
                  liveMode === "deck" ? (
                    <DeckRestylePreview
                      deck={deck}
                      theme={item.name}
                      slideIndex0={slideIndex0}
                      title={t("compare.deckFrameTitle", { theme: item.name, slide: slideLabel })}
                      className="gen-discover-restyle"
                    />
                  ) : (
                    <ThemeCraftShotStrip
                      theme={item.name}
                      title={t("compare.proofFrameTitle", { theme: item.name })}
                      className="gen-discover-shot-strip"
                      compact
                    />
                  )
                ) : (
                  <span
                    className="gen-discover-swatch"
                    style={{
                      ["--swatch-bg" as string]: item.bg,
                      ["--swatch-accent" as string]: item.accent,
                    }}
                    aria-hidden
                  />
                )}
                <span className="gen-discover-name">{item.name}</span>
                <span className="gen-discover-vibe muted small">{item.vibe}</span>
              </button>
            ))}
          </div>
          {liveDiscover && liveMode === "deck" ? (
            <p className="muted small" style={{ margin: 0 }}>
              {withNode(
                t("generate.hintDeck", { slide: NODE_SLOT }),
                <strong>{slideLabel}</strong>
              )}
            </p>
          ) : null}

          <div className="field-grid">
            <label className="inline-field">
              <span className="muted small">{t("generate.theme")}</span>
              <select className="text-input" value={theme} onChange={(e) => setTheme(e.target.value)}>
                {selectableThemes.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </label>
            <label className="inline-field">
              <span className="muted small">{t("generate.model")}</span>
              <select className="text-input" value={model} onChange={(e) => setModel(e.target.value as GenModelId)}>
                {GEN_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{t(m.labelKey, { model: m.name })}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="gen-panel">
            <label className="field-label">{t("generate.apiKeyLabel")}</label>
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
              <span className="muted small">{t("generate.remember")}</span>
            </label>
            {storageWarning ? (
              <p className="status muted small gen-storage-warning" role="status" aria-live="polite">
                {storageWarning}
              </p>
            ) : null}
            <p className="muted small privacy-note">
              {withNode(
                t("generate.privacyNote", { link: NODE_SLOT }),
                <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">console.anthropic.com</a>
              )}
            </p>
            <button className="btn btn-primary btn-block" disabled={busy} onClick={runGenerate}>
              {busy ? t("generate.generating") : t("generate.submit")}
            </button>
          </div>

          <div className="gen-divider"><span>{t("generate.dividerScaffold")}</span></div>

          <div className="gen-panel">
            <p className="muted small">
              {withNode(t("generate.scaffoldIntro", { code: NODE_SLOT }), <code>scaffold_deck</code>)}
            </p>
            <label className="field-label">{t("generate.recipe")}</label>
            <div className="theme-shortlist-row" role="listbox" aria-label={t("generate.recipeLabel")}>
              {SCAFFOLD_PURPOSE_CHIPS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`chip${purpose === p.id ? " active" : ""}`}
                  title={t("generate.scaffoldChipTitle", {
                    label: p.label,
                    n: p.slide_count,
                    theme: p.defaultTheme,
                  })}
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
              title={t("generate.landTitle")}
            >
              {t("generate.landScaffold", { purpose })}
            </button>
          </div>

          <div className="gen-divider"><span>{t("generate.dividerAgent")}</span></div>

          <div className="gen-panel">
            <p className="muted small">
              {t("generate.agentIntro")}
            </p>
            <button className="btn btn-block" onClick={copyAgentPrompt} disabled={!brief.trim()}>
              {copied ? t("generate.copied") : t("generate.copyPrompt")}
            </button>
          </div>

          {status && <p className="status muted small gen-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}
