interface RuleCardProps {
  emoji: string
  title: string
  description: string
}

export function RuleCard({ emoji, title, description }: RuleCardProps) {
  return (
    <div
      style={{
        background: 'var(--canvas-subtle)',
        border: '1px solid var(--canvas-border)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: '0 8px 8px 0',
        padding: '20px 24px',
      }}
    >
      <div style={{ fontSize: 20, marginBottom: 10 }}>{emoji}</div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.02em',
          marginBottom: 8,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {description}
      </div>
    </div>
  )
}

interface RuleCardGridProps {
  cards: RuleCardProps[]
}

export function RuleCardGrid({ cards }: RuleCardGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      {cards.map((card, i) => (
        <RuleCard key={i} {...card} />
      ))}
    </div>
  )
}
