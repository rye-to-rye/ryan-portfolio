import type { ComponentType } from 'react'
import type { FeaturedProject, VisualId } from '../data/projects'
import { ValUpVisual } from './visuals/ValUpVisual'
import { StorefrontVisual } from './visuals/StorefrontVisual'
import { RadioVisual } from './visuals/RadioVisual'
import { PainPortalVisual } from './visuals/PainPortalVisual'

const visuals: Record<VisualId, ComponentType> = {
  valup: ValUpVisual,
  storefront: StorefrontVisual,
  radio: RadioVisual,
  painportal: PainPortalVisual,
}

/** Per-project backdrop so the four frames never look identical. */
const backdrops: Record<VisualId, string> = {
  valup:
    'bg-[radial-gradient(120%_90%_at_0%_0%,rgba(139,92,246,0.28),transparent_55%),linear-gradient(160deg,#141826,#0B0E15)]',
  storefront:
    'bg-[radial-gradient(90%_80%_at_100%_0%,rgba(251,191,36,0.12),transparent_55%),linear-gradient(200deg,#161A24,#0B0E15)]',
  radio:
    'bg-[radial-gradient(80%_80%_at_50%_30%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(90%_70%_at_50%_120%,rgba(139,92,246,0.25),transparent_60%),#0B0E15]',
  painportal:
    'bg-[conic-gradient(from_200deg_at_70%_40%,rgba(244,114,182,0.14),rgba(139,92,246,0.18),rgba(34,211,238,0.08),rgba(244,114,182,0.14)),#0B0E15]',
}

interface ProjectVisualProps {
  project: FeaturedProject
  className?: string
}

/**
 * Renders a real screenshot when `project.image` is set; otherwise an original,
 * clearly labelled CSS/SVG illustration.
 */
export function ProjectVisual({ project, className = '' }: ProjectVisualProps) {
  const Visual = visuals[project.visual]

  return (
    <figure
      className={`group/visual relative m-0 overflow-hidden rounded-2xl border border-line ${backdrops[project.visual]} ${className}`}
    >
      {project.image ? (
        <img
          src={project.image.src}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover/visual:scale-[1.02]"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover/visual:scale-[1.015]"
            aria-hidden="true"
          >
            <Visual />
          </div>
          <figcaption className="absolute right-3 bottom-3 rounded-full border border-white/10 bg-obsidian/70 px-2.5 py-1 font-mono text-[0.6rem] tracking-wider text-muted backdrop-blur-sm">
            Illustration · not a screenshot
          </figcaption>
        </>
      )}
    </figure>
  )
}
