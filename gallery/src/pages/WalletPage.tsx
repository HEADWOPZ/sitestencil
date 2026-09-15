import { Shell } from "../Shell";

export function WalletPage() {
  return (
    <Shell brand="Neon Gate" current="wallet">
      <div className="ss-wrap">
        <section className="ss-hero ss-split">
          <div>
            <p className="ss-hud-label">SESSION GATE // HUD AUTH</p>
            <h1 className="ss-display ss-glitch">Neon Gate</h1>
            <p>Connect as a terminal. Injected, social, or hardware. Live chip when the session holds.</p>
          </div>
          <div className="ss-hud ss-corners">
            <p className="ss-hud-label">AUTH // NEON GATE</p>
            <h2 className="ss-h2">Establish session</h2>
            <p className="ss-micro">Injected · social · hardware</p>
            <div className="ss-lockup">
              <button className="ss-btn ss-btn-fill" type="button">
                Injected wallet
              </button>
              <button className="ss-btn" type="button">
                Google / Apple
              </button>
              <button className="ss-btn ss-btn-gold" type="button">
                Hardware
              </button>
            </div>
          </div>
        </section>
        <aside className="ss-toast" role="status">
          <p className="ss-hud-label" style={{ color: "var(--ss-magenta)" }}>
            WARN // SESSION-IDLE
          </p>
          <p style={{ margin: "0.35rem 0 0" }}>No signer yet. The gate stays closed.</p>
        </aside>
        <footer className="ss-footer">
          <span>Neon Gate // hud auth</span>
          <span>phantom-ready copy</span>
          <span>stenciled with sitestencil</span>
        </footer>
      </div>
    </Shell>
  );
}
