import { createFileRoute } from '@tanstack/react-router'
import SobreNosPage from '../app/pages/SobreNosPage'
import { fnListTeam } from '../server/wp/server-fns'

export const Route = createFileRoute('/sobre-nos')({
  component: SobreNosPage,
  loader: async () => {
    const team = await fnListTeam()
    return { team }
  },
  head: () => ({
    meta: [
      { title: 'Sobre Nós · Revista Chiveve' },
      {
        name: 'description',
        content:
          'A Revista Chiveve é a referência de negócios e empreendedorismo em Moçambique. Conheça a nossa equipa.',
      },
    ],
  }),
})
