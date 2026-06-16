import { createFileRoute } from '@tanstack/react-router'
import ContactosUteisPage from '../app/pages/ContactosUteisPage'

export const Route = createFileRoute('/contactos-uteis')({
  component: ContactosUteisPage,
})
