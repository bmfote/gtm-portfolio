interface ToolCardProps {
  icon: string
  name: string
  description: string
}

export function ToolCard({ icon, name, description }: ToolCardProps) {
  return (
    <div
      style={{
        background: 'var(--canvas-subtle)',
        border: '1px solid var(--canvas-border)',
        borderRadius: 8,
        padding: '18px 20px',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ fontSize: 24 }}>{icon}</div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  )
}

interface ToolCardGridProps {
  tools: ToolCardProps[]
}

export function ToolCardGrid({ tools }: ToolCardGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
      }}
    >
      {tools.map((tool, i) => (
        <ToolCard key={i} {...tool} />
      ))}
    </div>
  )
}
