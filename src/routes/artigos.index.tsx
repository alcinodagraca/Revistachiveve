import { createFileRoute } from '@tanstack/react-router'
import ArtigosPage from '../app/pages/ArtigosPage'
import { fnListArticles, fnListCategories } from '../server/wp/server-fns'

export const Route = createFileRoute('/artigos/')({
  component: ArtigosPage,
  loader: async () => {
    const [list, categories] = await Promise.all([
      fnListArticles({ data: { perPage: 12 } }),
      fnListCategories(),
    ])
    return { list, categories }
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
