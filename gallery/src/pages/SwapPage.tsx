import { Shell } from "../Shell";

const TOKENS = [
  { pair: "BRCK/USDC", apy: "18.4%", depth: "$4.2M" },
  { pair: "CYAN/ETH", apy: "9.1%", depth: "$12.8M" },
  { pair: "GOLD/SOL", apy: "22.0%", depth: "$2.1M" },
  { pair: "MGNT/USDC", apy: "31.5%", depth: "$0.8M" },
];

export function SwapPage() {
  return (
    <Shell brand="Brick Swap" current="swap">
      <div className="ss-ticker" aria-hidden="true">
        <div className="ss-ticker-track">
          <span>ROUTE LIVE /// SLIP 0.12% /// GAS 18 GWEI /// BRCK/USDC /// CYAN/ETH /// </span>
          <span>ROUTE LIVE /// SLIP 0.12% /// GAS 18 GWEI /// BRCK/USDC /// CYAN/ETH /// </span>
        </div>
      </div>
      <div className="ss-wrap">
        <section className="ss-hero ss-split">
          <div>
            <p className="ss-hud-label">ROUTE TABLE // LIVE PAIRS</p>
            <h1 className="ss-display ss-glitch">Brick Swap</h1>
            <p>Glass swap over soot brick. Gold focus. Magenta only when the route breaks.</p>
          </div>
          <form className="ss-swap ss-corners" onSubmit={(event) => event.preventDefault()}>
            <p className="ss-hud-label">SWAP // ROUTE 0x</p>
            <label className="ss-field">
              <span>Chain</span>
              <select defaultValue="solana">
                <option value="solana">solana · 101</option>
                <option value="ethereum">ethereum · 1</option>
                <option value="base">base · 8453</option>
              </select>
            </label>
            <label className="ss-field">
              <span>From</span>
              <input defaultValue="2.50" />
            </label>
            <label className="ss-field">
              <span>To</span>
              <input defaultValue="8,412.02" readOnly />
            </label>
            <p className="ss-hud-label">PRIORITY 18 GWEI</p>
            <div className="ss-meter">
              <span style={{ width: "45%" }} />
            </div>
            <div className="ss-lockup" style={{ marginTop: "1rem" }}>
              <button className="ss-btn ss-btn-fill" type="submit">
                Execute route
              </button>
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
        </div>
        <footer className="ss-footer">
          <span>Brick Swap // route table</span>
          <span>sol · eth</span>
          <span>stenciled with sitestencil</span>
        </footer>
      </div>
    </Shell>
  );
}
