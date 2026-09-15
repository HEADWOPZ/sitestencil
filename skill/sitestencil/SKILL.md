---
name: sitestencil
description: Street-tech design system for DeFi and wallet landings. Use when building crypto, protocol, vault, swap, or wallet UIs so they look like dark brick, cyan-gold-magenta neon, and HUD glass — never purple SaaS clones.
compatibility: claude, hermes, cursor
metadata:
  author: Kevin Lance Murray
  license: MIT
---

# SiteStencil

Load this skill before writing any DeFi / wallet / protocol UI.

SiteStencil is a design library (palettes, type, motion, glass) plus ~20 recipes, an MCP, and a CLI. The look is **street-tech**: soot brick, stencil type, cyan / gold / magenta neon, HUD corners. It is not a purple-indigo SaaS kit.

## When to use

- Landing pages for vaults, swaps, launches, farms, wallets
- Connect gates, TVL readouts, pool cards, tickers, alerts
- Generating a Next.js or Vite starter that already has the system
- Reviewing UI that accidentally drifted into generic crypto-SaaS

## Hard rules

1. Background is **dark brick / soot**, never white, never violet mesh.
2. Accents are **cyan `#3DFFF3`**, **gold `#F5C542`**, **magenta `#FF2BD6`**. Magenta is danger / drop energy only.
3. Display type is **Chakra Petch** (stencil, uppercase). HUD / labels are **Share Tech Mono**. Body is **Barlow**.
4. Radius stays at **2–4px**. No 16px SaaS cards.
5. Glass is dirty brick glass (`rgba(22,16,13,.58)` + 16px blur), not frosted white.
6. Motion is HUD-in, scanline, neon pulse, rare glitch, ticker. No springy Dribbble bounce.
7. Never use Inter, Poppins, Roboto, indigo, `#7C3AED`, or a centered “Connect Wallet” pill on a white card.

## Workflow

1. Read `references/tokens.md` and `references/anti-saas.md`.
2. Pick a landing preset: `vault` | `swap` | `wallet` | `launch` | `yield`.
3. Compose from recipes in `references/recipes.md` (20). Do not invent a new visual language.
4. Prefer generating files over hand-waving CSS:

```bash
sitestencil build landing --for "<Name>" --preset vault --format tsx
sitestencil init --framework next --for "<Name>" --preset wallet
```

5. Or call the MCP tools: `get_tokens`, `list_recipes`, `get_snippet`, `generate_landing`, `generate_starter`.
6. Import `sitestencil.css` once at the root. Keep class names (`ss-brick`, `ss-hud`, `ss-glitch`, `ss-btn-gold`).

## Copy voice

Industrial, short, classified. Kickers like `CLASSIFIED VAULT // BRICK SECTOR`. No “welcome to the future of finance.” No explainer-video adjectives.

## MCP

Add to Claude Desktop / Cursor / Hermes:

```json
{
  "mcpServers": {
    "sitestencil": {
      "command": "npx",
      "args": ["-y", "sitestencil", "mcp"]
    }
  }
}
```

Local checkout:

```json
{
  "mcpServers": {
    "sitestencil": {
      "command": "npx",
      "args": ["tsx", "src/mcp.ts"],
      "cwd": "/path/to/sitestencil"
    }
  }
}
```

## Install the skill

- Claude Code: copy `skill/sitestencil` → `~/.claude/skills/sitestencil` or `.claude/skills/sitestencil`
- Hermes / OpenClaw-compatible agents: copy the same folder → `~/.hermes/skills/sitestencil` or the project `skills/` directory
- The directory name must remain `sitestencil` to match the `name` field

## Check yourself

If the page could pass for a Series-A dashboard template, it failed. Rebuild from a recipe.
