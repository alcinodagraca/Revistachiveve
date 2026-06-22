import { createFileRoute } from '@tanstack/react-router'
import ContactosUteisPage from '../app/pages/ContactosUteisPage'
import { fnListContacts } from '../server/wp/server-fns'

export const Route = createFileRoute('/contactos-uteis')({
  component: ContactosUteisPage,
  loader: async () => {
    const contacts = await fnListContacts()
    return { contacts }
  },
  head: () => ({
    meta: [
      { title: 'Contactos Úteis · Revista Chiveve' },
      {
        name: 'description',
        content:
          'Directório de instituições, bancos e organizações úteis em Moçambique.',
      },
    ],
  }),
})
