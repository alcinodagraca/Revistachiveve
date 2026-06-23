import { createFileRoute } from "@tanstack/react-router";
import SearchPage from "../app/pages/SearchPage";
import { fnListArticles } from "../server/wp/server-fns";
import { pageSeo } from "../server/seo";

type SearchParams = { q?: string };

export const Route = createFileRoute("/pesquisa")({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q ?? "" }),
  loader: async ({ deps }) => {
    if (!deps.q) return { list: { articles: [], total: 0, totalPages: 0 }, q: "" };
    const list = await fnListArticles({
      data: { search: deps.q, perPage: 20 },
    });
    return { list, q: deps.q };
  },
  head: ({ loaderData }) =>
    pageSeo({
      title: loaderData?.q ? `"${loaderData.q}" · Pesquisa` : "Pesquisa",
      description:
        "Pesquise artigos da Revista Chiveve por palavra-chave, tema, cidade ou autor.",
      path: "/pesquisa",
      noindex: true,
    }),
});
