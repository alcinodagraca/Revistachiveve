import { createFileRoute } from '@tanstack/react-router'
import EventosPage from '../app/pages/EventosPage'
import { fnListEvents } from '../server/wp/server-fns'

export const Route = createFileRoute('/eventos/')({
  component: EventosPage,
  loader: async () => {
    const events = await fnListEvents()
    return { events }
  },
  head: () => ({
    meta: [
      { title: 'Eventos · Revista Chiveve' },
      {
        name: 'description',
        content:
          'Próximos eventos de negócios, empreendedorismo e liderança em Moçambique.',
      },
    ],
  }),
})
