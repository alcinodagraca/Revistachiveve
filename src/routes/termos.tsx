import { createFileRoute } from "@tanstack/react-router";
import { TermosPage } from "../app/pages/LegalPage";

export const Route = createFileRoute("/termos")({
  component: TermosPage,
});
