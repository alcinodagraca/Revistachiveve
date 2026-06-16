import { createFileRoute } from '@tanstack/react-router'
import SobreNosPage from '../app/pages/SobreNosPage'

export const Route = createFileRoute('/sobre-nos')({
  component: SobreNosPage,
})
