import Layout from '@/components/layout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Toaster />
      <Outlet />
    </Layout>
  ),
})
