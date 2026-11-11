import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react'
import { mailto, siteConfig } from '../data/siteConfig'
import { useActiveSection } from '../hooks/useActiveSection'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { ExternalLink } from './ExternalLink'

const allSectionIds = siteConfig.nav.flatMap((n) => n.sections)

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const activeSection = useActiveSection(allSectionIds)
  const activeNav = siteConfig.nav.find((n) => activeSection && n.sections.includes(activeSection))?.target

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }, [])

  // Escape to close, simple focus trap, and scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    // Trap focus within the menu panel plus the close button in the header.
    const focusables = () => {
      const items = Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
      return menuButtonRef.current ? [menuButtonRef.current, ...items] : items
    }
    focusables()[1]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  // Close the mobile menu if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? 'border-b border-line bg-obsidian/75 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[4.5rem]">
        <a
          href="#top"
          className="group font-display text-xl font-bold tracking-tight text-paper"
          aria-label={`${siteConfig.name} — back to top`}
          onClick={() => open && close(false)}
        >
          {siteConfig.monogram}
          <span className="text-violet transition-colors group-hover:text-cyan">.</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-graphite/40 p-1">
            {siteConfig.nav.map((item) => {
              const isActive = activeNav === item.target
              return (
                <li key={item.target} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-violet/15 ring-1 ring-violet/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <a
                    href={`#${item.target}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors ${
                      isActive ? 'text-paper' : 'text-muted hover:text-paper'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ResumeLink className="arrow-link inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-paper transition-colors hover:border-violet/60 hover:bg-violet/10" />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-paper md:hidden"
          aria-expanded={open}
          aria-controls={open ? 'mobile-menu' : undefined}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>
    </header>

    {/* Rendered outside <header>: its backdrop-filter would otherwise become the
        containing block for this fixed panel and collapse it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-obsidian/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-10">
              <ul className="space-y-1">
                {siteConfig.nav.map((item, i) => (
                  <motion.li
                    key={item.target}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${item.target}`}
                      onClick={() => close(false)}
                      aria-current={activeNav === item.target ? 'location' : undefined}
                      className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-semibold text-paper"
                    >
                      <span className="mono-label text-violet-soft">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-10">
                <ResumeLink className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm" />
                <ExternalLink
                  href={siteConfig.github.href}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm"
                >
                  <GithubIcon className="size-4" /> GitHub
                </ExternalLink>
                <ExternalLink
                  href={siteConfig.linkedin.href}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm"
                >
                  <LinkedinIcon className="size-4" /> LinkedIn
                </ExternalLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Résumé link driven by siteConfig.resumeUrl; falls back to a mailto request. */
export function ResumeLink({ className }: { className?: string }) {
  if (siteConfig.resumeUrl) {
    return (
      <ExternalLink href={siteConfig.resumeUrl} className={className}>
        <FileText className="size-4" aria-hidden="true" />
        Résumé
        <ArrowUpRight className="arrow size-3.5 text-muted" aria-hidden="true" />
      </ExternalLink>
    )
  }
  return (
    <a href={`${mailto}?subject=R%C3%A9sum%C3%A9%20request`} className={className}>
      <FileText className="size-4" aria-hidden="true" />
      Résumé available on request
    </a>
  )
}
