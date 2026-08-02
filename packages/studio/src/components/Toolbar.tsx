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
import { auditCraft, repairCraft, repairCraftBeat, remorphDensity } from "../craft/auditCraft.js";
import type { CraftFixId } from "../craft/auditCraft.js";
import { ThemeCompareTray, type LiveCompareMode } from "./ThemeCompareTray.js";
import { ThemeCraftShotStrip } from "./ThemeCraftShotStrip.js";
import { CommandPalette, type StudioCommand } from "./CommandPalette.js";
import { studioShareLink } from "../share/shareDeck.js";
import { themeFromBrandCss } from "../brand/pasteBrandTheme.js";
import { registerCustomTheme } from "../render/themes.js";
import { createAsyncOwnership } from "../asyncOwnership.js";
import { createLatestAsyncWriter } from "../latestAsyncWriter.js";

/** Flagship trio for Example browser show-don't-tell (matches site proof strip). */
const FEATURED_EXAMPLE_SLUGS = ["novaspark-pitch", "bounce-launch", "forge-api"] as const;

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
  const [auditIssues, setAuditIssues] = useState<
    Array<{ severity: "error" | "warning"; message: string; slide?: number; fixId?: CraftFixId }>
  >([]);
  const [auditFilter, setAuditFilter] = useState<"all" | "error" | "warning">("all");
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
  useEffect(() => {
    if (liveCraftIssues.length === 0) {
      suppressLivePanel.current = false;
      if (craftPanelOpen.current) {
        setAuditIssues([]);
        craftPanelOpen.current = false;
      }
      return;
    }
    if (suppressLivePanel.current) return;
    craftPanelOpen.current = true;
    setAuditIssues(liveCraftIssues);
    setAuditPanelOpen(true);
    if (liveCraftErrors > 0) {
      setAuditFilter((f) => (f === "warning" ? "all" : f));
    }
  }, [liveCraftIssues, liveCraftErrors]);

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
        ? `Theme → ${name} · ${fixes.length} craft fix${fixes.length === 1 ? "" : "es"}`
        : `Theme → ${name}`
    );
  };
  const setTitle = (t: string) => setMeta({ title: t });

  const onOpen = async (file: File) => {
    try {
      assertStudioImportFileSize(file);
    } catch (err) {
      setStatus(`Open failed: ${(err as Error).message}`);
      return;
    }

    const ticket = importOwnership.begin(deckRef.current);
    setPendingImport(null);
    setBusy(true);
    setStatus(/\.pptx$/i.test(file.name) ? "Importing .pptx…" : `Opening ${file.name}…`);
    try {
      let opened: DeckJson;
      let successStatus: string;
      if (/\.pptx$/i.test(file.name)) {
        const result = await importPptxFile(await file.arrayBuffer(), theme);
        opened = result.deck;
        successStatus = result.warnings.length
          ? `Imported ${file.name} (${result.warnings.length} warning${result.warnings.length > 1 ? "s" : ""})`
          : `Imported ${file.name}`;
      } else {
        opened = parseDeckFile(file.name, await file.text(), theme);
        successStatus = /\.(md|markdown)$/i.test(file.name)
          ? `Imported Markdown → ${opened.slides.length} slides (${opened.meta?.theme ?? theme})`
          : `Opened ${file.name}`;
      }

      const decision = importOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setPendingImport({ deck: opened, fileName: file.name, successStatus });
        setStatus(`Import ready — current deck changed while opening ${file.name}`);
        return;
      }
      onChangeRef.current(opened);
      setStatus(successStatus);
    } catch (err) {
      if (importOwnership.classify(ticket, deckRef.current) === "stale") return;
      setStatus(`Open failed: ${(err as Error).message}`);
    } finally {
      if (importOwnership.classify(ticket, deckRef.current) !== "stale") setBusy(false);
    }
  };

  const exportPptx = async () => {
    const snapshot = deckRef.current;
    const snapshotCraftIssues = liveCraftIssues;
    const ticket = exportOwnership.begin(snapshot);
    setBusy(true);
    setStatus("Building .pptx…");
    try {
      const { warnings } = await downloadPptx(snapshot);
      const decision = exportOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus("Exported .pptx for an earlier deck revision — current edits were not included");
        return;
      }
      const exportIssues = warnings.map((message) => ({
        severity: "warning" as const,
        message: `PPTX: ${message}`,
      }));
      const merged = [...exportIssues, ...snapshotCraftIssues];
      if (merged.length) {
        // Keep craft ownership so deck edits still refresh the panel; export warns lead.
        craftPanelOpen.current = true;
        setAuditIssues(merged);
        setAuditPanelOpen(true);
        setStatus(
          warnings.length
            ? `Exported .pptx (${warnings.length} warning${warnings.length > 1 ? "s" : ""}) — see list`
            : `Exported .pptx (${snapshotCraftIssues.length} craft issue${snapshotCraftIssues.length > 1 ? "s" : ""})`
        );
      } else {
        setStatus("Exported .pptx");
      }
    } catch (err) {
      const decision = exportOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      setStatus(
        decision === "conflict"
          ? `PPTX export of an earlier deck revision failed: ${(err as Error).message}`
          : `Export failed: ${(err as Error).message}`
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
      craftPanelOpen.current = false;
      setStatus("Craft audit clean");
      return;
    }
    setStatus(
      `Craft audit: ${errors.length} error${errors.length === 1 ? "" : "s"}, ${warns.length} warning${warns.length === 1 ? "" : "s"}`
    );
  };

  const dismissAuditPanel = () => {
    setAuditIssues([]);
    craftPanelOpen.current = false;
    if (liveCraftIssues.length > 0) suppressLivePanel.current = true;
  };

  const applySafeCraftFixes = () => {
    const { deck: repaired, fixes } = repairCraft(deck);
    if (!fixes.length) {
      setStatus("No safe craft fixes needed");
      return;
    }
    onChange(repaired as DeckJson);
    const issues = auditCraft(repaired);
    setAuditIssues(issues);
    setAuditFilter("all");
    setAuditPanelOpen(issues.length > 0);
    craftPanelOpen.current = issues.length > 0;
    suppressLivePanel.current = false;
    setStatus(
      issues.length
        ? `Applied ${fixes.length} craft fix${fixes.length === 1 ? "" : "es"} · ${issues.length} issue${issues.length === 1 ? "" : "s"} remain`
        : `Applied ${fixes.length} craft fix${fixes.length === 1 ? "" : "es"} · craft clean`
    );
  };

  const applyDensityRemorph = (mode: "speaker" | "reading") => {
    const { deck: remorphed, changes } = remorphDensity(deck as unknown as Record<string, unknown>, mode);
    if (!changes.length) {
      setStatus(`Density already ${mode}`);
      return;
    }
    onChange(remorphed as DeckJson);
    const issues = auditCraft(remorphed);
    setAuditIssues(issues);
    setAuditFilter("all");
    setAuditPanelOpen(issues.length > 0);
    craftPanelOpen.current = issues.length > 0;
    suppressLivePanel.current = false;
    setStatus(
      issues.length
        ? `Remorphed ${mode} · ${changes.length} change${changes.length === 1 ? "" : "s"} · ${issues.length} issue${issues.length === 1 ? "" : "s"} remain`
        : `Remorphed ${mode} · ${changes.length} change${changes.length === 1 ? "" : "s"} · craft clean`
    );
  };

  const applyIssueBeat = (fixId: CraftFixId) => {
    const { deck: repaired, fixes } = repairCraftBeat(deck, fixId);
    if (!fixes.length) {
      setStatus("Beat already present — nothing to insert");
      return;
    }
    onChange(repaired as DeckJson);
    const issues = auditCraft(repaired);
    setAuditIssues(issues);
    setAuditFilter("all");
    setAuditPanelOpen(issues.length > 0);
    craftPanelOpen.current = issues.length > 0;
    suppressLivePanel.current = false;
    setStatus(
      issues.length
        ? `Inserted beat · ${issues.length} issue${issues.length === 1 ? "" : "s"} remain`
        : `Inserted beat · craft clean`
    );
  };

  const exportPdf = async () => {
    const snapshot = deckRef.current;
    const snapshotHtml = html;
    const ticket = exportOwnership.begin(snapshot);
    setBusy(true);
    setStatus("Building PDF…");
    try {
      const { mode } = await downloadPdf(snapshot, snapshotHtml);
      const decision = exportOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus("Downloaded PDF for an earlier deck revision — current edits were not included");
        return;
      }
      if (mode === "headless") {
        setStatus("Downloaded PDF (vector · headless Chromium)");
      } else if (mode === "client") {
        setStatus("Downloaded PDF (client raster · 16:9 pages)");
      } else {
        setStatus("Print dialog — Save as PDF (16:9 print CSS fallback)");
      }
    } catch (err) {
      try {
        printDeckPdf(snapshot, snapshotHtml);
        const decision = exportOwnership.classify(ticket, deckRef.current);
        if (decision === "stale") return;
        setStatus(
          decision === "conflict"
            ? "Opened the PDF print fallback for an earlier deck revision — current edits were not included"
            : `PDF blob failed (${(err as Error).message}) — use Save as PDF in the print dialog`
        );
      } catch (printErr) {
        const decision = exportOwnership.classify(ticket, deckRef.current);
        if (decision === "stale") return;
        setStatus(
          decision === "conflict"
            ? `PDF export of an earlier deck revision failed: ${(printErr as Error).message}`
            : `Download PDF failed: ${(printErr as Error).message}`
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
          ? "Copied link for an earlier deck revision — current edits were not included"
          : "Copied shareable deck link"
      );
    } catch (err) {
      const decision = clipboardOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      // Oversized / compress failure — do NOT copy a curated example (mis-share trap).
      setStatus(
        decision === "conflict"
          ? `Copy link for an earlier deck revision failed: ${(err as Error).message}`
          : `${(err as Error).message} — use Source ▾ → Download JSON instead`
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
          ? "Copied Markdown for an earlier deck revision — current edits were not included"
          : "Copied Markdown to clipboard"
      );
    } catch (err) {
      const decision = clipboardOwnership.classify(ticket, deckRef.current);
      if (decision === "stale") return;
      setStatus(
        decision === "conflict"
          ? `Copy Markdown for an earlier deck revision failed: ${(err as Error).message}`
          : `Copy Markdown failed: ${(err as Error).message}`
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
        `Pasted Markdown → ${opened.slides.length} slides (${opened.meta?.theme ?? theme})`
      );
    } catch (err) {
      setStatus(`Paste Markdown failed: ${(err as Error).message}`);
    }
  };

  const pasteMdFromClipboard = async () => {
    const ticket = markdownReadOwnership.begin(pasteMdRef.current);
    try {
      const text = await navigator.clipboard.readText();
      const decision = markdownReadOwnership.classify(ticket, pasteMdRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus("Clipboard Markdown not applied — field changed while reading");
        return;
      }
      if (!text.trim()) {
        setStatus("Clipboard is empty — paste Marp/md-slides Markdown into the box");
        return;
      }
      setPasteMd(text);
      setPasteMdOpen(true);
      setStatus("Clipboard Markdown loaded — Apply to convert");
    } catch (err) {
      if (markdownReadOwnership.classify(ticket, pasteMdRef.current) === "stale") return;
      setStatus(`Clipboard read failed: ${(err as Error).message}`);
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
        adjustments.length > 0
          ? ` · ${adjustments.length} contrast tweak${adjustments.length === 1 ? "" : "s"}`
          : "";
      const fail =
        stillFailing.length > 0 ? ` · still weak: ${stillFailing.slice(0, 2).join(", ")}` : "";
      setStatus(`Brand CSS → theme "${name}"${adj}${fail}`);
    } catch (err) {
      setStatus(`Brand CSS failed: ${(err as Error).message}`);
    }
  };

  const pasteBrandFromClipboard = async () => {
    const ticket = brandCssReadOwnership.begin(pasteBrandCssRef.current);
    try {
      const text = await navigator.clipboard.readText();
      const decision = brandCssReadOwnership.classify(ticket, pasteBrandCssRef.current);
      if (decision === "stale") return;
      if (decision === "conflict") {
        setStatus("Clipboard CSS not applied — field changed while reading");
        return;
      }
      if (!text.trim()) {
        setStatus("Clipboard is empty — paste :root CSS variables into the box");
        return;
      }
      setPasteBrandCss(text);
      setPasteBrandOpen(true);
      setStatus("Clipboard CSS loaded — Apply to register theme");
    } catch (err) {
      if (brandCssReadOwnership.classify(ticket, pasteBrandCssRef.current) === "stale") return;
      setStatus(`Clipboard read failed: ${(err as Error).message}`);
    }
  };

  const studioCommands = useMemo<StudioCommand[]>(
    () => [
      { id: "present", label: "Present", hint: "Fullscreen", keywords: "slideshow play", run: onPresent },
      { id: "generate", label: "Generate deck", hint: "Prompt", keywords: "ai craft", run: onGenerate },
      { id: "audit", label: "Audit craft", keywords: "gates judge craft", run: runCraftAudit },
      {
        id: "fix",
        label: "Apply safe craft fixes",
        keywords: "repair beats",
        run: applySafeCraftFixes,
      },
      {
        id: "density-speaker",
        label: "Speaker density remorph",
        keywords: "remorph split notes",
        run: () => applyDensityRemorph("speaker"),
      },
      {
        id: "density-reading",
        label: "Reading density remorph",
        keywords: "remorph merge notes",
        run: () => applyDensityRemorph("reading"),
      },
      { id: "copy-link", label: "Copy share link", keywords: "url share ?d=", run: () => void copyLink() },
      {
        id: "copy-md",
        label: "Copy Markdown",
        keywords: "marp md",
        run: () => void copyMarkdown(),
      },
      {
        id: "dl-html",
        label: "Download HTML",
        keywords: "export",
        run: () => downloadHtml(deck, html),
      },
      {
        id: "dl-md",
        label: "Download Markdown",
        keywords: "export marp",
        run: () => downloadMarkdown(deck),
      },
      {
        id: "dl-pdf",
        label: "Download PDF",
        keywords: "export print",
        run: () => void exportPdf(),
      },
      {
        id: "dl-pptx",
        label: "Download PowerPoint",
        keywords: "export pptx",
        run: () => void exportPptx(),
      },
      {
        id: "dl-json",
        label: "Download Deck JSON",
        keywords: "export source",
        run: () => downloadJson(deck),
      },
      {
        id: "dl-notes-txt",
        label: "Download notes TXT",
        keywords: "handout speaker",
        run: () => downloadNotesTxt(deck),
      },
      {
        id: "dl-notes-vtt",
        label: "Download notes VTT",
        keywords: "handout captions",
        run: () => downloadNotesVtt(deck),
      },
      {
        id: "undo",
        label: "Undo",
        hint: "⌘Z",
        keywords: "history",
        run: () => onUndo?.(),
      },
      {
        id: "redo",
        label: "Redo",
        hint: "⇧⌘Z",
        keywords: "history",
        run: () => onRedo?.(),
      },
    ],
    // Handlers close over latest deck/html; rebuild when those change.
    [deck, html, onPresent, onGenerate, onUndo, onRedo]
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
        <span className="muted small">Studio · live craft</span>
      </div>

      <input
        className="text-input title-input"
        value={deck.meta?.title ?? ""}
        placeholder="Deck title"
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
        <summary className="btn btn-sm theme-trigger" title="Browse themes (mood + shortlists + pick-3 compare)">
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
            placeholder="Search themes…"
            autoFocus
            onChange={(e) => setThemeQuery(e.target.value)}
          />
          <div className="theme-mood-row" role="toolbar" aria-label="Filter themes by mood">
            <span className="theme-filter-label">Browse</span>
            {THEME_BROWSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${moodFilter === f.id ? " active" : ""}`}
                aria-pressed={moodFilter === f.id}
                onClick={() => setMoodFilter(f.id)}
                title={
                  f.id === "all"
                    ? "Show all themes"
                    : f.id === "popular"
                      ? "Flagship / discovery-popular themes"
                      : `Filter by ${f.label.toLowerCase()} mood`
                }
              >
                {f.id === "all" ? `All ${themes.length}` : f.label}
              </button>
            ))}
          </div>
          <div className="theme-shortlist-row" role="listbox" aria-label="Theme shortlists">
            <button
              type="button"
              className={`chip${shortlistId === "" ? " active" : ""}`}
              onClick={() => setShortlistId("")}
              title="Show all themes"
            >
              Shortlists
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
              {filtered.length} / {themes.length} themes
              {moodFilter !== "all" ? ` · ${moodFilter}` : ""}
              {activeShortlist ? ` · ${activeShortlist.id}` : ""}
              {compare.length ? ` · compare ${compare.length}/${COMPARE_LIMIT}` : " · ⊕ to compare"}
            </span>
            <button
              type="button"
              className="chip"
              disabled={filtered.length === 0}
              title="Fill pick-3 with a safe + bold + wildcard mix from the current browse filter"
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
              Compare 3
            </button>
          </div>
          <ul className="theme-list">
            {filtered.map((t) => {
              const inCompare = compare.includes(t.name);
              return (
                <li key={t.name}>
                  <div className={`theme-option-row${t.name === theme ? " active" : ""}${inCompare ? " in-compare" : ""}`}>
                    <button
                      type="button"
                      className={`theme-option${t.name === theme ? " active" : ""}`}
                      onClick={(e) => {
                        applyThemeWithRepair(t.name);
                        const details = (e.currentTarget as HTMLElement).closest("details");
                        if (details) details.open = false;
                      }}
                    >
                      <span
                        className="theme-swatch"
                        style={{ ["--swatch-bg" as string]: t.bg, ["--swatch-accent" as string]: t.accent }}
                        aria-hidden
                      />
                      <span className="theme-option-meta">
                        <span className="theme-option-name">{t.name}</span>
                        <span className="theme-option-vibe">{t.vibe}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`theme-compare-toggle${inCompare ? " active" : ""}`}
                      title={
                        inCompare
                          ? `Remove ${t.name} from compare`
                          : `Add ${t.name} to pick-${COMPARE_LIMIT} compare`
                      }
                      aria-pressed={inCompare}
                      onClick={() =>
                        setCompare((prev) => {
                          const next = toggleCompareSlot(prev, t.name);
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
        <summary className="btn btn-sm">Details</summary>
        <div className="deck-details-body">
          <input
            className="text-input"
            value={deck.meta?.company ?? ""}
            placeholder="Company"
            onChange={(e) => setMeta({ company: e.target.value })}
          />
          <input
            className="text-input"
            value={deck.meta?.description ?? ""}
            placeholder="Description"
            onChange={(e) => setMeta({ description: e.target.value })}
          />
        </div>
      </details>

      <div className="spacer" />

      <button
        type="button"
        className="btn toolbar-desktop-only"
        title="Command palette (⌘K / Ctrl+K)"
        onClick={() => setCommandOpen(true)}
      >
        ⌘K
      </button>
      <button className="btn btn-generate" onClick={onGenerate} title="Generate a deck from a prompt">Generate</button>
      <details
        className="example-browser"
        onToggle={(e) => setExampleOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary className="btn" title="Load a curated example deck">Example ▾</summary>
        <div className="example-browser-panel">
          <div className="example-featured-head">
            <span className="example-featured-label">Featured craft · Title / Bento / Compare</span>
            <button
              type="button"
              className="chip"
              title="Fill theme Compare tray with these three flagship themes (live shot strip)"
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
              Compare 3 themes
            </button>
          </div>
          <div className="example-featured" aria-label="Featured craft examples">
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
                      title={`${ex.label} craft preview`}
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
            Shared iframe shot strip (Title / Bento / Compare scroll-crop) · click a card to load ·
            Compare 3 themes jumps to live theme tray
          </p>
          <p className="example-list-label">All examples</p>
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
      <div className="toolbar-secondary" role="group" aria-label="Deck actions">
        <button
          type="button"
          className="btn btn-icon toolbar-desktop-only"
          disabled={!canUndo || !onUndo}
          onClick={() => onUndo?.()}
          title="Undo (⌘Z / Ctrl+Z)"
          aria-label="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          className="btn btn-icon toolbar-desktop-only"
          disabled={!canRedo || !onRedo}
          onClick={() => onRedo?.()}
          title="Redo (⇧⌘Z / Ctrl+Y)"
          aria-label="Redo"
        >
          ↷
        </button>
        <button
          className="btn toolbar-desktop-only"
          onClick={() => void copyLink()}
          title="Copy a shareable Studio link that restores this editable deck (?d= compressed JSON)"
        >
          Copy link
        </button>
        <button
          className="btn toolbar-desktop-only"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          title="Open Deck JSON, rendered HTML, PowerPoint (.pptx), or Marp/md-slides Markdown (.md)"
        >
          Open
        </button>
        <details
          className="paste-md"
          open={pasteMdOpen}
          onToggle={(e) => setPasteMdOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary
            className="btn"
            title="Paste Marp / md-slides Markdown → Deck JSON (no file picker)"
          >
            Paste MD
          </summary>
          <div className="paste-md-panel" role="dialog" aria-label="Paste Markdown">
            <p className="muted small" style={{ margin: 0 }}>
              Marp / md-slides outline → structured Deck JSON. Same path as Open .md and MCP{" "}
              <code>import_markdown</code>.
            </p>
            <textarea
              className="text-input paste-md-input"
              rows={10}
              value={pasteMd}
              placeholder={"---\ntitle: My deck\ntheme: neon-noir\n---\n\n# Title\n\nLead…\n\n---\n\n## Next slide\n\n- Point one\n- Point two"}
              onChange={(e) => setPasteMd(e.target.value)}
              aria-label="Markdown outline"
            />
            <div className="paste-md-actions">
              <button
                type="button"
                className="btn"
                onClick={() => void pasteMdFromClipboard()}
                title="Load Markdown from the system clipboard"
              >
                From clipboard
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!pasteMd.trim()}
                onClick={() => applyPastedMarkdown(pasteMd)}
              >
                Apply
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
            title="Paste brand CSS (:root vars) → ephemeral Studio theme (import_brand_theme parity)"
          >
            Paste Brand
          </summary>
          <div className="paste-md-panel paste-brand-panel" role="dialog" aria-label="Paste brand theme">
            <p className="muted small" style={{ margin: 0 }}>
              Extract colors/fonts from <code>:root</code> CSS → session theme. Same extraction as MCP{" "}
              <code>import_brand_theme</code> / <code>--from-css</code>, without scaffolding a package.
            </p>
            <label className="inline-field">
              <span className="muted small">Theme name</span>
              <input
                className="text-input"
                value={pasteBrandName}
                onChange={(e) => setPasteBrandName(e.target.value)}
                aria-label="Brand theme name"
                placeholder="brand-paste"
              />
            </label>
            <textarea
              className="text-input paste-md-input"
              rows={8}
              value={pasteBrandCss}
              placeholder={":root {\n  --bg: #0a0a0a;\n  --text: #fafafa;\n  --accent: #22c55e;\n}\nbody { font-family: Inter, sans-serif; }\nh1 { font-family: \"Space Grotesk\", sans-serif; }"}
              onChange={(e) => setPasteBrandCss(e.target.value)}
              aria-label="Brand stylesheet"
            />
            <div className="paste-md-actions">
              <button
                type="button"
                className="btn"
                onClick={() => void pasteBrandFromClipboard()}
                title="Load CSS from the system clipboard"
              >
                From clipboard
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!pasteBrandCss.trim()}
                onClick={applyPastedBrandCss}
              >
                Apply theme
              </button>
            </div>
          </div>
        </details>
        <button className="btn toolbar-desktop-only" onClick={onPresent} title="Present fullscreen">Present</button>
        <details className="toolbar-more toolbar-mobile-only">
          <summary className="btn btn-sm" title="More deck actions">More ▾</summary>
          <div className="toolbar-more-panel">
            <button type="button" className="btn" disabled={!canUndo || !onUndo} onClick={() => onUndo?.()}>
              Undo
            </button>
            <button type="button" className="btn" disabled={!canRedo || !onRedo} onClick={() => onRedo?.()}>
              Redo
            </button>
            <button type="button" className="btn" onClick={() => void copyLink()}>Copy link</button>
            <button type="button" className="btn" disabled={busy} onClick={() => fileRef.current?.click()}>Open file</button>
            <button type="button" className="btn" onClick={onPresent}>Present</button>
          </div>
        </details>
      </div>
      <button
        className={`btn btn-audit${liveCraftIssues.length ? " audit-live-dirty" : ""}`}
        onClick={runCraftAudit}
        title="Run craft gates. Panel auto-opens on live errors and refreshes as you edit."
      >
        Audit craft
        {liveCraftIssues.length > 0 && (
          <span className={`audit-live-badge${liveCraftErrors ? " has-errors" : ""}`}>
            {liveCraftErrors > 0 ? `${liveCraftErrors}E` : ""}
            {liveCraftErrors > 0 && liveCraftWarns > 0 ? "·" : ""}
            {liveCraftWarns > 0 ? `${liveCraftWarns}W` : liveCraftErrors > 0 ? "" : liveCraftIssues.length}
          </span>
        )}
      </button>
      <div className="toolbar-cluster" role="group" aria-label="Export">
        <details className="export-more">
          <summary className="btn btn-sm" title="Download Deck JSON, HTML, or PDF">Source ▾</summary>
          <div className="export-more-panel">
            <button type="button" className="btn" onClick={() => downloadJson(deck)}>Download JSON</button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadMarkdown(deck);
                setStatus("Downloaded Markdown (Marp / md-slides round-trip)");
              }}
              title="Export Marp/md-slides Markdown — re-open via Open .md or Paste MD"
            >
              Download Markdown
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => void copyMarkdown()}
              title="Copy Marp/md-slides Markdown to the clipboard"
            >
              Copy Markdown
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadNotesTxt(deck);
                setStatus("Downloaded speaker-notes handout (.txt)");
              }}
              title="Plain-text speaker notes handout — one block per slide"
            >
              Download notes TXT
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                downloadNotesVtt(deck);
                setStatus("Downloaded speaker-notes handout (.vtt)");
              }}
              title="WebVTT cues from speaker notes — chapter-style handout"
            >
              Download notes VTT
            </button>
            <button type="button" className="btn" onClick={() => downloadHtml(deck, html)}>Download HTML</button>
            <button
              type="button"
              className="btn"
              disabled={busy}
              onClick={() => void exportPdf()}
              title="Downloads a .pdf blob — local Studio uses headless Chromium (MCP/CLI parity); static hosts use client raster; print dialog is last-resort fallback"
            >
              {busy ? "…" : "Download PDF"}
            </button>
          </div>
        </details>
        <button className="btn btn-primary" disabled={busy} onClick={exportPptx}>
          {busy ? "…" : "Download .pptx"}
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
                setStatus("Downloaded original saved bytes");
              }}
            >
              Download original saved bytes
            </button>
          ) : null}
          {recoveryText && recoveryStored && onDiscardRecovery ? (
            <button type="button" className="btn btn-sm" onClick={onDiscardRecovery}>
              Discard recovery
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
          aria-label={`Resolve import conflict for ${pendingImport.fileName}`}
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
            Open imported deck
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setStatus(`Kept current deck — ignored ${pendingImport.fileName}`);
              setPendingImport(null);
              importOwnership.invalidate();
            }}
          >
            Keep current
          </button>
        </div>
      ) : null}
      {auditIssues.length > 0 && (
        <details
          className="audit-panel"
          open={auditPanelOpen}
          onToggle={(e) => setAuditPanelOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="btn btn-sm">
            Issues ({auditIssues.length}
            {auditIssues.some((i) => i.severity === "error")
              ? ` · ${auditIssues.filter((i) => i.severity === "error").length} err`
              : ""}
            )
          </summary>
          <div className="audit-filters">
            {(["all", "error", "warning"] as const).map((f) => {
              const count =
                f === "all" ? auditIssues.length : auditIssues.filter((i) => i.severity === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  className={`btn btn-sm${auditFilter === f ? " audit-filter-active" : ""}`}
                  onClick={() => setAuditFilter(f)}
                >
                  {f} ({count})
                </button>
              );
            })}
          </div>
          <ul className="audit-list">
            {auditIssues
              .filter((issue) => auditFilter === "all" || issue.severity === auditFilter)
              .map((issue, i) => {
                const jumpable = typeof issue.slide === "number" && onSelectSlide;
                const canInsert = Boolean(issue.fixId);
                return (
                  <li key={`${issue.severity}-${issue.slide ?? "g"}-${i}`} className={`audit-item audit-${issue.severity}${canInsert ? " audit-item-fixable" : ""}`}>
                    <span className="audit-sev">
                      {issue.severity}
                      {typeof issue.slide === "number" ? ` · s${issue.slide}` : ""}
                    </span>
                    <div className="audit-body">
                      {jumpable ? (
                        <button
                          type="button"
                          className="audit-jump"
                          title={`Jump to slide ${issue.slide}`}
                          onClick={() => onSelectSlide(issue.slide!)}
                        >
                          {issue.message}
                        </button>
                      ) : (
                        <span>{issue.message}</span>
                      )}
                      {canInsert && issue.fixId ? (
                        <button
                          type="button"
                          className="btn btn-sm audit-insert"
                          title={`Insert beat for: ${issue.fixId}`}
                          onClick={() => applyIssueBeat(issue.fixId!)}
                        >
                          {issue.fixId === "safe_fields" || issue.fixId === "wrap_tones"
                            ? "Apply fix"
                            : "Insert beat"}
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
              title="Apply safe craft fixes (fields + beat inserts: image-hero, comparison, data, logo-wall, wrap tones) — same as MCP audit_deck apply_safe_fixes"
            >
              Apply safe fixes
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => applyDensityRemorph("speaker")}
              title="Non-LLM speaker density: split crowded grids/lists and move overflow body into notes (MCP remorph_density)"
            >
              Speaker density
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => applyDensityRemorph("reading")}
              title="Non-LLM reading density: merge thin continuation lists and promote notes onto thin bodies (MCP remorph_density)"
            >
              Reading density
            </button>
            <button type="button" className="btn btn-sm" onClick={dismissAuditPanel}>
              Dismiss
            </button>
          </div>
        </details>
      )}
    </header>
  );
}
