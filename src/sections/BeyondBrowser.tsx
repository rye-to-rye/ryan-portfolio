import { ArrowUpRight, CloudSun, Cpu, Info, Monitor } from 'lucide-react'
import { supportingProjects, type SupportingProject } from '../data/projects'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { Tag } from '../components/Tag'
import { ExternalLink } from '../components/ExternalLink'
import { GithubIcon } from '../components/BrandIcons'

export function BeyondBrowser() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="relative border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="beyond-title"
          index="03"
          label="Beyond the browser"
          title="Off the web, onto the desk and the field."
          accentWords={[5, 8]}
          titleClassName="max-w-4xl text-[clamp(2rem,4.4vw,3.6rem)]"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {supportingProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12} className={i === 1 ? 'md:mt-24' : ''}>
              <SupportingCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function SupportingCard({ project }: { project: SupportingProject }) {
  const headingId = `support-${project.id}`
  const desktop = project.kind === 'desktop'

  return (
    <article aria-labelledby={headingId} className="surface glow-border flex h-full flex-col overflow-hidden rounded-2xl">
      {/* motif strip */}
      <div className="relative h-36 overflow-hidden border-b border-line" aria-hidden="true">
        {desktop ? <DesktopMotif /> : <SensorMotif />}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          {desktop ? (
            <Monitor className="size-4 text-violet-soft" aria-hidden="true" />
          ) : (
            <Cpu className="size-4 text-violet-soft" aria-hidden="true" />
          )}
          <span className="mono-label">{project.category}</span>
        </div>
        <h3 id={headingId} className="font-display text-2xl font-semibold sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 font-display text-violet-soft">{project.tagline}</p>
        <p className="mt-4 text-muted">{project.description}</p>

        {project.role && (
          <p className="mt-5 rounded-lg border border-violet/25 bg-violet/[0.07] px-4 py-3 text-sm text-paper/90">
            <span className="mono-label mr-2 text-violet-soft">Role</span>
            {project.role}
          </p>
        )}

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <p className="flex gap-2 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {project.note}
          </p>
          {project.sourceUrl && (
            <ExternalLink
              href={project.sourceUrl}
              className="arrow-link mt-5 inline-flex min-h-6 items-center gap-2 text-sm font-medium text-paper underline decoration-line-strong underline-offset-4 hover:decoration-violet"
            >
              <GithubIcon className="size-4" />
              View source<span className="sr-only"> of {project.name} on GitHub</span>
              <ArrowUpRight className="arrow size-4" aria-hidden="true" />
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  )
}

/** Small desktop-window motif for Nimbus (decorative). */
function DesktopMotif() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_20%_0%,rgba(139,92,246,0.18),transparent_60%)]">
      <div className="absolute top-6 left-6 right-10 bottom-[-1rem] rounded-t-lg border border-white/10 bg-ink/90">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 font-mono text-[0.6rem] text-muted">nimbus.py</span>
        </div>
        <div className="flex items-center gap-5 px-5 py-3">
          <CloudSun className="size-9 text-violet-soft" strokeWidth={1.4} />
          <div className="space-y-2">
            <span className="block h-2 w-20 rounded-full bg-white/25" />
            <span className="block h-1.5 w-28 rounded-full bg-white/10" />
          </div>
          <div className="ml-auto hidden gap-3 sm:flex">
            {['temp', 'humidity', 'wind'].map((m) => (
              <span key={m} className="rounded border border-white/10 px-2 py-1 font-mono text-[0.55rem] text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Sensor-network motif for the Hackabull prototype (decorative). */
function SensorMotif() {
  const nodes = [
    [60, 90],
    [150, 50],
    [250, 95],
    [340, 45],
    [430, 85],
  ]
  return (
    <svg viewBox="0 0 500 144" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <rect width="500" height="144" fill="#0B0E15" />
      <path d="M0 120 Q 125 100 250 118 T 500 112 V144 H0Z" fill="rgba(139,92,246,0.10)" />
      <polyline
        points={nodes.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke="#A78BFA"
        strokeOpacity="0.5"
        strokeDasharray="3 5"
      />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" fill="none" stroke="#9AA4B2" strokeOpacity="0.25" />
          <circle cx={x} cy={y} r="3.5" fill={i === 2 ? '#22D3EE' : '#8B5CF6'} />
          <line x1={x} y1={y + 11} x2={x} y2="124" stroke="#9AA4B2" strokeOpacity="0.18" />
        </g>
      ))}
    </svg>
  )
}
