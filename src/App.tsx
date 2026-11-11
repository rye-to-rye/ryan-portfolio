import { MotionConfig } from 'motion/react'
import { CursorTrail } from './components/CursorTrail'
import { ScrollProgress } from './components/ScrollProgress'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { FeaturedWork } from './sections/FeaturedWork'
import { BeyondBrowser } from './sections/BeyondBrowser'
import { TheLab } from './sections/TheLab'
import { Toolkit } from './sections/Toolkit'
import { Goals } from './sections/Goals'
import { Interests } from './sections/Interests'
import { Experience } from './sections/Experience'
import { UnderTheHood } from './sections/UnderTheHood'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-paper px-4 py-2 text-obsidian focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main" className="relative z-[2]">
          <Hero />
          <About />
          <FeaturedWork />
          <BeyondBrowser />
          <TheLab />
          <Toolkit />
          <Goals />
          <Interests />
          <Experience />
          <UnderTheHood />
          <Contact />
        </main>
        <SiteFooter />
        <CursorTrail />
      </div>
    </MotionConfig>
  )
}
