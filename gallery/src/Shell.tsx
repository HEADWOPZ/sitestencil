import type { ReactNode } from "react";

export type Route = "" | "vault" | "swap" | "wallet" | "launch" | "yield";

export function DemoSwitch({ current }: { current: Route }) {
  const links: { href: string; id: Route; label: string }[] = [
    { href: "#", id: "", label: "gallery" },
    { href: "#vault", id: "vault", label: "vault" },
    { href: "#swap", id: "swap", label: "swap" },
    { href: "#wallet", id: "wallet", label: "wallet" },
    { href: "#launch", id: "launch", label: "launch" },
    { href: "#yield", id: "yield", label: "yield" },
  ];
  return (
    <nav className="ss-demo-switch" aria-label="Gallery">
      {links.map((link) => (
        <a key={link.id || "home"} href={link.href} data-active={current === link.id}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function Shell({
  brand,
  current,
  children,
}: {
  brand: string;
  current: Route;
  children: ReactNode;
}) {
  return (
    <>
      <div className="ss-wrap">
        <header className="ss-nav">
          <strong className="ss-brand">{brand}</strong>
          <div className="ss-chip">sol 7xKX…gAsU</div>
        </header>
        <DemoSwitch current={current} />
      </div>
      {children}
    </>
  );
}
