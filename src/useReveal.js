import { useEffect } from "react";

// Adds a fade/slide-in when elements with [data-reveal] scroll into view.
// Pass a `key` (e.g. the current route path) so it re-scans when the page
// content changes.
export function useReveal(key) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll("[data-reveal]");

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    targets.forEach((el) => {
      el.classList.add("reveal");
      // stagger index among sibling reveal items in the same parent
      const parent = el.parentElement;
      if (parent) {
        const sibs = Array.from(parent.children).filter((c) => c.hasAttribute("data-reveal"));
        const idx = sibs.indexOf(el);
        if (idx > 0) el.style.setProperty("--rvl-i", String(idx));
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
