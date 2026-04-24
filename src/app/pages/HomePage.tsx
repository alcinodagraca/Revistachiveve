import { DestaquesSection } from "../components/DestaquesSection";
import { EntrevistaSection } from "../components/EntrevistaSection";
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

      {/* MAIS LIDOS - Most read carousel */}
      <MaisLidosSection />

      {/* ENTREVISTA - Video section */}
      <ContinueImpactadoSection />

      {/* LANÇAMENTOS - New releases grid */}
      <LancamentosSection />

      {/* EVENTOS PASSADOS - Past events */}
      <EventosPassadosSection />

      {/* NEWSLETTER - Subscription with magazine covers */}
      <NewsletterSection />

      {/* COMMUNITY CTA */}
      <CommunityCTA />
    </>
  );
}
