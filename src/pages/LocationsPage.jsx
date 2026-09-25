import { Seo } from "../components/Seo";
import { Locations, BookingCTA } from "../components/Sections";

export default function LocationsPage() {
  return (
    <>
      <Seo
        title="Locations"
        description="Find a Champion Sport Activities football club near you. We run weekly clubs across town — see venues, days and times, and get directions."
        path="/locations"
      />
      <Locations />
      <BookingCTA />
    </>
  );
}
