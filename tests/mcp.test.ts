import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { handleTool, toolSpecs } from "../src/tools.ts";

describe("mcp tools", () => {
  it("registers generator and library tools", () => {
    const names = toolSpecs.map((tool) => tool.name);
    for (const required of [
      "list_recipes",
      "get_recipe",
      "get_snippet",
      "get_tokens",
      "generate_landing",
      "generate_starter",
    ]) {
      assert.ok(names.includes(required), required);
    }
  });

  it("lists recipes and returns a snippet", async () => {
    const listed = await handleTool("list_recipes", {});
    assert.equal(listed.ok, true);
    assert.match(listed.text, /brick-vault-hero/);

    const recipe = await handleTool("get_recipe", { id: "glass-swap-card" });
    assert.equal(recipe.ok, true);
    assert.match(recipe.text, /Execute route/);

    const missing = await handleTool("get_recipe", { id: "purple-hero" });
    assert.equal(missing.ok, false);
  });

  it("generates landing and starter payloads", async () => {
    const landing = await handleTool("generate_landing", {
      name: "Neon Gate",
      preset: "wallet",
      format: "mdx",
    });
    assert.equal(landing.ok, true);
    assert.match(landing.text, /landing\.mdx/);
    assert.match(landing.text, /Neon Gate/);

    const starter = await handleTool("generate_starter", {
      name: "Brick Swap",
      framework: "vite",
      preset: "swap",
    });
    assert.equal(starter.ok, true);
    assert.match(starter.text, /src\/LandingPage\.tsx/);
    assert.match(starter.text, /vite\.config\.ts/);
  });

  it("returns tokens without forbidden fonts", async () => {
    const result = await handleTool("get_tokens", {});
    assert.equal(result.ok, true);
    assert.match(result.text, /Chakra Petch/);
    const typeBlock = result.text.slice(result.text.indexOf('"type"'), result.text.indexOf('"glass"'));
    assert.doesNotMatch(typeBlock, /Inter/);
  });
});
