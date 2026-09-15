import type { MotionPreset } from "./types.js";

export const motionPresets: MotionPreset[] = [
  {
    id: "hud-in",
    label: "HUD slide-in",
    cssAnimation: "ss-hud-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both",
    framer: {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
    },
  },
  {
    id: "scanline",
    label: "CRT scanline sweep",
    cssAnimation: "ss-scan 8s linear infinite",
    framer: {
      initial: { backgroundPositionY: 0 },
      animate: { backgroundPositionY: 8 },
      transition: { duration: 8, ease: "linear" },
    },
  },
  {
    id: "pulse-neon",
    label: "Neon pulse",
    cssAnimation: "ss-pulse 1.8s ease-in-out infinite",
    framer: {
      initial: { opacity: 0.55 },
      animate: { opacity: 1 },
      transition: { duration: 1.8, ease: "easeInOut" },
    },
  },
  {
    id: "glitch",
    label: "Split glitch",
    cssAnimation: "ss-glitch 480ms steps(2, end) both",
    framer: {
      initial: { x: 0, skewX: 0 },
      animate: { x: 2, skewX: -2 },
      transition: { duration: 0.48, ease: "linear" },
    },
  },
  {
    id: "ticker",
    label: "Marquee ticker",
    cssAnimation: "ss-ticker 28s linear infinite",
    framer: {
      initial: { x: "0%" },
      animate: { x: "-50%" },
      transition: { duration: 28, ease: "linear" },
    },
  },
  {
    id: "count-up",
    label: "HUD count-up",
    cssAnimation: "ss-count 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
    framer: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  },
  {
    id: "warn-flash",
    label: "Magenta warn flash",
    cssAnimation: "ss-warn 1.1s ease-in-out infinite",
    framer: {
      initial: { boxShadow: "0 0 0 rgba(255,43,214,0)" },
      animate: { boxShadow: "0 0 22px rgba(255,43,214,0.45)" },
      transition: { duration: 1.1, ease: "easeInOut" },
    },
  },
];

export function getMotion(id: string): MotionPreset | undefined {
  return motionPresets.find((preset) => preset.id === id);
}

export function motionModuleSource(): string {
  const body = motionPresets
    .map((preset) => {
      return `  ${JSON.stringify(preset.id)}: ${JSON.stringify(
        {
          css: preset.cssAnimation,
          ...preset.framer,
        },
        null,
        4,
      ).replace(/\n/g, "\n  ")},`;
    })
    .join("\n");

  return `/** SiteStencil motion presets — CSS animation + Framer Motion / motion values. */
export const motion = {
${body}
} as const;

export type MotionId = keyof typeof motion;
`;
}
