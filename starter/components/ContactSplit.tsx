'use client'

interface ContactLink {
  label: string
  href: string
  external?: boolean
}

interface ContactSplitProps {
  headline: string
  subtext?: string
  links: ContactLink[]
}

export function ContactSplit({ headline, subtext, links }: ContactSplitProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'start',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            margin: '0 0 12px',
          }}
        >
          {headline}
        </h2>
        {subtext && (
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {subtext}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          paddingTop: 6,
        }}
      >
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            style={{
              display: 'block',
              padding: '14px 18px',
              background: 'var(--canvas-subtle)',
              border: '1px solid var(--canvas-border)',
              borderRadius: 8,
              fontSize: 13,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--canvas-border)'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
