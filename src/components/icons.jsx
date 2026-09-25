// Simple, consistent line/solid icons (24x24) — no emoji as structural icons.

export const SunIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const BallIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m12 7 3 2.2-1.2 3.6h-3.6L9 9.2 12 7z" fill="currentColor" stroke="none" />
    <path d="M12 3v4M4.5 9.5 8 11M19.5 9.5 16 11M6.5 19 9 15.5M17.5 19 15 15.5" />
  </svg>
);

export const TrophyIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
  </svg>
);

export const ArrowIcon = (p) => (
  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const WhistleIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M3 11a5 5 0 0 0 5 5h4l6 3v-8a3 3 0 0 0-3-3H8a5 5 0 0 0-5 3z" />
    <circle cx="8" cy="12" r="2" />
    <path d="M13 6l2-2M17 7l3-1" />
  </svg>
);

/* Detailed two-tone football for the page-change transition.
   Brand colours are hard-coded (navy #071A3D / yellow #F4B400): the ball reads
   the same in either theme, and var() does not resolve in SVG presentation
   attributes. A soft white sheen adds a subtle 3D read. */
export const SoccerBall = (p) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <defs>
      <radialGradient id="csa-ball-sheen" cx="36%" cy="30%" r="72%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".38" />
        <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <polygon id="csa-pent" points="0,-6 5.7,-1.85 3.52,4.85 -3.52,4.85 -5.7,-1.85" fill="#071A3D" />
    </defs>
    <circle cx="32" cy="32" r="29.5" fill="#F4B400" stroke="#071A3D" strokeWidth="3" />
    <g stroke="#071A3D" strokeWidth="2.6" strokeLinecap="round">
      <line x1="32" y1="23" x2="32" y2="6.5" />
      <line x1="40.56" y1="29.22" x2="55.6" y2="24" />
      <line x1="37.29" y1="39.28" x2="46.5" y2="52" />
      <line x1="26.71" y1="39.28" x2="17.5" y2="52" />
      <line x1="23.44" y1="29.22" x2="8.4" y2="24" />
    </g>
    <polygon points="32,23 40.56,29.22 37.29,39.28 26.71,39.28 23.44,29.22" fill="#071A3D" />
    <use href="#csa-pent" transform="translate(32,8) rotate(0)" />
    <use href="#csa-pent" transform="translate(54.8,24.6) rotate(72)" />
    <use href="#csa-pent" transform="translate(46.1,51.4) rotate(144)" />
    <use href="#csa-pent" transform="translate(17.9,51.4) rotate(216)" />
    <use href="#csa-pent" transform="translate(9.2,24.6) rotate(288)" />
    <circle cx="32" cy="32" r="29.5" fill="url(#csa-ball-sheen)" />
  </svg>
);
