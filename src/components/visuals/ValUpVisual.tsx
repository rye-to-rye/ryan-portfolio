import { motion } from 'motion/react'
import { Clock, Play } from 'lucide-react'

/** Abstract illustration of ValUp's Discord command flow (not a screenshot). */

const rows = [
  { label: 'map', options: ['Haven', 'Ascent'], picked: 0 },
  { label: 'agent', options: ['Sova'], picked: 0 },
  { label: 'side', options: ['Attack', 'Defense'], picked: 1 },
]

const chip = {
  hidden: { backgroundColor: 'rgba(139,92,246,0)', borderColor: 'rgba(154,164,178,0.25)', color: '#9AA4B2' },
  show: { backgroundColor: 'rgba(139,92,246,0.22)', borderColor: 'rgba(167,139,250,0.8)', color: '#F5F7FA' },
}

export function ValUpVisual() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col gap-3 p-5 pb-12 sm:gap-4 sm:p-8 sm:pb-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.35, delayChildren: 0.3 }}
    >
      {/* channel header */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-3">
        <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet to-violet-deep font-display text-sm font-bold">
          V
        </span>
        <div className="leading-tight">
          <p className="font-mono text-[0.7rem] text-paper">ValUp</p>
          <p className="font-mono text-[0.62rem] text-muted"># lineups</p>
        </div>
        <span className="ml-auto rounded bg-violet/20 px-1.5 py-0.5 font-mono text-[0.58rem] text-violet-soft">BOT</span>
      </div>

      {/* slash command */}
      <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-black/30 px-3 py-2 font-mono text-[0.72rem]">
        <span className="text-violet-soft">/lineups</span>
        <span className="h-3.5 w-px animate-pulse bg-paper/70" />
      </div>

      {/* selection menus */}
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="w-11 shrink-0 font-mono text-[0.62rem] uppercase tracking-widest text-muted">{row.label}</span>
            <div className="flex flex-wrap gap-2">
              {row.options.map((opt, i) => (
                <motion.span
                  key={opt}
                  variants={i === row.picked ? chip : undefined}
                  transition={{ duration: 0.4 }}
                  className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
                >
                  {opt}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* returned clips */}
      <motion.div
        className="mt-auto grid grid-cols-3 gap-2.5"
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6 }}
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-graphite-2 to-ink"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.35),transparent_60%)]" />
            <Play className="absolute top-1/2 left-1/2 size-4 -translate-1/2 fill-paper/80 text-paper/80" aria-hidden="true" />
            <span className="absolute bottom-1 left-1.5 font-mono text-[0.55rem] text-paper/70">clip {n}</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex items-center gap-2 font-mono text-[0.62rem] text-muted"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      >
        <Clock className="size-3 text-cyan" aria-hidden="true" />
        signed link · expires soon
        <span className="relative ml-2 h-px flex-1 overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 bg-cyan/70"
            variants={{ hidden: { width: '100%' }, show: { width: '28%' } }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
          />
        </span>
      </motion.div>
    </motion.div>
  )
}
