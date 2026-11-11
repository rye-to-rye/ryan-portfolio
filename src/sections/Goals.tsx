import { motion, useReducedMotion } from 'motion/react'
import { goals } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function Goals() {
  const reduce = useReducedMotion()
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden py-28 md:py-40">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.12),transparent)]"
        aria-hidden="true"
      />
      <div className="container-page">
        <SectionHeading
          id="story-title"
          index="06"
          label="Goals & ambitions"
          title={goals.headline}
          accentWords={[5, 6]}
          titleClassName="max-w-5xl text-[clamp(2.5rem,6.4vw,5.75rem)]"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6 md:col-start-2">
            <p className="text-xl leading-relaxed text-paper/90 md:text-2xl md:leading-relaxed">{goals.paragraphs[0]}</p>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4 md:col-start-9 md:pt-2">
            <p className="text-lg leading-relaxed text-muted">{goals.paragraphs[1]}</p>
          </Reveal>
        </div>

        {/* trajectory */}
        <div className="relative mt-20 md:mt-28">
          <div className="absolute top-[11px] right-0 left-0 hidden h-px bg-line md:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-violet via-violet-soft to-cyan"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <ol className="grid gap-8 md:grid-cols-3" aria-label="Where I'm heading">
            {goals.trajectory.map((step, i) => (
              <Reveal as="li" key={step.when} delay={0.25 + i * 0.2} y={12} className="relative pl-9 md:pl-0">
                <div>
                  <span
                    className={`absolute top-1 left-0 grid size-[22px] place-items-center rounded-full border bg-obsidian md:static md:mb-6 ${
                      i === goals.trajectory.length - 1 ? 'border-cyan/70' : 'border-violet/70'
                    }`}
                    aria-hidden="true"
                  >
                    <span className={`size-2 rounded-full ${i === goals.trajectory.length - 1 ? 'bg-cyan' : 'bg-violet'}`} />
                  </span>
                  <p className="mono-label text-violet-soft">{step.when}</p>
                  <p className="mt-2 font-display text-xl font-medium">{step.what}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
