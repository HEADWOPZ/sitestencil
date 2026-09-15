import { DemoSwitch } from "../Shell";

const DEMOS = [
  { href: "#vault", title: "Aether Vault", kicker: "VAULT", blurb: "Dark brick hero, gold TVL, yield commit." },
  { href: "#swap", title: "Brick Swap", kicker: "SWAP", blurb: "Glass route card, gas meter, pair grid." },
  { href: "#wallet", title: "Neon Gate", kicker: "WALLET", blurb: "HUD connect terminal and idle warn." },
  { href: "#launch", title: "Magenta Drop", kicker: "LAUNCH", blurb: "Allowlist banner, street form, tokens." },
  { href: "#yield", title: "Gold Brick Farm", kicker: "YIELD", blurb: "Stats HUD, pool card, vault panel." },
];

export function IndexPage() {
  return (
    <div className="ss-wrap">
      <header className="ss-nav">
        <strong className="ss-brand">SiteStencil</strong>
        <span className="ss-micro">gallery // 5 landings</span>
      </header>
      <DemoSwitch current="" />
      <section className="ss-index-lead">
        <p className="ss-hud-label">DESIGN LIBRARY // KEVIN LANCE MURRAY</p>
        <h1 className="ss-display ss-glitch">Street-tech for DeFi</h1>
        <p>
          Dark brick. Cyan, gold, magenta. HUD glass. These five pages are the
          product — not a purple SaaS kit with a wallet button taped on.
        </p>
      </section>
      <div className="ss-gallery-index">
        {DEMOS.map((demo) => (
          <a className="ss-card ss-corners" href={demo.href} key={demo.href}>
            <p className="ss-hud-label">{demo.kicker}</p>
            <h2 className="ss-h2" style={{ marginBottom: "0.35rem" }}>
              {demo.title}
            </h2>
            <p className="ss-micro">{demo.blurb}</p>
          </a>
        ))}
      </div>
      <footer className="ss-footer">
        <span>sitestencil // MIT</span>
        <span>skill + mcp + cli</span>
        <span>no indigo</span>
      </footer>
    </div>
  );
}
