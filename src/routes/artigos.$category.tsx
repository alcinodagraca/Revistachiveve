import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/artigos/$category')({
  component: () => <Outlet />,
})
