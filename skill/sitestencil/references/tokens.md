# SiteStencil tokens

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| brick.950 | `#080504` | Page soot |
| brick.900 | `#0B0706` | Primary field |
| brick.800 | `#16100D` | Glass mix |
| brick.700 | `#241A14` | Raised brick |
| mortar | `#2A1C16` | Rules / joints |
| neon.cyan | `#3DFFF3` | Live, primary, links |
| neon.gold | `#F5C542` | Value, brand, settlement |
| neon.magenta | `#FF2BD6` | Warn, drop, liquidation |
| ink.primary | `#F4EDE4` | Body |
| ink.muted | `#A89886` | Secondary |

Brick texture is stacked repeating gradients (brick + mortar), then a soot wash, then a faint cyan/magenta radial. Do not replace with a flat `#0f172a`.

## Type

- Display: `"Chakra Petch", "Rajdhani", sans-serif` — 700, uppercase, `0.04em`, `clamp(2.6rem, 7vw, 6.4rem)`
- HUD: `"Share Tech Mono", "IBM Plex Mono", monospace` — 400, uppercase, `0.12–0.16em`
- Body: `"Barlow", "Segoe UI", sans-serif` — 400

Google Fonts href is exported as `fontHref` from the package.

## Glass

```css
background: rgba(22, 16, 13, 0.58);
backdrop-filter: blur(16px) saturate(140%);
border: 1px solid rgba(61, 255, 243, 0.28);
box-shadow: 0 0 28px rgba(61, 255, 243, 0.16), inset 0 1px 0 rgba(244, 237, 228, 0.08);
border-radius: 4px;
```

Gold and magenta borders swap in for value and danger.

## Motion

| id | Use |
| --- | --- |
| hud-in | 420ms enter, y+14 → 0 |
| scanline | 8s hatch sweep |
| pulse-neon | 1.8s live dot |
| glitch | rare 480ms split |
| ticker | 28s marquee |
| count-up | 900ms gold figures |
| warn-flash | 1.1s magenta glow |

CLI: `sitestencil list motion`. MCP: `get_motion`.
