import { applyDeckEdits, deckOutline, validateDeck } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";
import { readDeckSource, writeDeckFile } from "../lib/deck-source.js";

export const editDeckTool: ToolDefinition = {
  name: "edit_deck",
  description:
    "Change individual slides without rewriting the whole deck. Applies a batch of operations in order, validates the result against the deck schema, and saves nothing if any operation or the validation fails. With `deck_path` the file is updated in place (or written to `output_path`); with `json` the new deck JSON is returned. Returns the slides touched, their craft-audit issues, and the new outline. Slide numbers are 1-based and refer to the deck after the earlier operations in the same batch.",
  inputSchema: {
    type: "object",
    properties: {
      deck_path: { type: "string", description: "Path to a deck JSON file within the current working directory" },
      json: { type: "string", description: "Deck JSON string (alternative to deck_path)" },
      output_path: {
        type: "string",
        description: "With deck_path: write here instead of overwriting deck_path. With json: write the result here instead of returning it.",
      },
      operations: {
        type: "array",
        minItems: 1,
        description:
          'Edits, applied in order. update_slide {slide, fields} merges fields (null removes one). replace_slide {slide, value}. insert_slide {at, value} (at = slide_count + 1 appends). delete_slide {slide}. move_slide {slide, to}. update_meta {fields}. Example: [{"op":"update_slide","slide":3,"fields":{"heading":"New title"}}]',
        items: {
          type: "object",
          properties: {
            op: {
              type: "string",
              enum: ["update_slide", "replace_slide", "insert_slide", "delete_slide", "move_slide", "update_meta"],
            },
            slide: { type: "integer", minimum: 1 },
            at: { type: "integer", minimum: 1 },
            to: { type: "integer", minimum: 1 },
            fields: { type: "object" },
            value: { type: "object" },
          },
          required: ["op"],
        },
      },
    },
    required: ["operations"],
  },
  handler: async (input: Record<string, unknown>) => {
    const source = await readDeckSource(input);
    const { deck, touched } = applyDeckEdits(source.deck, input["operations"]);

    const validation = validateDeck(deck);
    if (!validation.valid) {
      throw new Error(
        `Edits produce an invalid deck; nothing was saved:\n${validation.errors.map((e) => `  - ${e}`).join("\n")}`
      );
    }

    const outputPath = input["output_path"] as string | undefined;
    let written: string | undefined;
    if (outputPath) written = await writeDeckFile(outputPath, deck);
    else if (source.path) written = await writeDeckFile(source.path, deck);

    const outline = deckOutline(deck);
    return {
      touched,
      touched_issues: Object.fromEntries(
        touched.map((n) => [n, outline.slides[n - 1]?.issues ?? []])
      ),
      outline: { ...outline, slides: outline.slides.map(({ issues, ...rest }) => ({ ...rest, issues: issues.length })) },
      ...(written ? { written_path: written } : { json: JSON.stringify(deck) }),
    };
  },
};
