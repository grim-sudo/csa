import { Link } from "react-router-dom";
import { ArrowIcon } from "./icons";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="pill">Ages 3&ndash;12</span>
            Football clubs &middot; Parties &middot; Camps
          </p>
          <h1 className="hero-title">
            <span className="line"><span>Play.</span></span>
            <span className="line"><span>Learn.</span></span>
            <span className="line"><span>Be a <span className="accent">Champion.</span></span></span>
          </h1>
          <p className="hero-lead">
            Fun-first football coaching that builds confidence, friendships and skills &mdash;
            led by DBS-checked coaches who make sure every kid leaves with a grin.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/contact">Book a free taster <ArrowIcon /></Link>
            <Link className="btn btn-ghost-panel btn-lg" to="/football-clubs">Explore clubs</Link>
          </div>
          <ul className="hero-trust">
            <li><span className="dot" /> DBS-checked coaches</li>
            <li><span className="dot" /> Fully insured</li>
            <li><span className="dot" /> First-aid trained</li>
          </ul>
        </div>

        <div className="hero-media">
          <div className="hero-photo">
            {/* Swap for a real action shot: <img src="/hero.jpg" alt="Kids playing football" /> */}
          </div>
          <div className="hero-badge">
            <strong>Free</strong>
            <span>Taster session</span>
          </div>
          <div className="hero-stat">
            <span className="n">1,200+</span>
            <span className="l">Young players</span>
          </div>
        </div>
      </div>
    </section>
  );
}
