import { Shell } from "../Shell";

const STATS = [
  { label: "TVL", value: "$62.4M" },
  { label: "AVG APY", value: "19.8%" },
  { label: "POOLS", value: "11" },
  { label: "CHAIN", value: "SOL" },
];

export function YieldPage() {
  return (
    <Shell brand="Gold Brick Farm" current="yield">
      <div className="ss-wrap">
        <section className="ss-hero">
          <p className="ss-hud-label">YIELD RAIL // GOLD BRICK</p>
          <h1 className="ss-display">Gold Brick Farm</h1>
          <p>Farms as industrial panels. Depth, fee stamp, cap remaining.</p>
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
            <button className="ss-btn ss-btn-gold" type="button">
              Deposit
            </button>
          </article>
          <form className="ss-panel ss-corners" onSubmit={(event) => event.preventDefault()}>
            <p className="ss-hud-label">VAULT // APY 18.4% // CAP 42%</p>
            <label className="ss-field">
              <span>Deposit asset</span>
              <input defaultValue="1000 USDC" />
            </label>
            <p className="ss-hud-label">PRIORITY 12 GWEI</p>
            <div className="ss-meter">
              <span style={{ width: "30%" }} />
            </div>
            <div className="ss-lockup" style={{ marginTop: "1rem" }}>
              <button className="ss-btn ss-btn-gold" type="submit">
                Commit
              </button>
              <button className="ss-btn" type="button">
                Withdraw
              </button>
            </div>
          </form>
        </div>
        <footer className="ss-footer">
          <span>Gold Brick Farm // yield rail</span>
          <span>cap 42%</span>
          <span>stenciled with sitestencil</span>
        </footer>
      </div>
    </Shell>
  );
}
