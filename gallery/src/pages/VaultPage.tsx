import { Shell } from "../Shell";

const STATS = [
  { label: "TVL", value: "$184.2M" },
  { label: "24H VOL", value: "$41.9M" },
  { label: "VAULTS", value: "27" },
  { label: "CHAIN", value: "SOL" },
];

export function VaultPage() {
  return (
    <Shell brand="Aether Vault" current="vault">
      <div className="ss-ticker" aria-hidden="true">
        <div className="ss-ticker-track">
          <span>ETH/USDC +1.2% /// SOL/USDC +0.6% /// FUNDING 0.01% /// LIQ 2.4M /// TVL 184.2M /// </span>
          <span>ETH/USDC +1.2% /// SOL/USDC +0.6% /// FUNDING 0.01% /// LIQ 2.4M /// TVL 184.2M /// </span>
        </div>
      </div>
      <div className="ss-wrap">
        <section className="ss-hero ss-split">
          <div>
            <p className="ss-hud-label">CLASSIFIED VAULT // BRICK SECTOR</p>
            <h1 className="ss-display ss-glitch">Aether Vault</h1>
            <p>Non-custodial brick vaults. Cyan rails. Gold settlement. No purple dashboard.</p>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-fill" type="button">
                Enter vault
              </button>
              <button className="ss-btn ss-btn-gold" type="button">
                Read docs
              </button>
            </div>
          </div>
          <div className="ss-hud ss-corners">
            <p className="ss-hud-label">LOCKED BRICK</p>
            <p className="ss-display" style={{ color: "var(--ss-gold)", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              $184,204,119
            </p>
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
          <label className="ss-field">
            <span>Deposit asset</span>
            <input defaultValue="1000 USDC" />
          </label>
          <div className="ss-lockup">
            <button className="ss-btn ss-btn-gold" type="submit">
              Commit
            </button>
            <button className="ss-btn" type="button">
              Withdraw
            </button>
          </div>
        </form>
        <footer className="ss-footer">
          <span>Aether Vault // non-custodial</span>
          <span>sol · eth · btc</span>
          <span>stenciled with sitestencil</span>
        </footer>
      </div>
    </Shell>
  );
}
