import { createFileRoute, notFound } from '@tanstack/react-router'
import ConcursosPublicosPage from '../app/pages/ConcursosPublicosPage'
import { fnListTenders } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

type SearchParams = { page?: number }

export const Route = createFileRoute('/concursos-publicos')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    page:
      typeof search.page === "number"
        ? Math.max(1, Math.floor(search.page))
        : typeof search.page === "string" && Number.isFinite(Number(search.page))
          ? Math.max(1, Math.floor(Number(search.page)))
          : 1,
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  component: ConcursosPublicosPage,
  loader: async ({ deps }) => {
    const allTenders = (await fnListTenders()) ?? []
    const perPage = 8
    const start = (deps.page - 1) * perPage
    const totalPages = Math.max(1, Math.ceil(allTenders.length / perPage))
    if (deps.page > totalPages) throw notFound()
    return {
      tenders: allTenders.slice(start, start + perPage),
      currentPage: deps.page,
      totalPages,
      total: allTenders.length,
    }
  },
  head: ({ loaderData }) => {
    const page = loaderData?.currentPage ?? 1
    return pageSeo({
      title: page > 1 ? `Concursos Públicos - Página ${page}` : 'Concursos Públicos',
      description:
        'Oportunidades de emprego e concursos públicos em Moçambique. Editais de instituições governamentais e privadas.' +
        (page > 1 ? ` Página ${page}.` : ''),
      path: page > 1 ? `/concursos-publicos?page=${page}` : '/concursos-publicos',
    })
  },
})
