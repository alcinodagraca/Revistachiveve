import { createFileRoute, notFound } from '@tanstack/react-router'
import CategoryPage from '../app/pages/CategoryPage'
import { fnGetCategoryWithArticles } from '../server/wp/server-fns'

export const Route = createFileRoute('/artigos/$category/')({
  component: CategoryPage,
  loader: async ({ params }) => {
    const data = await fnGetCategoryWithArticles({
      data: { slug: params.category, perPage: 24 },
    })
    if (!data) throw notFound()
    return data
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.category.name} · Revista Chiveve`
          : 'Categoria · Revista Chiveve',
      },
      {
        name: 'description',
        content:
          loaderData?.category.description ??
          'Artigos da Revista Chiveve por categoria.',
      },
    ],
  }),
})
