import { loadSystemCss } from "../css.js";
import { motionModuleSource } from "../motion.js";
import { landingPresets, resolvePreset } from "../recipes.js";
import { displayName, pascalCase, slugify } from "../slug.js";
import type { GeneratedFiles, LandingPreset, OutputFormat } from "../types.js";

function landingTsx(name: string, preset: LandingPreset): string {
  const meta = landingPresets[preset];
  const component = `${pascalCase(name)}Landing`;

  return `import "./sitestencil.css";

const TICKS = ["ETH/USDC +1.2%", "SOL/USDC +0.6%", "FUNDING 0.01%", "LIQ 2.4M", "GAS 12 GWEI", "TVL 184.2M"];
const STATS = [
  { label: "TVL", value: "$184.2M" },
  { label: "24H VOL", value: "$41.9M" },
  { label: "VAULTS", value: "27" },
  { label: "CHAIN", value: "SOL" },
];
const TOKENS = [
  { pair: "BRCK/USDC", apy: "18.4%", depth: "$4.2M" },
  { pair: "CYAN/ETH", apy: "9.1%", depth: "$12.8M" },
  { pair: "GOLD/SOL", apy: "22.0%", depth: "$2.1M" },
  { pair: "MGNT/USDC", apy: "31.5%", depth: "$0.8M" },
];

export default function ${component}() {
  const name = ${JSON.stringify(name)};
  const kicker = ${JSON.stringify(meta.kicker)};
  const blurb = ${JSON.stringify(meta.blurb)};
  const tick = [...TICKS, ...TICKS].join("   ///   ");

  return (
    <main className="ss-root ss-brick">
      <div className="ss-scanlines" aria-hidden="true" />
      <div className="ss-wrap">
        <header className="ss-nav">
          <strong className="ss-brand">{name}</strong>
          <nav className="ss-nav-links" aria-label="Primary">
            <a href="#vault" aria-current="page">vault</a>
            <a href="#swap">swap</a>
            <a href="#docs">docs</a>
            <span className="ss-chip">sol 7xKX…gAsU</span>
          </nav>
        </header>
      </div>
      <div className="ss-ticker" aria-hidden="true">
        <div className="ss-ticker-track">
          <span>{tick}</span>
          <span>{tick}</span>
        </div>
      </div>
      <div className="ss-wrap">
        ${pageBody(preset)}
        <footer className="ss-footer">
          <span>{name} // ${meta.label.toLowerCase()}</span>
          <span>sol · eth · btc</span>
          <span>stenciled with sitestencil</span>
        </footer>
      </div>
    </main>
  );
}
`;
}

