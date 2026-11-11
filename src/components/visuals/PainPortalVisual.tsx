import { useState } from 'react'

/**
 * Surreal, intentionally "broken" login form — artwork for PainPortal.
 * The fake button dodges the mouse as a nod to the original's teleporting button.
 * It is decorative only (aria-hidden, not focusable) so it never traps anyone.
 */

const SPOTS = [
  { x: 0, y: 0, r: -4 },
  { x: 120, y: -150, r: 12 },
  { x: -90, y: -60, r: -18 },
  { x: 60, y: -230, r: 24 },
  { x: -40, y: 40, r: 8 },
]

export function PainPortalVisual() {
  const [spot, setSpot] = useState(0)
  const pos = SPOTS[spot]

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* tumbling physics blocks */}
      <span className="absolute top-[12%] right-[10%] size-10 rotate-[28deg] rounded-md border border-pink-300/40 bg-pink-400/10" />
      <span className="absolute top-[30%] right-[22%] size-6 -rotate-12 rounded-sm border border-violet-soft/50 bg-violet/15" />
      <span className="absolute bottom-[16%] left-[8%] size-8 rotate-45 rounded-sm border border-cyan/40 bg-cyan/10" />

      {/* cat */}
      <svg viewBox="0 0 80 70" className="absolute right-[9%] bottom-[10%] w-20 animate-float-slow sm:w-24">
        <path d="M10 62 Q8 30 16 10 L28 24 Q40 20 52 24 L64 10 Q72 30 70 62 Z" fill="#181C27" stroke="#F472B6" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="30" cy="40" r="4" fill="#F5F7FA" />
        <circle cx="50" cy="40" r="4" fill="#F5F7FA" />
        <circle cx="31" cy="41" r="2" fill="#090B10" />
        <circle cx="49" cy="39" r="2" fill="#090B10" />
        <path d="M36 50 Q40 54 44 50" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* the form */}
      <div className="absolute top-1/2 left-1/2 w-[72%] max-w-xs -translate-1/2 -rotate-3 rounded-xl border border-white/10 bg-ink/90 p-4 shadow-2xl sm:p-5">
        <p className="mb-3 font-display text-lg font-semibold">
          Log in<span className="text-pink-400">?</span>
        </p>
        <div className="mb-2 h-7 translate-x-3 rotate-2 rounded-md border border-white/15 bg-white/5 px-2 font-mono text-[0.6rem] leading-7 text-muted">
          username
        </div>
        <div className="mb-3 h-7 -translate-x-2 -rotate-3 rounded-md border border-pink-400/40 bg-white/5 px-2 font-mono text-[0.6rem] leading-7 text-muted">
          ••••••••••••••
        </div>
        <ul className="mb-4 space-y-1 font-mono text-[0.55rem] text-muted">
          <li className="flex items-center gap-1.5"><span className="text-cyan">✓</span> 8+ characters</li>
          <li className="flex items-center gap-1.5 line-through decoration-pink-400"><span className="text-pink-400">✕</span> requirement pending</li>
          <li className="flex items-center gap-1.5 opacity-60"><span>?</span> requirement changed</li>
        </ul>
        <div className="h-8" />
      </div>

      {/* teleporting button */}
      <div
        className="teleport absolute top-[63%] left-[48%] rounded-full bg-gradient-to-r from-pink-400 to-violet px-5 py-2 font-display text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(244,114,182,0.6)] select-none"
        style={{ transform: `translate(${pos.x}%, ${pos.y}%) rotate(${pos.r}deg)` }}
        onMouseEnter={() => setSpot((s) => (s + 1) % SPOTS.length)}
      >
        Submit
      </div>
    </div>
  )
}
