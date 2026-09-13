import { createFileRoute } from '@tanstack/react-router'
import SobreNosPage from '../app/pages/SobreNosPage'
import { fnListTeam } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/sobre-nos')({
  component: SobreNosPage,
  loader: async () => {
    const team = await fnListTeam().catch(() => null)
    return { team }
  },
  head: () =>
    pageSeo({
      title: 'Sobre Nós',
      description:
        'Conheça a Revista Negócios no Chiveve, a sua linha editorial, equipa e parceria com o Negócios no Chiveve Hub.',
      path: '/sobre-nos',
    }),
})
