import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowIcon, BallIcon, PinIcon, TrophyIcon, WhistleIcon } from "./icons";
import SmoothScrollSlider from "./SmoothScrollSlider";
import "./SmoothScrollSlider.css";

/* ---------- Real media (src/assets/media) ----------
   Files are grouped by name: `club-*` = football clubs, `bday-*` = birthday parties.
   Vite bundles + hashes each imported file; glob keys are sorted for stable order. */
const byName = (glob) =>
  Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

const clubPhotos = byName(import.meta.glob("../assets/media/club-*.jpg", { eager: true, query: "?url", import: "default" }));
const bdayPhotos = byName(import.meta.glob("../assets/media/bday-*.jpg", { eager: true, query: "?url", import: "default" }));
const clubVideos = byName(import.meta.glob("../assets/media/club-*.mp4", { eager: true, query: "?url", import: "default" }));
const bdayVideos = byName(import.meta.glob("../assets/media/bday-*.mp4", { eager: true, query: "?url", import: "default" }));

/* Muted, looping, controls-free clip — audio is already stripped from the files. */
function Clip({ src, className }) {
  return (
    <video
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

/* ---------- Ticker (yellow editorial marquee) ---------- */
export function Ticker() {
  const items = ["Football Clubs", "Birthday Parties", "Holiday Camps", "School Clubs", "Multi-Sport", "Coaching"];
  const run = [...items, ...items];
  return (
    <section className="ticker" aria-label="What we run">
      <div className="ticker-track" aria-hidden="true">
        {run.map((label, i) => (
          <span className="ticker-item" key={i}>
            {label}<span className="sep" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Activities (editorial numbered index) ---------- */
export function Activities() {
  const rows = [
    { to: "/football-clubs", title: "Football Clubs", desc: "Weekly clubs split by age and stage, ages 3\u201312.", img: clubPhotos[0] },
    { to: "/birthday-parties", title: "Birthday Parties", desc: "90 minutes of coached games, medals and a trophy.", img: bdayPhotos[0] },
    { to: "/coming-soon", title: "Holiday Camps", desc: "Active multi-sport camps through every school holiday.", img: clubPhotos[1] },
    { to: "/coming-soon", title: "School Clubs", desc: "Breakfast, lunch and after-school football, on-site.", img: clubPhotos[2] },
  ];
  return (
    <section className="section activities" id="activities">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> What we do</p>
          <h2 className="section-title">Everything active,<br />under one club</h2>
        </header>

        <div className="activity-list">
          {rows.map((r, i) => (
            <Link className="activity-row" to={r.to} key={r.title} data-reveal>
              <span className="a-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="a-title">{r.title}</span>
              <span className="a-desc">{r.desc}</span>
              <span className="a-arrow" aria-hidden="true"><ArrowIcon /></span>
              <span className="a-reveal" aria-hidden="true">
                {r.img ? <img src={r.img} alt="" loading="lazy" /> : null}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Statement (dominant typographic moment) ---------- */
export function Statement() {
  return (
    <section className="section section--deep statement" aria-label="Our belief">
      <div className="wrap" data-reveal>
        <p>
          <span className="kicker">Where confidence begins</span>
          Build confidence.<br />
          Make friends.<br />
          <span className="accent">Love the game.</span>
        </p>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
export function Stats() {
  const stats = [
    { num: "1,200+", label: "Happy kids coached" },
    { num: "15+", label: "Weekly clubs" },
    { num: "300+", label: "Parties hosted" },
    { num: "9/10", label: "Parents recommend us" },
  ];
  return (
    <section className="section" aria-label="Club highlights">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> By the numbers</p>
          <h2 className="section-title">A record built<br />on smiles</h2>
        </header>
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat" key={s.label} data-reveal>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Football clubs (program cards) ---------- */
export function FootballClubs() {
  const tiers = [
    { name: "Mini Kickers", age: "Ages 3\u20135", price: "5",
      copy: "Playful first touches, games and giggles. All about movement, listening and loving the ball.",
      points: ["45-minute sessions", "Parent-and-child friendly", "Soft balls & bright kit"] },
    { name: "Junior Academy", age: "Ages 6\u20139", price: "6", flag: "Most popular",
      copy: "Real skills, real matches. Dribbling, passing and teamwork drills in fun small-sided games.",
      points: ["60-minute sessions", "Skill badges to earn", "End-of-term tournament"] },
    { name: "Elite Strikers", age: "Ages 10\u201312", price: "7",
      copy: "Sharper technique, tactics and match play for kids ready to level up their game.",
      points: ["75-minute sessions", "Position-specific coaching", "Video skill reviews"] },
  ];
  return (
    <section className="section" id="football">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> Football Clubs</p>
          <h2 className="section-title">Weekly clubs,<br />split by age &amp; stage</h2>
          <p className="section-intro">
            Small groups, big energy. Every child is challenged just enough and celebrated a lot.
          </p>
        </header>

        <div className="card-grid-3">
          {tiers.map((t, i) => (
            <article className="program-card" key={t.name} data-reveal>
              {t.flag && <span className="card-flag">{t.flag}</span>}
              <div className="program-photo">
                <img src={clubPhotos[i]} alt={`${t.name} session`} loading="lazy" />
              </div>
              <div className="program-body">
                <span className="program-age">{t.age}</span>
                <h3>{t.name}</h3>
                <p>{t.copy}</p>
                <ul className="tick-list">{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <div className="program-foot">
                  <span className="program-price">&pound;{t.price}<span> / session</span></span>
                  <Link className="btn btn-outline" to="/contact">Enquire <ArrowIcon /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="media-reel" data-reveal>
          {clubVideos.map((src, i) => (
            <div className="reel-clip" key={i}><Clip src={src} className="reel-video" /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Birthday parties (editorial split) ---------- */
export function Parties() {
  return (
    <section className="section" id="parties">
      <div className="wrap split">
        <div className="split-copy" data-reveal>
          <p className="index-tag"><span className="line" /> Birthday Parties</p>
          <h2 className="section-title">The party the<br />whole class<br />talks about</h2>
          <p className="section-intro">
            You bring the birthday kid, we bring the games, medals and mayhem. A qualified coach
            runs the whole thing so you get to enjoy it.
          </p>
          <ul className="feature-list">
            <li><span className="feature-ico"><BallIcon /></span><div><strong>90 minutes of non-stop fun</strong><span>Warm-up, team games, mini-tournament and a penalty shootout finale.</span></div></li>
            <li><span className="feature-ico"><TrophyIcon /></span><div><strong>A medal for every guest</strong><span>Plus a special trophy for the birthday champion.</span></div></li>
            <li><span className="feature-ico"><WhistleIcon /></span><div><strong>We handle everything</strong><span>Equipment, coaching and set-up. You just show up.</span></div></li>
          </ul>
          <div className="party-packs">
            <div className="pack" data-reveal>
              <p className="pack-name">Half-Time Hero</p>
              <p className="pack-price"><strong>&pound;120</strong><span>up to 12 kids</span></p>
              <ul className="tick-list"><li>60 minutes of games</li><li>1 lead coach</li><li>Medals for all</li></ul>
            </div>
            <div className="pack pack--best" data-reveal>
              <p className="pack-name">Full-Time Legend</p>
              <p className="pack-price"><strong>&pound;180</strong><span>up to 20 kids</span></p>
              <ul className="tick-list"><li>90 minutes of games</li><li>2 coaches</li><li>Medals + trophy</li><li>Personalised invites</li></ul>
            </div>
          </div>
          <div className="section-cta"><Link className="btn btn-primary btn-lg" to="/contact">Plan a party <ArrowIcon /></Link></div>
        </div>

        <div className="split-media" data-reveal>
          <div className="split-photo"><img src={bdayPhotos[0]} alt="Birthday party football fun" loading="lazy" /></div>
          <div className="price-chip"><span className="n">From &pound;120</span><span className="l">All-inclusive</span></div>
        </div>
      </div>

      <div className="wrap party-gallery-wrap">
        <div className="party-gallery" data-reveal>
          {bdayVideos.map((src, i) => (
            <div className="party-media party-media--clip" key={`v${i}`}><Clip src={src} className="party-video" /></div>
          ))}
          {bdayPhotos.slice(1).map((src, i) => (
            <div className="party-media" key={`p${i}`}>
              <img src={src} alt={`Birthday party photo ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About + coaches ---------- */
export function About() {
  const coaches = [
    { name: "Coach [Name]", role: "Head Coach", bio: "UEFA-qualified, 10+ years with young players." },
    { name: "Coach [Name]", role: "Lead Coach", bio: "Specialist in early-years fun and fundamentals." },
    { name: "Coach [Name]", role: "Academy Coach", bio: "Former semi-pro, brilliant with 6\u20139s." },
    { name: "Coach [Name]", role: "Camp Coordinator", bio: "Keeps every session safe, fair and buzzing." },
  ];
  return (
    <section className="section" id="about">
      <div className="wrap split split--reverse">
        <div className="split-media about-media" data-reveal>
          <div className="about-photo about-photo--1"><span>Team photo</span></div>
          <div className="about-photo about-photo--2"><span>Action photo</span></div>
        </div>
        <div className="about-copy" data-reveal>
          <p className="index-tag"><span className="line" /> About Us</p>
          <h2 className="section-title">Coaching kids<br />to love the game</h2>
          <p>
            Champion Sport Activities started with a simple idea: every child deserves to feel like
            a champion, whatever their skill level. [Placeholder story &mdash; swap in your founder's
            words and the year you began.]
          </p>
          <p>Our coaches are DBS-checked, first-aid trained and, above all, brilliant with kids.</p>
          <ul className="value-row">
            <li><strong>Safe</strong><span>Vetted, insured, first-aid ready</span></li>
            <li><strong>Fun</strong><span>Games-based, pressure-free</span></li>
            <li><strong>Inclusive</strong><span>Every ability welcome</span></li>
          </ul>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: "clamp(56px, 8vw, 104px)" }}>
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> Meet the team</p>
          <h2 className="section-title">Your coaches</h2>
        </header>
        <div className="coach-grid">
          {coaches.map((c, i) => (
            <article className="coach-card" key={i} data-reveal>
              <div className="coach-photo"><span>Coach photo</span></div>
              <div className="coach-body">
                <h3>{c.name}</h3>
                <p className="coach-role">{c.role}</p>
                <p>{c.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
export function Reviews() {
  const reviews = [
    { text: "My son counts down the days until Saturday football. The coaches are endlessly patient and he's grown so much in confidence.", by: "Sarah M., Junior Academy parent" },
    { text: "Booked a birthday party and it was faultless. Every child was involved and the medals were a lovely touch. Stress-free for us!", by: "James T., birthday dad" },
    { text: "As a nervous first-timer my daughter was made to feel so welcome. She's now football mad. Can't recommend them enough.", by: "Priya K., Mini Kicker parent" },
  ];
  return (
    <section className="section section--alt" id="reviews">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> Reviews</p>
          <h2 className="section-title">What parents say</h2>
          <p className="section-intro">Real words from real families. [Swap in your genuine testimonials.]</p>
        </header>
        <div className="review-grid">
          {reviews.map((r) => (
            <figure className="review" key={r.by} data-reveal>
              <div className="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <blockquote>{r.text}</blockquote>
              <figcaption>&mdash; {r.by}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
// Real session + party photos from src/assets/media (club-* and bday-*),
// shown full-colour in a draggable Smooth Scroll Slider (Originkit).
const GALLERY_ITEMS = [...clubPhotos, ...bdayPhotos].map((image) => ({ image }));

// Give the slider a shorter box and smaller tiles on narrow screens; tile
// widths are derived per-image from each photo's aspect ratio.
function useGalleryLayout() {
  const read = () => {
    if (typeof window === "undefined") return { height: 640, slideHeight: 380 };
    if (window.innerWidth <= 560) return { height: 360, slideHeight: 230 };
    if (window.innerWidth <= 900) return { height: 480, slideHeight: 300 };
    return { height: 640, slideHeight: 380 };
  };
  const [layout, setLayout] = useState(read);
  useEffect(() => {
    const onResize = () => setLayout(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return layout;
}

export function Gallery() {
  const { height, slideHeight } = useGalleryLayout();
  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> Gallery</p>
          <h2 className="section-title">Smiles in action</h2>
          <p className="section-intro">Drag or use the arrows to explore session and party moments.</p>
        </header>
      </div>
      <div className="gallery-drift" data-reveal style={{ height }}>
        <SmoothScrollSlider
          images={GALLERY_ITEMS}
          slideHeight={slideHeight}
          radius={14}
          spacing={2}
          smoothness={9}
          dim={6}
          sensitivity={5}
          autoSpeed={16}
          background="transparent"
        />
      </div>
    </section>
  );
}

/* ---------- Locations ---------- */
export function Locations() {
  const venues = [
    { name: "[Venue One]", addr: "Sports Centre, Your Town, AB1 2CD", days: "Sat & Sun mornings" },
    { name: "[Venue Two]", addr: "Community Pitch, Your Town, AB3 4EF", days: "Wed & Fri after school" },
    { name: "[Venue Three]", addr: "Leisure Ground, Your Town, AB5 6GH", days: "Mon & Thu after school" },
  ];
  return (
    <section className="section" id="locations">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> Locations</p>
          <h2 className="section-title">Find a club<br />near you</h2>
          <p className="section-intro">We run clubs across town. Here's where to find us.</p>
        </header>
        <div className="loc-layout">
          <div className="loc-list" data-reveal>
            {venues.map((v) => (
              <div className="loc-card" key={v.name}>
                <span className="loc-ico"><PinIcon /></span>
                <div>
                  <h3>{v.name}</h3>
                  <p>{v.addr}</p>
                  <p className="days">{v.days}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="map-embed" data-reveal>
            <iframe
              title="Champion Sport Activities locations map"
              src="https://www.google.com/maps?q=London&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Coming soon ---------- */
export function ComingSoon() {
  const cards = [
    { title: "School Clubs", copy: "Breakfast, lunch and after-school football clubs delivered right at your school gates. Curriculum-friendly and PE-supporting.", cta: "Register interest" },
    { title: "Holiday Camps", copy: "Full and half-day multi-sport camps to keep kids active through every school holiday. Early-bird list opening soon.", cta: "Join the waitlist" },
  ];
  return (
    <section className="section" id="soon">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <p className="index-tag"><span className="line" /> Coming Soon</p>
          <h2 className="section-title">Two big things<br />are warming up</h2>
        </header>
        <div className="soon-grid">
          {cards.map((c) => (
            <article className="soon-card" key={c.title} data-reveal>
              <span className="soon-flag">Coming soon</span>
              <h3>{c.title}</h3>
              <p>{c.copy}</p>
              <Link className="btn btn-solid" to="/contact">{c.cta} <ArrowIcon /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking CTA banner ---------- */
export function BookingCTA() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="booking-cta" data-reveal>
          <div>
            <h2>Ready to get your little champion started?</h2>
            <p>Free taster sessions available for all clubs. We'll reply within one working day.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-on-panel btn-lg" to="/contact">Book now <ArrowIcon /></Link>
            <a className="btn btn-ghost-panel btn-lg" href="tel:+447950097343">Call us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
