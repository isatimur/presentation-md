import type { Slide, Card, Stat, Step, ChartSeries } from "@presentation-md/export";
import { LAYOUT_LABELS } from "../deck.js";
import type { LayoutType } from "../deck.js";
import { TextInput, TextArea, StringSelect, ListEditor } from "./fields.js";

export function SlideForm({
  slide,
  onChange,
}: {
  slide: Slide;
  onChange: (next: Slide) => void;
}) {
  const set = (patch: Partial<Slide>) => onChange({ ...slide, ...patch });
  const layout = slide.layout as LayoutType;

  return (
    <div className="slide-form">
      <h2 className="panel-title">{LAYOUT_LABELS[layout] ?? slide.layout}</h2>
      {renderFields()}
      <TextArea
        label="Speaker notes (exports to PPTX notes pane)"
        value={slide.notes}
        onChange={(v) => set({ notes: v || undefined })}
        rows={3}
      />
    </div>
  );

  function renderFields() {
    switch (slide.layout) {
      case "title":
      case "closing":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label="Lead" value={slide.lead} onChange={(v) => set({ lead: v })} />
            {slide.layout === "closing" && (
              <>
                <TextInput label="CTA label" value={slide.cta?.label} onChange={(v) => set({ cta: { ...slide.cta, label: v } })} />
                <TextInput label="CTA link" value={slide.cta?.href} onChange={(v) => set({ cta: { ...slide.cta, href: v } })} />
              </>
            )}
          </>
        );

      case "section":
        return (
          <>
            <TextInput label="Number" value={slide.number} onChange={(v) => set({ number: v })} />
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label="Lead" value={slide.lead} onChange={(v) => set({ lead: v })} />
          </>
        );

      case "two-column":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label="Body" value={slide.body} onChange={(v) => set({ body: v })} rows={5} />
            <StringSelect
              label="Ratio"
              value={typeof slide.ratio === "string" ? slide.ratio : "1-1"}
              options={[
                { value: "1-1", label: "1:1 balanced" },
                { value: "2-1", label: "2:1 copy-heavy" },
                { value: "1-2", label: "1:2 media-heavy" },
                { value: "3-2", label: "3:2" },
                { value: "2-3", label: "2:3" },
              ]}
              onChange={(v) => set({ ratio: v })}
            />
            <StringSelect
              label="Media side"
              value={slide.reverse ? "left" : "right"}
              options={[
                { value: "right", label: "Media on right" },
                { value: "left", label: "Media on left (reverse)" },
              ]}
              onChange={(v) => set({ reverse: v === "left" })}
            />
            <TextInput label="Image URL (remote images prefetched into PPTX)" value={slide.image} onChange={(v) => set({ image: v })} />
            <TextInput label="Image alt" value={slide.imageAlt} onChange={(v) => set({ imageAlt: v })} />
            <TextArea label="Aside (when no image)" value={slide.aside} onChange={(v) => set({ aside: v })} rows={3} />
          </>
        );

      case "image-hero":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label="Lead" value={slide.lead} onChange={(v) => set({ lead: v })} rows={3} />
            <TextInput label="Image URL (remote images prefetched into PPTX)" value={slide.image} onChange={(v) => set({ image: v })} />
            <TextInput label="Image alt" value={slide.imageAlt} onChange={(v) => set({ imageAlt: v })} />
          </>
        );

      case "comparison":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextInput label="Left label" value={slide.leftLabel} onChange={(v) => set({ leftLabel: v })} />
            <TextArea label="Left body" value={slide.left} onChange={(v) => set({ left: v })} rows={4} />
            <TextInput label="Right label" value={slide.rightLabel} onChange={(v) => set({ rightLabel: v })} />
            <TextArea label="Right body" value={slide.right} onChange={(v) => set({ right: v })} rows={4} />
            <StringSelect
              label="Emphasis"
              value={slide.emphasis === "left" || slide.emphasis === "right" ? slide.emphasis : "right"}
              options={[
                { value: "left", label: "Grow left" },
                { value: "right", label: "Grow right" },
              ]}
              onChange={(v) => set({ emphasis: v })}
            />
          </>
        );

      case "code":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextInput label="Filename" value={slide.filename} onChange={(v) => set({ filename: v })} />
            <TextInput label="Language" value={slide.language} onChange={(v) => set({ language: v })} />
            <TextArea label="Code" value={slide.code} onChange={(v) => set({ code: v })} rows={8} />
          </>
        );

      case "quote":
        return (
          <>
            <TextArea label="Quote" value={slide.quote} onChange={(v) => set({ quote: v })} rows={4} />
            <TextInput label="Attribution" value={slide.by} onChange={(v) => set({ by: v })} />
          </>
        );

      case "feature-grid":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <StringSelect
              label="Columns"
              value={
                slide.columns === "bento"
                  ? "bento"
                  : String(typeof slide.columns === "number" ? slide.columns : 3)
              }
              options={[
                { value: "2", label: "2 columns" },
                { value: "3", label: "3 columns" },
                { value: "4", label: "4 columns" },
                { value: "bento", label: "Bento (hero + satellites)" },
              ]}
              onChange={(v) => set({ columns: v === "bento" ? "bento" : Number(v) })}
            />
            <ListEditor<Card>
              label="Cards"
              items={slide.cards ?? []}
              onChange={(cards) => set({ cards })}
              blank={() => ({ title: "New card", body: "" })}
              renderItem={(card, setItem) => (
                <>
                  <TextInput label="Icon (FontAwesome class)" value={card.icon} onChange={(v) => setItem({ ...card, icon: v })} />
                  <TextInput label="Title" value={card.title} onChange={(v) => setItem({ ...card, title: v })} />
                  <TextArea label="Body" value={card.body} onChange={(v) => setItem({ ...card, body: v })} rows={2} />
                </>
              )}
            />
          </>
        );

      case "stat-row":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <ListEditor<Stat>
              label="Stats"
              items={slide.stats ?? []}
              onChange={(stats) => set({ stats })}
              blank={() => ({ value: "0", label: "Metric" })}
              renderItem={(stat, setItem) => (
                <>
                  <TextInput label="Value" value={stat.value} onChange={(v) => setItem({ ...stat, value: v })} />
                  <TextInput label="Label" value={stat.label} onChange={(v) => setItem({ ...stat, label: v })} />
                </>
              )}
            />
          </>
        );

      case "chart":
        return <ChartFields slide={slide} set={set} />;

      case "custom-html":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label="Lead" value={slide.lead} onChange={(v) => set({ lead: v })} />
            <TextArea
              label="HTML fragment (scripts stripped on render)"
              value={slide.html}
              onChange={(v) => set({ html: v })}
              rows={10}
            />
          </>
        );

      case "timeline":
        return (
          <>
            <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
            <ListEditor<Step>
              label="Steps"
              items={slide.steps ?? []}
              onChange={(steps) => set({ steps })}
              blank={() => ({ title: "New step", body: "" })}
              renderItem={(step, setItem) => (
                <>
                  <TextInput label="Title" value={step.title} onChange={(v) => setItem({ ...step, title: v })} />
                  <TextArea label="Body" value={step.body} onChange={(v) => setItem({ ...step, body: v })} rows={2} />
                </>
              )}
            />
          </>
        );

      case "data-table":
        return <DataTableFields slide={slide} set={set} />;

      default:
        return <p className="muted">No editable fields for this layout.</p>;
    }
  }
}

