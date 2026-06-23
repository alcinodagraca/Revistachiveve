import { createFileRoute } from '@tanstack/react-router'
import ContactosPage from '../app/pages/ContactosPage'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/contactos')({
  component: ContactosPage,
  head: () =>
    pageSeo({
      title: 'Contactos',
      description:
        'Entre em contacto com a Revista Chiveve. Sugestões editoriais, parcerias e atendimento.',
      path: '/contactos',
    }),
})
