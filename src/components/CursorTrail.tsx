import { useEffect, useRef, useState } from 'react'

/**
 * Signature cursor trail: a short, tapered ribbon of violet light with a cyan
 * leading edge, drawn on a single fixed canvas.
 *
 * - One requestAnimationFrame loop that only runs while there is something to draw.
 * - Pointer history lives in refs; no React state updates per event or frame.
 * - Disabled for coarse/touch pointers, small screens, and prefers-reduced-motion.
 * - pointer-events: none — it never intercepts clicks and the native cursor stays.
 */

interface TrailPoint {
  x: number
  y: number
  t: number
}

const LIFETIME_MS = 240 // how long a point survives -> tail retracts when idle
const MAX_POINTS = 28
const HEAD_EASE = 0.42 // smoothing factor for the leading point
const MAX_HALF_WIDTH = 2.6
const DPR_CAP = 2

const ENABLE_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)'

function useTrailEnabled(): boolean {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(ENABLE_QUERY)
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return enabled
}

export function CursorTrail() {
  const enabled = useTrailEnabled()
  return enabled ? <TrailCanvas /> : null
}

function TrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const points: TrailPoint[] = []
    const pointer = { x: 0, y: 0, active: false }
    const head = { x: 0, y: 0 }
    let frame = 0
    let dpr = 1
    let width = 0
    let height = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const clear = () => ctx.clearRect(0, 0, width, height)

    const reset = () => {
      points.length = 0
      pointer.active = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      clear()
    }

    let lastFrame = 0

    const draw = (now: number) => {
      frame = 0
      // Frame-rate independent easing (tuned for 60fps, correct at any rate).
      const dt = lastFrame ? Math.min(now - lastFrame, 100) : 16.7
      lastFrame = now
      const ease = 1 - Math.pow(1 - HEAD_EASE, dt / 16.7)

      // Ease the head toward the real pointer for a silky, slightly lagging line.
      if (pointer.active) {
        head.x += (pointer.x - head.x) * ease
        head.y += (pointer.y - head.y) * ease
        const last = points[points.length - 1]
        if (!last || Math.hypot(head.x - last.x, head.y - last.y) > 0.6) {
          points.push({ x: head.x, y: head.y, t: now })
        } else {
          last.t = now
        }
      }

      // Expire old points so the tail retracts and nothing lingers when idle.
      while (points.length && now - points[0].t > LIFETIME_MS) points.shift()
      while (points.length > MAX_POINTS) points.shift()

      clear()
      if (points.length >= 3) renderRibbon(ctx, points, now)

      const settled =
        Math.abs(pointer.x - head.x) < 0.3 && Math.abs(pointer.y - head.y) < 0.3
      if (points.length > 1 || !settled) {
        frame = requestAnimationFrame(draw)
      } else {
        points.length = 0
        lastFrame = 0
        clear()
      }
    }

    const wake = () => {
      if (!frame && !document.hidden) {
        lastFrame = 0
        frame = requestAnimationFrame(draw)
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!pointer.active) {
        // Start fresh at the cursor so the line never jumps across the screen.
        head.x = e.clientX
        head.y = e.clientY
      }
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
      wake()
    }

    const onLeave = () => {
      pointer.active = false
    }

    const onVisibility = () => {
      if (document.hidden) reset()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-screen"
    />
  )
}

/** Builds a tapered polygon around the smoothed path and fills it with a gradient. */
function renderRibbon(ctx: CanvasRenderingContext2D, pts: TrailPoint[], now: number) {
  const n = pts.length
  const left: { x: number; y: number }[] = []
  const right: { x: number; y: number }[] = []

  // Fade overall intensity with the age of the newest point (idle -> fades quickly).
  const freshness = Math.max(0, 1 - (now - pts[n - 1].t) / LIFETIME_MS)

  for (let i = 0; i < n; i++) {
    const prev = pts[Math.max(0, i - 1)]
    const next = pts[Math.min(n - 1, i + 1)]
    let dx = next.x - prev.x
    let dy = next.y - prev.y
    const len = Math.hypot(dx, dy) || 1
    dx /= len
    dy /= len
    const u = i / (n - 1) // 0 = tail, 1 = head
    // Thin tail, fullest just behind the head, slightly pinched at the very tip.
    const taper = Math.pow(u, 1.4) * (1 - Math.pow(u, 12) * 0.45)
    const w = MAX_HALF_WIDTH * taper
    left.push({ x: pts[i].x - dy * w, y: pts[i].y + dx * w })
    right.push({ x: pts[i].x + dy * w, y: pts[i].y - dx * w })
  }

  const tail = pts[0]
  const tip = pts[n - 1]
  const grad = ctx.createLinearGradient(tail.x, tail.y, tip.x, tip.y)
  grad.addColorStop(0, 'rgba(139, 92, 246, 0)')
  grad.addColorStop(0.45, `rgba(139, 92, 246, ${0.45 * freshness})`)
  grad.addColorStop(0.82, `rgba(167, 139, 250, ${0.85 * freshness})`)
  grad.addColorStop(1, `rgba(34, 211, 238, ${0.95 * freshness})`)

  ctx.beginPath()
  traceSmooth(ctx, left, true)
  traceSmooth(ctx, right.reverse(), false)
  ctx.closePath()

  ctx.save()
  ctx.shadowColor = `rgba(139, 92, 246, ${0.75 * freshness})`
  ctx.shadowBlur = 14
  ctx.fillStyle = grad
  ctx.fill()
  ctx.restore()

  // Soft luminous tip.
  const r = 7
  const glow = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, r)
  glow.addColorStop(0, `rgba(165, 243, 252, ${0.55 * freshness})`)
  glow.addColorStop(1, 'rgba(34, 211, 238, 0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(tip.x, tip.y, r, 0, Math.PI * 2)
  ctx.fill()
}

/** Quadratic curve through midpoints for a smooth edge. */
function traceSmooth(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], moveFirst: boolean) {
  if (moveFirst) ctx.moveTo(pts[0].x, pts[0].y)
  else ctx.lineTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2
    const my = (pts[i].y + pts[i + 1].y) / 2
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my)
  }
  const last = pts[pts.length - 1]
  ctx.lineTo(last.x, last.y)
}
