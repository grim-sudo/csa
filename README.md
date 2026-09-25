# Champion Sport Activities — React + Vite

A fast, fully responsive **multi-page** marketing site for kids football clubs,
sports birthday parties, school clubs and holiday camps. Built with **React 19 +
Vite + React Router** in a **Modern Editorial Sports / Bold Minimalism** style,
with **light/dark mode**.

## Pages / routes

| Route | Page |
| --- | --- |
| `/` | Home (hero, stats, reviews, booking CTA) |
| `/football-clubs` | Football club tiers |
| `/birthday-parties` | Birthday parties |
| `/about` | About + coaches |
| `/reviews` | Reviews + gallery |
| `/locations` | Venues + Google Map |
| `/coming-soon` | School clubs + holiday camps |
| `/contact` | Enquiry / booking form |
| `*` | 404 not-found |

## Design direction

- **Style:** editorial asymmetric grid, large display type, large photography,
  strong section hierarchy, generous whitespace, rounded-but-not-soft components.
- **Type:** **Oswald** (bold condensed display headings) + **Manrope** (clean
  geometric sans body).
- **Colour:** warm neutral paper background, **pitch green `#128a4b`** primary,
  **tangerine `#ff5a1f`** energetic accent, high-contrast CTAs.
- **Effects:** subtle hover motion, image scale on hover, scroll reveals, light
  grain texture, organic SVG blobs. No glassmorphism, neon, heavy gradients,
  heavy shadows, or 3D.

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build to /dist
npm run preview
npm run lint
```

## Project structure

```
src/
  App.jsx              # route table (React Router)
  main.jsx             # entry (wraps App in BrowserRouter)
  index.css            # design system + light/dark tokens + responsive
  theme.jsx            # ThemeProvider + useTheme (localStorage + system pref)
  useReveal.js         # staggered scroll-in reveals (re-runs per route)
  pages/               # one component per route
    Home, FootballClubsPage, PartiesPage, AboutPage, ReviewsPage,
    LocationsPage, ComingSoonPage, ContactPage, NotFound
  components/
    Layout.jsx         # shared shell: header, footer, ambient bg, scroll-to-top
    Seo.jsx            # per-page <title>/description/canonical/OG/Twitter tags
    Header.jsx         # sticky nav (NavLink) + theme toggle + mobile menu
    Hero.jsx           # editorial hero: display type + photo + stat chips
    Sections.jsx       # Stats, FootballClubs, Parties, About + Coaches,
                       # Reviews, Gallery, Locations, ComingSoon, BookingCTA
    Ambient.jsx        # reactive court/track background + motion trails
    Contact.jsx        # enquiry form (browser validation) + socials
    Footer.jsx, Logo.jsx, icons.jsx
public/
  favicon.svg, og-image.svg, robots.txt, sitemap.xml, _redirects
vercel.json            # SPA rewrite for deep links
```

## SEO

- Per-page metadata via the `Seo` component (React 19 hoists `<title>`,
  `<meta>` and `<link rel="canonical">` into `<head>`). Each page sets its own
  title, description, canonical URL and Open Graph / Twitter tags.
- `public/sitemap.xml` lists every route; `public/robots.txt` points to it.
- `SportsActivityLocation` JSON-LD structured data in `index.html`.
- Update the domain constant in `Seo.jsx` (`BASE_URL`) and the URLs in
  `sitemap.xml` / `robots.txt` to your real domain before launch.

## Light / dark mode

`theme.jsx` reads a stored preference (then the OS setting), applies it as
`data-theme` on `<html>`, and persists changes. An inline script in `index.html`
sets the theme before paint to avoid a flash. All colours are CSS variables
scoped to `[data-theme="light"]` / `[data-theme="dark"]`.

## Placeholders to replace before launch

1. **Logo** — `src/components/Logo.jsx` and `public/favicon.svg`.
2. **Tagline** — search `[ Your tagline goes here ]`.
3. **Photography** — every block labelled "photo" (hero, program cards, split
   images, coach portraits, gallery). Drop in `<img>` tags; hover-scale is wired.
4. **Coaches** — names, roles and bios in `About` (`Sections.jsx`).
5. **Locations** — venue names, addresses and days in `Locations`, plus the
   Google Map `iframe` `src`.
6. **Contact details / socials** — `Contact.jsx` + JSON-LD in `index.html`.
7. **Reviews / prices / session details** — `Sections.jsx`.

## Contact form

The form validates in the browser only. Before launch, connect it to a backend or
a no-code service (Formspree, Getform, Basin, Netlify Forms). See `handleSubmit`
in `Contact.jsx`.

## Deploy

Static build (`/dist`) — deploy to Netlify, Vercel, Cloudflare Pages or GitHub
Pages. Build command `npm run build`, output `dist`. Point your domain at the
host and enable its free HTTPS.

**SPA routing:** because this is client-side routed, the host must serve
`index.html` for unknown paths so deep links (e.g. `/about`) work on refresh.
`vercel.json` (Vercel) and `public/_redirects` (Netlify/Cloudflare) are included.
For other hosts, add an equivalent catch-all rewrite to `/index.html`.

> Note: this is a client-rendered SPA, so per-page meta is applied in the
> browser. Google renders JS and will index each route, but for the strongest
> SEO (and correct link previews on non-JS crawlers) consider pre-rendering or
> SSR (e.g. `vite-plugin-ssr`/`react-router` SSR, or a prerender step).

## Pre-launch checklist

- [ ] Replace every placeholder above (logo, tagline, photos, copy).
- [ ] Wire the enquiry form to a real inbox and test a submission.
- [ ] Update the Google Map embeds to real venues.
- [ ] Add `public/og-image.png` (1200×630) and set canonical/sitemap domain.
- [ ] Test light + dark mode at 375 / 768 / 1440px.
- [ ] Run Lighthouse (performance, accessibility, SEO).
- [ ] Verify keyboard nav, focus states and reduced-motion behaviour.
```
