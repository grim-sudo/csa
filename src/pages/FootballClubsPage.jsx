import { Seo } from "../components/Seo";
import { FootballClubs, BookingCTA } from "../components/Sections";

export default function FootballClubsPage() {
  return (
    <>
      <Seo
        title="Football Clubs for Ages 3–12"
        description="Weekly kids football clubs split by age and stage — Mini Kickers, Junior Academy and Elite Strikers. Small groups, qualified coaches and loads of fun."
        path="/football-clubs"
      />
      <FootballClubs />
      <BookingCTA />
    </>
  );
}
