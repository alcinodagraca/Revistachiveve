import { createFileRoute, notFound } from '@tanstack/react-router'
import ArtigosPage from '../app/pages/ArtigosPage'
import { fnListArticles } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

type SearchParams = { page?: number }

export const Route = createFileRoute('/artigos/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    page:
      typeof search.page === "number"
        ? Math.max(1, Math.floor(search.page))
        : typeof search.page === "string" && Number.isFinite(Number(search.page))
          ? Math.max(1, Math.floor(Number(search.page)))
          : 1,
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  component: ArtigosPage,
  loader: async ({ deps }) => {
    const list = await fnListArticles({ data: { page: deps.page, perPage: 12 } })
    if (deps.page > Math.max(1, list.totalPages)) throw notFound()
    return { list, currentPage: deps.page }
  },
  head: ({ loaderData }) => {
    const page = loaderData?.currentPage ?? 1
    return pageSeo({
      title: page > 1 ? `Artigos - Página ${page}` : 'Artigos',
      description:
        'Todos os artigos da Revista Chiveve — economia, empreendedorismo, liderança, inovação e mais.' +
        (page > 1 ? ` Página ${page}.` : ''),
      path: page > 1 ? `/artigos?page=${page}` : '/artigos',
      image: loaderData?.list.articles[0]?.heroImage,
      imageAlt: loaderData?.list.articles[0]?.heroAlt,
    })
  },
})
