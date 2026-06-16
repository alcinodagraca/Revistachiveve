import { createFileRoute } from '@tanstack/react-router'
import CategoryPage from '../app/pages/CategoryPage'

export const Route = createFileRoute('/artigos/$category')({
  component: CategoryPage,
})
