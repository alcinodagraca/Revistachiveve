import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../app/pages/HomePage'
import { fnListArticles, fnListEditions } from '../server/wp/server-fns'
import {
  organizationJsonLd,
  pageSeo,
  SITE_NAME,
  SITE_TAGLINE,
  websiteJsonLd,
} from '../server/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    const [recent, opiniao, entrevistas, editions] = await Promise.all([
      fnListArticles({ data: { perPage: 6 } }),
      fnListArticles({ data: { categorySlug: 'opiniao', perPage: 3 } }),
      fnListArticles({ data: { categorySlug: 'entrevistas', perPage: 1 } }),
      fnListEditions(),
    ])
    return { recent, opiniao, entrevistas, editions: editions ?? [] }
  },
  head: () =>
    pageSeo({
      title: SITE_NAME,
      description: SITE_TAGLINE,
      path: '/',
      imageAlt: 'Revista Negócios no Chiveve',
      jsonLd: [organizationJsonLd(), websiteJsonLd()],
    }),
})
