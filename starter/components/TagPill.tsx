import type { TagColor } from '@/content/projects/types'

const colorMap: Record<TagColor, string> = {
  teal: '#2DD4BF',
  green: '#4EC373',
  red: '#F85149',
  orange: '#F0883E',
}

interface TagPillProps {
  children: React.ReactNode
  color?: TagColor
}

export function TagPill({ children, color = 'teal' }: TagPillProps) {
  const hex = colorMap[color]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 4,
        border: `1px solid ${hex}`,
        color: hex,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
        lineHeight: 1.6,
      }}
    >
      {children}
    </span>
  )
}
