import { createFileRoute } from '@tanstack/react-router'
import EventosPage from '../app/pages/EventosPage'
import { fnListEvents } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

type SearchParams = { page?: number }

export const Route = createFileRoute('/eventos/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    page:
      typeof search.page === "number"
        ? Math.max(1, Math.floor(search.page))
        : typeof search.page === "string" && Number.isFinite(Number(search.page))
          ? Math.max(1, Math.floor(Number(search.page)))
          : 1,
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  component: EventosPage,
  loader: async ({ deps }) => {
    const allEvents = await fnListEvents()
    const perPage = 8
    const start = (deps.page - 1) * perPage
    return {
      events: allEvents.slice(start, start + perPage),
      currentPage: deps.page,
      totalPages: Math.max(1, Math.ceil(allEvents.length / perPage)),
      total: allEvents.length,
    }
  },
  head: ({ loaderData }) =>
    pageSeo({
      title: 'Eventos',
      description:
        'Próximos eventos de negócios, empreendedorismo e liderança em Moçambique.',
      path: '/eventos',
      image: loaderData?.events[0]?.image,
      imageAlt: loaderData?.events[0]?.title,
    }),
})
