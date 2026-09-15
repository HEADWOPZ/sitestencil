import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { parseArgs, runCli } from "../src/cli.ts";

function capture() {
  const logs: string[] = [];
  const errors: string[] = [];
  return {
    logs,
    errors,
    io: {
      log: (line: string) => logs.push(line),
      error: (line: string) => errors.push(line),
    },
  };
}

describe("cli", () => {
  it("parses build landing flags", () => {
    const parsed = parseArgs([
      "node",
      "sitestencil",
      "build",
      "landing",
      "--for",
      "Aether Vault",
      "--preset",
      "vault",
      "--format",
      "mdx",
    ]);
    assert.equal(parsed.command, "build");
    assert.equal(parsed.flags.for, "Aether Vault");
    assert.equal(parsed.flags.preset, "vault");
    assert.deepEqual(parsed.rest, ["landing"]);
  });

  it("prints help", async () => {
    const { logs, io } = capture();
    const code = await runCli(["node", "sitestencil", "help"], io);
    assert.equal(code, 0);
    assert.match(logs.join("\n"), /build landing --for/);
  });

  it("lists twenty recipes", async () => {
    const { logs, io } = capture();
    const code = await runCli(["node", "sitestencil", "list", "recipes"], io);
    assert.equal(code, 0);
    const lines = logs.join("\n").trim().split("\n");
    assert.ok(lines.length >= 20);
    assert.ok(logs.join("\n").includes("brick-vault-hero"));
  });

  it("requires --for on build landing", async () => {
    const { errors, io } = capture();
    const code = await runCli(["node", "sitestencil", "build", "landing"], io);
    assert.equal(code, 1);
    assert.match(errors.join("\n"), /--for/);
  });

  it("writes a landing to disk", async () => {
    const out = mkdtempSync(join(tmpdir(), "sitestencil-"));
    const { logs, io } = capture();
    const code = await runCli(
      ["node", "sitestencil", "build", "landing", "--for", "Aether Vault", "--out", out],
      io,
    );
    assert.equal(code, 0, logs.join("\n"));
    const tsx = readFileSync(join(out, "LandingPage.tsx"), "utf8");
    assert.match(tsx, /Aether Vault/);
    assert.match(readFileSync(join(out, "sitestencil.css"), "utf8"), /--ss-cyan/);
  });
});
