/**
 * Personal copy and supporting content. Written by Ryan — keep it sincere.
 */
import { featuredProjects, labProjects, supportingProjects } from './projects'

export const hero = {
  eyebrow: 'Ryan Rahman / Software engineer in the making',
  headlineLines: ['Turning ideas', 'into experiences', 'people can use.'],
  supporting:
    "I'm Ryan, a Computer Science student at USF and an aspiring full-stack engineer. I love building things, collaborating with others, and turning a simple idea into something real.",
}

export const about = {
  headline: 'A builder at heart.',
  paragraphs: [
    "I've always loved creating things. Growing up, I enjoyed taking ideas from my imagination and finding ways to bring them to life. Programming gave me an entirely new way to do that.",
    "What excites me most about software engineering isn't just writing code. It's the whole process: solving problems, working with friends, and seeing an idea become something people can actually interact with.",
    "I'm pursuing a B.S. in Computer Science at the University of South Florida, with an expected graduation in May 2027.",
  ],
  education: {
    school: 'University of South Florida',
    degree: 'B.S. Computer Science',
    graduation: 'Expected May 2027',
    started: 'August 2023',
    location: 'Tampa, Florida',
  },
}

export const goals = {
  headline: 'I want to build things that matter.',
  paragraphs: [
    'My goal is to grow into a full-stack engineer who can help ship large-scale products used by people around the world. I use software every day, and I love the idea that something I helped create could make another person’s day easier, more productive, or more enjoyable.',
    'I want to learn alongside excellent engineers, keep challenging myself, and eventually bring my own ambitious ideas to life.',
  ],
  trajectory: [
    { when: 'Now', what: 'CS student & builder' },
    { when: 'Next', what: 'Learning alongside excellent engineers' },
    { when: 'Someday', what: 'Shipping my own ambitious ideas' },
  ],
}

export type InterestIcon = 'volleyball' | 'gaming' | 'tv' | 'sports' | 'people' | 'explore'

export const interests = {
  headline: 'More than lines of code.',
  copy: "Outside programming, you'll probably find me playing volleyball, gaming with friends, watching anime or TV, following sports, or spending time with people I care about. I also enjoy exploring new technologies and learning more about software engineering on my own.",
  items: [
    { label: 'Volleyball', icon: 'volleyball' },
    { label: 'Gaming with friends', icon: 'gaming' },
    { label: 'Anime & TV', icon: 'tv' },
    { label: 'Following sports', icon: 'sports' },
    { label: 'Time with people I care about', icon: 'people' },
    { label: 'Exploring new tech', icon: 'explore' },
  ] satisfies { label: string; icon: InterestIcon }[],
}

/* ---------------------------------------------------------------- Toolkit */

export type SkillGroupIcon = 'languages' | 'frontend' | 'backend' | 'tools'

export interface Skill {
  name: string
  /** Project stack/tag names (case-insensitive) that count as using this skill. */
  match?: string[]
  /** Shown when no project in this portfolio uses it. */
  context?: string
}

