/**
 * SiteStencil design tokens.
 * Street-tech: dark brick, cyan / gold / magenta neon, HUD glass.
 * Never ship purple-indigo SaaS gradients or Inter-on-white clones.
 */

export const palettes = {
  brick: {
    950: "#080504",
    900: "#0B0706",
    800: "#16100D",
    700: "#241A14",
    600: "#3A2A20",
    500: "#5A4030",
    mortar: "#2A1C16",
    soot: "#100A08",
  },
  neon: {
    cyan: "#3DFFF3",
    cyanDim: "#1AA8A0",
    gold: "#F5C542",
    goldDim: "#B8860B",
    magenta: "#FF2BD6",
    magentaDim: "#B31286",
  },
  ink: {
    primary: "#F4EDE4",
    muted: "#A89886",
    dim: "#6E5E50",
    invert: "#0B0706",
  },
  signal: {
    live: "#3DFFF3",
    warn: "#F5C542",
    hot: "#FF2BD6",
    ok: "#7CFF6B",
  },
} as const;

export const type = {
  display: {
    family: '"Chakra Petch", "Rajdhani", "DIN Condensed", sans-serif',
    weight: 700,
    tracking: "0.04em",
    transform: "uppercase" as const,
  },
  hud: {
    family: '"Share Tech Mono", "IBM Plex Mono", "ui-monospace", monospace',
    weight: 400,
    tracking: "0.12em",
    transform: "uppercase" as const,
  },
  body: {
    family: '"Barlow", "Sora", "Segoe UI", sans-serif',
    weight: 400,
    tracking: "0.01em",
    transform: "none" as const,
  },
  sizes: {
    display: "clamp(2.6rem, 7vw, 6.4rem)",
    h2: "clamp(1.6rem, 3vw, 2.4rem)",
    hud: "0.75rem",
    body: "1.05rem",
    micro: "0.68rem",
  },
} as const;

export const glass = {
  fill: "rgba(22, 16, 13, 0.58)",
  fillHot: "rgba(36, 18, 28, 0.62)",
  blur: "16px",
  saturate: "140%",
  borderCyan: "rgba(61, 255, 243, 0.28)",
  borderGold: "rgba(245, 197, 66, 0.32)",
  borderMagenta: "rgba(255, 43, 214, 0.3)",
  inset: "inset 0 1px 0 rgba(244, 237, 228, 0.08)",
  glowCyan: "0 0 28px rgba(61, 255, 243, 0.16)",
  glowGold: "0 0 28px rgba(245, 197, 66, 0.16)",
  glowMagenta: "0 0 28px rgba(255, 43, 214, 0.18)",
} as const;

export const space = {
  gutter: "1.25rem",
  section: "5.5rem",
  hudPad: "0.85rem 1.1rem",
  radius: "2px",
  radiusCard: "4px",
} as const;

export const forbidden = {
  colors: ["#7C3AED", "#8B5CF6", "#A78BFA", "#6366F1", "#4F46E5", "#6D28D9"],
  fonts: ["Inter", "Roboto", "Poppins", "Nunito"],
  patterns: [
    "purple-to-indigo mesh gradient",
    "soft SaaS card with 16px radius and drop shadow",
    "centered hero with generic Connect Wallet pill",
    "white page + blue primary button",
  ],
} as const;

export const fontHref =
  "https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Chakra+Petch:wght@600;700&family=Share+Tech+Mono&display=swap";

export function cssVariables(): string {
  return `:root {
  --ss-brick-950: ${palettes.brick[950]};
  --ss-brick-900: ${palettes.brick[900]};
  --ss-brick-800: ${palettes.brick[800]};
  --ss-brick-700: ${palettes.brick[700]};
  --ss-brick-600: ${palettes.brick[600]};
  --ss-brick-500: ${palettes.brick[500]};
  --ss-mortar: ${palettes.brick.mortar};
  --ss-soot: ${palettes.brick.soot};
  --ss-cyan: ${palettes.neon.cyan};
  --ss-cyan-dim: ${palettes.neon.cyanDim};
  --ss-gold: ${palettes.neon.gold};
  --ss-gold-dim: ${palettes.neon.goldDim};
  --ss-magenta: ${palettes.neon.magenta};
  --ss-magenta-dim: ${palettes.neon.magentaDim};
  --ss-ink: ${palettes.ink.primary};
  --ss-ink-muted: ${palettes.ink.muted};
  --ss-ink-dim: ${palettes.ink.dim};
  --ss-ink-invert: ${palettes.ink.invert};
  --ss-live: ${palettes.signal.live};
  --ss-warn: ${palettes.signal.warn};
  --ss-hot: ${palettes.signal.hot};
  --ss-ok: ${palettes.signal.ok};
  --ss-font-display: ${type.display.family};
  --ss-font-hud: ${type.hud.family};
  --ss-font-body: ${type.body.family};
  --ss-size-display: ${type.sizes.display};
  --ss-size-h2: ${type.sizes.h2};
  --ss-size-hud: ${type.sizes.hud};
  --ss-size-body: ${type.sizes.body};
  --ss-size-micro: ${type.sizes.micro};
  --ss-glass: ${glass.fill};
  --ss-glass-hot: ${glass.fillHot};
  --ss-glass-blur: ${glass.blur};
  --ss-border-cyan: ${glass.borderCyan};
  --ss-border-gold: ${glass.borderGold};
  --ss-border-magenta: ${glass.borderMagenta};
  --ss-glow-cyan: ${glass.glowCyan};
  --ss-glow-gold: ${glass.glowGold};
  --ss-glow-magenta: ${glass.glowMagenta};
  --ss-gutter: ${space.gutter};
  --ss-section: ${space.section};
  --ss-radius: ${space.radius};
  --ss-radius-card: ${space.radiusCard};
}
`;
}

export const tokens = {
  palettes,
  type,
  glass,
  space,
  forbidden,
  fontHref,
} as const;
