import { Seo } from "../components/Seo";
import { Reviews, Gallery, BookingCTA } from "../components/Sections";

export default function ReviewsPage() {
  return (
    <>
      <Seo
        title="Reviews & Gallery"
        description="See what parents say about Champion Sport Activities and browse photos of our football clubs and birthday parties in action."
        path="/reviews"
      />
      <Reviews />
      <Gallery />
      <BookingCTA />
    </>
  );
}
