import { createFileRoute } from '@tanstack/react-router'
import EdicaoImpressaPage from '../app/pages/EdicaoImpressaPage'

export const Route = createFileRoute('/edicao-impressa')({
  component: EdicaoImpressaPage,
})
