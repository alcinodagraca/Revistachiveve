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
    if (deps.page > Math.max(1, data.totalPages)) throw notFound()
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
    const categoryPath = `/artigos/${loaderData.category.slug}`
    const page = loaderData.currentPage
    const path = page > 1 ? `${categoryPath}?page=${page}` : categoryPath
    return pageSeo({
      title:
        page > 1
          ? `${loaderData.category.name} - Página ${page}`
          : loaderData.category.name,
      description:
        (loaderData.category.description ||
          `Artigos da Revista Chiveve na categoria ${loaderData.category.name}.`) +
        (page > 1 ? ` Página ${page}.` : ''),
      path,
      image: loaderData.articles[0]?.heroImage,
      imageAlt: loaderData.articles[0]?.heroAlt,
      noindex: loaderData.category.count === 0,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Artigos', path: '/artigos' },
          { name: loaderData.category.name, path: categoryPath },
        ]),
      ],
    })
  },
})
