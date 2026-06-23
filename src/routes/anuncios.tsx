import { createFileRoute } from "@tanstack/react-router";
import { AnunciosPage } from "../app/pages/LegalPage";
import { pageSeo } from "../server/seo";

export const Route = createFileRoute("/anuncios")({
  component: AnunciosPage,
  head: () =>
    pageSeo({
      title: "Anuncie Connosco",
      description:
        "Espaços publicitários e parcerias na Revista Chiveve. Alcance o público de decisores em Moçambique.",
      path: "/anuncios",
    }),
});
