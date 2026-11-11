import { ArrowUp } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-bold text-paper">
            {siteConfig.monogram}
            <span className="text-violet">.</span>
          </span>{' '}
          © {year} {siteConfig.name}. Designed &amp; built with React, TypeScript, and Vite.
        </p>
        <a href="#top" className="group inline-flex min-h-6 items-center gap-2 transition-colors hover:text-paper">
          Back to top
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
