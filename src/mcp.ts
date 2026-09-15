#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { handleTool, toolSpecs } from "./tools.js";
import { tokens } from "./tokens.js";
import { recipes } from "./recipes.js";

const here = dirname(fileURLToPath(import.meta.url));

function skillMarkdown(): string {
  const candidates = [
    join(here, "../skill/sitestencil/SKILL.md"),
    join(process.cwd(), "skill/sitestencil/SKILL.md"),
  ];
  for (const path of candidates) {
    try {
      return readFileSync(path, "utf8");
    } catch {
      /* try next */
    }
  }
  return "# SiteStencil\nStreet-tech design skill for DeFi landings. See repo README.";
}

export function createMcpServer(): Server {
  const server = new Server(
    { name: "sitestencil", version: "0.1.0" },
    { capabilities: { tools: {}, resources: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: toolSpecs.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const args = (request.params.arguments ?? {}) as Record<string, unknown>;
    const result = await handleTool(request.params.name, args);
    return {
      content: [{ type: "text", text: result.text }],
      isError: !result.ok,
    };
  });

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      {
        uri: "sitestencil://tokens",
        name: "Design tokens",
        mimeType: "application/json",
        description: "Palettes, type, glass, forbidden SaaS patterns",
      },
      {
        uri: "sitestencil://recipes",
        name: "Recipe catalog",
        mimeType: "application/json",
        description: "Street-tech / crypto UI recipes",
      },
      {
        uri: "sitestencil://skill",
        name: "Skill pack",
        mimeType: "text/markdown",
        description: "Claude / Hermes SiteStencil skill",
      },
    ],
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    if (uri === "sitestencil://tokens") {
      return {
        contents: [{ uri, mimeType: "application/json", text: JSON.stringify(tokens, null, 2) }],
      };
    }
    if (uri === "sitestencil://recipes") {
      return {
        contents: [{ uri, mimeType: "application/json", text: JSON.stringify(recipes, null, 2) }],
      };
    }
    if (uri === "sitestencil://skill") {
      return {
        contents: [{ uri, mimeType: "text/markdown", text: skillMarkdown() }],
      };
    }
    throw new Error(`Unknown resource: ${uri}`);
  });

  return server;
}

export async function startMcpServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("sitestencil MCP running on stdio");
}

const entry = process.argv[1] ?? "";
if (entry.endsWith("mcp.ts") || entry.endsWith("mcp.js")) {
  startMcpServer().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
