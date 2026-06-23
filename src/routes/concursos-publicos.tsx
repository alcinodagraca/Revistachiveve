import { createFileRoute } from '@tanstack/react-router'
import ConcursosPublicosPage from '../app/pages/ConcursosPublicosPage'
import { fnListTenders } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/concursos-publicos')({
  component: ConcursosPublicosPage,
  loader: async () => {
    const tenders = await fnListTenders()
    return { tenders }
  },
  head: () =>
    pageSeo({
      title: 'Concursos Públicos',
      description:
        'Oportunidades de emprego e concursos públicos em Moçambique. Editais de instituições governamentais e privadas.',
      path: '/concursos-publicos',
    }),
})
