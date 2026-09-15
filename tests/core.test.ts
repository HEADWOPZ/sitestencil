import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { forbidden, palettes, tokens } from "../src/tokens.ts";
import { landingPresets, listRecipes, recipes } from "../src/recipes.ts";
import { snippets } from "../src/snippets.ts";
import { motionPresets } from "../src/motion.ts";

describe("design library", () => {
  it("ships twenty street-tech recipes with unique ids", () => {
    assert.ok(recipes.length >= 20, `expected >= 20 recipes, got ${recipes.length}`);
    const ids = recipes.map((recipe) => recipe.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const recipe of recipes) {
      assert.ok(recipe.snippetId, recipe.id);
      assert.ok(snippets.some((snippet) => snippet.id === recipe.snippetId), recipe.id);
      assert.ok(motionPresets.some((preset) => preset.id === recipe.motion), recipe.id);
    }
  });

  it("keeps neon accents and forbids purple SaaS", () => {
    assert.equal(palettes.neon.cyan, "#3DFFF3");
    assert.equal(palettes.neon.gold, "#F5C542");
    assert.equal(palettes.neon.magenta, "#FF2BD6");
    const live = JSON.stringify({ palettes, type: tokens.type, glass: tokens.glass }).toLowerCase();
    for (const color of forbidden.colors) {
      assert.equal(live.includes(color.toLowerCase()), false, color);
    }
    assert.equal(live.includes("inter"), false);
  });

  it("lists recipes by category", () => {
    const heroes = listRecipes("hero");
    assert.ok(heroes.length >= 2);
    assert.ok(heroes.every((recipe) => recipe.category === "hero"));
  });

  it("composes five landing presets from known recipes", () => {
    const keys = Object.keys(landingPresets);
    assert.deepEqual(keys.sort(), ["launch", "swap", "vault", "wallet", "yield"].sort());
    for (const preset of Object.values(landingPresets)) {
      assert.ok(preset.recipeIds.length >= 5);
      for (const id of preset.recipeIds) {
        assert.ok(recipes.some((recipe) => recipe.id === id), id);
      }
    }
  });
});
