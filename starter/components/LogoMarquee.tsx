'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SectionLabel } from './SectionLabel'

const logos = [
  { name: 'n8n', src: '/logos/n8n.png', width: 48, height: 48, tagline: 'Workflow automation for technical teams' },
  { name: 'Clay', src: '/logos/clay.png', width: 56, height: 44, tagline: 'Creative data enrichment at scale' },
  { name: 'Airtable', src: '/logos/airtable.png', width: 48, height: 48, tagline: 'The spreadsheet-database hybrid' },
  { name: 'ProntoHQ', src: '/logos/pronto.svg', width: 120, height: 30, tagline: 'Real-time team communication' },
  { name: 'Anthropic', src: '/logos/anthropic.png', width: 48, height: 48, tagline: 'AI research and safety' },
  { name: 'Apollo', src: '/logos/apollo.jpeg', width: 48, height: 48, tagline: 'Sales intelligence and engagement' },
  { name: 'Findymail', src: '/logos/findymail.png', width: 48, height: 40, tagline: 'Verified email finding' },
]

export function LogoMarquee() {
  const doubled = [...logos, ...logos]
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ marginBottom: 48 }}>
      <SectionLabel>Built With</SectionLabel>
      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="marquee-track">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                padding: '0 32px',
                opacity: 0.7,
                position: 'relative',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                style={{ objectFit: 'contain' }}
              />
              {hovered === i && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: 8,
                    background: '#1f2937',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '8px 12px',
                    whiteSpace: 'nowrap',
                    fontSize: 13,
                    lineHeight: 1.4,
                    pointerEvents: 'none',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{logo.name}</div>
                  <div style={{ opacity: 0.8 }}>{logo.tagline}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
