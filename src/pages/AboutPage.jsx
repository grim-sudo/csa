import { Seo } from "../components/Seo";
import { About, BookingCTA } from "../components/Sections";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us & Our Coaches"
        description="Meet the team behind Champion Sport Activities. DBS-checked, first-aid trained coaches on a mission to help every child love the game and feel like a champion."
        path="/about"
      />
      <About />
      <BookingCTA />
    </>
  );
}
