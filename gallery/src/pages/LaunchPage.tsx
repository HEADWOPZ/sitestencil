import { Shell } from "../Shell";

const TOKENS = [
  { pair: "DROP/USDC", apy: "—", depth: "allowlist" },
  { pair: "MGNT/SOL", apy: "—", depth: "wl only" },
  { pair: "BRCK/ETH", apy: "—", depth: "public 04h" },
];

export function LaunchPage() {
  return (
    <Shell brand="Magenta Drop" current="launch">
      <div className="ss-wrap">
        <section className="ss-hero">
          <aside className="ss-banner ss-corners">
            <p className="ss-hud-label">ALLOWLIST // T-MINUS 04:12:09</p>
            <h1 className="ss-display ss-glitch">Magenta Drop</h1>
            <p>Street-poster launch. Countdown, allowlist form, token grid. Not a Notion site.</p>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-magenta" type="button">
                Claim spot
              </button>
              <button className="ss-btn ss-btn-gold" type="button">
                Read manifesto
              </button>
            </div>
          </aside>
        </section>
        <div className="ss-split">
          <form className="ss-panel" onSubmit={(event) => event.preventDefault()}>
            <p className="ss-hud-label">ALLOWLIST OPEN // MAGENTA DROP</p>
            <label className="ss-field">
              <span>Handle</span>
              <input placeholder="@operator" />
            </label>
            <label className="ss-field">
              <span>Wallet</span>
              <input placeholder="sol / evm" />
            </label>
            <button className="ss-btn ss-btn-fill" type="submit">
              Submit stencil
            </button>
          </form>
          <div className="ss-grid">
            {TOKENS.map((token) => (
              <article className="ss-card" key={token.pair}>
                <p className="ss-micro">PAIR</p>
                <h3>{token.pair}</h3>
                <p className="ss-hud-label">{token.depth}</p>
              </article>
            ))}
          </div>
        </div>
        <footer className="ss-footer">
          <span>Magenta Drop // allowlist</span>
          <span>t-minus live</span>
          <span>stenciled with sitestencil</span>
        </footer>
      </div>
    </Shell>
  );
}
