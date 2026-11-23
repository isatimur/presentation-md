import { useEffect, useMemo, useRef, useState } from "react";
import type { DeckJson } from "@presentation-md/export";
import {
  THEME_BROWSE_FILTERS,
  findThemeShortlist,
  listThemeShortlists,
  listThemeSummaries,
  pickDiscoveryPreviewTrio,
  resolveTheme,
  themePassesBrowseFilter,
  type ThemeBrowseFilterId,
} from "../render/themes.js";
import {
  COMPARE_LIMIT,
  toggleCompareSlot,
} from "../render/themePreview.js";
import {
  downloadHtml,
  downloadPptx,
  downloadJson,
  downloadMarkdown,
  deckMarkdown,
  downloadNotesTxt,
  downloadNotesVtt,
  downloadPdf,
  printDeckPdf,
  parseDeckFile,
  importPptxFile,
  importMarkdownFile,
  downloadRecoveryText,
  assertStudioImportFileSize,
} from "../export/downloads.js";
import { STUDIO_EXAMPLES } from "../examples.js";
import {
  auditCraft,
  judgeDeckJson,
  repairCraft,
  repairCraftBeat,
  remorphDensity,
} from "../craft/auditCraft.js";
import type { CraftFixId, CraftIssue } from "../craft/auditCraft.js";
import { auditText, type AuditRow } from "../craft/auditText.js";
import { ThemeCompareTray, type LiveCompareMode } from "./ThemeCompareTray.js";
import { ThemeCraftShotStrip } from "./ThemeCraftShotStrip.js";
import { CommandPalette, type StudioCommand } from "./CommandPalette.js";
import { studioShareLink } from "../share/shareDeck.js";
import { themeFromBrandCss } from "../brand/pasteBrandTheme.js";
import { registerCustomTheme } from "../render/themes.js";
import { createAsyncOwnership } from "../asyncOwnership.js";
import { createLatestAsyncWriter } from "../latestAsyncWriter.js";
import { useI18n, type MessageKey } from "../i18n/index.js";
import { NODE_SLOT, withNode, withNodes } from "../i18n/richText.js";
import { LanguageSelect } from "./LanguageSelect.js";

/** Flagship trio for Example browser show-don't-tell (matches site proof strip). */
const FEATURED_EXAMPLE_SLUGS = ["novaspark-pitch", "bounce-launch", "forge-api"] as const;

const AUDIT_FILTER_KEYS: Record<"all" | "error" | "warning" | "pptx", MessageKey> = {
  all: "toolbar.filterAll",
  error: "toolbar.filterError",
  warning: "toolbar.filterWarning",
  pptx: "toolbar.filterPptx",
};

interface PendingImport {
  deck: DeckJson;
  fileName: string;
  successStatus: string;
}

