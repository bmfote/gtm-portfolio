'use client'

import { useEffect, useRef, useState } from 'react'

interface WaterfallNode {
  label: string
  sublabel?: string
  isIndented?: boolean
}

interface WaterfallDiagramProps {
  nodes: WaterfallNode[]
  title?: string
}

export function WaterfallDiagram({ nodes, title }: WaterfallDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return
    setVisibleCount(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= nodes.length) {
        clearInterval(interval)
        // loop after pause
        setTimeout(() => {
          setTriggered(false)
          setVisibleCount(0)
          setTimeout(() => setTriggered(true), 100)
        }, 3000)
      }
    }, 300)
    return () => clearInterval(interval)
  }, [triggered, nodes.length])

  return (
    <div ref={ref} style={{ fontFamily: 'var(--font-mono)' }}>
      {title && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: 16,
          }}
        >
          {title}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {nodes.map((node, i) => {
          const isVisible = i < visibleCount
          const isLatest = i === visibleCount - 1
          const indent = node.isIndented ? 32 : 0

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Node row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  paddingLeft: indent,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
              >
                {/* Node dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: isLatest ? 'var(--accent)' : 'var(--canvas-border)',
                    border: isLatest ? '2px solid var(--accent)' : '2px solid var(--canvas-border)',
                    boxShadow: isLatest ? '0 0 8px rgba(88,166,255,0.5)' : 'none',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                />
                {/* Label */}
                <div>
                  <span
                    style={{
                      fontSize: 13,
                      color: isLatest ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isLatest ? 600 : 400,
                      transition: 'color 0.2s',
                    }}
                  >
                    {node.label}
                  </span>
                  {node.sublabel && (
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--text-secondary)',
                        marginLeft: 8,
                        opacity: 0.7,
                      }}
                    >
                      — {node.sublabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Connector line down */}
              {i < nodes.length - 1 && (
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: isVisible ? 'var(--canvas-border)' : 'transparent',
                    marginLeft: indent + 4,
                    transition: 'background 0.2s',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
