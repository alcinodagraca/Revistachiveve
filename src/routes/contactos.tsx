import { createFileRoute } from '@tanstack/react-router'
import ContactosPage from '../app/pages/ContactosPage'
import { pageSeo } from '../server/seo'

export const Route = createFileRoute('/contactos')({
  component: ContactosPage,
  head: () =>
    pageSeo({
      title: 'Contactos',
      description:
        'Contacte a Revista Negócios no Chiveve para sugestões editoriais, entrevistas, publicidade, eventos e parcerias.',
      path: '/contactos',
    }),
})
