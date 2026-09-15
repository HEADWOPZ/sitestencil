export type RecipeCategory =
  | "hero"
  | "nav"
  | "hud"
  | "card"
  | "motion"
  | "form"
  | "feedback"
  | "data"
  | "chrome";

export type LandingPreset = "vault" | "swap" | "wallet" | "launch" | "yield";

export type OutputFormat = "tsx" | "mdx";

export type StarterFramework = "next" | "vite";

export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  summary: string;
  whenToUse: string;
  tokens: string[];
  motion: string;
  do: string[];
  dont: string[];
  snippetId: string;
}

export interface Snippet {
  id: string;
  name: string;
  kind: "primitive" | "block" | "page";
  description: string;
  code: string;
}

export interface MotionPreset {
  id: string;
  label: string;
  cssAnimation: string;
  framer: {
    initial: Record<string, number | string>;
    animate: Record<string, number | string>;
    transition: Record<string, number | string | number[]>;
  };
}

export interface GeneratedFiles {
  files: Record<string, string>;
  recipeIds: string[];
  preset: LandingPreset;
  name: string;
}

export interface BuildLandingOptions {
  name: string;
  preset?: LandingPreset;
  format?: OutputFormat;
  outDir?: string;
}

export interface BuildStarterOptions {
  name: string;
  framework: StarterFramework;
  preset?: LandingPreset;
  outDir?: string;
}
