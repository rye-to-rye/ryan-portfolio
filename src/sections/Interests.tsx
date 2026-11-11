import { motion, useReducedMotion } from 'motion/react'
import { Compass, Gamepad2, HeartHandshake, Trophy, Tv, Volleyball, type LucideIcon } from 'lucide-react'
import { interests, type InterestIcon } from '../data/content'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const icons: Record<InterestIcon, LucideIcon> = {
  volleyball: Volleyball,
  gaming: Gamepad2,
  tv: Tv,
  sports: Trophy,
  people: HeartHandshake,
  explore: Compass,
}

// Gentle, fixed tilts give the chips a hand-placed feel.
const tilts = [-3, 2, -1.5, 3, -2, 1.5]

export function Interests() {
  const reduce = useReducedMotion()
  return (
    <section id="interests" aria-labelledby="interests-title" className="relative border-t border-line py-28 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="interests-title" index="07" label="Beyond the code" title={interests.headline} accentWords={[2, 3]} />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{interests.copy}</p>
          </Reveal>
        </div>

        <ul className="flex flex-wrap content-center justify-center gap-3 sm:gap-4 lg:col-span-6 lg:col-start-7 lg:justify-start" aria-label="Interests">
          {interests.items.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <motion.li
                key={item.label}
                initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
                whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18, delay: reduce ? 0 : i * 0.07 }}
                className={`surface flex items-center gap-3 rounded-2xl px-5 py-4 ${
                  i === 0 || i === 4 ? 'sm:px-6 sm:py-5 sm:text-lg' : ''
                }`}
              >
                <span className={`grid size-10 place-items-center rounded-xl ${i === 5 ? 'bg-cyan/10 text-cyan' : 'bg-violet/12 text-violet-soft'}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display font-medium">{item.label}</span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
