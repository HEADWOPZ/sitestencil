import type { Snippet } from "./types.js";

export const snippets: Snippet[] = [
  {
    id: "brick-vault-hero",
    name: "Brick vault hero",
    kind: "block",
    description: "Left-locked hero with HUD kicker, display type, and dual CTA.",
    code: `export function BrickVaultHero({ name, kicker, blurb }: { name: string; kicker: string; blurb: string }) {
  return (
    <section className="ss-hero" style={{ animation: "ss-hud-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
      <p className="ss-hud-label">{kicker}</p>
      <h1 className="ss-display ss-glitch">{name}</h1>
      <p>{blurb}</p>
      <div className="ss-lockup">
        <button className="ss-btn ss-btn-fill" type="button">Enter vault</button>
        <button className="ss-btn ss-btn-gold" type="button">Read docs</button>
      </div>
    </section>
  );
}`,
  },
  {
    id: "hud-wallet-connect",
    name: "HUD wallet connect",
    kind: "block",
    description: "Corner-ticked connect terminal.",
    code: `export function HudWalletConnect({ appName = "SITE" }: { appName?: string }) {
  return (
    <div className="ss-hud ss-corners">
      <p className="ss-hud-label">AUTH // {appName}</p>
      <h2 className="ss-h2">Establish session</h2>
      <p className="ss-micro">Injected · social · hardware</p>
      <div className="ss-lockup">
        <button className="ss-btn ss-btn-fill" type="button">Injected wallet</button>
        <button className="ss-btn" type="button">Google / Apple</button>
        <button className="ss-btn ss-btn-gold" type="button">Hardware</button>
      </div>
    </div>
  );
}`,
  },
  {
    id: "neon-ticker-bar",
    name: "Neon ticker",
    kind: "block",
    description: "Seamless magenta marquee.",
    code: `const TICKS = ["ETH/USDC +1.2%", "SOL/USDC +0.6%", "FUNDING 0.01%", "LIQ 2.4M", "GAS 12 GWEI", "TVL 184.2M"];

export function NeonTickerBar() {
  const row = [...TICKS, ...TICKS].join("   ///   ");
  return (
    <div className="ss-ticker" aria-hidden="true">
      <div className="ss-ticker-track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}`,
  },
  {
    id: "glass-swap-card",
    name: "Glass swap card",
    kind: "block",
    description: "From/to swap on brick glass.",
    code: `export function GlassSwapCard() {
  return (
    <form className="ss-swap ss-corners" onSubmit={(e) => e.preventDefault()}>
      <p className="ss-hud-label">SWAP // ROUTE 0x</p>
      <label className="ss-field">
        <span>From</span>
        <input defaultValue="2.50" inputMode="decimal" />
      </label>
      <label className="ss-field">
        <span>To</span>
        <input defaultValue="8,412.02" readOnly />
      </label>
      <button className="ss-btn ss-btn-fill" type="submit">Execute route</button>
    </form>
  );
}`,
  },
  {
    id: "cyan-gold-cta",
    name: "Cyan gold CTA",
    kind: "primitive",
    description: "Primary + ghost lockup.",
    code: `export function CyanGoldCta({ primary = "Launch app", ghost = "Docs" }: { primary?: string; ghost?: string }) {
  return (
    <div className="ss-lockup">
      <button className="ss-btn ss-btn-fill" type="button">{primary}</button>
      <button className="ss-btn ss-btn-gold" type="button">{ghost}</button>
    </div>
  );
}`,
  },
  {
    id: "magenta-alert-toast",
    name: "Magenta alert",
    kind: "primitive",
    description: "Hot pulse warning.",
    code: `export function MagentaAlertToast({ code = "ORACLE-STALE", text = "Feed lag 42s. New deposits paused." }: { code?: string; text?: string }) {
  return (
    <aside className="ss-toast" role="status">
      <p className="ss-hud-label" style={{ color: "var(--ss-magenta)" }}>WARN // {code}</p>
      <p style={{ margin: "0.35rem 0 0" }}>{text}</p>
    </aside>
  );
}`,
  },
  {
    id: "token-grid",
    name: "Token grid",
    kind: "block",
    description: "Asset tiles.",
    code: `const TOKENS = [
  { pair: "BRCK/USDC", apy: "18.4%", depth: "$4.2M" },
  { pair: "CYAN/ETH", apy: "9.1%", depth: "$12.8M" },
  { pair: "GOLD/SOL", apy: "22.0%", depth: "$2.1M" },
  { pair: "MGNT/USDC", apy: "31.5%", depth: "$0.8M" },
];

export function TokenGrid() {
  return (
    <div className="ss-grid">
      {TOKENS.map((token) => (
        <article className="ss-card" key={token.pair}>
          <p className="ss-micro">PAIR</p>
          <h3>{token.pair}</h3>
          <p className="ss-hud-label">{token.apy} APY</p>
          <p className="ss-micro">DEPTH {token.depth}</p>
        </article>
      ))}
    </div>
  );
}`,
  },
  {
    id: "protocol-stats-hud",
    name: "Protocol stats",
    kind: "block",
    description: "Four HUD cells.",
    code: `const STATS = [
  { label: "TVL", value: "$184.2M" },
  { label: "24H VOL", value: "$41.9M" },
  { label: "VAULTS", value: "27" },
  { label: "CHAIN", value: "SOL" },
];

export function ProtocolStatsHud() {
  return (
    <div className="ss-stats">
      {STATS.map((stat) => (
        <article className="ss-stat ss-hud ss-corners" key={stat.label}>
          <p className="ss-hud-label">{stat.label}</p>
          <b>{stat.value}</b>
        </article>
      ))}
    </div>
  );
}`,
  },
  {
    id: "street-nav",
    name: "Street nav",
    kind: "block",
    description: "Stencil nav bar.",
    code: `export function StreetNav({ name, current = "vault" }: { name: string; current?: string }) {
  const links = ["vault", "swap", "docs", "status"];
  return (
    <header className="ss-nav">
      <strong className="ss-brand">{name}</strong>
      <nav className="ss-nav-links" aria-label="Primary">
        {links.map((link) => (
          <a key={link} href={"#" + link} aria-current={link === current ? "page" : undefined}>
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}`,
  },
  {
    id: "scanline-overlay",
    name: "Scanlines",
    kind: "primitive",
    description: "CRT overlay.",
    code: `export function ScanlineOverlay() {
  return <div className="ss-scanlines" aria-hidden="true" />;
}`,
  },
  {
    id: "brick-footer",
    name: "Brick footer",
    kind: "block",
    description: "Industrial closer.",
    code: `export function BrickFooter({ name }: { name: string }) {
  return (
    <footer className="ss-footer">
      <span>{name} // non-custodial</span>
      <span>sol · eth · btc</span>
      <span>stenciled with sitestencil</span>
    </footer>
  );
}`,
  },
  {
    id: "wallet-status-chip",
    name: "Wallet chip",
    kind: "primitive",
    description: "Live address chip.",
    code: `export function WalletStatusChip({ address = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", chain = "sol" }: { address?: string; chain?: string }) {
  const short = address.slice(0, 4) + "…" + address.slice(-4);
  return (
    <span className="ss-chip">{chain} {short}</span>
  );
}`,
  },
  {
    id: "tvl-counter",
    name: "TVL counter",
    kind: "primitive",
    description: "Oversized gold figure.",
    code: `export function TvlCounter({ value = "$184,204,119", caption = "LOCKED BRICK" }: { value?: string; caption?: string }) {
  return (
    <div className="ss-hud ss-corners" style={{ animation: "ss-count 900ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
      <p className="ss-hud-label">{caption}</p>
      <p className="ss-display" style={{ color: "var(--ss-gold)", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>{value}</p>
    </div>
  );
}`,
  },
  {
    id: "pool-card",
    name: "Pool card",
    kind: "block",
    description: "Single LP tile.",
    code: `export function PoolCard({ pair = "BRCK/USDC", fee = "0.30%", depth = "$4.2M" }: { pair?: string; fee?: string; depth?: string }) {
  return (
    <article className="ss-card ss-corners">
      <p className="ss-micro">POOL {fee}</p>
      <h3>{pair}</h3>
      <p className="ss-hud-label">DEPTH {depth}</p>
      <button className="ss-btn ss-btn-gold" type="button">Deposit</button>
    </article>
  );
}`,
  },
  {
    id: "chain-selector",
    name: "Chain selector",
    kind: "primitive",
    description: "HUD select.",
    code: `export function ChainSelector({ value = "solana" }: { value?: string }) {
  return (
    <label className="ss-field">
      <span>Chain</span>
      <select defaultValue={value}>
        <option value="solana">solana · 101</option>
        <option value="ethereum">ethereum · 1</option>
        <option value="base">base · 8453</option>
        <option value="bitcoin">bitcoin · 0</option>
      </select>
    </label>
  );
}`,
  },
  {
    id: "gas-meter",
    name: "Gas meter",
    kind: "primitive",
    description: "Priority bar.",
    code: `export function GasMeter({ gwei = 18, max = 40 }: { gwei?: number; max?: number }) {
  const pct = Math.min(100, Math.round((gwei / max) * 100));
  return (
    <div>
      <p className="ss-hud-label">PRIORITY {gwei} GWEI</p>
      <div className="ss-meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={gwei} role="meter">
        <span style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}`,
  },
  {
    id: "nft-drop-banner",
    name: "Drop banner",
    kind: "block",
    description: "Classified mint strip.",
    code: `export function NftDropBanner({ title = "MAGENTA DROP 04", eta = "04:12:09" }: { title?: string; eta?: string }) {
  return (
    <aside className="ss-banner ss-corners">
      <p className="ss-hud-label">ALLOWLIST // T-MINUS {eta}</p>
      <h2 className="ss-h2 ss-glitch">{title}</h2>
      <button className="ss-btn ss-btn-magenta" type="button">Claim spot</button>
    </aside>
  );
}`,
  },
  {
    id: "yield-vault-panel",
    name: "Yield vault panel",
    kind: "block",
    description: "Deposit panel.",
    code: `export function YieldVaultPanel({ apy = "18.4%", cap = "42%" }: { apy?: string; cap?: string }) {
  return (
    <form className="ss-panel ss-corners" onSubmit={(e) => e.preventDefault()}>
      <p className="ss-hud-label">VAULT // APY {apy} // CAP {cap}</p>
      <label className="ss-field">
        <span>Deposit asset</span>
        <input defaultValue="1000 USDC" />
      </label>
      <div className="ss-lockup">
        <button className="ss-btn ss-btn-gold" type="submit">Commit</button>
        <button className="ss-btn" type="button">Withdraw</button>
      </div>
    </form>
  );
}`,
  },
  {
    id: "street-form",
    name: "Street form",
    kind: "block",
    description: "Allowlist fields.",
    code: `export function StreetForm() {
  return (
    <form className="ss-panel" onSubmit={(e) => e.preventDefault()}>
      <p className="ss-hud-label">ALLOWLIST</p>
      <label className="ss-field">
        <span>Handle</span>
        <input placeholder="@operator" />
      </label>
      <label className="ss-field">
        <span>Wallet</span>
        <input placeholder="sol / evm" />
      </label>
      <button className="ss-btn ss-btn-fill" type="submit">Submit stencil</button>
    </form>
  );
}`,
  },
  {
    id: "glitch-heading",
    name: "Glitch heading",
    kind: "primitive",
    description: "Split-shadow display type.",
    code: `export function GlitchHeading({ children }: { children: string }) {
  return <h1 className="ss-display ss-glitch">{children}</h1>;
}`,
  },
  {
    id: "hud-frame",
    name: "HUD frame",
    kind: "primitive",
    description: "Corner-ticked glass shell.",
    code: `export function HudFrame({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <section className="ss-hud ss-corners">
      {label ? <p className="ss-hud-label">{label}</p> : null}
      {children}
    </section>
  );
}`,
  },
  {
    id: "neon-button",
    name: "Neon button",
    kind: "primitive",
    description: "Stencil button variants.",
    code: `export function NeonButton({
  children,
  tone = "cyan",
  fill = false,
}: {
  children: string;
  tone?: "cyan" | "gold" | "magenta";
  fill?: boolean;
}) {
  const toneClass = tone === "gold" ? "ss-btn-gold" : tone === "magenta" ? "ss-btn-magenta" : "";
  return (
    <button className={"ss-btn " + toneClass + (fill ? " ss-btn-fill" : "")} type="button">
      {children}
    </button>
  );
}`,
  },
];

export function getSnippet(id: string): Snippet | undefined {
  return snippets.find((snippet) => snippet.id === id);
}

export function listSnippets(kind?: Snippet["kind"]): Snippet[] {
  return kind ? snippets.filter((snippet) => snippet.kind === kind) : snippets;
}
