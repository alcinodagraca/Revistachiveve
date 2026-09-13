import { createFileRoute, notFound } from "@tanstack/react-router";
import ConcursosPublicosPage from "../app/pages/ConcursosPublicosPage";
import { fnListTenders } from "../server/wp/server-fns";
import { pageSeo } from "../server/seo";
import { mockTenders } from "../data/mockListings";

type SearchParams = { page?: number };

export const Route = createFileRoute("/concursos-publicos")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    page:
      typeof search.page === "number"
        ? Math.max(1, Math.floor(search.page))
        : typeof search.page === "string" &&
            Number.isFinite(Number(search.page))
          ? Math.max(1, Math.floor(Number(search.page)))
          : 1,
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  component: ConcursosPublicosPage,
  loader: async ({ deps }) => {
    const perPage = 10;
    const list = await fnListTenders({
      data: { page: deps.page, perPage },
    }).catch(() => ({ tenders: [], total: 0, totalPages: 0 }));
    const mockSlots = deps.page === 1 ? Math.max(0, 6 - list.tenders.length) : 0;
    const tenders = [
      ...list.tenders,
      ...mockTenders.slice(0, mockSlots),
    ];
    const usesMockData = mockSlots > 0;
    const total = usesMockData ? tenders.length : list.total;
    const totalPages = usesMockData ? 1 : Math.max(1, list.totalPages);
    if (deps.page > totalPages) throw notFound();
    return {
      tenders,
      currentPage: deps.page,
      totalPages,
      total,
    };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.currentPage ?? 1;
    return pageSeo({
      title:
        page > 1 ? `Concursos Públicos - Página ${page}` : "Concursos Públicos",
      description:
        "Oportunidades de contratação, fornecimento e prestação de serviços para empresas e profissionais em Moçambique." +
        (page > 1 ? ` Página ${page}.` : ""),
      path:
        page > 1 ? `/concursos-publicos?page=${page}` : "/concursos-publicos",
    });
  },
});
