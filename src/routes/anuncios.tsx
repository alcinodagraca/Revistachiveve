import { createFileRoute } from "@tanstack/react-router";
import { AnunciosPage } from "../app/pages/LegalPage";

export const Route = createFileRoute("/anuncios")({
  component: AnunciosPage,
});
