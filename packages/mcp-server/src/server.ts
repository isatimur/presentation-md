#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { renderDeckTool } from "./tools/render-deck.js";
import { exportDeckTool } from "./tools/export-deck.js";
import { listThemesTool } from "./tools/list-themes.js";
import { applyThemeTool } from "./tools/apply-theme.js";
import { auditDeckTool } from "./tools/audit-deck.js";
import { generateDeckPromptTool } from "./tools/generate-deck-prompt.js";
import { importBrandThemeTool } from "./tools/import-brand-theme.js";
import { importPptxTool } from "./tools/import-pptx.js";
import { importMarkdownTool } from "./tools/import-markdown.js";
import { previewThemesTool } from "./tools/preview-themes.js";
import { judgeDeckTool } from "./tools/judge-deck.js";
import { scaffoldDeckTool } from "./tools/scaffold-deck.js";
import { shareDeckLinkTool } from "./tools/share-deck-link.js";
import { isRichToolResult } from "./lib/rich-result.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (input: Record<string, unknown>) => Promise<unknown>;
}

/** Canonical tool registry — keep in sync with README + skill MCP tables (13 tools). */
export const TOOLS: ToolDefinition[] = [
  renderDeckTool,
  exportDeckTool,
  listThemesTool,
  applyThemeTool,
  auditDeckTool,
  judgeDeckTool,
  generateDeckPromptTool,
  scaffoldDeckTool,
  shareDeckLinkTool,
  importBrandThemeTool,
  importPptxTool,
  importMarkdownTool,
  previewThemesTool,
];

export const TOOL_NAMES = TOOLS.map((t) => t.name);

export function listToolDefinitions(): ToolDefinition[] {
  return TOOLS;
}

export async function main() {
  const server = new Server(
    { name: "presentation-md", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema
    }))
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = TOOLS.find((t) => t.name === request.params.name);
    if (!tool) {
      return {
        content: [{ type: "text", text: `Unknown tool: ${request.params.name}` }],
        isError: true
      };
    }
    try {
      const result = await tool.handler(
        (request.params.arguments ?? {}) as Record<string, unknown>
      );
      if (isRichToolResult(result)) {
        const content: Array<
          | { type: "text"; text: string }
          | { type: "image"; data: string; mimeType: string }
        > = [];
        for (const img of result.images ?? []) {
          if (img.label) {
            content.push({ type: "text", text: img.label });
          }
          content.push({
            type: "image",
            data: img.data,
            mimeType: img.mimeType,
          });
        }
        content.push({
          type: "text",
          text: JSON.stringify(result.payload, null, 2),
        });
        return { content };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: message }],
        isError: true
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith("/server.js") ||
    process.argv[1].endsWith("\\server.js") ||
    process.argv[1].endsWith("/server.ts") ||
    process.argv[1].includes("presentation-md-mcp"));

if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
