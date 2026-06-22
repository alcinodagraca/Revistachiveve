import { createFileRoute } from '@tanstack/react-router'
import ConcursosPublicosPage from '../app/pages/ConcursosPublicosPage'
import { fnListTenders } from '../server/wp/server-fns'

export const Route = createFileRoute('/concursos-publicos')({
  component: ConcursosPublicosPage,
  loader: async () => {
    const tenders = await fnListTenders()
    return { tenders }
  },
  head: () => ({
    meta: [
      { title: 'Concursos Públicos · Revista Chiveve' },
      {
        name: 'description',
        content:
          'Oportunidades de emprego e concursos públicos em Moçambique.',
      },
    ],
  }),
})
