import { Briefcase, GraduationCap, Trophy, type LucideIcon } from 'lucide-react'
import { experience, type ExperienceKind } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const kindIcon: Record<ExperienceKind, LucideIcon> = {
  Education: GraduationCap,
  Hackathon: Trophy,
  Work: Briefcase,
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-t border-line py-28 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="experience-title" index="08" label="Experience" title="Where I've been." accentWords={[2]} />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-muted">
                School, hackathons with friends, and a first job that taught me teamwork.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="relative lg:col-span-7 lg:col-start-6">
          <span className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-violet/60 via-line to-transparent" aria-hidden="true" />
          {experience.map((entry, i) => {
            const Icon = kindIcon[entry.kind]
            return (
              <Reveal as="li" key={entry.id} delay={i * 0.06} className="relative pb-12 pl-16 last:pb-0">
                <span
                  className={`absolute top-0 left-0 grid size-10 place-items-center rounded-full border bg-obsidian ${
                    entry.current ? 'border-violet/70 text-violet-soft' : 'border-line-strong text-muted'
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="mono-label text-paper/80">{entry.period}</span>
                  <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.62rem] tracking-wider text-muted uppercase">
                    {entry.kind}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold">{entry.org}</h3>
                <p className="mt-1 text-violet-soft">
                  {entry.title} <span className="text-muted">· {entry.location}</span>
                </p>
                <p className="mt-3 max-w-xl text-muted">{entry.description}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
