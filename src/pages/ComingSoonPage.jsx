import { Seo } from "../components/Seo";
import { ComingSoon, BookingCTA } from "../components/Sections";

export default function ComingSoonPage() {
  return (
    <>
      <Seo
        title="School Clubs & Holiday Camps (Coming Soon)"
        description="School football clubs and multi-sport holiday camps are on the way. Register your interest and join the waitlist to be first to hear when booking opens."
        path="/coming-soon"
      />
      <ComingSoon />
      <BookingCTA />
    </>
  );
}
