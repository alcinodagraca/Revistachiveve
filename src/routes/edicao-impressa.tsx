import { createFileRoute } from '@tanstack/react-router'
import EdicaoImpressaPage from '../app/pages/EdicaoImpressaPage'
import { fnListEditions } from '../server/wp/server-fns'

export const Route = createFileRoute('/edicao-impressa')({
  component: EdicaoImpressaPage,
  loader: async () => {
    const editions = await fnListEditions()
    return { editions }
  },
  head: () => ({
    meta: [
      { title: 'Edição Impressa · Revista Chiveve' },
      {
        name: 'description',
        content:
          'Arquivo completo da edição impressa da Revista Chiveve. Descarregue ou consulte edições anteriores.',
      },
    ],
  }),
})
