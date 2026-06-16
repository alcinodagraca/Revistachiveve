import { createFileRoute } from '@tanstack/react-router'
import ContactosPage from '../app/pages/ContactosPage'

export const Route = createFileRoute('/contactos')({
  component: ContactosPage,
})