export function Toolbar({
  deck,
  html,
  exampleSlug,
  selectedSlide = 0,
  statusHint,
  persistenceWarning,
  recoveryText,
  recoveryStored = false,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onChange,
  onLoadExample,
  onPresent,
  onGenerate,
  onDiscardRecovery,
  onSelectSlide,
}: {
  deck: DeckJson;
  /** Live-rendered deck HTML from App — used for instant HTML download. */
  html?: string;
  exampleSlug: string | null;
  /** 0-based index of the slide shown in My deck restyle compare. */
  selectedSlide?: number;
  /** One-shot status from App (e.g. shared-deck hydrate). */
  statusHint?: string | null;
  /** Persistent data-safety warning that must not be replaced by transient toolbar status. */
  persistenceWarning?: string | null;
  /** Original corrupt saved bytes, downloadable before the fallback deck replaces primary storage. */
  recoveryText?: string | null;
  /** Whether recoveryText is persisted in the dedicated recovery key. */
  recoveryStored?: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onChange: (next: DeckJson) => void;
  onLoadExample: (slug?: string) => void;
  onPresent: () => void;
  onGenerate: () => void;
  onDiscardRecovery?: () => void;
  /** Jump the Studio selection to a 1-based slide index from an audit issue. */
  onSelectSlide?: (slideIndex1Based: number) => void;
}) {
  const { t, locale } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);
  /** Suppress auto-open until craft errors clear (user dismissed while dirty). */
  const suppressLivePanel = useRef(false);
  /** Panel was opened from craft (live/manual) — refresh on deck change. */
  const craftPanelOpen = useRef(false);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [pendingImport, setPendingImport] = useState<PendingImport | null>(null);
  const [themeQuery, setThemeQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState<ThemeBrowseFilterId>("all");
  const [shortlistId, setShortlistId] = useState("");
  const [compare, setCompare] = useState<string[]>([]);
  const [liveCompare, setLiveCompare] = useState(false);
  /** Default My deck — content-true restyle beats canned craft proofs for pick-3. */
  const [liveCompareMode, setLiveCompareMode] = useState<LiveCompareMode>("deck");
  const [auditIssues, setAuditIssues] = useState<AuditRow[]>([]);
  /** PPTX export warnings — kept separate so live craft refresh doesn't wipe the full list. */
  const [pptxWarnings, setPptxWarnings] = useState<string[]>([]);
  const [auditFilter, setAuditFilter] = useState<"all" | "error" | "warning" | "pptx">("all");
  const [auditPanelOpen, setAuditPanelOpen] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  /** Mount featured shot-strip iframes only while Example is open (cut idle loads). */
  const [exampleOpen, setExampleOpen] = useState(false);
  const [pasteMdOpen, setPasteMdOpen] = useState(false);
  const [pasteMd, setPasteMd] = useState("");
  const [pasteBrandOpen, setPasteBrandOpen] = useState(false);
  const [pasteBrandCss, setPasteBrandCss] = useState("");
  const [pasteBrandName, setPasteBrandName] = useState("brand-paste");
  /** Bump when registering Paste Brand themes so the browser list refreshes. */
  const [themeEpoch, setThemeEpoch] = useState(0);
  const deckRef = useRef(deck);
  const onChangeRef = useRef(onChange);
  const pasteMdRef = useRef(pasteMd);
  const pasteBrandCssRef = useRef(pasteBrandCss);
  const importOwnership = useMemo(() => createAsyncOwnership<DeckJson>(), []);
  const exportOwnership = useMemo(() => createAsyncOwnership<DeckJson>(), []);
  const clipboardOwnership = useMemo(() => createAsyncOwnership<DeckJson>(), []);
  const markdownReadOwnership = useMemo(() => createAsyncOwnership<string>(), []);
  const brandCssReadOwnership = useMemo(() => createAsyncOwnership<string>(), []);
  const clipboardWriter = useMemo(() => createLatestAsyncWriter(), []);
  deckRef.current = deck;
  onChangeRef.current = onChange;
  pasteMdRef.current = pasteMd;
  pasteBrandCssRef.current = pasteBrandCss;

  useEffect(
    () => () => {
      importOwnership.invalidate();
      exportOwnership.invalidate();
      clipboardOwnership.invalidate();
      markdownReadOwnership.invalidate();
      brandCssReadOwnership.invalidate();
      clipboardWriter.invalidate();
    },
    [
      brandCssReadOwnership,
      clipboardOwnership,
      clipboardWriter,
      exportOwnership,
      importOwnership,
      markdownReadOwnership,
    ]
  );

  useEffect(() => {
    setStatus(statusHint ?? "");
  }, [statusHint]);

  const themes = useMemo(() => listThemeSummaries(), [themeEpoch]);
  const shortlists = useMemo(() => listThemeShortlists(), []);
  const featuredExamples = useMemo(
    () =>
      FEATURED_EXAMPLE_SLUGS.map((slug) => STUDIO_EXAMPLES.find((e) => e.slug === slug)).filter(
        (e): e is (typeof STUDIO_EXAMPLES)[number] => !!e
      ),
    []
  );
  const exampleThemeLooks = useMemo(() => {
    const map = new Map<string, { bg: string; accent: string; theme: string }>();
    for (const ex of STUDIO_EXAMPLES) {
      const themeName = ex.theme;
      const summary = themes.find((t) => t.name === themeName);
      if (summary) {
        map.set(ex.slug, { bg: summary.bg, accent: summary.accent, theme: themeName });
      } else {
        const resolved = resolveTheme(themeName);
        map.set(ex.slug, {
          bg: resolved.palette.bg,
          accent: resolved.palette.accent,
          theme: themeName,
        });
      }
    }
    return map;
  }, [themes]);
  const liveCraftIssues = useMemo(() => auditCraft(deck), [deck]);
  const liveCraftErrors = liveCraftIssues.filter((i) => i.severity === "error").length;
  const liveCraftWarns = liveCraftIssues.length - liveCraftErrors;
  const panelIssues = useMemo(() => {
    const pptx: CraftIssue[] = pptxWarnings.map((message) => {
      const labeled = message.startsWith("PPTX:") ? message : `PPTX: ${message}`;
      const m = labeled.match(/Slide\s+(\d+)\s*:/i);
      const slideNum = m ? Number(m[1]) : undefined;
      return {
        severity: "warning" as const,
        message: labeled,
        ...(Number.isFinite(slideNum) && (slideNum as number) > 0 ? { slide: slideNum } : {}),
      };
    });
    // Drop stale PPTX: rows from craft/judge payloads if any linger.
    const craft = auditIssues.filter((i) => !i.message.startsWith("PPTX:"));
    return [...pptx, ...craft];
  }, [auditIssues, pptxWarnings]);
  const theme = deck.meta?.theme ?? "default-tech";
  const active = themes.find((t) => t.name === theme) ?? {
    name: theme,
    vibe: theme,
    bg: resolveTheme(theme).palette.bg,
    accent: resolveTheme(theme).palette.accent,
  };
  const activeShortlist = shortlistId ? findThemeShortlist(shortlistId) : undefined;
  const filtered = themes.filter((t) => {
    if (!themePassesBrowseFilter(t, moodFilter)) return false;
    if (activeShortlist && !activeShortlist.themes.includes(t.name)) return false;
    if (!themeQuery.trim()) return true;
    const q = themeQuery.trim().toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.vibe.toLowerCase().includes(q) ||
      (t.mood ?? []).some((m) => m.toLowerCase().includes(q))
    );
  });

  // Auto-open on live craft issues (errors or warnings) unless the user dismissed while dirty.
  // PPTX export warnings live in pptxWarnings and survive craft refresh / clean craft.
  useEffect(() => {
    if (liveCraftIssues.length === 0) {
      suppressLivePanel.current = false;
      if (craftPanelOpen.current) {
        setAuditIssues([]);
        if (pptxWarnings.length === 0) {
          craftPanelOpen.current = false;
        }
      }
      return;
    }
    if (suppressLivePanel.current) return;
    craftPanelOpen.current = true;
    setAuditIssues(liveCraftIssues);
    setAuditPanelOpen(true);
    if (liveCraftErrors > 0) {
      setAuditFilter((f) => (f === "warning" || f === "pptx" ? "all" : f));
    }
  }, [liveCraftIssues, liveCraftErrors, pptxWarnings.length]);

  const setMeta = (patch: Record<string, string>) =>
    onChange({ ...deck, meta: { ...deck.meta, ...patch } });

  /** Theme swap + repairCraft — same path as pick-3 Use / MCP apply_theme default. */
  const applyThemeWithRepair = (name: string) => {
    const themed: DeckJson = {
      ...deck,
      meta: { ...deck.meta, theme: name },
    };
    const { deck: repaired, fixes } = repairCraft(themed);
    onChange(repaired as DeckJson);
    setStatus(
      fixes.length
        ? t("toolbar.themeAppliedFixes", { name, count: fixes.length })
        : t("toolbar.themeApplied", { name })
    );
  };
  const setTitle = (value: string) => setMeta({ title: value });

  const onOpen = async (file: File) => {
    try {
      assertStudioImportFileSize(file);
    } catch (err) {
      setStatus(t("toolbar.openFailed", { message: (err as Error).message }));
      return;
    }

    const ticket = importOwnership.begin(deckRef.current);
    setPendingImport(null);
    setBusy(true);
    setStatus(
      /\.pptx$/i.test(file.name)
        ? t("toolbar.importingPptx")
        : t("toolbar.opening", { name: file.name })
    );
    try {
      let opened: DeckJson;
      let successStatus: string;
      if (/\.pptx$/i.test(file.name)) {
        const result = await importPptxFile(await file.arrayBuffer(), theme);
        opened = result.deck;
        successStatus = result.warnings.length
          ? t("toolbar.importedWithWarnings", { name: file.name, count: result.warnings.length })
          : t("toolbar.imported", { name: file.name });
      } else {
        opened = parseDeckFile(file.name, await file.text(), theme);
        successStatus = /\.(md|markdown)$/i.test(file.name)
          ? t("toolbar.importedMarkdown", {
              n: opened.slides.length,
              theme: opened.meta?.theme ?? theme,
            })
          : t("toolbar.opened", { name: file.name });
      }

      const decision = importOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setPendingImport({ deck: opened, fileName: file.name, successStatus });
        setStatus(t("toolbar.importReadyConflict", { name: file.name }));
        return;
      }
      onChangeRef.current(opened);
      setStatus(successStatus);
    } catch (err) {
      if (importOwnership.classify(ticket, deckRef.current) === "stale") return;
      setStatus(t("toolbar.openFailed", { message: (err as Error).message }));
    } finally {
      if (importOwnership.classify(ticket, deckRef.current) !== "stale") setBusy(false);
    }
  };

  const exportPptx = async () => {
    const snapshot = deckRef.current;
    const snapshotCraftIssues = liveCraftIssues;
    const ticket = exportOwnership.begin(snapshot);
    setBusy(true);
    setStatus(t("toolbar.buildingPptx"));
    try {
      const { warnings } = await downloadPptx(snapshot);
      const decision = exportOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus(t("toolbar.exportedStale"));
        return;
      }
      const exportIssues = warnings.map((message) =>
        message.startsWith("PPTX:") ? message : `PPTX: ${message}`
      );
      setPptxWarnings(exportIssues);
      setAuditIssues(snapshotCraftIssues);
      const mergedCount = exportIssues.length + snapshotCraftIssues.length;
      if (mergedCount) {
        // Keep craft ownership so deck edits still refresh the panel; export warns lead.
        craftPanelOpen.current = true;
        setAuditFilter(exportIssues.length ? "pptx" : "all");
        setAuditPanelOpen(true);
        setStatus(
          warnings.length
            ? t("toolbar.exportedWarnings", { count: warnings.length })
            : t("toolbar.exportedCraftIssues", { count: snapshotCraftIssues.length })
        );
      } else {
        setStatus(t("toolbar.exportedPptx"));
      }
    } catch (err) {
      const decision = exportOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      setStatus(
        decision === "conflict"
          ? t("toolbar.pptxStaleFailed", { message: (err as Error).message })
          : t("toolbar.exportFailed", { message: (err as Error).message })
      );
    } finally {
      setBusy(false);
    }
  };

  const runCraftAudit = () => {
    const issues = auditCraft(deck);
    suppressLivePanel.current = false;
    craftPanelOpen.current = true;
    setAuditIssues(issues);
    setAuditFilter("all");
    setAuditPanelOpen(true);
    const errors = issues.filter((i) => i.severity === "error");
    const warns = issues.filter((i) => i.severity === "warning");
    if (!issues.length) {
      craftPanelOpen.current = pptxWarnings.length > 0;
      setAuditPanelOpen(pptxWarnings.length > 0);
      setStatus(
        pptxWarnings.length
          ? t("toolbar.auditCleanWarnings", { count: pptxWarnings.length })
          : t("toolbar.auditClean")
      );
      return;
    }
    setStatus(
      t("toolbar.auditSummary", {
        errors: t("toolbar.errorCount", { count: errors.length }),
        warnings: t("toolbar.warningCount", { count: warns.length }),
      })
    );
  };

  const runStructuralJudge = () => {
    const { flags, metrics } = judgeDeckJson(deck as unknown as Record<string, unknown>);
    const issues: AuditRow[] = flags.map((f) => ({
      severity: f.severity === "warn" ? "warning" : "error",
      message: `[judge · ${f.id}] ${f.detail}`,
      judgeId: f.id,
      params: f.params,
      slide: typeof f.slide === "number" ? f.slide : undefined,
    }));
    suppressLivePanel.current = false;
    craftPanelOpen.current = true;
    setAuditIssues(issues);
    setAuditFilter("all");
    setAuditPanelOpen(issues.length > 0 || pptxWarnings.length > 0);
    const gates = Number(metrics.gate_hits ?? 0);
    if (!issues.length) {
      craftPanelOpen.current = pptxWarnings.length > 0;
      setStatus(
        pptxWarnings.length
          ? t("toolbar.judgeCleanWarnings", { count: pptxWarnings.length })
          : t("toolbar.judgeClean")
      );
      return;
    }
    setStatus(
      t("toolbar.judgeSummary", {
        gates: t("toolbar.gateCount", { count: gates }),
        flags: t("toolbar.flagCount", { count: issues.length }),
      })
    );
  };

  const dismissAuditPanel = () => {
    setAuditIssues([]);
    setPptxWarnings([]);
    craftPanelOpen.current = false;
    if (liveCraftIssues.length > 0) suppressLivePanel.current = true;
  };

  const applySafeCraftFixes = () => {
    const { deck: repaired, fixes } = repairCraft(deck);
    if (!fixes.length) {
      setStatus(t("toolbar.noSafeFixes"));
      return;
    }
    onChange(repaired as DeckJson);
    const issues = auditCraft(repaired);
    setAuditIssues(issues);
    setAuditFilter("all");
    const remain = issues.length + pptxWarnings.length;
    setAuditPanelOpen(remain > 0);
    craftPanelOpen.current = remain > 0;
    suppressLivePanel.current = false;
    setStatus(
      issues.length
        ? t("toolbar.appliedFixesRemain", {
            fixes: t("toolbar.craftFixCount", { count: fixes.length }),
            issues: t("toolbar.issueCount", { count: issues.length }),
          })
        : t("toolbar.appliedFixesClean", {
            fixes: t("toolbar.craftFixCount", { count: fixes.length }),
          })
    );
  };

  const applyDensityRemorph = (mode: "speaker" | "reading") => {
    const { deck: remorphed, changes } = remorphDensity(deck as unknown as Record<string, unknown>, mode);
    const modeLabel = t(mode === "speaker" ? "toolbar.modeSpeaker" : "toolbar.modeReading");
    if (!changes.length) {
      setStatus(t("toolbar.densityAlready", { mode: modeLabel }));
      return;
    }
    onChange(remorphed as DeckJson);
    const issues = auditCraft(remorphed);
    setAuditIssues(issues);
    setAuditFilter("all");
    const remain = issues.length + pptxWarnings.length;
    setAuditPanelOpen(remain > 0);
    craftPanelOpen.current = remain > 0;
    suppressLivePanel.current = false;
    setStatus(
      issues.length
        ? t("toolbar.remorphedRemain", {
            mode: modeLabel,
            changes: t("toolbar.changeCount", { count: changes.length }),
            issues: t("toolbar.issueCount", { count: issues.length }),
          })
        : t("toolbar.remorphedClean", {
            mode: modeLabel,
            changes: t("toolbar.changeCount", { count: changes.length }),
          })
    );
  };

  const applyIssueBeat = (fixId: CraftFixId) => {
    const { deck: repaired, fixes } = repairCraftBeat(deck, fixId);
    if (!fixes.length) {
      setStatus(t("toolbar.beatPresent"));
      return;
    }
    onChange(repaired as DeckJson);
    const issues = auditCraft(repaired);
    setAuditIssues(issues);
    setAuditFilter("all");
    const remain = issues.length + pptxWarnings.length;
    setAuditPanelOpen(remain > 0);
    craftPanelOpen.current = remain > 0;
    suppressLivePanel.current = false;
    setStatus(
      issues.length
        ? t("toolbar.beatInsertedRemain", {
            issues: t("toolbar.issueCount", { count: issues.length }),
          })
        : t("toolbar.beatInsertedClean")
    );
  };

  const exportPdf = async () => {
    const snapshot = deckRef.current;
    const snapshotHtml = html;
    const ticket = exportOwnership.begin(snapshot);
    setBusy(true);
    setStatus(t("toolbar.buildingPdf"));
    try {
      const { mode } = await downloadPdf(snapshot, snapshotHtml);
      const decision = exportOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus(t("toolbar.pdfStale"));
        return;
      }
      if (mode === "headless") {
        setStatus(t("toolbar.pdfHeadless"));
      } else if (mode === "client") {
        setStatus(t("toolbar.pdfClient"));
      } else {
        setStatus(t("toolbar.pdfPrint"));
      }
    } catch (err) {
      try {
        printDeckPdf(snapshot, snapshotHtml);
        const decision = exportOwnership.classify(ticket, deckRef.current);
        if (decision === "stale") return;
        setStatus(
          decision === "conflict"
            ? t("toolbar.pdfPrintStale")
            : t("toolbar.pdfBlobFailed", { message: (err as Error).message })
        );
      } catch (printErr) {
        const decision = exportOwnership.classify(ticket, deckRef.current);
        if (decision === "stale") return;
        setStatus(
          decision === "conflict"
            ? t("toolbar.pdfStaleFailed", { message: (printErr as Error).message })
            : t("toolbar.pdfFailed", { message: (printErr as Error).message })
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    const snapshot = deckRef.current;
    const ticket = clipboardOwnership.begin(snapshot);
    try {
      const writeResult = await clipboardWriter.write(
        async () => {
          const path = await studioShareLink(snapshot);
          return typeof window !== "undefined"
            ? `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
            : path;
        },
        (absolute) => navigator.clipboard.writeText(absolute)
      );
      if (writeResult === "stale") return;
      const decision = clipboardOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      setStatus(
        decision === "conflict"
          ? t("toolbar.linkStale")
          : t("toolbar.linkCopied")
      );
    } catch (err) {
      const decision = clipboardOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      // Oversized / compress failure — do NOT copy a curated example (mis-share trap).
      setStatus(
        decision === "conflict"
          ? t("toolbar.linkStaleFailed", { message: (err as Error).message })
          : t("toolbar.linkFailed", { message: (err as Error).message })
      );
    }
  };

  const copyMarkdown = async () => {
    const snapshot = deckRef.current;
    const ticket = clipboardOwnership.begin(snapshot);
    try {
      const writeResult = await clipboardWriter.write(
        () => deckMarkdown(snapshot),
        (markdown) => navigator.clipboard.writeText(markdown)
      );
      if (writeResult === "stale") return;
      const decision = clipboardOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      setStatus(
        decision === "conflict"
          ? t("toolbar.mdStale")
          : t("toolbar.mdCopied")
      );
    } catch (err) {
      const decision = clipboardOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      setStatus(
        decision === "conflict"
          ? t("toolbar.mdStaleFailed", { message: (err as Error).message })
          : t("toolbar.mdFailed", { message: (err as Error).message })
      );
    }
  };

  const applyPastedMarkdown = (raw: string) => {
    try {
      const opened = importMarkdownFile(raw, theme);
      onChange(opened);
      setPasteMd("");
      setPasteMdOpen(false);
      setStatus(
        t("toolbar.pastedMarkdown", {
          n: opened.slides.length,
          theme: opened.meta?.theme ?? theme,
        })
      );
    } catch (err) {
      setStatus(t("toolbar.pasteMarkdownFailed", { message: (err as Error).message }));
    }
  };

  const pasteMdFromClipboard = async () => {
    const ticket = markdownReadOwnership.begin(pasteMdRef.current);
    try {
      const text = await navigator.clipboard.readText();
      const decision = markdownReadOwnership.classify(ticket, pasteMdRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus(t("toolbar.clipMdNotApplied"));
        return;
      }
      if (!text.trim()) {
        setStatus(t("toolbar.clipMdEmpty"));
        return;
      }
      setPasteMd(text);
      setPasteMdOpen(true);
      setStatus(t("toolbar.clipMdLoaded"));
    } catch (err) {
      if (markdownReadOwnership.classify(ticket, pasteMdRef.current) === "stale") return;
      setStatus(t("toolbar.clipReadFailed", { message: (err as Error).message }));
    }
  };

  const applyPastedBrandCss = () => {
    try {
      const { manifest, name, adjustments, stillFailing } = themeFromBrandCss(
        pasteBrandCss,
        pasteBrandName
      );
      registerCustomTheme(manifest);
      setThemeEpoch((n) => n + 1);
      applyThemeWithRepair(name);
      setPasteBrandOpen(false);
      const adj =
        adjustments.length > 0 ? t("toolbar.brandTweaks", { count: adjustments.length }) : "";
      const fail =
        stillFailing.length > 0
          ? t("toolbar.brandStillWeak", { names: stillFailing.slice(0, 2).join(", ") })
          : "";
      setStatus(t("toolbar.brandApplied", { name, adj, fail }));
    } catch (err) {
      setStatus(t("toolbar.brandFailed", { message: (err as Error).message }));
    }
  };

  const pasteBrandFromClipboard = async () => {
    const ticket = brandCssReadOwnership.begin(pasteBrandCssRef.current);
    try {
      const text = await navigator.clipboard.readText();
      const decision = brandCssReadOwnership.classify(ticket, pasteBrandCssRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus(t("toolbar.clipCssNotApplied"));
        return;
      }
      if (!text.trim()) {
        setStatus(t("toolbar.clipCssEmpty"));
        return;
      }
      setPasteBrandCss(text);
      setPasteBrandOpen(true);
      setStatus(t("toolbar.clipCssLoaded"));
    } catch (err) {
      if (brandCssReadOwnership.classify(ticket, pasteBrandCssRef.current) === "stale") return;
      setStatus(t("toolbar.clipReadFailed", { message: (err as Error).message }));
    }
  };

  const studioCommands = useMemo<StudioCommand[]>(
    () => [
      { id: "present", label: t("command.present"), hint: t("command.presentHint"), keywords: "slideshow play", run: onPresent },
      { id: "generate", label: t("command.generate"), hint: t("command.generateHint"), keywords: "ai craft", run: onGenerate },
      { id: "audit", label: t("command.audit"), keywords: "gates craft", run: runCraftAudit },
      {
        id: "judge",
        label: t("command.judge"),
        keywords: "gates judge density words",
        run: runStructuralJudge,
      },
      {
        id: "fix",
        label: t("command.fix"),
        keywords: "repair beats",
        run: applySafeCraftFixes,
      },
      {
        id: "density-speaker",
        label: t("command.densitySpeaker"),
        keywords: "remorph split notes",
        run: () => applyDensityRemorph("speaker"),
      },
      {
        id: "density-reading",
        label: t("command.densityReading"),
        keywords: "remorph merge notes",
        run: () => applyDensityRemorph("reading"),
      },
      { id: "copy-link", label: t("command.copyLink"), keywords: "url share ?d=", run: () => void copyLink() },
      {
        id: "copy-md",
        label: t("command.copyMd"),
        keywords: "marp md",
        run: () => void copyMarkdown(),
      },
      {
        id: "dl-html",
        label: t("command.dlHtml"),
        keywords: "export",
        run: () => downloadHtml(deck, html),
      },
      {
        id: "dl-md",
        label: t("command.dlMd"),
        keywords: "export marp",
        run: () => downloadMarkdown(deck),
      },
      {
        id: "dl-pdf",
        label: t("command.dlPdf"),
        keywords: "export print",
        run: () => void exportPdf(),
      },
      {
        id: "dl-pptx",
        label: t("command.dlPptx"),
        keywords: "export pptx",
        run: () => void exportPptx(),
      },
      {
        id: "dl-json",
        label: t("command.dlJson"),
        keywords: "export source",
        run: () => downloadJson(deck),
      },
      {
        id: "dl-notes-txt",
        label: t("command.dlNotesTxt"),
        keywords: "handout speaker",
        run: () => downloadNotesTxt(deck),
      },
      {
        id: "dl-notes-vtt",
        label: t("command.dlNotesVtt"),
        keywords: "handout captions",
        run: () => downloadNotesVtt(deck),
      },
      {
        id: "undo",
        label: t("command.undo"),
        hint: "⌘Z",
        keywords: "history",
        run: () => onUndo?.(),
      },
      {
        id: "redo",
        label: t("command.redo"),
        hint: "⇧⌘Z",
        keywords: "history",
        run: () => onRedo?.(),
      },
    ],
    // Handlers close over latest deck/html; rebuild when those (or the locale) change.
    [deck, html, onPresent, onGenerate, onUndo, onRedo, locale]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key !== "k" && e.key !== "K") return;
      e.preventDefault();
      setCommandOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="toolbar">
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} commands={studioCommands} />
      <div className="brand">
        <a className="brand-link" href="https://presentation-md.vercel.app/" target="_blank" rel="noopener noreferrer">
          <strong>presentation-md</strong>
        </a>
        <span className="muted small">{t("toolbar.tagline")}</span>
      </div>

      <input
        className="text-input title-input"
        value={deck.meta?.title ?? ""}
        placeholder={t("toolbar.deckTitle")}
        onChange={(e) => setTitle(e.target.value)}
      />

      <details className="theme-browser" onToggle={(e) => {
        if (!(e.target as HTMLDetailsElement).open) {
          setThemeQuery("");
          setMoodFilter("all");
          setShortlistId("");
          setCompare([]);
          setLiveCompare(false);
        }
      }}>
        <summary className="btn btn-sm theme-trigger" title={t("toolbar.themeBrowseTitle")}>
          <span
            className="theme-swatch"
            style={{ ["--swatch-bg" as string]: active.bg, ["--swatch-accent" as string]: active.accent }}
            aria-hidden
          />
          <span>{theme}</span>
          <span aria-hidden>▾</span>
        </summary>
        <div className={`theme-browser-panel${compare.length ? " has-compare" : ""}`}>
          <input
            className="text-input theme-search"
            value={themeQuery}
            placeholder={t("toolbar.searchThemes")}
            autoFocus
            onChange={(e) => setThemeQuery(e.target.value)}
          />
          <div className="theme-mood-row" role="toolbar" aria-label={t("toolbar.moodLabel")}>
            <span className="theme-filter-label">{t("toolbar.browse")}</span>
            {THEME_BROWSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${moodFilter === f.id ? " active" : ""}`}
                aria-pressed={moodFilter === f.id}
                onClick={() => setMoodFilter(f.id)}
                title={
                  f.id === "all"
                    ? t("toolbar.showAllThemes")
                    : f.id === "popular"
                      ? t("toolbar.popularThemes")
                      : t("toolbar.filterByMood", { label: f.label.toLowerCase() })
                }
              >
                {f.id === "all" ? t("toolbar.allCount", { n: themes.length }) : f.label}
              </button>
            ))}
          </div>
          <div className="theme-shortlist-row" role="listbox" aria-label={t("toolbar.shortlistsLabel")}>
            <button
              type="button"
              className={`chip${shortlistId === "" ? " active" : ""}`}
              onClick={() => setShortlistId("")}
              title={t("toolbar.showAllThemes")}
            >
              {t("toolbar.shortlists")}
            </button>
            {shortlists.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`chip${shortlistId === s.id ? " active" : ""}${s.popular ? " chip-popular" : ""}`}
                onClick={() => {
                  const next = s.id === shortlistId ? "" : s.id;
                  setShortlistId(next);
                  if (next) {
                    const pick = findThemeShortlist(next);
                    if (pick?.themes?.length) {
                      const slots = pick.themes.slice(0, COMPARE_LIMIT);
                      setCompare(slots);
                      // Auto-live once pick-3 is full — show-don't-tell vs swatch-only.
                      setLiveCompare(slots.length >= COMPARE_LIMIT);
                    }
                  } else {
                    setCompare([]);
                    setLiveCompare(false);
                  }
                }}
                title={s.why ?? s.label}
              >
                {s.popular ? "★ " : ""}
                {s.label.split(/[/(]/)[0]!.trim()}
              </button>
            ))}
          </div>
          <div className="theme-count">
            <span>
              {t("toolbar.themeCount", { shown: filtered.length, total: themes.length })}
              {moodFilter !== "all" ? ` · ${moodFilter}` : ""}
              {activeShortlist ? ` · ${activeShortlist.id}` : ""}
              {compare.length
                ? t("toolbar.compareCount", { n: compare.length, max: COMPARE_LIMIT })
                : t("toolbar.compareHint")}
            </span>
            <button
              type="button"
              className="chip"
              disabled={filtered.length === 0}
              title={t("toolbar.compare3Title")}
              onClick={() => {
                const trio = pickDiscoveryPreviewTrio(
                  filtered.map((t) => ({
                    name: t.name,
                    scheme: t.scheme,
                    mood: t.mood,
                    formality: t.formality,
                    popular: t.popular,
                  }))
                );
                const slots = (trio?.themes ?? filtered.map((t) => t.name)).slice(0, COMPARE_LIMIT);
                setCompare(slots);
                setLiveCompare(slots.length >= COMPARE_LIMIT);
              }}
            >
              {t("toolbar.compare3")}
            </button>
          </div>
          <ul className="theme-list">
            {filtered.map((th) => {
              const inCompare = compare.includes(th.name);
              return (
                <li key={th.name}>
                  <div className={`theme-option-row${th.name === theme ? " active" : ""}${inCompare ? " in-compare" : ""}`}>
                    <button
                      type="button"
                      className={`theme-option${th.name === theme ? " active" : ""}`}
                      onClick={(e) => {
                        applyThemeWithRepair(th.name);
                        const details = (e.currentTarget as HTMLElement).closest("details");
                        if (details) details.open = false;
                      }}
                    >
                      <span
                        className="theme-swatch"
                        style={{ ["--swatch-bg" as string]: th.bg, ["--swatch-accent" as string]: th.accent }}
                        aria-hidden
                      />
                      <span className="theme-option-meta">
                        <span className="theme-option-name">{th.name}</span>
                        <span className="theme-option-vibe">{th.vibe}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`theme-compare-toggle${inCompare ? " active" : ""}`}
                      title={
                        inCompare
                          ? t("toolbar.compareRemoveTitle", { name: th.name })
                          : t("toolbar.compareAddTitle", { name: th.name, max: COMPARE_LIMIT })
                      }
                      aria-pressed={inCompare}
                      onClick={() =>
                        setCompare((prev) => {
                          const next = toggleCompareSlot(prev, th.name);
                          // Flip live on when the tray hits pick-3; leave user toggle otherwise.
                          if (next.length >= COMPARE_LIMIT) setLiveCompare(true);
                          else if (next.length === 0) setLiveCompare(false);
                          return next;
                        })
                      }
                    >
                      {inCompare ? "✓" : "⊕"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <ThemeCompareTray
            compare={compare}
            themes={themes}
            livePreview={liveCompare}
            liveMode={liveCompareMode}
            deck={deck}
            slideIndex0={selectedSlide}
            activeTheme={theme}
            onLivePreview={setLiveCompare}
            onLiveMode={setLiveCompareMode}
            onRemove={(name) => setCompare((prev) => prev.filter((n) => n !== name))}
            onClear={() => {
              setCompare([]);
              setLiveCompare(false);
            }}
            onUse={(name) => {
              applyThemeWithRepair(name);
              setCompare([]);
              setLiveCompare(false);
              const details = document.querySelector("details.theme-browser") as HTMLDetailsElement | null;
              if (details) details.open = false;
            }}
          />
        </div>
      </details>

      <details className="deck-details">
        <summary className="btn btn-sm">{t("toolbar.details")}</summary>
        <div className="deck-details-body">
          <input
            className="text-input"
            value={deck.meta?.company ?? ""}
            placeholder={t("toolbar.company")}
            onChange={(e) => setMeta({ company: e.target.value })}
          />
          <input
            className="text-input"
            value={deck.meta?.description ?? ""}
            placeholder={t("toolbar.description")}
            onChange={(e) => setMeta({ description: e.target.value })}
          />
        </div>
      </details>

      <div className="spacer" />

      <button
        type="button"
        className="btn toolbar-desktop-only"
        title={t("toolbar.commandPaletteTitle")}
        onClick={() => setCommandOpen(true)}
      >
        ⌘K
      </button>
      <LanguageSelect />
      <button className="btn btn-generate" onClick={onGenerate} title={t("toolbar.generateTitle")}>{t("toolbar.generate")}</button>
      <details
        className="example-browser"
        onToggle={(e) => setExampleOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary className="btn" title={t("toolbar.exampleTitle")}>{t("toolbar.example")}</summary>
        <div className="example-browser-panel">
          <div className="example-featured-head">
            <span className="example-featured-label">{t("toolbar.featuredCraft")}</span>
            <button
              type="button"
              className="chip"
              title={t("toolbar.featuredCompareTitle")}
              onClick={() => {
                const themes = featuredExamples
                  .map((ex) => exampleThemeLooks.get(ex.slug)?.theme ?? ex.theme)
                  .filter((t): t is string => !!t)
                  .slice(0, COMPARE_LIMIT);
                if (themes.length === 0) return;
                setCompare(themes);
                setLiveCompare(true);
                setExampleOpen(false);
                const exampleDetails = document.querySelector(
                  "details.example-browser"
                ) as HTMLDetailsElement | null;
                if (exampleDetails) exampleDetails.open = false;
                const themeDetails = document.querySelector(
                  "details.theme-browser"
                ) as HTMLDetailsElement | null;
                if (themeDetails) themeDetails.open = true;
              }}
            >
              {t("toolbar.compare3Themes")}
            </button>
          </div>
          <div className="example-featured" aria-label={t("toolbar.featuredLabel")}>
            {featuredExamples.map((ex) => {
              const look = exampleThemeLooks.get(ex.slug);
              const previewTheme = look?.theme ?? ex.theme;
              return (
                <button
                  key={ex.slug}
                  type="button"
                  className={`example-featured-card${exampleSlug === ex.slug ? " active" : ""}`}
                  title={ex.label}
                  onClick={(e) => {
                    onLoadExample(ex.slug);
                    const details = (e.currentTarget as HTMLElement).closest("details");
                    if (details) details.open = false;
                    setExampleOpen(false);
                  }}
                >
                  {exampleOpen ? (
                    <ThemeCraftShotStrip
                      theme={previewTheme}
                      title={t("toolbar.exampleFrameTitle", { label: ex.label })}
                      className="example-featured-shot-strip"
                      compact
                    />
                  ) : (
                    <span
                      className="example-featured-shot-strip example-featured-shot-strip-placeholder"
                      aria-hidden
                    />
                  )}
                  <span className="example-featured-name">{ex.label.split("(")[0]!.trim()}</span>
                </button>
              );
            })}
          </div>
          <p className="example-featured-hint muted small">
            {t("toolbar.featuredHint")}
          </p>
          <p className="example-list-label">{t("toolbar.allExamples")}</p>
          <ul className="example-list">
            {STUDIO_EXAMPLES.map((ex) => {
              const look = exampleThemeLooks.get(ex.slug);
              return (
                <li key={ex.slug}>
                  <button
                    type="button"
                    className={exampleSlug === ex.slug ? "active" : undefined}
                    onClick={(e) => {
                      onLoadExample(ex.slug);
                      const details = (e.currentTarget as HTMLElement).closest("details");
                      if (details) details.open = false;
                    }}
                  >
                    {look ? (
                      <span
                        className="example-list-swatch"
                        style={{
                          ["--swatch-bg" as string]: look.bg,
                          ["--swatch-accent" as string]: look.accent,
                        }}
                        aria-hidden
                      />
                    ) : null}
                    {ex.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </details>
      <div className="toolbar-secondary" role="group" aria-label={t("toolbar.deckActions")}>
        <button
          type="button"
          className="btn btn-icon toolbar-desktop-only"
          disabled={!canUndo || !onUndo}
          onClick={() => onUndo?.()}
          title={t("toolbar.undoTitle")}
          aria-label={t("toolbar.undo")}
        >
          ↶
        </button>
        <button
          type="button"
          className="btn btn-icon toolbar-desktop-only"
          disabled={!canRedo || !onRedo}
          onClick={() => onRedo?.()}
          title={t("toolbar.redoTitle")}
          aria-label={t("toolbar.redo")}
        >
          ↷
        </button>
        <button
          className="btn toolbar-desktop-only"
          onClick={() => void copyLink()}
          title={t("toolbar.copyLinkTitle")}
        >
          {t("toolbar.copyLink")}
        </button>
        <button
          className="btn toolbar-desktop-only"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          title={t("toolbar.openTitle")}
        >
          {t("toolbar.open")}
        </button>
        <details
          className="paste-md"
          open={pasteMdOpen}
          onToggle={(e) => setPasteMdOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary
            className="btn"
            title={t("toolbar.pasteMdTitle")}
          >
            {t("toolbar.pasteMd")}
          </summary>
          <div className="paste-md-panel" role="dialog" aria-label={t("toolbar.pasteMdLabel")}>
            <p className="muted small" style={{ margin: 0 }}>
              {withNode(t("toolbar.pasteMdIntro", { code: NODE_SLOT }), <code>import_markdown</code>)}
            </p>
            <textarea
              className="text-input paste-md-input"
              rows={10}
              value={pasteMd}
              placeholder={t("toolbar.pasteMdPlaceholder")}
              onChange={(e) => setPasteMd(e.target.value)}
              aria-label={t("toolbar.markdownOutlineLabel")}
            />
            <div className="paste-md-actions">
              <button
                type="button"
                className="btn"
                onClick={() => void pasteMdFromClipboard()}
                title={t("toolbar.fromClipboardMdTitle")}
              >
                {t("toolbar.fromClipboard")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!pasteMd.trim()}
                onClick={() => applyPastedMarkdown(pasteMd)}
              >
                {t("toolbar.apply")}
              </button>
            </div>
          </div>
        </details>
        <details
          className="paste-brand"
          open={pasteBrandOpen}
          onToggle={(e) => setPasteBrandOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary
            className="btn"
            title={t("toolbar.pasteBrandTitle")}
          >
            {t("toolbar.pasteBrand")}
          </summary>
          <div className="paste-md-panel paste-brand-panel" role="dialog" aria-label={t("toolbar.pasteBrandLabel")}>
            <p className="muted small" style={{ margin: 0 }}>
              {withNodes(t("toolbar.pasteBrandIntro"), {
                root: <code>:root</code>,
                tool: <code>import_brand_theme</code>,
                flag: <code>--from-css</code>,
              })}
            </p>
            <label className="inline-field">
              <span className="muted small">{t("toolbar.themeName")}</span>
              <input
                className="text-input"
                value={pasteBrandName}
                onChange={(e) => setPasteBrandName(e.target.value)}
                aria-label={t("toolbar.brandThemeNameLabel")}
                placeholder="brand-paste"
              />
            </label>
            <textarea
              className="text-input paste-md-input"
              rows={8}
              value={pasteBrandCss}
              placeholder={":root {\n  --bg: #0a0a0a;\n  --text: #fafafa;\n  --accent: #22c55e;\n}\nbody { font-family: Inter, sans-serif; }\nh1 { font-family: \"Space Grotesk\", sans-serif; }"}
              onChange={(e) => setPasteBrandCss(e.target.value)}
              aria-label={t("toolbar.brandStylesheetLabel")}
            />
            <div className="paste-md-actions">
              <button
                type="button"
                className="btn"
                onClick={() => void pasteBrandFromClipboard()}
                title={t("toolbar.fromClipboardCssTitle")}
              >
                {t("toolbar.fromClipboard")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!pasteBrandCss.trim()}
                onClick={applyPastedBrandCss}
              >
                {t("toolbar.applyTheme")}
              </button>
            </div>
          </div>
        </details>
        <button className="btn toolbar-desktop-only" onClick={onPresent} title={t("toolbar.presentTitle")}>{t("toolbar.present")}</button>
        <details className="toolbar-more toolbar-mobile-only">
          <summary className="btn btn-sm" title={t("toolbar.moreTitle")}>{t("toolbar.more")}</summary>
          <div className="toolbar-more-panel">
            <button type="button" className="btn" disabled={!canUndo || !onUndo} onClick={() => onUndo?.()}>
              {t("toolbar.undo")}
            </button>
            <button type="button" className="btn" disabled={!canRedo || !onRedo} onClick={() => onRedo?.()}>
              {t("toolbar.redo")}
            </button>
            <button type="button" className="btn" onClick={() => void copyLink()}>{t("toolbar.copyLink")}</button>
            <button type="button" className="btn" disabled={busy} onClick={() => fileRef.current?.click()}>{t("toolbar.openFile")}</button>
            <button type="button" className="btn" onClick={onPresent}>{t("toolbar.present")}</button>
          </div>
        </details>
      </div>
      <button
        className={`btn btn-audit${liveCraftIssues.length ? " audit-live-dirty" : ""}`}
        onClick={runCraftAudit}
        title={t("toolbar.auditTitle")}
      >
        {t("toolbar.audit")}
        {liveCraftIssues.length > 0 && (
          <span className={`audit-live-badge${liveCraftErrors ? " has-errors" : ""}`}>
            {liveCraftErrors > 0 ? t("toolbar.badgeErrors", { n: liveCraftErrors }) : ""}
            {liveCraftErrors > 0 && liveCraftWarns > 0 ? "·" : ""}
            {liveCraftWarns > 0 ? t("toolbar.badgeWarnings", { n: liveCraftWarns }) : liveCraftErrors > 0 ? "" : liveCraftIssues.length}
          </span>
        )}
      </button>
      <button
        className="btn btn-sm"
        onClick={runStructuralJudge}
        title={t("toolbar.judgeTitle")}
      >
        {t("toolbar.judge")}
      </button>
      <div className="toolbar-cluster" role="group" aria-label={t("toolbar.exportLabel")}>
        <details className="export-more">
          <summary className="btn btn-sm" title={t("toolbar.sourceTitle")}>{t("toolbar.source")}</summary>
          <div className="export-more-panel">
            <button type="button" className="btn" onClick={() => downloadJson(deck)}>{t("toolbar.downloadJson")}</button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadMarkdown(deck);
                setStatus(t("toolbar.markdownDownloaded"));
              }}
              title={t("toolbar.downloadMdTitle")}
            >
              {t("toolbar.downloadMd")}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => void copyMarkdown()}
              title={t("toolbar.copyMdTitle")}
            >
              {t("toolbar.copyMd")}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadNotesTxt(deck);
                setStatus(t("toolbar.notesTxtDownloaded"));
              }}
              title={t("toolbar.notesTxtTitle")}
            >
              {t("toolbar.notesTxt")}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadNotesVtt(deck);
                setStatus(t("toolbar.notesVttDownloaded"));
              }}
              title={t("toolbar.notesVttTitle")}
            >
              {t("toolbar.notesVtt")}
            </button>
            <button type="button" className="btn" onClick={() => downloadHtml(deck, html)}>{t("toolbar.downloadHtml")}</button>
            <button
              type="button"
              className="btn"
              disabled={busy}
              onClick={() => void exportPdf()}
              title={t("toolbar.downloadPdfTitle")}
            >
              {busy ? "…" : t("toolbar.downloadPdf")}
            </button>
          </div>
        </details>
        <button className="btn btn-primary" disabled={busy} onClick={exportPptx}>
          {busy ? "…" : t("toolbar.downloadPptx")}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".html,.htm,.json,.md,.markdown,.pptx,application/json,text/html,text/markdown,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        hidden
        disabled={busy}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onOpen(f);
          e.target.value = "";
        }}
      />

      {persistenceWarning && (
        <div className="recovery-status">
          <span
            className="status muted small status-warning"
            role="status"
            aria-live="polite"
          >
            {persistenceWarning}
          </span>
          {recoveryText ? (
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                downloadRecoveryText(recoveryText);
                setStatus(t("toolbar.originalDownloaded"));
              }}
            >
              {t("toolbar.downloadOriginal")}
            </button>
          ) : null}
          {recoveryText && recoveryStored && onDiscardRecovery ? (
            <button type="button" className="btn btn-sm" onClick={onDiscardRecovery}>
              {t("toolbar.discardRecovery")}
            </button>
          ) : null}
        </div>
      )}
      {status && (
        <span className="status muted small" role="status" aria-live="polite">
          {status}
        </span>
      )}
      {pendingImport ? (
        <div
          className="import-conflict-actions"
          role="group"
          aria-label={t("toolbar.resolveConflict", { name: pendingImport.fileName })}
        >
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => {
              onChangeRef.current(pendingImport.deck);
              setStatus(pendingImport.successStatus);
              setPendingImport(null);
              importOwnership.invalidate();
            }}
          >
            {t("toolbar.openImported")}
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setStatus(t("toolbar.keptCurrent", { name: pendingImport.fileName }));
              setPendingImport(null);
              importOwnership.invalidate();
            }}
          >
            {t("toolbar.keepCurrent")}
          </button>
        </div>
      ) : null}
      {panelIssues.length > 0 && (
        <details
          className="audit-panel"
          open={auditPanelOpen}
          onToggle={(e) => setAuditPanelOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="btn btn-sm">
            {t("toolbar.issuesHead", {
              n: panelIssues.length,
              err: panelIssues.some((i) => i.severity === "error")
                ? t("toolbar.issuesErr", {
                    n: panelIssues.filter((i) => i.severity === "error").length,
                  })
                : "",
              pptx: pptxWarnings.length
                ? t("toolbar.issuesPptx", { n: pptxWarnings.length })
                : "",
            })}
          </summary>
          <div className="audit-filters">
            {(["all", "error", "warning", "pptx"] as const).map((f) => {
              const count =
                f === "all"
                  ? panelIssues.length
                  : f === "pptx"
                    ? pptxWarnings.length
                    : panelIssues.filter((i) => i.severity === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  className={`btn btn-sm${auditFilter === f ? " audit-filter-active" : ""}`}
                  onClick={() => setAuditFilter(f)}
                >
                  {t(AUDIT_FILTER_KEYS[f], { n: count })}
                </button>
              );
            })}
          </div>
          <ul className="audit-list">
            {panelIssues
              .filter((issue) => {
                if (auditFilter === "all") return true;
                if (auditFilter === "pptx") return issue.message.startsWith("PPTX:");
                return issue.severity === auditFilter;
              })
              .map((issue, i) => {
                const jumpable = typeof issue.slide === "number" && onSelectSlide;
                const canInsert = Boolean(issue.fixId);
                const isPptx = issue.message.startsWith("PPTX:");
                return (
                  <li key={`${issue.severity}-${issue.slide ?? "g"}-${i}`} className={`audit-item audit-${issue.severity}${canInsert ? " audit-item-fixable" : ""}${isPptx ? " audit-item-pptx" : ""}`}>
                    <span className="audit-sev">
                      {isPptx
                        ? t("toolbar.sevPptx")
                        : issue.severity === "error"
                          ? t("toolbar.sevError")
                          : t("toolbar.sevWarning")}
                      {typeof issue.slide === "number"
                        ? t("toolbar.slideShort", { n: issue.slide })
                        : ""}
                    </span>
                    <div className="audit-body">
                      {jumpable ? (
                        <button
                          type="button"
                          className="audit-jump"
                          title={t("toolbar.jumpToSlide", { n: issue.slide ?? 0 })}
                          onClick={() => onSelectSlide(issue.slide!)}
                        >
                          {auditText(issue, t)}
                        </button>
                      ) : (
                        <span>{auditText(issue, t)}</span>
                      )}
                      {canInsert && issue.fixId ? (
                        <button
                          type="button"
                          className="btn btn-sm audit-insert"
                          title={t("toolbar.insertBeatFor", { fix: issue.fixId })}
                          onClick={() => applyIssueBeat(issue.fixId!)}
                        >
                          {issue.fixId === "safe_fields" || issue.fixId === "wrap_tones"
                            ? t("toolbar.applyFix")
                            : t("toolbar.insertBeat")}
                        </button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="audit-actions">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={applySafeCraftFixes}
              title={t("toolbar.applySafeFixesTitle")}
            >
              {t("toolbar.applySafeFixes")}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => applyDensityRemorph("speaker")}
              title={t("toolbar.speakerDensityTitle")}
            >
              {t("toolbar.speakerDensity")}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => applyDensityRemorph("reading")}
              title={t("toolbar.readingDensityTitle")}
            >
              {t("toolbar.readingDensity")}
            </button>
            <button type="button" className="btn btn-sm" onClick={dismissAuditPanel}>
              {t("toolbar.dismiss")}
            </button>
          </div>
        </details>
      )}
    </header>
  );
}
