import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Braces, Cloud, LayoutTemplate, Wrench, type LucideIcon } from 'lucide-react'
import { projectsUsing, skillGroups, type Skill, type SkillGroupIcon } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const icons: Record<SkillGroupIcon, LucideIcon> = {
  languages: Braces,
  frontend: LayoutTemplate,
  backend: Cloud,
  tools: Wrench,
}

interface Selection {
  groupId: string
  skill: Skill
}

export function Toolkit() {
  const [selected, setSelected] = useState<Selection>({
    groupId: skillGroups[0].id,
    skill: skillGroups[0].skills[0],
  })

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative border-t border-line py-28 md:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="skills-title" index="05" label="Technical toolkit" title="What I build with." accentWords={[3]} />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-muted">
                Grouped by what they are — no made-up proficiency bars. Pick any technology to see where it
                shows up in my work.
              </p>
            </Reveal>
            <div className="mt-10 hidden lg:block">
              <SkillDetail selection={selected} />
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-7 lg:col-start-6">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.icon]
            return (
              <Reveal key={group.id} delay={gi * 0.08}>
                <div className="surface rounded-2xl p-6 sm:p-7">
                  <h3 className="mb-5 flex items-center gap-3 font-display text-lg font-semibold">
                    <span className="grid size-9 place-items-center rounded-lg bg-white/[0.04] text-violet-soft ring-1 ring-line">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {group.title}
                    <span className="mono-label ml-auto text-[0.65rem]">{String(group.skills.length).padStart(2, '0')}</span>
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const isSelected = selected.skill.name === skill.name && selected.groupId === group.id
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSelected({ groupId: group.id, skill })}
                            onMouseEnter={() => setSelected({ groupId: group.id, skill })}
                            className={`rounded-full border px-3.5 py-1.5 text-sm transition-[background-color,border-color,color] duration-300 ${
                              isSelected
                                ? 'border-violet/70 bg-violet/15 text-paper'
                                : 'border-line bg-transparent text-paper/80 hover:border-line-strong hover:text-paper'
                            }`}
                          >
                            {skill.name}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  {selected.groupId === group.id && (
                    <div className="mt-5 lg:hidden">
                      <SkillDetail selection={selected} compact />
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SkillDetail({ selection, compact = false }: { selection: Selection; compact?: boolean }) {
  const { skill } = selection
  const used = projectsUsing(skill)

  return (
    <div
      aria-live="polite"
      className={`relative overflow-hidden rounded-2xl border border-violet/25 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(139,92,246,0.14),transparent_60%)] ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <p className="mono-label mb-2 text-violet-soft">Where it shows up</p>
          <p className={`font-display font-semibold ${compact ? 'text-lg' : 'text-2xl'}`}>{skill.name}</p>
          {used.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-sm text-paper/85">
              {used.map((name) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-violet" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">{skill.context}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
