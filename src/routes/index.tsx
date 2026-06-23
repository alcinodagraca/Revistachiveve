import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../app/pages/HomePage'
import { fnListArticles } from '../server/wp/server-fns'
import { pageSeo, SITE_TAGLINE } from '../server/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    const [recent, opiniao, economia, entrevistas] = await Promise.all([
      fnListArticles({ data: { perPage: 6 } }),
      fnListArticles({ data: { categorySlug: 'opiniao', perPage: 3 } }),
      fnListArticles({ data: { categorySlug: 'economia', perPage: 5 } }),
      fnListArticles({ data: { categorySlug: 'entrevistas', perPage: 1 } }),
    ])
    return { recent, opiniao, economia, entrevistas }
  },
  head: ({ loaderData }) =>
    pageSeo({
      title: 'Revista Chiveve',
      description: SITE_TAGLINE,
      path: '/',
      image: loaderData?.recent.articles[0]?.heroImage,
      imageAlt: loaderData?.recent.articles[0]?.heroAlt,
    }),
})