export interface SkillGroup {
  id: string
  title: string
  icon: SkillGroupIcon
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'languages',
    skills: [
      { name: 'JavaScript', match: ['JavaScript'] },
      { name: 'Python', match: ['Python'] },
      { name: 'Java', context: 'Listed on my résumé' },
      { name: 'C++', match: ['C++'] },
      { name: 'C', match: ['C'] },
      { name: 'SQL', context: 'Listed on my résumé' },
      { name: 'HTML', match: ['HTML'] },
      { name: 'CSS', match: ['CSS'] },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'frontend',
    skills: [
      { name: 'React', context: 'Used to build this portfolio; listed on my résumé' },
      { name: 'Responsive design', match: ['CSS'] },
      { name: 'DOM APIs', match: ['DOM APIs', 'DOM'] },
      { name: 'ES modules', match: ['ES Modules'] },
      { name: 'Async JavaScript', match: ['Fetch API', 'discord.js'] },
      { name: 'TypeScript', context: 'Learning it by building this portfolio' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Cloud',
    icon: 'backend',
    skills: [
      { name: 'Node.js', match: ['Node.js'] },
      { name: 'REST APIs', match: ['Radio Browser API', 'OpenWeather API', 'PokéAPI'] },
      { name: 'Cloudflare R2', match: ['Cloudflare R2'] },
      { name: 'AWS Lambda', context: 'Listed on my résumé' },
      { name: 'API Gateway', context: 'Listed on my résumé' },
      { name: 'Amazon S3', context: 'Listed on my résumé · ValUp uses the S3-compatible SDK' },
      { name: 'PostgreSQL', context: 'Listed on my résumé' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'tools',
    skills: [
      { name: 'Git', context: 'Version control across my projects' },
      { name: 'GitHub', context: 'Where all my source code lives' },
      { name: 'Docker', context: 'Listed on my résumé' },
      { name: 'VS Code', context: 'My everyday editor' },
      { name: 'npm', context: 'Used for ValUp and this portfolio' },
      { name: 'Vite', context: 'Builds this portfolio' },
      { name: 'Tailwind CSS', context: 'Styles this portfolio' },
      { name: 'Motion', context: 'Animates this portfolio' },
    ],
  },
]

const allProjects = [
  ...featuredProjects.map((p) => ({ name: p.name, tags: p.stack })),
  ...supportingProjects.map((p) => ({ name: p.name, tags: p.stack })),
  ...labProjects.map((p) => ({ name: p.name, tags: p.tags })),
]

/** Names of projects in this portfolio whose stack matches the skill. */
export function projectsUsing(skill: Skill): string[] {
  if (!skill.match) return []
  const wanted = skill.match.map((m) => m.toLowerCase())
  return allProjects
    .filter((p) => p.tags.some((t) => wanted.includes(t.toLowerCase())))
    .map((p) => p.name)
}

/* ------------------------------------------------------------- Experience */

export type ExperienceKind = 'Education' | 'Hackathon' | 'Work'

export interface ExperienceEntry {
  id: string
  org: string
  title: string
  period: string
  kind: ExperienceKind
  location: string
  description: string
  current?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    id: 'usf',
    org: 'University of South Florida',
    title: 'B.S. Computer Science',
    period: 'Aug 2023 — May 2027 (expected)',
    kind: 'Education',
    location: 'Tampa, FL',
    description:
      'Studying computer science while building projects on my own and with friends.',
    current: true,
  },
  {
    id: 'hackjam',
    org: 'HackJam Hackathon',
    title: 'Team Lead — PainPortal',
    period: 'Nov 2025',
    kind: 'Hackathon',
    location: 'Tampa, FL',
    description:
      'Led a team of friends who were new to hackathons: coordinated our efforts, contributed to development and debugging, and helped present the final project.',
  },
  {
    id: 'hackabull',
    org: 'Hackabull Hackathon',
    title: 'Software Tester — IoT Agricultural Monitoring',
    period: 'Apr 2025',
    kind: 'Hackathon',
    location: 'Tampa, FL',
    description:
      'Supported software testing for a team prototype that paired Arduino-based sensing with a cloud dashboard.',
  },
  {
    id: 'publix',
    org: 'Publix Super Markets',
    title: 'Grocery Clerk',
    period: 'May 2023 — Nov 2023',
    kind: 'Work',
    location: 'Lakeland, FL',
    description:
      'Worked with teammates to keep high-demand areas stocked, helped customers find what they needed, and showed up reliably.',
  },
]

/* --------------------------------------------------------- Behind the Build */

export interface BuildTab {
  id: string
  label: string
  tech: string
  role: string
  body: string
  files: string[]
}

export const buildTabs: BuildTab[] = [
  {
    id: 'react',
    label: 'Structure',
    tech: 'React + TypeScript',
    role: 'Component structure & type-safe content',
    body: 'Every section is a small React component. Projects, skills, and experience live in typed data files, so content can change without touching layout code — and TypeScript catches a missing link or misspelled field before it ships.',
    files: ['src/sections/*.tsx', 'src/data/projects.ts', 'src/data/siteConfig.ts'],
  },
  {
    id: 'tailwind',
    label: 'Styling',
    tech: 'Tailwind CSS',
    role: 'Responsive design system',
    body: 'Brand colors, fonts, and spacing are defined once as theme tokens. Layouts use a 12-column grid on wide screens and collapse gracefully down to phones; fluid type is built with CSS clamp().',
    files: ['src/styles/globals.css'],
  },
  {
    id: 'motion',
    label: 'Motion',
    tech: 'Motion for React',
    role: 'Scroll reveals & micro-interactions',
    body: 'Content already lives in the page and is revealed as it enters the viewport using Motion’s viewport triggers — no scroll-event churn. With reduced motion turned on, everything simply appears.',
    files: ['src/components/Reveal.tsx', 'src/components/ScrollProgress.tsx'],
  },
  {
    id: 'canvas',
    label: 'Canvas',
    tech: 'HTML5 Canvas',
    role: 'Cursor-trail rendering',
    body: 'The light trail is a single canvas overlay drawn in one requestAnimationFrame loop. Pointer history lives in refs (no React re-renders), the loop sleeps when the mouse is idle or the tab is hidden, and it is disabled for touch devices and reduced motion.',
    files: ['src/components/CursorTrail.tsx'],
  },
  {
    id: 'vite',
    label: 'Build',
    tech: 'Vite',
    role: 'Dev server & static build',
    body: 'Vite powers instant local development and bundles the site into plain static HTML, CSS, and JavaScript in dist/. There is no server, database, or API key behind this page.',
    files: ['vite.config.ts', 'index.html'],
  },
]

export const devTools = ['Git', 'GitHub', 'npm', 'Browser DevTools']
