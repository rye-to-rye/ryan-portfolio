import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRight, Info } from 'lucide-react'
import type { FeaturedProject } from '../data/projects'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './Reveal'
import { Tag } from './Tag'
import { ExternalLink } from './ExternalLink'
import { GithubIcon } from './BrandIcons'

export type ProjectLayout = 'visual-left' | 'visual-right' | 'wide' | 'tilted'

interface ProjectCardProps {
  project: FeaturedProject
  index: number
  layout: ProjectLayout
}

/** A miniature case study. Layout varies so the four showcases never repeat. */
export function ProjectCard({ project, index, layout }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -36])
  const scale = useTransform(scrollYProgress, [0, 0.35], reduce ? [1, 1] : [0.95, 1])

  const number = String(index + 1).padStart(2, '0')
  const headingId = `project-${project.id}`
  const wide = layout === 'wide'

  const visual = (
    <motion.div style={{ y, scale }}>
      <ProjectVisual
        project={project}
        className={wide ? 'aspect-[4/4.4] sm:aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/4.4] sm:aspect-[4/3]'}
      />
    </motion.div>
  )

  const intro = (
    <Reveal>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="font-display text-sm font-semibold text-violet-soft">{number}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span className="mono-label">{project.category}</span>
      </div>
      <h3 id={headingId} className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-semibold">
        {project.name}
      </h3>
      <p className="mt-3 font-display text-lg text-violet-soft md:text-xl">{project.tagline}</p>
      <p className="mt-5 max-w-xl text-muted">{project.description}</p>
    </Reveal>
  )

  const details = (
    <Reveal delay={0.1}>
      <p className="mono-label mb-3 text-paper/80">{project.highlightsLabel}</p>
      <ul className="space-y-2.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[0.95rem] text-paper/85">
            <span className="mt-[0.75em] h-px w-3 shrink-0 bg-violet" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </ul>
      {project.note && (
        <p className="mt-5 flex gap-2 text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {project.note}
        </p>
      )}
      <div className="mt-7 flex flex-wrap gap-3">
        <ExternalLink
          href={project.sourceUrl}
          className="arrow-link inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-obsidian transition-colors hover:bg-violet-soft"
        >
          <GithubIcon className="size-4" />
          View source<span className="sr-only"> of {project.name} on GitHub</span>
          <ArrowUpRight className="arrow size-4" aria-hidden="true" />
        </ExternalLink>
        {project.demoUrl && (
          <ExternalLink
            href={project.demoUrl}
            className="arrow-link inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-paper hover:border-violet/60"
          >
            Live demo<span className="sr-only"> of {project.name}</span>
            <ArrowUpRight className="arrow size-4" aria-hidden="true" />
          </ExternalLink>
        )}
      </div>
    </Reveal>
  )

  if (wide) {
    return (
      <article ref={ref} aria-labelledby={headingId} className="space-y-10 md:space-y-14">
        {visual}
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">{intro}</div>
          <div className="md:col-span-5 md:col-start-8">{details}</div>
        </div>
      </article>
    )
  }

  const visualFirst = layout !== 'visual-right'
  return (
    <article ref={ref} aria-labelledby={headingId} className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-14">
      <div
        className={`md:col-span-7 ${visualFirst ? 'md:order-1' : 'md:order-2'} ${
          layout === 'tilted' ? 'md:rotate-[1.2deg]' : ''
        }`}
      >
        {visual}
      </div>
      <div className={`md:col-span-5 ${visualFirst ? 'md:order-2' : 'md:order-1'}`}>
        {intro}
        <div className="mt-8">{details}</div>
      </div>
    </article>
  )
}
