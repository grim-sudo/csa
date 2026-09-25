import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import FootballClubsPage from "./pages/FootballClubsPage";
import PartiesPage from "./pages/PartiesPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import LocationsPage from "./pages/LocationsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="football-clubs" element={<FootballClubsPage />} />
          <Route path="birthday-parties" element={<PartiesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="coming-soon" element={<ComingSoonPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
