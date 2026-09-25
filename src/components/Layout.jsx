import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useReveal } from "../useReveal";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RouteTransition } from "./RouteTransition";

/* Scrolls to the top on every route change (skips in-page hash jumps). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  // re-scan reveal targets whenever the page changes
  useReveal(pathname);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <RouteTransition />
      <Header />
      <main id="main" className="page" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
