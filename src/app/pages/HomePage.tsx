import { DestaquesSection } from "../components/DestaquesSection";
import { EntrevistaSection } from "../components/EntrevistaSection";
import { CategoriaSection } from "../components/CategoriaSection";
import { AdvertisementBanner } from "../components/AdvertisementBanner";
import { ColunistasSection } from "../components/ColunistasSection";
import { NewsletterSection } from "../components/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <DestaquesSection />
      <EntrevistaSection />
      <CategoriaSection />
      <AdvertisementBanner />
      <ColunistasSection />
      <NewsletterSection />
    </>
  );
}
