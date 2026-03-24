'use client'

import { useEffect, useRef, useState } from 'react'

interface ChevronFlowProps {
  steps: string[]
}

export function ChevronFlow({ steps }: ChevronFlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  useEffect(() => {
    if (!visible) return

    let i = 0
    const interval = setInterval(() => {
      setActiveIndex(i)
      i++
      if (i >= steps.length) {
        // pause then loop
        setTimeout(() => {
          setActiveIndex(-1)
          setTimeout(() => setVisible(false), 100)
          setTimeout(() => setVisible(true), 200)
        }, 2000)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [visible, steps.length])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        flexWrap: 'wrap',
        rowGap: 12,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {steps.map((step, i) => {
        const isActive = i === activeIndex
        const isPast = i < activeIndex

        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Step node */}
            <div
              style={{
                padding: '10px 18px',
                background: isActive
                  ? 'rgba(88,166,255,0.12)'
                  : isPast
                  ? 'rgba(88,166,255,0.04)'
                  : 'var(--canvas-subtle)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--canvas-border)'}`,
                borderRadius: 6,
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                color: isActive
                  ? 'var(--accent)'
                  : isPast
                  ? 'var(--text-secondary)'
                  : 'var(--text-secondary)',
                boxShadow: isActive ? '0 0 12px rgba(88,166,255,0.3)' : 'none',
                opacity: visible ? (isPast ? 0.5 : 1) : 0,
                transform: visible ? 'scale(1)' : 'scale(0.9)',
                transition: `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s, background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s`,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: 'var(--accent)', marginRight: 8, opacity: isPast ? 0.5 : 1 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {step}
            </div>

            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: visible ? (i < activeIndex ? 0.4 : 0.25) : 0,
                  transition: `opacity 0.3s ease ${i * 0.05 + 0.1}s`,
                  color: 'var(--accent)',
                  fontSize: 14,
                }}
              >
                →
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
