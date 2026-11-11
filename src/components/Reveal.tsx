import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Tag = 'div' | 'li' | 'p' | 'span' | 'article' | 'section' | 'ul' | 'header'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical offset in px before the element enters. */
  y?: number
  as?: Tag
  /** Fraction of the element that must be visible before revealing. */
  amount?: number
}

/**
 * Shared reveal primitive. Content is always in the DOM; it fades and rises in
 * once when it enters the viewport. With reduced motion it renders statically.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = 'div', amount = 0.25 }: RevealProps) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  if (reduce) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
