/**
 * Typed project content. Layout components render whatever is in these arrays,
 * so copy, links, and images can change without touching layout code.
 *
 * To use a real screenshot instead of the decorative illustration, drop a file in
 * /public/projects/ and set `image: { src: '/projects/valup.webp', alt: '…' }`.
 * Only add `demoUrl` once a real, working deployment exists.
 */

export type VisualId = 'valup' | 'storefront' | 'radio' | 'painportal'

export interface ProjectImage {
  src: string
  alt: string
}

export interface FeaturedProject {
  id: string
  name: string
  category: string
  tagline: string
  description: string
  /** Heading shown above the highlights list. */
  highlightsLabel: string
  highlights: string[]
  stack: string[]
  sourceUrl: string
  demoUrl: string | null
  visual: VisualId
  image: ProjectImage | null
  /** Short honest caveat displayed under the project. */
  note?: string
}

export interface SupportingProject {
  id: string
  name: string
  category: string
  tagline: string
  description: string
  role?: string
  stack: string[]
  sourceUrl: string | null
  demoUrl: string | null
  note: string
  kind: 'desktop' | 'hackathon'
}

export interface LabProject {
  id: string
  name: string
  description: string
  tags: string[]
  sourceUrl: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'valup',
    name: 'ValUp Discord Bot',
    category: 'Discord Automation / Cloud Integration',
    tagline: 'Find the right VALORANT lineup without leaving Discord.',
    description:
      'A Discord bot that helps VALORANT players find and share lineup videos through an interactive command flow. Players choose a map, an agent, and a side, then select up to three clips. The bot returns expiring links to clips stored in Cloudflare R2.',
    highlightsLabel: 'What I built',
    highlights: [
      'Built the /lineups command flow and interactive menus using discord.js.',
      'Integrated Cloudflare R2 through the AWS S3-compatible SDK to produce signed, temporary URLs.',
      'Organized event-driven application logic into reusable modules with environment-based configuration.',
    ],
    stack: ['JavaScript', 'Node.js', 'discord.js', 'Cloudflare R2', 'AWS SDK v3'],
    sourceUrl: 'https://github.com/rye-to-rye/ValUp-bot',
    demoUrl: null,
    visual: 'valup',
    image: null,
    note: 'The current lineup library focuses on Sova on Haven and Ascent.',
  },
  {
    id: 'storefront',
    name: 'Amazon-Style E-Commerce Clone',
    category: 'Frontend Engineering / E-Commerce',
    tagline: 'A storefront built on JavaScript fundamentals.',
    description:
      'An Amazon-inspired shopping interface with dynamically rendered product listings, interactive cart management, and responsive layouts. The codebase uses reusable ES modules to separate product data, rendering, and shopping-cart behavior.',
    highlightsLabel: 'What I built',
    highlights: [
      'Rendered product listings dynamically through the DOM.',
      'Implemented cart quantity logic and the interface updates that follow it.',
      'Structured the app with modular ES6+ JavaScript; the repo includes checkout pages and test files.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'ES Modules', 'DOM APIs'],
    sourceUrl: 'https://github.com/rye-to-rye/Amazon-Clone',
    demoUrl: null,
    visual: 'storefront',
    image: null,
    note: 'A front-end project — there are no real payments or orders.',
  },
  {
    id: 'radio',
    name: 'Rye Radio',
    category: 'API-Driven Web Experience / Audio',
    tagline: 'Tune in to the world.',
    description:
      'A browser-based radio player that lets users search for stations worldwide, browse results, and play streams. It connects a JavaScript interface to the Radio Browser API and uses native HTML audio controls.',
    highlightsLabel: 'What I built',
    highlights: [
      'Station search powered by fetch and the Radio Browser API.',
      'Previous / next navigation through search results.',
      'Rendered station metadata and played API-provided stream URLs with HTML audio.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Fetch API', 'Radio Browser API', 'HTML Audio'],
    sourceUrl: 'https://github.com/rye-to-rye/Rye-Radio',
    demoUrl: null,
    visual: 'radio',
    image: null,
    note: 'Streams come from third parties, so some stations may be unavailable.',
  },
  {
    id: 'painportal',
    name: 'PainPortal',
    category: 'HackJam 2025 / Experimental UI/UX',
    tagline: 'The worst login experience. By design.',
    description:
      'An intentionally chaotic login experience created during HackJam, combining unusual password requirements, unpredictable interface elements, a teleporting button, and a cat-themed mini-game. The project plays with anti-usability, humor, and browser interactions.',
    highlightsLabel: 'My role — Team lead',
    highlights: [
      'Supported friends who were new to hackathons and helped coordinate the team.',
      'Contributed to development and debugging across the project.',
      'Helped bring the project to its final presentation.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Matter.js'],
    sourceUrl: 'https://github.com/rye-to-rye/PainPortal',
    demoUrl: null,
    visual: 'painportal',
    image: null,
    note: 'The bad UX is deliberate satire. This site, on the other hand, tries hard to be accessible.',
  },
]

