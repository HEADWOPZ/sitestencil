import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function writeFileMap(outDir: string, files: Record<string, string>): string[] {
  const written: string[] = [];
  for (const [relative, contents] of Object.entries(files)) {
    const target = join(outDir, relative);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, contents);
    written.push(target);
  }
  return written;
}
