import { createFileRoute } from "@tanstack/react-router";
import SearchPage from "../app/pages/SearchPage";
import { fnListArticles } from "../server/wp/server-fns";
import { pageSeo } from "../server/seo";

type SearchParams = { q?: string; page?: number };

export const Route = createFileRoute("/pesquisa")({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
    page:
      typeof search.page === "number"
        ? Math.max(1, Math.floor(search.page))
        : typeof search.page === "string" && Number.isFinite(Number(search.page))
          ? Math.max(1, Math.floor(Number(search.page)))
          : 1,
  }),
  loaderDeps: ({ search }) => ({ q: search.q ?? "", page: search.page ?? 1 }),
  loader: async ({ deps }) => {
    if (!deps.q) {
      return { list: { articles: [], total: 0, totalPages: 0 }, q: "", currentPage: 1 };
    }
    const list = await fnListArticles({
      data: { search: deps.q, page: deps.page, perPage: 12 },
    });
    return { list, q: deps.q, currentPage: deps.page };
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
