import { createFileRoute } from '@tanstack/react-router'
import ArtigosPage from '../app/pages/ArtigosPage'
import { fnGetArticlesLanding } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/artigos/')({
  component: ArtigosPage,
  loader: () => fnGetArticlesLanding(),
  head: ({ loaderData }) => {
    const leadArticle = loaderData?.sections[0]?.articles[0]
    return pageSeo({
      title: 'Artigos',
      description:
        'Leituras sobre negócios, economia e empreendedorismo em Moçambique, com reportagens, entrevistas, análises e opiniões.',
      path: '/artigos',
      image: leadArticle?.heroImage,
      imageAlt: leadArticle?.heroAlt,
    })
  },
})
