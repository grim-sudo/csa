import { Seo } from "../components/Seo";
import { Parties, BookingCTA } from "../components/Sections";

export default function PartiesPage() {
  return (
    <>
      <Seo
        title="Kids Football Birthday Parties"
        description="Book a football birthday party your child's whole class will talk about. 90 minutes of coached games, a medal for every guest and a trophy for the birthday champion."
        path="/birthday-parties"
      />
      <Parties />
      <BookingCTA />
    </>
  );
}
