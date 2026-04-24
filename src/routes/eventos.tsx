import { createFileRoute } from '@tanstack/react-router'
import EventosPage from '../app/pages/EventosPage'

export const Route = createFileRoute('/eventos')({
  component: EventosPage,
})
