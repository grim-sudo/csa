import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../theme";
import { MoonIcon, SunIcon } from "./icons";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/football-clubs", label: "Football Clubs" },
  { to: "/birthday-parties", label: "Birthday Parties" },
  { to: "/about", label: "About Us" },
  { to: "/reviews", label: "Reviews / Gallery" },
  { to: "/locations", label: "Locations" },
  { to: "/coming-soon", label: "Coming Soon" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="top">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="Champion Sport Activities home">
          <span className="brand-logo" aria-hidden="true"><Logo /></span>
          <span className="brand-text">
            <span className="brand-name">Champion Sport Activities</span>
            <span className="brand-tagline">Where Confidence Begins</span>
          </span>
        </Link>

        <nav className={`primary-nav${open ? " open" : ""}`} id="primary-nav" aria-label="Primary">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => (isActive ? "is-active" : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-cta-mobile">
              <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>Book Now</Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="toggle-icon" key={theme}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>

          <Link className="nav-cta nav-cta-desktop" to="/contact">Book Now</Link>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