function DataTableFields({ slide, set }: { slide: Slide; set: (patch: Partial<Slide>) => void }) {
  const headers: string[] = Array.isArray(slide.columns) ? slide.columns : [];
  const rows: string[][] = Array.isArray(slide.rows) ? slide.rows : [];
  const colCount = Math.max(headers.length, ...rows.map((r) => r.length), 1);

  const setHeader = (i: number, v: string) => {
    const next = headers.slice();
    next[i] = v;
    set({ columns: next });
  };
  const addColumn = () => {
    set({ columns: [...headers, `Column ${headers.length + 1}`], rows: rows.map((r) => [...r, ""]) });
  };
  const removeColumn = (i: number) => {
    set({ columns: headers.filter((_, idx) => idx !== i), rows: rows.map((r) => r.filter((_, idx) => idx !== i)) });
  };

  return (
    <>
      <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
      <div className="list-editor">
        <div className="list-editor-head">
          <span className="field-label">Columns</span>
          <button className="btn btn-sm" onClick={addColumn}>+ Column</button>
        </div>
        {Array.from({ length: colCount }).map((_, i) => (
          <div className="row-inline" key={i}>
            <input
              className="text-input"
              value={headers[i] ?? ""}
              placeholder={`Column ${i + 1}`}
              onChange={(e) => setHeader(i, e.target.value)}
            />
            <button className="btn btn-icon btn-danger" title="Remove column" onClick={() => removeColumn(i)}>✕</button>
          </div>
        ))}
      </div>
      <ListEditor<string[]>
        label="Rows"
        items={rows}
        onChange={(next) => set({ rows: next })}
        blank={() => Array.from({ length: colCount }, () => "")}
        renderItem={(row, setItem) => (
          <div className="row-cells">
            {Array.from({ length: colCount }).map((_, c) => (
              <input
                key={c}
                className="text-input"
                value={row[c] ?? ""}
                placeholder={headers[c] ?? `Col ${c + 1}`}
                onChange={(e) => {
                  const next = row.slice();
                  while (next.length < colCount) next.push("");
                  next[c] = e.target.value;
                  setItem(next);
                }}
              />
            ))}
          </div>
        )}
      />
    </>
  );
}

