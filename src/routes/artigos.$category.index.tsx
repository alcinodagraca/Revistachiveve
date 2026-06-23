import { createFileRoute, notFound } from '@tanstack/react-router'
import CategoryPage from '../app/pages/CategoryPage'
import { fnGetCategoryWithArticles } from '../server/wp/server-fns'
import { breadcrumbJsonLd, pageSeo } from '../server/seo'

export const Route = createFileRoute('/artigos/$category/')({
  component: CategoryPage,
  loader: async ({ params }) => {
    const data = await fnGetCategoryWithArticles({
      data: { slug: params.category, perPage: 24 },
    })
    if (!data) throw notFound()
    return data
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
