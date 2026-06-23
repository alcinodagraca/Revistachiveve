import { createFileRoute } from '@tanstack/react-router'
import SobreNosPage from '../app/pages/SobreNosPage'
import { fnListTeam } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/sobre-nos')({
  component: SobreNosPage,
  loader: async () => {
    const team = await fnListTeam()
    return { team }
  },
  head: () =>
    pageSeo({
      title: 'Sobre Nós',
      description:
        'A Revista Chiveve é a referência de negócios e empreendedorismo em Moçambique. Conheça a nossa equipa.',
      path: '/sobre-nos',
    }),
})
