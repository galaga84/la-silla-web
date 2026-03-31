import { CtaBanner } from "@/components/cta-banner";
import { FeaturedArtists } from "@/components/featured-artists";
import { Hero } from "@/components/hero";
import { HomeNewsPreview } from "@/components/home-news-preview";
import { RecentReleases } from "@/components/recent-releases";
import { UpcomingShows } from "@/components/upcoming-shows";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeNewsPreview />
      <FeaturedArtists />
      <RecentReleases />
      <UpcomingShows />
      <CtaBanner />
    </main>
  );
}