import { createFileRoute } from '@tanstack/react-router'
import ArtigosPage from '../app/pages/ArtigosPage'
import { fnListArticles } from '../server/wp/server-fns'

export const Route = createFileRoute('/artigos/')({
  component: ArtigosPage,
  loader: async () => {
    const list = await fnListArticles({ data: { perPage: 12 } })
    return { list }
  },
  head: () => ({
    meta: [
      { title: 'Artigos · Revista Chiveve' },
      {
        name: 'description',
        content:
          'Todos os artigos da Revista Chiveve — economia, empreendedorismo, liderança, inovação e mais.',
      },
    ],
  }),
})
