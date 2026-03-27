import Image from 'next/image'
import { SectionLabel } from './SectionLabel'

const logos = [
  { name: 'n8n', src: '/logos/n8n.png', width: 48, height: 48 },
  { name: 'Clay', src: '/logos/clay.png', width: 56, height: 44 },
  { name: 'Airtable', src: '/logos/airtable.png', width: 48, height: 48 },
  { name: 'ProntoHQ', src: '/logos/pronto.svg', width: 120, height: 30 },
  { name: 'Anthropic', src: '/logos/anthropic.png', width: 48, height: 48 },
  { name: 'Apollo', src: '/logos/apollo.jpeg', width: 48, height: 48 },
  { name: 'Findymail', src: '/logos/findymail.png', width: 48, height: 40 },
]

export function LogoMarquee() {
  // Duplicate the list so the scroll loops seamlessly
  const doubled = [...logos, ...logos]

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
              }}
              title={logo.name}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
