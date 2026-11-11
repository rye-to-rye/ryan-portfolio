/**
 * Single source of truth for profile details, links, and feature flags.
 * Edit here — components read from this object and never hard-code personal details.
 */

export interface SocialLink {
  label: string
  href: string
  /** Visible handle shown next to the label. */
  handle: string
}

export interface NavItem {
  label: string
  /** Anchor id the link scrolls to. */
  target: string
  /** Section ids that should mark this nav item as active. */
  sections: string[]
}

export interface SiteConfig {
  name: string
  shortName: string
  monogram: string
  role: string
  location: string
  email: string
  github: SocialLink
  linkedin: SocialLink
  /**
   * Path to the résumé PDF in /public. Set to `null` to hide the download
   * and show a "Résumé available on request" mailto link instead.
   */
  resumeUrl: string | null
  /** Public repository for THIS portfolio. Hidden while `null`. */
  portfolioRepoUrl: string | null
  /** Set once the site is actually deployed. `null` = "Deployment planned". */
  deployedUrl: string | null
  plannedHost: string
  nav: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: 'Ryan Rahman',
  shortName: 'Ryan',
  monogram: 'RR',
  role: 'Software engineer in the making',
  location: 'Tampa, Florida',
  email: 'ryan.rahman.college@gmail.com',
  github: {
    label: 'GitHub',
    href: 'https://github.com/rye-to-rye',
    handle: 'rye-to-rye',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ryan-rahman-8607b4295/',
    handle: 'ryan-rahman',
  },
  resumeUrl: '/resume.pdf',
  portfolioRepoUrl: null,
  deployedUrl: null,
  plannedHost: 'Vercel',
  nav: [
    { label: 'About', target: 'about', sections: ['about'] },
    { label: 'Work', target: 'work', sections: ['work', 'beyond', 'lab'] },
    { label: 'Skills', target: 'skills', sections: ['skills'] },
    { label: 'Story', target: 'story', sections: ['story', 'interests', 'experience'] },
    { label: 'Contact', target: 'contact', sections: ['contact'] },
  ],
}

export const mailto = `mailto:${siteConfig.email}`
