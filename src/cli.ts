#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { generateLanding } from "./generate/landing.js";
import { generateStarter } from "./generate/starter.js";
import { writeFileMap } from "./fs-write.js";
import { getMotion, motionPresets } from "./motion.js";
import { getRecipe, landingPresets, listRecipes } from "./recipes.js";
import { getSnippet, listSnippets } from "./snippets.js";
import { slugify } from "./slug.js";
import { tokens } from "./tokens.js";
import type { OutputFormat, StarterFramework } from "./types.js";

const HELP = `SiteStencil — street-tech design for DeFi / wallet landings

Usage:
  sitestencil build landing --for <name> [--preset vault|swap|wallet|launch|yield] [--format tsx|mdx] [--out <dir>]
  sitestencil init --framework next|vite --for <name> [--preset vault] [--out <dir>]
  sitestencil list recipes [--category hero|nav|hud|card|motion|form|feedback|data|chrome]
  sitestencil list snippets
  sitestencil list motion
  sitestencil show <recipe-id>
  sitestencil tokens
  sitestencil mcp
  sitestencil help

Examples:
  sitestencil build landing --for "Aether Vault"
  sitestencil build landing --for "Brick Swap" --preset swap --format mdx
  sitestencil init --framework next --for "Neon Gate"
`;

export function parseArgs(argv: string[]): { command: string; flags: Record<string, string | boolean>; rest: string[] } {
  const [, , command = "help", ...raw] = argv;
  const flags: Record<string, string | boolean> = {};
  const rest: string[] = [];
  for (let i = 0; i < raw.length; i += 1) {
    const token = raw[i]!;
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = raw[i + 1];
      if (!next || next.startsWith("--")) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i += 1;
      }
    } else {
      rest.push(token);
    }
  }
  return { command, flags, rest };
}

function flagString(flags: Record<string, string | boolean>, key: string): string | undefined {
  const value = flags[key];
  return typeof value === "string" ? value : undefined;
}

export async function runCli(argv: string[], io: { log: (s: string) => void; error: (s: string) => void } = console): Promise<number> {
  const { command, flags, rest } = parseArgs(argv);

  if (command === "help" || flags.help) {
    io.log(HELP);
    return 0;
  }

  if (command === "mcp") {
    const { startMcpServer } = await import("./mcp.js");
    await startMcpServer();
    return 0;
  }

  if (command === "list") {
    const what = rest[0] ?? "recipes";
    if (what === "recipes") {
      const category = flagString(flags, "category");
      const rows = listRecipes(category as never);
      io.log(rows.map((recipe) => `${recipe.id.padEnd(24)} ${recipe.category.padEnd(10)} ${recipe.title}`).join("\n"));
      return 0;
    }
    if (what === "snippets") {
      io.log(listSnippets().map((snippet) => `${snippet.id.padEnd(24)} ${snippet.kind.padEnd(10)} ${snippet.name}`).join("\n"));
      return 0;
    }
    if (what === "motion") {
      io.log(motionPresets.map((preset) => `${preset.id.padEnd(16)} ${preset.label}`).join("\n"));
      return 0;
    }
    if (what === "presets") {
      io.log(
        Object.entries(landingPresets)
          .map(([id, preset]) => `${id.padEnd(10)} ${preset.label} — ${preset.recipeIds.length} recipes`)
          .join("\n"),
      );
      return 0;
    }
    io.error(`Unknown list target: ${what}`);
    return 1;
  }

  if (command === "show") {
    const id = rest[0];
    if (!id) {
      io.error("sitestencil show <recipe-id>");
      return 1;
    }
    const recipe = getRecipe(id);
    const snippet = getSnippet(id);
    const motion = recipe ? getMotion(recipe.motion) : undefined;
    if (!recipe && !snippet) {
      io.error(`Unknown recipe or snippet: ${id}`);
      return 1;
    }
    io.log(JSON.stringify({ recipe, snippet, motion }, null, 2));
    return 0;
  }

  if (command === "tokens") {
    io.log(JSON.stringify(tokens, null, 2));
    return 0;
  }

  if (command === "build") {
    const target = rest[0] ?? "landing";
    if (target !== "landing") {
      io.error(`Unknown build target: ${target}. Try: sitestencil build landing --for <name>`);
      return 1;
    }
    const name = flagString(flags, "for") ?? flagString(flags, "name");
    if (!name) {
      io.error("Missing --for <name>");
      return 1;
    }
    const preset = flagString(flags, "preset");
    const format = (flagString(flags, "format") ?? "tsx") as OutputFormat;
    if (format !== "tsx" && format !== "mdx") {
      io.error("format must be tsx or mdx");
      return 1;
    }
    const generated = generateLanding({ name, preset, format });
    const outDir = resolve(flagString(flags, "out") ?? `.sitestencil-out/${slugify(generated.name)}-${generated.preset}`);
    mkdirSync(outDir, { recursive: true });
    const written = writeFileMap(outDir, generated.files);
    io.log(`Built ${generated.name} (${generated.preset}) → ${outDir}`);
    io.log(`Recipes: ${generated.recipeIds.join(", ")}`);
    io.log(written.map((file) => `  ${file}`).join("\n"));
    return 0;
  }

  if (command === "init") {
    const name = flagString(flags, "for") ?? flagString(flags, "name");
    const framework = (flagString(flags, "framework") ?? "vite") as StarterFramework;
    if (!name) {
      io.error("Missing --for <name>");
      return 1;
    }
    if (framework !== "next" && framework !== "vite") {
      io.error("framework must be next or vite");
      return 1;
    }
    const generated = generateStarter({
      name,
      framework,
      preset: flagString(flags, "preset"),
    });
    const outDir = resolve(flagString(flags, "out") ?? slugify(generated.name));
    mkdirSync(outDir, { recursive: true });
    writeFileMap(outDir, generated.files);
    io.log(`Starter ${framework} for ${generated.name} → ${outDir}`);
    return 0;
  }

  io.error(`Unknown command: ${command}\n\n${HELP}`);
  return 1;
}

const entry = process.argv[1] ?? "";
if (entry.endsWith("cli.ts") || entry.endsWith("cli.js") || entry.endsWith("sitestencil")) {
  runCli(process.argv)
    .then((code) => {
      if (code !== 0) process.exitCode = code;
    })
    .catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
