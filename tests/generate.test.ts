import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { generateLanding } from "../src/generate/landing.ts";
import { generateStarter } from "../src/generate/starter.ts";

describe("generate landing", () => {
  it("emits TSX, CSS, motion, and config for a named vault", () => {
    const result = generateLanding({ name: "Aether Vault", preset: "vault" });
    assert.equal(result.preset, "vault");
    assert.equal(result.name, "Aether Vault");
    assert.ok(result.files["LandingPage.tsx"]?.includes("Aether Vault"));
    assert.ok(result.files["LandingPage.tsx"]?.includes("ss-display"));
    assert.ok(result.files["sitestencil.css"]?.includes("--ss-cyan"));
    assert.ok(result.files["motion.ts"]?.includes("hud-in"));
    assert.ok(result.files["sitestencil.config.json"]?.includes("brick-vault-hero"));
    assert.equal(result.files["landing.mdx"], undefined);
  });

  it("adds MDX when requested", () => {
    const result = generateLanding({ name: "Brick Swap", preset: "swap", format: "mdx" });
    assert.ok(result.files["landing.mdx"]?.includes("Brick Swap"));
    assert.equal(result.preset, "swap");
  });

  it("falls back to vault for unknown presets", () => {
    const result = generateLanding({ name: "Unknown", preset: "purple-saas" });
    assert.equal(result.preset, "vault");
  });
});

describe("generate starter", () => {
  it("builds a Next.js app router tree", () => {
    const result = generateStarter({ name: "Neon Gate", framework: "next", preset: "wallet" });
    assert.ok(result.files["app/page.tsx"]?.includes("Neon Gate"));
    assert.ok(result.files["app/layout.tsx"]?.includes("RootLayout"));
    assert.ok(result.files["app/globals.css"]?.includes("--ss-magenta"));
    assert.ok(result.files["package.json"]?.includes("next"));
    assert.equal(result.files["app/page.tsx"]?.includes('import "./sitestencil.css"'), false);
  });

  it("builds a Vite React tree", () => {
    const result = generateStarter({ name: "Gold Brick Farm", framework: "vite", preset: "yield" });
    assert.ok(result.files["src/LandingPage.tsx"]?.includes("Gold Brick Farm"));
    assert.ok(result.files["src/main.tsx"]?.includes("Landing"));
    assert.ok(result.files["vite.config.ts"]?.includes("plugin-react"));
    assert.ok(result.files["index.html"]?.includes("Gold Brick Farm"));
  });
});
