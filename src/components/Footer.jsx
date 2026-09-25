import { Link } from "react-router-dom";
import { ArrowIcon } from "./icons";
import { Logo } from "./Logo";

const NAV = [
  ["/football-clubs", "Football Clubs"],
  ["/birthday-parties", "Birthday Parties"],
  ["/about", "About Us"],
  ["/reviews", "Reviews / Gallery"],
  ["/locations", "Locations"],
  ["/coming-soon", "Coming Soon"],
];

const SOCIALS = [
  ["#", "Facebook"],
  ["#", "Instagram"],
  ["#", "TikTok"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-lead">
          See you on the <span className="accent">pitch</span>.
        </p>
        <div className="footer-cta">
          <Link className="btn btn-on-panel btn-lg" to="/contact">Book a free taster <ArrowIcon /></Link>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <Link className="footer-brand" to="/">
              <span className="brand-logo brand-logo--sm" aria-hidden="true"><Logo variant="footer" /></span>
              <div>
                <p className="footer-name">Champion Sport Activities</p>
                <p className="footer-tag">Where Confidence Begins</p>
              </div>
            </Link>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <nav aria-label="Footer">
              {NAV.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
              <Link to="/contact">Contact / Booking</Link>
            </nav>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <nav aria-label="Social media">
              {SOCIALS.map(([href, label]) => <a key={label} href={href}>{label}</a>)}
            </nav>
          </div>
        </div>

        <div className="footer-base">
          <p>&copy; {new Date().getFullYear()} Champion Sport Activities. All rights reserved.</p>
          <p>DBS-checked &middot; Fully insured &middot; First-aid trained</p>
        </div>
      </div>
    </footer>
  );
}
