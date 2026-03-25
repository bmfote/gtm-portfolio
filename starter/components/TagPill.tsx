interface TagPillProps {
  children: React.ReactNode
}

export function TagPill({ children }: TagPillProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 4,
        border: '1px solid var(--accent)',
        color: 'var(--accent)',
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
