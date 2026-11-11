import { ArrowUpRight, FlaskConical } from 'lucide-react'
import { labProjects } from '../data/projects'
import { Reveal } from '../components/Reveal'
import { ExternalLink } from '../components/ExternalLink'
import { GithubIcon } from '../components/BrandIcons'
import { siteConfig } from '../data/siteConfig'

export function TheLab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-4 flex items-center gap-4">
              <span className="mono-label text-violet-soft">04</span>
              <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
              <span className="mono-label">The lab</span>
            </div>
            <h2 id="lab-title" className="flex items-center gap-3 font-display text-3xl font-semibold md:text-4xl">
              <FlaskConical className="size-7 text-violet-soft" aria-hidden="true" />
              Small experiments
            </h2>
            <p className="mt-4 max-w-sm text-muted">
              Smaller projects where I practiced fundamentals — timing, validation, APIs, algorithms, and C.
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
            {labProjects.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.06} y={16} className="group relative flex flex-col bg-obsidian p-6 transition-colors hover:bg-graphite/60 focus-within:bg-graphite/60">
                <span className="mono-label mb-4 text-[0.65rem]">L.{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-lg leading-snug font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1" aria-label={`${p.name} technologies`}>
                  {p.tags.map((t) => (
                    <li key={t} className="font-mono text-[0.68rem] text-violet-soft/90">
                      #{t.replace(/\s+/g, '')}
                    </li>
                  ))}
                </ul>
                <ExternalLink
                  href={p.sourceUrl}
                  className="arrow-link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-paper/85 transition-colors hover:text-paper after:absolute after:inset-0 after:content-['']"
                >
                  <GithubIcon className="size-3.5" />
                  Source<span className="sr-only"> code for {p.name}</span>
                  <ArrowUpRight className="arrow size-3.5" aria-hidden="true" />
                </ExternalLink>
              </Reveal>
            ))}
            {/* closing cell completes the grid and points to everything else */}
            <li className="flex flex-col justify-end bg-[radial-gradient(120%_100%_at_100%_100%,rgba(139,92,246,0.14),transparent_60%)] bg-obsidian p-6">
              <ExternalLink
                href={siteConfig.github.href}
                className="arrow-link inline-flex min-h-6 items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
              >
                More on GitHub — @{siteConfig.github.handle}
                <ArrowUpRight className="arrow size-3.5" aria-hidden="true" />
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
