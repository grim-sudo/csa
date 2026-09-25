import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ArrowIcon } from "../components/icons";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="Sorry, we couldn't find that page."
        path="/404"
      />
      <section className="section notfound">
        <div className="wrap" data-reveal>
          <p className="index-tag"><span className="line" /> Error 404</p>
          <h1 className="section-title">This one went out of play</h1>
          <p className="section-intro">
            We couldn't find the page you were after. Let's get you back on the pitch.
          </p>
          <Link className="btn btn-primary btn-lg" to="/">Back to home <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
