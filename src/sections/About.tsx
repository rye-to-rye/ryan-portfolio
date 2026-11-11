import { CalendarDays, GraduationCap, MapPin } from 'lucide-react'
import { about } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  const { education } = about
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="about-title" index="01" label="About" title={about.headline} accentWords={[3]} />

            <Reveal delay={0.15} className="mt-12">
              <div className="surface glow-border rounded-2xl p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet/15 text-violet-soft ring-1 ring-violet/30">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mono-label mb-1">Education</p>
                    <p className="font-display text-xl font-semibold">{education.school}</p>
                    <p className="text-paper/80">{education.degree}</p>
                  </div>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="mono-label mb-1 flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" /> Graduation
                    </dt>
                    <dd className="text-paper">{education.graduation}</dd>
                  </div>
                  <div>
                    <dt className="mono-label mb-1 flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" /> Location
                    </dt>
                    <dd className="text-paper">{education.location}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} y={32} amount={0.6} className="relative border-l border-line py-6 pl-6 md:pl-10">
              <span
                className="absolute top-8 -left-[5px] size-[9px] rounded-full border border-violet bg-obsidian"
                aria-hidden="true"
              />
              <p
                className={
                  i === 0
                    ? 'font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-paper'
                    : 'text-lg leading-relaxed text-muted md:text-xl'
                }
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
