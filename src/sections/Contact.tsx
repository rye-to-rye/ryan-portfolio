import { ArrowUpRight, FileText, Mail } from 'lucide-react'
import { mailto, siteConfig } from '../data/siteConfig'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ExternalLink } from '../components/ExternalLink'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'

export function Contact() {
  const linkRow =
    'group arrow-link flex items-center justify-between gap-4 border-b border-line py-5 transition-colors hover:border-violet/50'

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-28 pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.2),transparent)]"
        aria-hidden="true"
      />
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          index="10"
          label="Contact"
          title="Let's build something meaningful."
          accentWords={[3]}
          titleClassName="max-w-5xl text-[clamp(2.6rem,7.4vw,6.5rem)] leading-[0.98]"
        />

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="max-w-md text-lg text-muted">
              I'm looking for opportunities to learn, contribute, and build with great people. Whether it's an
              internship, a project, or just a conversation — my inbox is open.
            </p>
            <a
              href={mailto}
              className="group mt-8 inline-flex max-w-full items-center gap-3 rounded-full bg-violet-strong px-6 py-4 font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)] transition-colors hover:bg-violet-deep"
            >
              <Mail className="size-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{siteConfig.email}</span>
            </a>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <ul className="border-t border-line">
              <li>
                <ExternalLink href={siteConfig.github.href} className={linkRow}>
                  <span className="flex items-center gap-4">
                    <GithubIcon className="size-5 text-muted transition-colors group-hover:text-paper" />
                    <span>
                      <span className="block font-display text-lg font-medium">{siteConfig.github.label}</span>
                      <span className="block font-mono text-xs text-muted">@{siteConfig.github.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="arrow size-5 text-muted group-hover:text-violet-soft" aria-hidden="true" />
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={siteConfig.linkedin.href} className={linkRow}>
                  <span className="flex items-center gap-4">
                    <LinkedinIcon className="size-5 text-muted transition-colors group-hover:text-paper" />
                    <span>
                      <span className="block font-display text-lg font-medium">{siteConfig.linkedin.label}</span>
                      <span className="block font-mono text-xs text-muted">{siteConfig.name}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="arrow size-5 text-muted group-hover:text-violet-soft" aria-hidden="true" />
                </ExternalLink>
              </li>
              <li>
                {siteConfig.resumeUrl ? (
                  <ExternalLink href={siteConfig.resumeUrl} className={linkRow}>
                    <span className="flex items-center gap-4">
                      <FileText className="size-5 text-muted transition-colors group-hover:text-paper" aria-hidden="true" />
                      <span>
                        <span className="block font-display text-lg font-medium">Résumé</span>
                        <span className="block font-mono text-xs text-muted">PDF</span>
                      </span>
                    </span>
                    <ArrowUpRight className="arrow size-5 text-muted group-hover:text-violet-soft" aria-hidden="true" />
                  </ExternalLink>
                ) : (
                  <a href={`${mailto}?subject=R%C3%A9sum%C3%A9%20request`} className={linkRow}>
                    <span className="flex items-center gap-4">
                      <FileText className="size-5 text-muted" aria-hidden="true" />
                      <span className="font-display text-lg font-medium">Résumé available on request</span>
                    </span>
                  </a>
                )}
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
