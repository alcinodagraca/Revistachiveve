import { createFileRoute } from '@tanstack/react-router'
import ConcursosPublicosPage from '../app/pages/ConcursosPublicosPage'

export const Route = createFileRoute('/concursos-publicos')({
  component: ConcursosPublicosPage,
})
