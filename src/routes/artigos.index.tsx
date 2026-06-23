import { createFileRoute } from '@tanstack/react-router'
import ArtigosPage from '../app/pages/ArtigosPage'
import { fnListArticles } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/artigos/')({
  component: ArtigosPage,
  loader: async () => {
    const list = await fnListArticles({ data: { perPage: 12 } })
    return { list }
  },
  head: ({ loaderData }) =>
    pageSeo({
      title: 'Artigos',
      description:
        'Todos os artigos da Revista Chiveve — economia, empreendedorismo, liderança, inovação e mais.',
      path: '/artigos',
      image: loaderData?.list.articles[0]?.heroImage,
      imageAlt: loaderData?.list.articles[0]?.heroAlt,
    }),
})
