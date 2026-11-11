import { useRef, useState, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Box, FileCode2, Globe, Hammer } from 'lucide-react'
import { buildTabs, devTools } from '../data/content'
import { siteConfig } from '../data/siteConfig'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ExternalLink } from '../components/ExternalLink'
import { GithubIcon } from '../components/BrandIcons'

export function UnderTheHood() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = buildTabs[activeIndex]

  const focusTab = (i: number) => {
    const next = (i + buildTabs.length) % buildTabs.length
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        focusTab(activeIndex + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        focusTab(activeIndex - 1)
        break
      case 'Home':
        e.preventDefault()
        focusTab(0)
        break
      case 'End':
        e.preventDefault()
        focusTab(buildTabs.length - 1)
        break
    }
  }

  return (
    <section id="build" aria-labelledby="build-title" className="relative border-t border-line py-28 md:py-40">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading id="build-title" index="09" label="Behind the build" title="Under the hood." accentWords={[2]} className="lg:col-span-6" />
          <Reveal delay={0.15} className="self-end lg:col-span-5 lg:col-start-8">
            <p className="text-muted">
              This portfolio is a project too. Here is exactly how it works — a fully static React app with no
              backend, no database, and no API keys.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <Pipeline activeId={active.id} />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* tabs */}
          <div className="min-w-0 lg:col-span-8">
            <div
              role="tablist"
              aria-label="Portfolio technologies"
              className="flex gap-1 overflow-x-auto rounded-full border border-line bg-graphite/40 p-1 [scrollbar-width:none]"
            >
              {buildTabs.map((tab, i) => {
                const selected = i === activeIndex
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    role="tab"
                    id={`build-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`build-panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={onKeyDown}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                      selected ? 'text-paper' : 'text-muted hover:text-paper'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="build-tab-pill"
                        className="absolute inset-0 rounded-full bg-violet/20 ring-1 ring-violet/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* One panel per tab (inactive ones hidden) so every aria-controls target exists. */}
            {buildTabs.map((tab, i) => (
              <div
                key={tab.id}
                role="tabpanel"
                id={`build-panel-${tab.id}`}
                aria-labelledby={`build-tab-${tab.id}`}
                hidden={i !== activeIndex}
                tabIndex={0}
                className="surface mt-4 min-h-[15rem] rounded-2xl p-6 sm:p-8"
              >
                <motion.div
                  key={i === activeIndex ? 'active' : 'idle'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mono-label text-violet-soft">{tab.role}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{tab.tech}</h3>
                  <p className="mt-4 max-w-2xl text-paper/85">{tab.body}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="mono-label mr-1 text-[0.65rem]">In the code</span>
                    {tab.files.map((f) => (
                      <code key={f} className="break-all rounded-md border border-line bg-black/30 px-2 py-1 font-mono text-xs text-paper/85">
                        {f}
                      </code>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* facts */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="surface h-full rounded-2xl p-6 sm:p-7">
              <p className="mono-label mb-4">Deployment</p>
              {siteConfig.deployedUrl ? (
                <p className="flex items-center gap-2 text-paper">
                  <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  Hosted on {siteConfig.plannedHost}
                </p>
              ) : (
                <p className="flex items-center gap-2 text-paper">
                  <span className="size-2 rounded-full border border-cyan" aria-hidden="true" />
                  Deployment planned: {siteConfig.plannedHost}
                </p>
              )}
              <p className="mt-2 text-sm text-muted">Static files served from a CDN, version-controlled with Git.</p>

              <p className="mono-label mt-8 mb-3">Development tools (non-AI)</p>
              <ul className="flex flex-wrap gap-2">
                {devTools.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-paper/85">
                    {t}
                  </li>
                ))}
              </ul>

              {siteConfig.portfolioRepoUrl && (
                <ExternalLink
                  href={siteConfig.portfolioRepoUrl}
                  className="arrow-link mt-8 inline-flex items-center gap-2 text-sm font-medium text-paper underline decoration-line-strong underline-offset-4 hover:decoration-violet"
                >
                  <GithubIcon className="size-4" />
                  View portfolio source
                  <ArrowUpRight className="arrow size-4" aria-hidden="true" />
                </ExternalLink>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Pipeline */

const sourceLayers = [
  { id: 'react', label: 'React + TS' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'motion', label: 'Motion' },
  { id: 'canvas', label: 'Canvas' },
]

function Pipeline({ activeId }: { activeId: string }) {
  const sourceActive = sourceLayers.some((l) => l.id === activeId)
  const buildActive = activeId === 'vite'

  const stages = [
    {
      key: 'source',
      icon: FileCode2,
      title: 'React source',
      sub: 'src/ · typed components & data',
      active: sourceActive,
      extra: (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {sourceLayers.map((l) => (
            <span
              key={l.id}
              className={`rounded-md border px-2 py-0.5 font-mono text-[0.62rem] transition-colors duration-300 ${
                l.id === activeId ? 'border-violet/70 bg-violet/20 text-paper' : 'border-line text-muted'
              }`}
            >
              {l.label}
            </span>
          ))}
        </div>
      ),
    },
    { key: 'vite', icon: Hammer, title: 'Vite build', sub: 'bundle · minify · hash', active: buildActive },
    { key: 'static', icon: Box, title: 'Static output', sub: 'dist/ · HTML, CSS, JS', active: buildActive },
    {
      key: 'cdn',
      icon: Globe,
      title: 'CDN hosting',
      sub: siteConfig.deployedUrl ? siteConfig.plannedHost : `planned · ${siteConfig.plannedHost}`,
      active: false,
      planned: !siteConfig.deployedUrl,
    },
  ]

  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        Build pipeline: React source code, written with TypeScript, Tailwind CSS, Motion and Canvas, is built
        by Vite into static HTML, CSS and JavaScript, which is intended to be served from CDN hosting on{' '}
        {siteConfig.plannedHost}.
      </figcaption>
      <ol className="grid items-stretch gap-3 md:grid-cols-[1.4fr_auto_1fr_auto_1fr_auto_1fr]" aria-hidden="true">
        {stages.map((s, i) => {
          const Icon = s.icon
          return (
            <li key={s.key} className="contents">
              <div
                className={`relative rounded-2xl border p-5 transition-[border-color,background-color,box-shadow] duration-500 ${
                  s.active
                    ? 'border-violet/60 bg-violet/[0.08] shadow-[0_0_40px_-12px_rgba(139,92,246,0.6)]'
                    : s.planned
                      ? 'border-dashed border-line-strong bg-transparent'
                      : 'border-line bg-graphite/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`size-5 ${s.active ? 'text-violet-soft' : 'text-muted'}`} />
                  <span className="font-display font-semibold">{s.title}</span>
                </div>
                <p className="mt-1.5 font-mono text-[0.68rem] text-muted">{s.sub}</p>
                {s.extra}
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center justify-center py-1 md:py-0">
                  <span className="relative block h-6 w-px overflow-hidden bg-line-strong md:h-px md:w-10">
                    <span className="absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-violet-soft to-transparent md:bg-gradient-to-r" />
                  </span>
                  <ArrowRight className="ml-1 hidden size-3.5 text-muted md:block" />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
