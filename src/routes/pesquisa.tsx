import { createFileRoute } from "@tanstack/react-router";
import SearchPage from "../app/pages/SearchPage";

type SearchParams = { q?: string };

export const Route = createFileRoute("/pesquisa")({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
});
