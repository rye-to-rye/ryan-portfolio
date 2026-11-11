# Ryan Rahman — Portfolio ("Cinematic Engineering")

Personal software-engineering portfolio for Ryan Rahman, a Computer Science student at the University of South Florida and aspiring full-stack engineer. It is a single-page, fully static site: no backend, no database, no API keys, and no runtime data fetching.

## Stack (as installed)

| Purpose | Package |
| --- | --- |
| UI | React 19 + TypeScript |
| Build / dev server | Vite 8 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), tokens in `src/styles/globals.css` |
| Animation | Motion for React (`motion`, imported from `motion/react`) |
| Icons | `lucide-react` (GitHub/LinkedIn marks are local SVGs in `BrandIcons.tsx`, since lucide v1 dropped brand icons) |
| Fonts | Self-hosted via Fontsource: Space Grotesk, Inter, JetBrains Mono (no Google Fonts request) |

## Commands

Requires Node.js 20+ (built with Node 24).

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:5173
npm run typecheck  # TypeScript only
npm run build      # typecheck + production build into dist/
npm run preview    # serve the built dist/ locally
```

## Structure

```text
public/
  favicon.svg            RR monogram
  resume.pdf             downloadable résumé (linked from header + contact)
  projects/              (create) real screenshots go here
src/
  data/
    siteConfig.ts        name, email, links, résumé path, nav, deployment flags
    projects.ts          featured / supporting / lab projects (typed)
    content.ts           about, goals, interests, skills, experience, build tabs
  components/            SiteHeader, CursorTrail, ScrollProgress, Reveal,
                         SectionHeading, ProjectCard, ProjectVisual, visuals/*
  sections/              Hero, About, FeaturedWork, BeyondBrowser, TheLab, Toolkit,
                         Goals, Interests, Experience, UnderTheHood, Contact
  hooks/useActiveSection.ts
  styles/globals.css
```

## Editing content

- **Personal details and links:** `src/data/siteConfig.ts`. Nothing else hard-codes the email or URLs.
- **Projects:** `src/data/projects.ts`. Layout code reads these arrays, so you can add or edit projects without touching components.
- **Copy, skills, experience:** `src/data/content.ts`. In the Toolkit, the "Where it shows up" panel is computed from each skill's `match` list against project stacks. Skills that aren't used in a listed project show their `context` text instead.

### Résumé

`siteConfig.resumeUrl` is `'/resume.pdf'` and the file is in `public/`. If you set it to `null`, the site shows a "Résumé available on request" mailto link instead. **Note:** the PDF includes your phone number, and it becomes public once the site is deployed.

### Real screenshots and demo links

Each featured project currently shows an original CSS/SVG illustration labelled "Illustration · not a screenshot". To use a real capture:

1. Create `public/projects/` and save it there (for example `valup.webp`).
2. In `projects.ts`, set `image: { src: '/projects/valup.webp', alt: 'ValUp /lineups menu in Discord' }`.

A **Live demo** button only appears once `demoUrl` is set to a real URL.

### After deploying

Set `siteConfig.deployedUrl` (the "Deployment planned: Vercel" label then changes to "Hosted on Vercel"). Set `siteConfig.portfolioRepoUrl` to show a "View portfolio source" link in *Behind the Build*.

## How the cursor trail works

`src/components/CursorTrail.tsx` draws a short ribbon of light on one fixed `<canvas>`:

- Pointer positions are stored in refs. A smoothed "head" eases toward the real cursor (frame-rate independent), and each frame appends it to a short history of at most 28 points that expire after about 240 ms.
- The history is turned into a tapered polygon: the tail is thin and fades out, the body is violet, and the tip has a cyan glow. The polygon is filled in one pass with a gradient and a soft shadow, so it draws as a ribbon rather than a chain of particles.
- **Performance:** one `requestAnimationFrame` loop that runs only while there is something to draw, then stops. It makes no React state updates per event. DPR is capped at 2, and the trail resets when the tab is hidden or the window loses focus. All listeners are removed on unmount.
- **Accessibility:** `pointer-events: none` and `aria-hidden`, and the native cursor is kept. The trail is only enabled for `(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)`, so touch devices and reduced-motion users never get it.

## Motion and accessibility notes

- Content is always in the DOM. `Reveal` and `SectionHeading` fade and rise in once using Motion viewport triggers, with no scroll listeners. With `prefers-reduced-motion`, they render statically, the parallax is turned off, and CSS animations are neutralised.
- The page includes a skip link, semantic landmarks, `aria-current` on the active nav item (IntersectionObserver), a mobile menu with Escape, a focus trap and focus return, ARIA tabs with arrow/Home/End keys, visible focus rings, and `scroll-margin-top` on anchors.
- External links use `target="_blank" rel="noopener noreferrer"` plus screen-reader text.

## Deploying to Vercel (not done yet)

`vercel.json` is already set up:

- **Build:** Vite preset, `npm ci`, `npm run build`, output in `dist/`. `package.json` requires Node >= 20.19 through `engines`.
- **Caching:** hashed files in `/assets/*` are cached for a year (`immutable`). HTML is always revalidated.
- **Security headers:** a strict Content-Security-Policy (everything self-hosted; inline styles allowed for Motion), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` and `Permissions-Policy`. The CSP was tested locally against the production build with no violations.

To deploy, push the repository to GitHub and import it in Vercel. No environment variables are needed. **This site has not been deployed.**

If you later add anything third-party (analytics, embeds, Google Fonts), update the CSP in `vercel.json`, or the browser will block it.

## Known limitations / Version 2 ideas

- Real project screenshots or short recordings to replace the illustrations.
- Live demos for the static web projects (Amazon clone, Rye Radio, PainPortal), if they get hosted.
- An Open Graph image (no `og:image` is set until a real asset exists).
- Possible later additions: a pinned scroll scene for featured work, and code-splitting Motion to shrink the initial bundle (about 147 KB gzipped JS today).