function pageBody(preset: LandingPreset): string {
  switch (preset) {
    case "swap":
      return `{/* glass-swap-card + chain-selector + gas-meter + token-grid */}
        <section className="ss-hero ss-split">
          <div>
            <p className="ss-hud-label">{kicker}</p>
            <h1 className="ss-display ss-glitch">{name}</h1>
            <p>{blurb}</p>
          </div>
          <form className="ss-swap ss-corners" onSubmit={(event) => event.preventDefault()}>
            <p className="ss-hud-label">SWAP // ROUTE 0x</p>
            <label className="ss-field"><span>Chain</span>
              <select defaultValue="solana">
                <option value="solana">solana · 101</option>
                <option value="ethereum">ethereum · 1</option>
              </select>
            </label>
            <label className="ss-field"><span>From</span><input defaultValue="2.50" /></label>
            <label className="ss-field"><span>To</span><input defaultValue="8,412.02" readOnly /></label>
            <p className="ss-hud-label">PRIORITY 18 GWEI</p>
            <div className="ss-meter"><span style={{ width: "45%" }} /></div>
            <div className="ss-lockup" style={{ marginTop: "1rem" }}>
              <button className="ss-btn ss-btn-fill" type="submit">Execute route</button>
            </div>
          </form>
        </section>
        <h2 className="ss-h2">Pairs</h2>
        <div className="ss-grid">
          {TOKENS.map((token) => (
            <article className="ss-card" key={token.pair}>
              <p className="ss-micro">PAIR</p>
              <h3>{token.pair}</h3>
              <p className="ss-hud-label">{token.apy} APY</p>
              <p className="ss-micro">DEPTH {token.depth}</p>
            </article>
          ))}
        </div>`;
    case "wallet":
      return `{/* hud-wallet-connect + magenta-alert-toast */}
        <section className="ss-hero ss-split">
          <div>
            <p className="ss-hud-label">{kicker}</p>
            <h1 className="ss-display ss-glitch">{name}</h1>
            <p>{blurb}</p>
          </div>
          <div className="ss-hud ss-corners">
            <p className="ss-hud-label">AUTH // {name}</p>
            <h2 className="ss-h2">Establish session</h2>
            <p className="ss-micro">Injected · social · hardware</p>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-fill" type="button">Injected wallet</button>
              <button className="ss-btn" type="button">Google / Apple</button>
              <button className="ss-btn ss-btn-gold" type="button">Hardware</button>
            </div>
          </div>
        </section>
        <aside className="ss-toast" role="status">
          <p className="ss-hud-label" style={{ color: "var(--ss-magenta)" }}>WARN // SESSION-IDLE</p>
          <p style={{ margin: "0.35rem 0 0" }}>No signer yet. The gate stays closed.</p>
        </aside>`;
    case "launch":
      return `{/* nft-drop-banner + street-form + token-grid */}
        <section className="ss-hero">
          <aside className="ss-banner ss-corners">
            <p className="ss-hud-label">ALLOWLIST // T-MINUS 04:12:09</p>
            <h1 className="ss-display ss-glitch">{name}</h1>
            <p>{blurb}</p>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-magenta" type="button">Claim spot</button>
              <button className="ss-btn ss-btn-gold" type="button">Read manifesto</button>
            </div>
          </aside>
        </section>
        <div className="ss-split">
          <form className="ss-panel" onSubmit={(event) => event.preventDefault()}>
            <p className="ss-hud-label">{kicker}</p>
            <label className="ss-field"><span>Handle</span><input placeholder="@operator" /></label>
            <label className="ss-field"><span>Wallet</span><input placeholder="sol / evm" /></label>
            <button className="ss-btn ss-btn-fill" type="submit">Submit stencil</button>
          </form>
          <div className="ss-grid">
            {TOKENS.map((token) => (
              <article className="ss-card" key={token.pair}>
                <p className="ss-micro">PAIR</p>
                <h3>{token.pair}</h3>
                <p className="ss-hud-label">{token.apy} APY</p>
              </article>
            ))}
          </div>
        </div>`;
    case "yield":
      return `{/* protocol-stats-hud + pool-card + yield-vault-panel */}
        <section className="ss-hero">
          <p className="ss-hud-label">{kicker}</p>
          <h1 className="ss-display">{name}</h1>
          <p>{blurb}</p>
        </section>
        <div className="ss-stats" style={{ marginBottom: "1.25rem" }}>
          {STATS.map((stat) => (
            <article className="ss-stat ss-hud ss-corners" key={stat.label}>
              <p className="ss-hud-label">{stat.label}</p>
              <b>{stat.value}</b>
            </article>
          ))}
        </div>
        <div className="ss-split">
          <article className="ss-card ss-corners">
            <p className="ss-micro">POOL 0.30%</p>
            <h3>BRCK/USDC</h3>
            <p className="ss-hud-label">DEPTH $4.2M</p>
            <button className="ss-btn ss-btn-gold" type="button">Deposit</button>
          </article>
          <form className="ss-panel ss-corners" onSubmit={(event) => event.preventDefault()}>
            <p className="ss-hud-label">VAULT // APY 18.4% // CAP 42%</p>
            <label className="ss-field"><span>Deposit asset</span><input defaultValue="1000 USDC" /></label>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-gold" type="submit">Commit</button>
              <button className="ss-btn" type="button">Withdraw</button>
            </div>
          </form>
        </div>`;
    default:
      return `{/* brick-vault-hero + protocol-stats-hud + yield-vault-panel */}
        <section className="ss-hero ss-split">
          <div>
            <p className="ss-hud-label">{kicker}</p>
            <h1 className="ss-display ss-glitch">{name}</h1>
            <p>{blurb}</p>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-fill" type="button">Enter vault</button>
              <button className="ss-btn ss-btn-gold" type="button">Read docs</button>
            </div>
          </div>
          <div className="ss-hud ss-corners" style={{ animation: "ss-count 900ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
            <p className="ss-hud-label">LOCKED BRICK</p>
            <p className="ss-display" style={{ color: "var(--ss-gold)", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>$184,204,119</p>
          </div>
        </section>
        <div className="ss-stats" style={{ marginBottom: "1.25rem" }}>
          {STATS.map((stat) => (
            <article className="ss-stat ss-hud ss-corners" key={stat.label}>
              <p className="ss-hud-label">{stat.label}</p>
              <b>{stat.value}</b>
            </article>
          ))}
        </div>
        <form className="ss-panel ss-corners" onSubmit={(event) => event.preventDefault()}>
          <p className="ss-hud-label">VAULT // APY 18.4% // CAP 42%</p>
          <label className="ss-field"><span>Deposit asset</span><input defaultValue="1000 USDC" /></label>
          <div className="ss-lockup">
            <button className="ss-btn ss-btn-gold" type="submit">Commit</button>
            <button className="ss-btn" type="button">Withdraw</button>
          </div>
        </form>`;
  }
}

function landingMdx(name: string, preset: LandingPreset): string {
  const meta = landingPresets[preset];
  return `---
title: ${name}
preset: ${preset}
kicker: ${meta.kicker}
---

import Landing from "./LandingPage.tsx";

# ${name}

${meta.blurb}

<Landing />
`;
}

function landingReadme(name: string, preset: LandingPreset): string {
  const meta = landingPresets[preset];
  return `# ${name}

Generated by SiteStencil (\`${preset}\` — ${meta.label}).

## Files

- \`LandingPage.tsx\` — street-tech landing
- \`sitestencil.css\` — brick / neon / glass / motion
- \`motion.ts\` — CSS + Framer Motion presets
- \`sitestencil.config.json\` — recipe map

## Use

Drop the TSX into a Next.js or Vite React app and import the CSS once in the root layout.

\`\`\`tsx
import "./sitestencil.css";
import Landing from "./LandingPage";
\`\`\`

Do not restyle this into purple SaaS. Keep the brick, the HUD type, and cyan / gold / magenta.
`;
}

export function generateLanding(options: {
  name: string;
  preset?: string;
  format?: OutputFormat;
}): GeneratedFiles {
  const name = displayName(options.name);
  const preset = resolvePreset(options.preset);
  const format = options.format ?? "tsx";
  const meta = landingPresets[preset];
  const files: Record<string, string> = {
    "LandingPage.tsx": landingTsx(name, preset),
    "sitestencil.css": loadSystemCss(),
    "motion.ts": motionModuleSource(),
    "sitestencil.config.json": JSON.stringify(
      {
        name,
        slug: slugify(name),
        preset,
        recipes: meta.recipeIds,
        tokens: ["brick", "cyan", "gold", "magenta", "hud", "glass"],
      },
      null,
      2,
    ) + "\n",
    "README.md": landingReadme(name, preset),
  };
  if (format === "mdx") {
    files["landing.mdx"] = landingMdx(name, preset);
  }
  return { files, recipeIds: meta.recipeIds, preset, name };
}
