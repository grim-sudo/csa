import { Seo } from "../components/Seo";
import { Hero } from "../components/Hero";
import { Ticker, Activities, Statement, Stats, Reviews, BookingCTA } from "../components/Sections";

export default function Home() {
  return (
    <>
      <Seo
        title="Kids Football Clubs & Birthday Parties"
        description="Fun-first football coaching for ages 3–12. Weekly clubs, birthday parties and holiday camps led by DBS-checked coaches. Book a free taster session today."
        path="/"
      />
      <Hero />
      <Ticker />
      <Activities />
      <Statement />
      <Stats />
      <Reviews />
      <BookingCTA />
    </>
  );
}
