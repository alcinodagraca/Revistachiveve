import { createFileRoute } from "@tanstack/react-router";
import { TermosPage } from "../app/pages/LegalPage";
import { pageSeo } from "../server/seo";

export const Route = createFileRoute("/termos")({
  component: TermosPage,
  head: () =>
    pageSeo({
      title: "Termos e Condições",
      description:
        "Termos e condições de utilização do site da Revista Chiveve.",
      path: "/termos",
    }),
});
