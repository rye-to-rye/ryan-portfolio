import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

/** Tuner dial, globe lines and a waveform — artwork for Rye Radio (not a screenshot). */

const BARS = 36
const ticks = Array.from({ length: 41 }, (_, i) => i)

export function RadioVisual() {
  // The station pulses loop forever, so they're skipped entirely for reduced motion.
  const reduce = useReducedMotion()
  return (
    <div className="absolute inset-0 flex flex-col p-5 pb-12 sm:p-8 sm:pb-12">
      {/* globe of stations */}
      <div className="relative flex flex-1 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full max-h-56 w-auto" aria-hidden="true">
          <defs>
            <radialGradient id="radio-core" cx="50%" cy="45%" r="55%">
              <stop offset="0" stopColor="#22D3EE" stopOpacity="0.28" />
              <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="78" fill="url(#radio-core)" />
          <g fill="none" stroke="#9AA4B2" strokeOpacity="0.25" strokeWidth="0.75">
            <circle cx="100" cy="100" r="78" />
            <ellipse cx="100" cy="100" rx="30" ry="78" />
            <ellipse cx="100" cy="100" rx="58" ry="78" />
            <ellipse cx="100" cy="100" rx="78" ry="28" />
            <ellipse cx="100" cy="100" rx="78" ry="56" />
            <line x1="22" y1="100" x2="178" y2="100" />
          </g>
          {[
            [62, 70],
            [128, 58],
            [146, 112],
            [84, 132],
            [108, 92],
          ].map(([x, y], i) => (
            <g key={i}>
              {!reduce && <motion.circle
                cx={x}
                cy={y}
                r="10"
                fill="none"
                stroke="#22D3EE"
                strokeOpacity="0.5"
                initial={{ scale: 0.2, opacity: 0.8 }}
                whileInView={{ scale: [0.2, 1.4], opacity: [0.8, 0] }}
                transition={{ duration: 2.6, delay: i * 0.5, repeat: Infinity, repeatDelay: 1.2 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />}
              <circle cx={x} cy={y} r="2.4" fill={i === 4 ? '#22D3EE' : '#A78BFA'} />
            </g>
          ))}
        </svg>
      </div>

      {/* waveform */}
      <div className="mb-4 flex h-10 items-center justify-center gap-[3px]" aria-hidden="true">
        {Array.from({ length: BARS }, (_, i) => {
          const h = 30 + 70 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21))
          return (
            <span
              key={i}
              className="w-[3px] origin-center animate-wave rounded-full bg-gradient-to-t from-violet to-violet-soft"
              style={{ height: `${h}%`, animationDelay: `${(i % 9) * -0.16}s` }}
            />
          )
        })}
      </div>

      {/* tuner scale */}
      <div className="relative h-8 border-t border-white/10" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 flex justify-between">
          {ticks.map((t) => (
            <span key={t} className={`w-px bg-white/25 ${t % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
          ))}
        </div>
        <motion.span
          className="absolute -top-3 h-7 w-[2px] rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]"
          initial={{ left: '12%' }}
          whileInView={{ left: '63%' }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>

      {/* controls */}
      <div className="flex items-center justify-between font-mono text-[0.62rem] text-muted">
        <span className="flex items-center gap-1">
          <ChevronLeft className="size-3.5" aria-hidden="true" /> prev
        </span>
        <span className="grid size-8 place-items-center rounded-full border border-white/15 bg-white/5">
          <Play className="size-3.5 fill-paper text-paper" aria-hidden="true" />
        </span>
        <span className="flex items-center gap-1">
          next <ChevronRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
