import { createFileRoute } from '@tanstack/react-router'
import EdicaoImpressaPage from '../app/pages/EdicaoImpressaPage'
import { fnListEditions } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/edicao-impressa')({
  component: EdicaoImpressaPage,
  loader: async () => {
    const editions = await fnListEditions()
    return { editions }
  },
  head: ({ loaderData }) => {
    const current = loaderData?.editions?.find((e) => e.featured) ?? loaderData?.editions?.[0]
    return pageSeo({
      title: 'Edição Impressa',
      description:
        'Leia a edição actual e consulte o arquivo da Revista Negócios no Chiveve.',
      path: '/edicao-impressa',
      image: current?.cover,
      imageAlt: current?.title,
    })
  },
})
