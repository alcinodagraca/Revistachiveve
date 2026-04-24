import { DestaquesSection } from "../components/DestaquesSection";
import { EntrevistaSection } from "../components/EntrevistaSection";
import { CategoriaSection } from "../components/CategoriaSection";
import { MaisLidosSection } from "../components/MaisLidosSection";
import { ContinueImpactadoSection } from "../components/ContinueImpactadoSection";
import { LancamentosSection } from "../components/LancamentosSection";
import { EventosPassadosSection } from "../components/EventosPassadosSection";
import { NewsletterSection } from "../components/NewsletterSection";
import { CommunityCTA } from "../components/CommunityCTA";

export default function HomePage() {
  return (
    <>
      {/* DESTAQUES - Featured articles */}
      <DestaquesSection />

      {/* ENTREVISTA - New section */}
      <EntrevistaSection />

      {/* CATEGORIA - Category section */}
      <CategoriaSection />

      {/* EVENTOS PASSADOS - Past events */}
      <EventosPassadosSection />

      {/* NEWSLETTER - Subscription with magazine covers */}
      <NewsletterSection />
    </>
  );
}
