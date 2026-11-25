/**
 * pptxgenjs reads two shape options with a truthiness check, so a zero is lost:
 *
 * - `rectRadius: 0` writes an empty `<a:avLst>`, and PowerPoint then draws
 *   `roundRect` with its default corner (about a sixth of the short side).
 *   Every square frame, rule and wash came out rounded.
 * - `line: { width: 0 }` becomes a 1 pt line, so a translucent wash got a hard,
 *   opaque edge.
 *
 * The layouts say what they mean (square, no line); this wrapper turns those
 * zeros into options pptxgenjs honours: a plain `rect`, and `line.type: "none"`.
 */
import type { PptxSlide } from "./pptx.js";

type ShapeArgs = Parameters<PptxSlide["addShape"]>;
type TextArgs = Parameters<PptxSlide["addText"]>;
type ShapeName = ShapeArgs[0];

interface ZeroableOpts {
  shape?: ShapeName;
  rectRadius?: number;
  line?: { width?: number; type?: string } & Record<string, unknown>;
}

export interface ShapeNames {
  roundRect: ShapeName;
  rect: ShapeName;
}

function squareShape(shape: ShapeName | undefined, opts: ZeroableOpts, names: ShapeNames): ShapeName | undefined {
  return shape === names.roundRect && opts.rectRadius === 0 ? names.rect : shape;
}

function noZeroLine<T extends ZeroableOpts>(opts: T): T {
  if (opts.line && typeof opts.line === "object" && opts.line.width === 0) {
    return { ...opts, line: { type: "none" } };
  }
  return opts;
}

/** Wrap a slide so zero corner radii draw square and zero-width lines draw nothing. */
export function withShapeDefaults(slide: PptxSlide, names: ShapeNames): PptxSlide {
  const addShape = slide.addShape.bind(slide);
  slide.addShape = ((shape: ShapeName, options?: ShapeArgs[1]) => {
    if (!options) return addShape(shape, options);
    const opts = options as ShapeArgs[1] & ZeroableOpts;
    return addShape(squareShape(shape, opts, names) as ShapeName, noZeroLine(opts));
  }) as PptxSlide["addShape"];

  const addText = slide.addText.bind(slide);
  slide.addText = ((text: TextArgs[0], options?: TextArgs[1]) => {
    if (!options) return addText(text, options);
    const opts = options as TextArgs[1] & ZeroableOpts;
    if (opts.shape === undefined) return addText(text, opts);
    return addText(text, { ...noZeroLine(opts), shape: squareShape(opts.shape, opts, names) } as TextArgs[1]);
  }) as PptxSlide["addText"];

  return slide;
}
