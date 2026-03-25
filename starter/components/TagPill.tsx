const TAG_COLORS: Record<string, string> = {
  amber: '#D29922',
  blue: '#58A6FF',
  green: '#3FB950',
  muted: '#8B949E',
}

interface TagPillProps {
  children: React.ReactNode
  color?: string
}

export function TagPill({ children, color }: TagPillProps) {
  const c = (color && TAG_COLORS[color]) ?? TAG_COLORS.blue
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 4,
        border: `1px solid ${c}`,
        color: c,
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
