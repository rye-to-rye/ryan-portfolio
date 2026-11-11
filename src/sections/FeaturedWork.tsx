import { featuredProjects } from '../data/projects'
import { ProjectCard, type ProjectLayout } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const layouts: ProjectLayout[] = ['visual-left', 'visual-right', 'wide', 'tilted']

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.10),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="mb-20 grid gap-8 md:mb-28 lg:grid-cols-12">
          <SectionHeading
            id="work-title"
            index="02"
            label="Featured work"
            title="Things I've built."
            accentWords={[2]}
            className="lg:col-span-7"
          />
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-muted">
              Four projects I'm proud of — from a Discord bot backed by cloud storage to a login page that
              fights back. Every one links to its real source code.
            </p>
          </Reveal>
        </div>

        <div className="space-y-32 md:space-y-44">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} layout={layouts[i % layouts.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}
