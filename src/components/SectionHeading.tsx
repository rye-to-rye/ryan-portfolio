import { Fragment } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  /** Words (0-based) to render with the accent gradient. */
  accentWords?: number[]
  className?: string
  titleClassName?: string
  id?: string
}

const word: Variants = {
  hidden: { y: '105%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * Editorial index label + headline with a staggered word reveal.
 * The in-view trigger lives on the <h2> itself: the words start clipped by their
 * masks, so they could never report themselves as visible.
 */
export function SectionHeading({
  index,
  label,
  title,
  accentWords = [],
  className = '',
  titleClassName = '',
  id,
}: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const words = title.split(' ')

  return (
    <div className={className}>
      <div className="mb-6 flex items-center gap-4">
        <span className="mono-label text-violet-soft">{index}</span>
        <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
        <span className="mono-label">{label}</span>
      </div>
      <motion.h2
        id={id}
        className={`font-display text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.02] font-semibold ${titleClassName}`}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.06 }}
      >
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
              <motion.span
                className={`inline-block ${accentWords.includes(i) ? 'text-gradient' : ''}`}
                variants={word}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </motion.h2>
    </div>
  )
}
