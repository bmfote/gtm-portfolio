'use client'

import Link from 'next/link'
import type { Tag } from '@/content/projects/types'

interface ProjectCardProps {
  slug: string
  title: string
  oneliner: string
  stack: string[]
  tags: Tag[]
  nodeCount?: number
  workflowCount?: number
}

export function ProjectCard({
  slug,
  title,
  oneliner,
  stack,
  tags,
  nodeCount,
  workflowCount,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          background: 'var(--canvas-subtle)',
          border: '1px solid var(--canvas-border)',
          borderRadius: 10,
          padding: '28px 28px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          cursor: 'pointer',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = 'var(--accent)'
          el.style.boxShadow = '0 0 20px rgba(88,166,255,0.08)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = 'var(--canvas-border)'
          el.style.boxShadow = 'none'
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(tag => {
            const tagColors: Record<string, string> = {
              amber: '#D29922', blue: '#58A6FF', green: '#3FB950', red: '#F85149', muted: '#8B949E',
            }
            const c = (tag.color && tagColors[tag.color]) ?? tagColors.blue
            return (
              <span
                key={tag.label}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: c,
                  border: `1px solid ${c}`,
                  borderRadius: 3,
                  padding: '2px 7px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tag.label}
              </span>
            )
          })}
        </div>

        {/* Title + oneliner */}
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 8px',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {oneliner}
          </p>
        </div>

        {/* Stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {stack.map(tool => (
            <span
              key={tool}
              style={{
                fontSize: 11,
                color: 'var(--text-secondary)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--canvas-border)',
                borderRadius: 4,
                padding: '2px 8px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Metrics footer */}
        {(nodeCount || workflowCount) && (
          <div
            style={{
              display: 'flex',
              gap: 20,
              paddingTop: 12,
              borderTop: '1px solid var(--canvas-border)',
              marginTop: 'auto',
            }}
          >
            {nodeCount && (
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{nodeCount}</span> nodes
              </span>
            )}
            {workflowCount && (
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{workflowCount}</span> workflows
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
