import { createFileRoute } from "@tanstack/react-router";
import { PrivacidadePage } from "../app/pages/LegalPage";

export const Route = createFileRoute("/privacidade")({
  component: PrivacidadePage,
});
