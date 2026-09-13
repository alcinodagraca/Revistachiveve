import { createFileRoute } from "@tanstack/react-router";
import { PrivacidadePage } from "../app/pages/LegalPage";
import { pageSeo } from "../server/seo";

export const Route = createFileRoute("/privacidade")({
  component: PrivacidadePage,
  head: () =>
    pageSeo({
      title: "Política de Privacidade",
      description:
        "Política de privacidade da Revista Negócios no Chiveve: como recolhemos, utilizamos e protegemos os seus dados.",
      path: "/privacidade",
    }),
});
