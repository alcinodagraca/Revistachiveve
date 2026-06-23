/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Layout } from '../app/components/Layout'
import NotFoundPage from '../app/pages/NotFoundPage'
import appCss from '../styles/index.css?url'
import { fnListCategories } from '../server/wp/server-fns'
import { organizationJsonLd, websiteJsonLd, SITE_NAME } from '../server/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      { title: SITE_NAME },
      { name: 'theme-color', content: '#1E4ED8' },
    ],
    links: [
      { rel: 'icon', href: '/logo-alt.png', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/logo-alt.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationJsonLd()),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(websiteJsonLd()),
      },
    ],
  }),
  loader: async () => {
    try {
      const categories = await fnListCategories()
      return { categories }
    } catch (err) {
      // Don't nuke the site if WP is down — Header falls back to static slugs.
      console.error('[wp] root loader failed:', err)
      return { categories: [] }
    }
  },
  component: Layout,
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
  errorComponent: ({ error }) => <RootErrorFallback error={error} />,
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-MZ">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-primary mb-3">
          Erro
        </p>
        <h1 className="font-serif font-semibold text-2xl md:text-4xl text-foreground leading-tight tracking-tight mb-3">
          Não foi possível carregar a página
        </h1>
        <p className="font-sans text-base text-muted-foreground leading-relaxed">
          Tente recarregar a página dentro de alguns instantes.
        </p>
        {process.env.NODE_ENV !== 'production' && (
          <pre className="mt-6 text-left text-xs text-muted-foreground bg-secondary p-3 rounded overflow-auto">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  )
}
