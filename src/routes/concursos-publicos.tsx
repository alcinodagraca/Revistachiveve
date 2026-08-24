import { createFileRoute } from '@tanstack/react-router'
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
    return {
      tenders: allTenders.slice(start, start + perPage),
      currentPage: deps.page,
      totalPages: Math.max(1, Math.ceil(allTenders.length / perPage)),
      total: allTenders.length,
    }
  },
  head: () =>
    pageSeo({
      title: 'Concursos Públicos',
      description:
        'Oportunidades de emprego e concursos públicos em Moçambique. Editais de instituições governamentais e privadas.',
      path: '/concursos-publicos',
    }),
})
