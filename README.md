# SiteStencil

Street-tech design skill + MCP for DeFi and wallet sites.

Dark brick. Cyan / gold / magenta neon. HUD glass. **Not** a purple SaaS clone.

Built for [Kevin Lance Murray](https://github.com/HEADWOPZ) — generate landings that look like a classified brick terminal, not another indigo dashboard.

## What ships

| Piece | What it is |
| --- | --- |
| **Skill pack** | Claude / Hermes `SKILL.md` plus token, recipe, and anti-SaaS references (`skill/sitestencil`) |
| **Design library** | Palettes, type, glass, motion — TypeScript tokens + `sitestencil.css` |
| **20 recipes** | Vault hero, HUD connect, ticker, glass swap, alerts, grids, meters, forms… |
| **MCP** | Snippets, tokens, landing generation, Next.js / Vite starters |
| **CLI** | `sitestencil build landing --for <name>` → TSX / MDX + motion presets |
| **Gallery** | Five sample pages: vault, swap, wallet, launch, yield |

## Quick start

```bash
npm install
npm test
npx tsx src/cli.ts build landing --for "Aether Vault"
npx tsx src/cli.ts init --framework vite --for "Brick Swap" --preset swap
```

After `npm run build` the binary is `sitestencil` (`dist/cli.js`).

```bash
sitestencil build landing --for "Neon Gate" --preset wallet --format mdx
sitestencil init --framework next --for "Gold Brick Farm" --preset yield
sitestencil list recipes
sitestencil show glass-swap-card
```

## CLI

```
sitestencil build landing --for <name> [--preset vault|swap|wallet|launch|yield] [--format tsx|mdx] [--out <dir>]
sitestencil init --framework next|vite --for <name> [--preset vault] [--out <dir>]
sitestencil list recipes|snippets|motion|presets
sitestencil show <recipe-id>
sitestencil tokens
sitestencil mcp
```

`build landing` writes:

- `LandingPage.tsx` — composed street-tech page
- `landing.mdx` — when `--format mdx`
- `sitestencil.css` — brick / neon / glass / keyframes
- `motion.ts` — CSS + Framer Motion / motion values
- `sitestencil.config.json` — recipe map

## MCP

Cursor / Claude Desktop / Hermes:

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

From this repo:

```json
{
  "mcpServers": {
    "sitestencil": {
      "command": "npx",
      "args": ["tsx", "src/mcp.ts"]
    }
  }
}
```

Tools: `list_recipes`, `get_recipe`, `list_snippets`, `get_snippet`, `get_tokens`, `get_motion`, `list_presets`, `generate_landing`, `generate_starter`.

Resources: `sitestencil://tokens`, `sitestencil://recipes`, `sitestencil://skill`.

## Skill pack (Claude + Hermes)

Copy `skill/sitestencil` to:

- Claude Code: `~/.claude/skills/sitestencil` or `.claude/skills/sitestencil`
- Hermes / OpenClaw-compatible agents: `~/.hermes/skills/sitestencil` or the project `skills/` directory

The folder name must stay `sitestencil`. The skill forces the library: no Inter, no indigo, no 16px white cards.

## Design library

| Role | Token |
| --- | --- |
| Field | `#0B0706` brick / `#2A1C16` mortar |
| Live | `#3DFFF3` cyan |
| Value | `#F5C542` gold |
| Heat | `#FF2BD6` magenta |
| Display | Chakra Petch |
| HUD | Share Tech Mono |
| Body | Barlow |
| Glass | `rgba(22,16,13,.58)` + 16px blur |

Motion: `hud-in`, `scanline`, `pulse-neon`, `glitch`, `ticker`, `count-up`, `warn-flash`.

## Gallery

```bash
npm install --prefix gallery
npm run gallery:dev
```

Open http://127.0.0.1:4177

- `#` index
- `#vault` Aether Vault
- `#swap` Brick Swap
- `#wallet` Neon Gate
- `#launch` Magenta Drop
- `#yield` Gold Brick Farm

## Package API

```ts
import { generateLanding, generateStarter, recipes, tokens } from "sitestencil";

const landing = generateLanding({ name: "Aether Vault", preset: "vault", format: "tsx" });
```

## Tests

```bash
npm test
```

Node's test runner via `tsx`. CI builds the library and the gallery.

## License

MIT © Kevin Lance Murray
