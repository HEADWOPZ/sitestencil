import { useEffect, useState } from "react";
import type { Route } from "./Shell";
import { VaultPage } from "./pages/VaultPage";
import { SwapPage } from "./pages/SwapPage";
import { WalletPage } from "./pages/WalletPage";
import { LaunchPage } from "./pages/LaunchPage";
import { YieldPage } from "./pages/YieldPage";
import { IndexPage } from "./pages/IndexPage";

const ROUTES: Route[] = ["", "vault", "swap", "wallet", "launch", "yield"];

function routeFromHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return ROUTES.includes(raw as Route) ? (raw as Route) : "";
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash);
  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const page =
    route === "vault" ? (
      <VaultPage />
    ) : route === "swap" ? (
      <SwapPage />
    ) : route === "wallet" ? (
      <WalletPage />
    ) : route === "launch" ? (
      <LaunchPage />
    ) : route === "yield" ? (
      <YieldPage />
    ) : (
      <IndexPage />
    );

  return (
    <div className="ss-root ss-brick">
      <div className="ss-scanlines" aria-hidden="true" />
      {page}
    </div>
  );
}
