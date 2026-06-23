import { createFileRoute } from '@tanstack/react-router'
import EventosPage from '../app/pages/EventosPage'
import { fnListEvents } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/eventos/')({
  component: EventosPage,
  loader: async () => {
    const events = await fnListEvents()
    return { events }
  },
  head: ({ loaderData }) =>
    pageSeo({
      title: 'Eventos',
      description:
        'Próximos eventos de negócios, empreendedorismo e liderança em Moçambique.',
      path: '/eventos',
      image: loaderData?.events[0]?.image,
      imageAlt: loaderData?.events[0]?.title,
    }),
})