export const supportingProjects: SupportingProject[] = [
  {
    id: 'nimbus',
    name: 'Nimbus Weather App',
    category: 'Python Desktop / APIs',
    tagline: 'Weather data, thoughtfully presented.',
    description:
      'A PyQt5 desktop weather interface that searches cities, retrieves OpenWeather data, and displays conditions such as temperature, humidity, and wind. A QThread worker is used to keep network requests from blocking the interface.',
    stack: ['Python', 'PyQt5', 'Requests', 'OpenWeather API', 'QThread'],
    sourceUrl: 'https://github.com/rye-to-rye/Nimbus',
    demoUrl: null,
    note: 'A desktop application, not a web app. Running it requires your own OpenWeather API key.',
    kind: 'desktop',
  },
  {
    id: 'hackabull',
    name: 'Hackabull IoT Agricultural Monitoring',
    category: 'Hackabull 2025 / IoT Team Prototype',
    tagline: 'Connecting environmental data to better visibility.',
    description:
      'A hackathon team prototype combining Arduino-based environmental sensing with a cloud dashboard for visualizing agricultural monitoring data.',
    role: 'Software tester — I supported software testing of the team prototype.',
    stack: ['Arduino', 'IoT', 'Cloud Dashboard', 'Software Testing'],
    sourceUrl: null,
    demoUrl: null,
    note: 'Team project. No public repository or demo is available.',
    kind: 'hackathon',
  },
]

export const labProjects: LabProject[] = [
  {
    id: 'reaction',
    name: 'Reaction Time Test',
    description:
      'A small browser game that switches between waiting and clicking states, uses randomized delays, detects premature clicks, and reports reaction time in milliseconds.',
    tags: ['JavaScript', 'DOM', 'Timing'],
    sourceUrl: 'https://github.com/rye-to-rye/Reaction-Time-Test',
  },
  {
    id: 'password',
    name: 'Password Strength Checker',
    description:
      'Client-side checks for minimum length, uppercase letters, and special characters with immediate feedback. A requirements checker — not a security-grade strength estimator.',
    tags: ['JavaScript', 'RegExp', 'Forms'],
    sourceUrl: 'https://github.com/rye-to-rye/Password-Strength-Checker',
  },
  {
    id: 'pokemon',
    name: 'Pokémon Image Search',
    description: 'Fetches a Pokémon record from PokéAPI and shows its sprite.',
    tags: ['JavaScript', 'Fetch API', 'PokéAPI'],
    sourceUrl: 'https://github.com/rye-to-rye/Pokemon-image-search',
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm in C++",
    description:
      'Shortest-path practice using an adjacency matrix, tracking distances, visited nodes, and predecessors.',
    tags: ['C++', 'Graph Algorithms', 'STL'],
    sourceUrl: 'https://github.com/rye-to-rye/Algorithms',
  },
  {
    id: 'debt',
    name: 'C Debt Manager',
    description:
      'A command-line program using C structs and linked lists to add, display, search, and remove debt records.',
    tags: ['C', 'Linked Lists', 'CLI'],
    sourceUrl: 'https://github.com/rye-to-rye/project_10',
  },
]
