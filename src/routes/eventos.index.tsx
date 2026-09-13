import { createFileRoute, notFound } from '@tanstack/react-router'
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
    const allEvents = await fnListEvents().catch(() => [])
    const perPage = 8
    const start = (deps.page - 1) * perPage
    const totalPages = Math.max(1, Math.ceil(allEvents.length / perPage))
    if (deps.page > totalPages) throw notFound()
    return {
      events: allEvents.slice(start, start + perPage),
      currentPage: deps.page,
      totalPages,
      total: allEvents.length,
    }
  },
  head: ({ loaderData }) => {
    const page = loaderData?.currentPage ?? 1
    return pageSeo({
      title: page > 1 ? `Eventos - Página ${page}` : 'Eventos',
      description:
        'Agenda empresarial, encontros estratégicos, conferências, formações e oportunidades de networking em Moçambique.' +
        (page > 1 ? ` Página ${page}.` : ''),
      path: page > 1 ? `/eventos?page=${page}` : '/eventos',
      image: loaderData?.events[0]?.image,
      imageAlt: loaderData?.events[0]?.title,
    })
  },
})
