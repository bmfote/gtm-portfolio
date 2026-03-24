interface StatItem {
  metric: string
  label: string
  description?: string
}

interface StatBlockProps {
  stats: StatItem[]
}

export function StatBlock({ stats }: StatBlockProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: 1,
        background: 'var(--canvas-border)',
        border: '1px solid var(--canvas-border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: 'var(--canvas-subtle)',
            padding: '24px 20px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: 'var(--accent)',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {stat.metric}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: stat.description ? 6 : 0,
            }}
          >
            {stat.label}
          </div>
          {stat.description && (
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {stat.description}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