function ChartFields({ slide, set }: { slide: Slide; set: (patch: Partial<Slide>) => void }) {
  const categories = slide.categories ?? [];
  const series = slide.series ?? [];
  const catCount = Math.max(categories.length, ...series.map((s) => s.values?.length ?? 0), 1);

  const setCategory = (i: number, v: string) => {
    const next = categories.slice();
    while (next.length < catCount) next.push(`C${next.length + 1}`);
    next[i] = v;
    set({ categories: next });
  };

  return (
    <>
      <TextInput label="Eyebrow" value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      <TextInput label="Heading" value={slide.heading} onChange={(v) => set({ heading: v })} />
      <TextArea label="Lead" value={slide.lead} onChange={(v) => set({ lead: v })} rows={2} />
      <StringSelect
        label="Chart type"
        value={slide.chartType ?? "bar"}
        onChange={(v) => set({ chartType: v })}
        options={[
          { value: "bar", label: "Bar (columns)" },
          { value: "horizontal-bar", label: "Horizontal bar" },
          { value: "line", label: "Line" },
          { value: "area", label: "Area" },
          { value: "pie", label: "Pie" },
          { value: "donut", label: "Donut" },
        ]}
      />
      <div className="row-inline" style={{ gap: 16 }}>
        <label className="field">
          <span className="field-label">Show legend</span>
          <input
            type="checkbox"
            checked={slide.showLegend !== false}
            onChange={(e) => set({ showLegend: e.target.checked })}
          />
        </label>
        <label className="field">
          <span className="field-label">Show values</span>
          <input
            type="checkbox"
            checked={slide.showValues === true}
            onChange={(e) => set({ showValues: e.target.checked })}
          />
        </label>
        <label className="field">
          <span className="field-label">Stacked</span>
          <input
            type="checkbox"
            checked={slide.stacked === true}
            onChange={(e) => set({ stacked: e.target.checked })}
          />
        </label>
      </div>
      <div className="list-editor">
        <div className="list-editor-head">
          <span className="field-label">Categories</span>
          <button
            className="btn btn-sm"
            onClick={() =>
              set({
                categories: [...categories, `C${categories.length + 1}`],
                series: series.map((s) => ({ ...s, values: [...(s.values ?? []), 0] })),
              })
            }
          >
            + Category
          </button>
        </div>
        {Array.from({ length: catCount }).map((_, i) => (
          <div className="row-inline" key={i}>
            <input
              className="text-input"
              value={categories[i] ?? ""}
              placeholder={`Category ${i + 1}`}
              onChange={(e) => setCategory(i, e.target.value)}
            />
          </div>
        ))}
      </div>
      <ListEditor<ChartSeries>
        label="Series"
        items={series}
        onChange={(next) => set({ series: next })}
        blank={() => ({ name: "Series", values: Array.from({ length: catCount }, () => 0) })}
        renderItem={(s, setItem) => (
          <>
            <TextInput label="Name" value={s.name} onChange={(v) => setItem({ ...s, name: v })} />
            <div className="row-cells">
              {Array.from({ length: catCount }).map((_, c) => (
                <input
                  key={c}
                  className="text-input"
                  type="number"
                  value={s.values?.[c] ?? 0}
                  placeholder={categories[c] ?? `C${c + 1}`}
                  onChange={(e) => {
                    const values = (s.values ?? []).slice();
                    while (values.length < catCount) values.push(0);
                    values[c] = Number(e.target.value) || 0;
                    setItem({ ...s, values });
                  }}
                />
              ))}
            </div>
          </>
        )}
      />
    </>
  );
}
