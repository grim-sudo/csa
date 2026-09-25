import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("csa-theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("csa-theme", theme);
  }, [theme]);

  // origin = { x, y } click point, used for the circular reveal
  const toggle = (origin) => {
    const next = theme === "light" ? "dark" : "light";
    // flushSync forces React to apply the theme (and re-render the icon)
    // synchronously, so the View Transition captures the fully-updated DOM
    // in one frame. Without it the state update lands a frame late and you
    // get a flicker.
    const swap = () => {
      flushSync(() => {
        document.documentElement.setAttribute("data-theme", next);
        setTheme(next);
      });
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.startViewTransition) {
      swap();
      return;
    }

    const root = document.documentElement;
    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 40;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.classList.add("theme-anim");

    const vt = document.startViewTransition(swap);
    vt.finished.finally(() => root.classList.remove("theme-anim"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
