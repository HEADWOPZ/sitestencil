import { generateLanding } from "./generate/landing.js";
import { generateStarter } from "./generate/starter.js";
import { getMotion, motionPresets } from "./motion.js";
import { getRecipe, landingPresets, listRecipes, recipes } from "./recipes.js";
import { getSnippet, listSnippets, snippets } from "./snippets.js";
import { tokens } from "./tokens.js";
import type { StarterFramework } from "./types.js";

export interface ToolSpec {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, Record<string, unknown>>;
    required?: string[];
  };
}

export const toolSpecs: ToolSpec[] = [
  {
    name: "list_recipes",
    description: "List SiteStencil street-tech / crypto UI recipes (~20). Optional category filter.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["hero", "nav", "hud", "card", "motion", "form", "feedback", "data", "chrome"],
          description: "Optional recipe category",
        },
      },
    },
  },
  {
    name: "get_recipe",
    description: "Get one recipe plus its TSX snippet and motion preset.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "Recipe id, e.g. brick-vault-hero" } },
      required: ["id"],
    },
  },
  {
    name: "list_snippets",
    description: "List drop-in React component snippets (primitives and blocks).",
    inputSchema: {
      type: "object",
      properties: {
        kind: { type: "string", enum: ["primitive", "block", "page"] },
      },
    },
  },
  {
    name: "get_snippet",
    description: "Return a component snippet's TSX source.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
  },
  {
    name: "get_tokens",
    description: "Return the SiteStencil design library: palettes, type, glass, motion rules, and forbidden SaaS patterns.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_motion",
    description: "List motion presets or fetch one by id (hud-in, scanline, pulse-neon, glitch, ticker, count-up, warn-flash).",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
    },
  },
  {
    name: "generate_landing",
    description: "Generate a street-tech landing as TSX and optional MDX, plus CSS and motion.ts. Use for DeFi/wallet pages.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Protocol or product name" },
        preset: {
          type: "string",
          enum: ["vault", "swap", "wallet", "launch", "yield"],
        },
        format: { type: "string", enum: ["tsx", "mdx"] },
      },
      required: ["name"],
    },
  },
  {
    name: "generate_starter",
    description: "Generate a Next.js or Vite React starter that already uses SiteStencil tokens and a landing preset.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        framework: { type: "string", enum: ["next", "vite"] },
        preset: {
          type: "string",
          enum: ["vault", "swap", "wallet", "launch", "yield"],
        },
      },
      required: ["name", "framework"],
    },
  },
  {
    name: "list_presets",
    description: "List landing presets and the recipes they compose.",
    inputSchema: { type: "object", properties: {} },
  },
];

export async function handleTool(
  name: string,
  args: Record<string, unknown> = {},
): Promise<{ ok: boolean; text: string }> {
  try {
    const text = dispatch(name, args);
    return { ok: true, text };
  } catch (error) {
    return {
      ok: false,
      text: error instanceof Error ? error.message : String(error),
    };
  }
}

function dispatch(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case "list_recipes":
      return JSON.stringify(listRecipes(args.category as never), null, 2);
    case "get_recipe": {
      const id = String(args.id ?? "");
      const recipe = getRecipe(id);
      if (!recipe) throw new Error(`Unknown recipe: ${id}`);
      return JSON.stringify(
        { recipe, snippet: getSnippet(recipe.snippetId), motion: getMotion(recipe.motion) },
        null,
        2,
      );
    }
    case "list_snippets":
      return JSON.stringify(listSnippets(args.kind as never), null, 2);
    case "get_snippet": {
      const snippet = getSnippet(String(args.id ?? ""));
      if (!snippet) throw new Error(`Unknown snippet: ${args.id}`);
      return JSON.stringify(snippet, null, 2);
    }
    case "get_tokens":
      return JSON.stringify(tokens, null, 2);
    case "get_motion":
      if (args.id) {
        const preset = getMotion(String(args.id));
        if (!preset) throw new Error(`Unknown motion: ${args.id}`);
        return JSON.stringify(preset, null, 2);
      }
      return JSON.stringify(motionPresets, null, 2);
    case "generate_landing":
      return JSON.stringify(
        generateLanding({
          name: String(args.name ?? ""),
          preset: args.preset ? String(args.preset) : undefined,
          format: args.format === "mdx" ? "mdx" : "tsx",
        }),
        null,
        2,
      );
    case "generate_starter":
      return JSON.stringify(
        generateStarter({
          name: String(args.name ?? ""),
          framework: args.framework as StarterFramework,
          preset: args.preset ? String(args.preset) : undefined,
        }),
        null,
        2,
      );
    case "list_presets":
      return JSON.stringify(landingPresets, null, 2);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export const catalog = {
  recipeCount: recipes.length,
  snippetCount: snippets.length,
  motionCount: motionPresets.length,
};
