import { createFileRoute, notFound } from '@tanstack/react-router'
import CategoryPage from '../app/pages/CategoryPage'
import { fnGetCategoryWithArticles } from '../server/wp/server-fns'
import { breadcrumbJsonLd, pageSeo } from '../server/seo'

type SearchParams = { page?: number }

export const Route = createFileRoute('/artigos/$category/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    page:
      typeof search.page === "number"
        ? Math.max(1, Math.floor(search.page))
        : typeof search.page === "string" && Number.isFinite(Number(search.page))
          ? Math.max(1, Math.floor(Number(search.page)))
          : 1,
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  component: CategoryPage,
  loader: async ({ params, deps }) => {
    const data = await fnGetCategoryWithArticles({
      data: { slug: params.category, page: deps.page, perPage: 12 },
    })
    if (!data) throw notFound()
    return { ...data, currentPage: deps.page }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageSeo({
        title: 'Categoria',
        description: 'Artigos da Revista Chiveve por categoria.',
        path: '/artigos',
      })
    }
    const path = `/artigos/${loaderData.category.slug}`
    return pageSeo({
      title: loaderData.category.name,
      description:
        loaderData.category.description ||
        `Artigos da Revista Chiveve na categoria ${loaderData.category.name}.`,
      path,
      image: loaderData.articles[0]?.heroImage,
      imageAlt: loaderData.articles[0]?.heroAlt,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Artigos', path: '/artigos' },
          { name: loaderData.category.name, path },
        ]),
      ],
    })
  },
})
