import { createFileRoute } from '@tanstack/react-router'
import ArtigosPage from '../app/pages/ArtigosPage'

export const Route = createFileRoute('/artigos/')({
  component: ArtigosPage,
})
