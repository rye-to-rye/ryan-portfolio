import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Search, ShoppingCart } from 'lucide-react'

/** Abstract product-grid composition with a small cart interaction (not a screenshot). */

const products = [
  { shape: 'circle', hue: 'from-violet-soft/80 to-violet-deep/60' },
  { shape: 'square', hue: 'from-amber-200/70 to-amber-500/40' },
  { shape: 'pill', hue: 'from-slate-200/60 to-slate-500/30' },
  { shape: 'triangle', hue: 'from-cyan/60 to-violet/40' },
  { shape: 'square', hue: 'from-violet/60 to-fuchsia-500/30' },
  { shape: 'circle', hue: 'from-amber-100/60 to-orange-400/30' },
] as const

const ADD_ORDER = [1, 3, 4]

export function StorefrontVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setCount(n)
      if (n >= ADD_ORDER.length) window.clearInterval(id)
    }, 700)
    return () => window.clearInterval(id)
  }, [inView])

  const added = new Set(ADD_ORDER.slice(0, count))

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col p-5 pb-12 sm:p-8 sm:pb-12">
      {/* store header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="h-2.5 w-14 rounded-full bg-paper/80" />
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-white/10 bg-black/30 px-2.5">
          <Search className="size-3 text-muted" aria-hidden="true" />
          <span className="h-1.5 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className="relative">
          <ShoppingCart className="size-5 text-paper" aria-hidden="true" />
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              className="absolute -top-2 -right-2.5 grid size-4 place-items-center rounded-full bg-amber-400 font-mono text-[0.6rem] font-bold text-obsidian"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* product grid */}
      <div className="grid flex-1 grid-cols-3 gap-2.5 sm:gap-3">
        {products.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col rounded-lg border p-2 transition-colors duration-500 sm:p-2.5 ${
              added.has(i) ? 'border-amber-300/50 bg-amber-300/[0.04]' : 'border-white/8 bg-white/[0.02]'
            }`}
          >
            <div className="grid flex-1 place-items-center">
              <Shape shape={p.shape} hue={p.hue} />
            </div>
            <span className="mt-2 h-1 w-3/4 rounded-full bg-white/15" />
            <div className="mt-1.5 flex items-center justify-between">
              <span className="h-1 w-1/3 rounded-full bg-amber-200/50" />
              <span
                className={`rounded px-1.5 py-[1px] font-mono text-[0.5rem] transition-colors duration-500 ${
                  added.has(i) ? 'bg-amber-400 text-obsidian' : 'bg-white/10 text-muted'
                }`}
              >
                {added.has(i) ? 'added' : 'add'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Shape({ shape, hue }: { shape: (typeof products)[number]['shape']; hue: string }) {
  const base = `bg-gradient-to-br ${hue}`
  switch (shape) {
    case 'circle':
      return <span className={`block size-8 rounded-full sm:size-10 ${base}`} />
    case 'square':
      return <span className={`block size-8 rotate-6 rounded-md sm:size-9 ${base}`} />
    case 'pill':
      return <span className={`block h-10 w-5 rounded-full sm:h-12 sm:w-6 ${base}`} />
    case 'triangle':
      return (
        <span
          className={`block size-9 sm:size-10 ${base}`}
          style={{ clipPath: 'polygon(50% 6%, 96% 92%, 4% 92%)' }}
        />
      )
  }
}
