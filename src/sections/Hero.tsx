import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { hero } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const enter = (delay: number, y = 20) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        }

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 md:pt-28">
      {/* atmosphere */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-15%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-7">
          <motion.p {...enter(0.1, 10)} className="mono-label mb-8 flex items-center gap-3">
            <span className="inline-block size-1.5 rounded-full bg-violet shadow-[0_0_10px_2px_rgba(139,92,246,0.7)]" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="font-display text-[clamp(2.6rem,6.3vw,6rem)] leading-[0.96] font-semibold tracking-[-0.035em]">
            {hero.headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === hero.headlineLines.length - 1 ? 'text-gradient' : ''}`}
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, delay: 0.25 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...enter(0.75)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {hero.supporting}
          </motion.p>

          <motion.div {...enter(0.9)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-violet-strong px-6 py-3.5 font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)] transition-[background-color,box-shadow] hover:bg-violet-deep hover:shadow-[0_10px_50px_-8px_rgba(139,92,246,0.95)]"
            >
              Explore my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-medium text-paper transition-colors hover:border-violet/60 hover:bg-violet/10"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative lg:col-span-5"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
        >
          <HeroArtwork animate={!reduce} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        {...enter(1.4, 0)}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-paper sm:flex"
      >
        <span className="mono-label text-[0.65rem]">Scroll to explore</span>
        <span className="cue-track h-10 w-px bg-line-strong" aria-hidden="true" />
      </motion.a>

    </section>
  )
}

/**
 * Abstract "idea → build → ship" composition: luminous intersecting paths over a
 * fine grid with small coordinate markers. Pure SVG; decorative only.
 */
function HeroArtwork({ animate }: { animate: boolean }) {
  const main = 'M40 470 C 160 430, 170 300, 280 280 S 470 160, 520 60'
  const second = 'M30 250 C 150 260, 220 360, 330 380 S 500 330, 540 420'
  const third = 'M120 540 C 170 420, 260 210, 330 150 S 430 60, 470 30'

  const draw = (delay: number) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 2.2, delay, ease },
        }
      : {}

  const nodes = [
    { x: 202, y: 322, label: '01 · idea' },
    { x: 280, y: 280, label: '02 · build' },
    { x: 422, y: 200, label: '03 · ship' },
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]" aria-hidden="true">
      <svg viewBox="0 0 560 560" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="hero-main" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="0.35" stopColor="#8B5CF6" />
            <stop offset="0.8" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="hero-soft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#A78BFA" stopOpacity="0" />
            <stop offset="0.5" stopColor="#A78BFA" stopOpacity="0.55" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hero-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-mask">
            <rect width="560" height="560" fill="url(#hero-fade)" />
          </mask>
        </defs>

        {/* orbit rings + crosshair */}
        <g mask="url(#hero-mask)" fill="none" stroke="#9AA4B2">
          <circle cx="280" cy="280" r="236" strokeOpacity="0.12" />
          <circle cx="280" cy="280" r="168" strokeOpacity="0.16" strokeDasharray="2 7" />
          <circle cx="280" cy="280" r="96" strokeOpacity="0.1" />
          <line x1="280" y1="10" x2="280" y2="550" strokeOpacity="0.08" />
          <line x1="10" y1="280" x2="550" y2="280" strokeOpacity="0.08" />
        </g>

        {/* paths */}
        <motion.path d={second} fill="none" stroke="url(#hero-soft)" strokeWidth="1" {...draw(0.6)} />
        <motion.path d={third} fill="none" stroke="#22D3EE" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="1 6" strokeLinecap="round" {...draw(0.9)} />
        <motion.path d={main} fill="none" stroke="url(#hero-main)" strokeWidth="2" strokeLinecap="round" filter="url(#hero-glow)" {...draw(0.4)} />

        {/* travelling light on the main path */}
        {animate && (
          <circle r="3.2" fill="#E9D5FF" filter="url(#hero-glow)" opacity="0">
            <set attributeName="opacity" to="1" begin="2.4s" />
            <animateMotion dur="7s" begin="2.4s" repeatCount="indefinite" path={main} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
          </circle>
        )}

        {/* nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={animate ? { opacity: 0, scale: 0.5 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 + i * 0.25, ease }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="14" fill="none" stroke="#A78BFA" strokeOpacity="0.35" />
            <circle cx={n.x} cy={n.y} r="4" fill={i === 2 ? '#22D3EE' : '#8B5CF6'} />
            <text x={n.x + 22} y={n.y + 4} fill="#C4CBD6" fontSize="14" fontFamily="JetBrains Mono Variable, monospace" letterSpacing="1">
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* corner crop marks + coordinates */}
        <g stroke="#9AA4B2" strokeOpacity="0.35" fill="none">
          <path d="M24 60 V24 H60" />
          <path d="M500 24 H536 V60" />
          <path d="M24 500 V536 H60" />
          <path d="M536 500 V536 H500" />
        </g>
        <g fill="#9AA4B2" fillOpacity="0.6" fontSize="11" fontFamily="JetBrains Mono Variable, monospace" letterSpacing="1.5">
          <text x="70" y="30">x 0.00 / y 0.00</text>
          <text x="400" y="548">RR. — v1</text>
          <text x="70" y="548">{'{ from idea }'}</text>
        </g>
      </svg>
    </div>
  )
}
