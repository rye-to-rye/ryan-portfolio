interface TagProps {
  children: string
  tone?: 'default' | 'violet'
}

export function Tag({ children, tone = 'default' }: TagProps) {
  const toneClass =
    tone === 'violet'
      ? 'border-violet/35 bg-violet/10 text-violet-soft'
      : 'border-line bg-white/[0.02] text-muted'
  return (
    <li className={`rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide ${toneClass}`}>
      {children}
    </li>
  )
}
