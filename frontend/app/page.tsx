import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/home/HeroSection";
import FeaturedCrafts from "@/components/home/FeaturedCrafts";
import TraditionTaglineBanner from "@/components/home/TraditionTaglineBanner";
import ArtisanStory from "@/components/home/ArtisanStory";
import HeritageSection from "@/components/home/HeritageSection";
import HowItWorks from "@/components/home/HowItWorks";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="kalakriti-paper min-h-screen">
      <Header />

      <main>
        <HeroSection />
        <FeaturedCrafts />
        <TraditionTaglineBanner />
        <ArtisanStory />
        <HeritageSection />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
