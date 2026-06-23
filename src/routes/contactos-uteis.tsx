import { createFileRoute } from '@tanstack/react-router'
import ContactosUteisPage from '../app/pages/ContactosUteisPage'
import { fnListContacts } from '../server/wp/server-fns'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/contactos-uteis')({
  component: ContactosUteisPage,
  loader: async () => {
    const contacts = await fnListContacts()
    return { contacts }
  },
  head: () =>
    pageSeo({
      title: 'Contactos Úteis',
      description:
        'Directório de instituições, bancos, associações empresariais e organizações úteis em Moçambique.',
      path: '/contactos-uteis',
    }),
})
