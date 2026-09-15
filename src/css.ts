import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cssVariables } from "./tokens.js";

const here = dirname(fileURLToPath(import.meta.url));

const candidates = [
  join(here, "css/sitestencil.css"),
  join(here, "../src/css/sitestencil.css"),
  join(process.cwd(), "src/css/sitestencil.css"),
];

export function loadSystemCss(): string {
  for (const path of candidates) {
    if (existsSync(path)) {
      return readFileSync(path, "utf8");
    }
  }
  return `${cssVariables()}\n/* sitestencil.css not found — tokens only */\n`;
}
