import { useState } from "react";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = {};
    if (!String(data.get("parent-name") || "").trim()) next["parent-name"] = "Please enter your name.";
    if (!EMAIL_RE.test(String(data.get("email") || "").trim())) next["email"] = "Please enter a valid email.";
    setErrors(next);
    setServerError("");

    if (Object.keys(next).length > 0) {
      setSent(false);
      const first = document.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSent(true);
      form.reset();
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="index-tag"><span className="line" /> Contact / Booking</p>
          <h2 className="section-title">Get your<br />champion started</h2>
          <p className="section-intro">
            Send an enquiry and we'll get back to you within one working day. Free taster
            sessions available for all clubs.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-ico" aria-hidden="true"><PhoneIcon /></span>
              <div><span className="contact-label">Phone</span><a href="tel:+447950097343">+44 7950 097343</a></div>
            </li>
            <li>
              <span className="contact-ico" aria-hidden="true"><MailIcon /></span>
              <div><span className="contact-label">Email</span><a href="mailto:championsportsclubltd@gmail.com">championsportsclubltd@gmail.com</a></div>
            </li>
            <li>
              <span className="contact-ico" aria-hidden="true"><PinIcon /></span>
              <div><span className="contact-label">Venue</span><span className="val">[ Placeholder venue, Your Town, AB1 2CD ]</span></div>
            </li>
          </ul>

          <div className="socials" aria-label="Social media">
            <a href="#" className="social" aria-label="Facebook">Facebook</a>
            <a href="#" className="social" aria-label="Instagram">Instagram</a>
            <a href="#" className="social" aria-label="TikTok">TikTok</a>
          </div>
        </div>

        <form className="booking-form" aria-label="Enquiry and booking form" noValidate onSubmit={handleSubmit} data-reveal>
          <h3 className="form-title">Make an enquiry</h3>

          <div className="field">
            <label htmlFor="parent-name">Your name</label>
            <input id="parent-name" name="parent-name" type="text" autoComplete="name"
              aria-invalid={errors["parent-name"] ? "true" : undefined} required />
            {errors["parent-name"] && <p className="field-error">{errors["parent-name"]}</p>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email"
                aria-invalid={errors.email ? "true" : undefined} required />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="child-age">Child's age</label>
              <input id="child-age" name="child-age" type="number" min="3" max="12" inputMode="numeric" />
            </div>
            <div className="field">
              <label htmlFor="interest">I'm interested in</label>
              <select id="interest" name="interest" defaultValue="football">
                <option value="football">Football club</option>
                <option value="party">Birthday party</option>
                <option value="school">School clubs (coming soon)</option>
                <option value="camp">Holiday camps (coming soon)</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Tell us a little about what you're after..." />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
            {submitting ? "Sending…" : <>Send enquiry <ArrowIcon /></>}
          </button>
          <p className="form-note">
            We'll never share your details. We'll reply to the email address you provide.
          </p>
          {serverError && (
            <p className="field-error" role="alert">{serverError}</p>
          )}
          {sent && (
            <p className="form-success" role="status">
              Thanks! Your enquiry has been sent. We'll be in touch within one working day.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
