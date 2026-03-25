import { SectionLabel } from '@/components/SectionLabel'
import { ProjectCard } from '@/components/ProjectCard'
import { ContactSplit } from '@/components/ContactSplit'

const projects = [
  {
    slug: 'abm-prospecting-machine',
    title: 'ABM Prospecting Machine',
    oneliner: 'You click one button. 5–20 minutes later, enriched leads are in your CRM.',
    stack: ['n8n', 'Pronto', 'Instantly', 'Claude'],
    tags: [
      { label: 'OUTBOUND', color: 'teal' as const },
      { label: 'PIPELINE GENERATION', color: 'green' as const },
    ],
    nodeCount: 21,
  },
  {
    slug: 'champion-job-change-tracker',
    title: 'Champion Job Change Tracker',
    oneliner: 'Monday morning sync. Real-time detection. AI scores every change. Hot ones go straight to sequence.',
    stack: ['n8n', 'Pronto', 'Airtable', 'Claude'],
    tags: [
      { label: 'OUTBOUND', color: 'teal' as const },
      { label: 'JOB CHANGE SIGNAL', color: 'orange' as const },
    ],
    nodeCount: 27,
    workflowCount: 3,
  },
  {
    slug: 'icebreaker-sdr',
    title: 'Growth-Triggered Icebreaker',
    oneliner: 'Signal detected Monday 9am. Lead enrolled in outbound sequence before noon. No human touchpoints.',
    stack: ['n8n', 'Pronto', 'Airtable', 'Claude', 'LaGrowthMachine'],
    tags: [
      { label: 'OUTBOUND', color: 'teal' as const },
      { label: 'GROWTH SIGNAL', color: 'orange' as const },
    ],
    nodeCount: 49,
    workflowCount: 4,
  },
  {
    slug: 'next-best-action',
    title: 'Next Best Action System',
    oneliner: 'Multi-signal scoring, governance gates, and a ranked daily action queue. Reps work the right accounts, in the right order, every day.',
    stack: ['Clay'],
    tags: [
      { label: 'PIPELINE PRIORITIZATION', color: 'teal' as const },
      { label: 'SCORING ENGINE', color: 'green' as const },
    ],
  },
]

const contactLinks = [
  { label: 'battersonsales@gmail.com', href: 'mailto:battersonsales@gmail.com' },
  { label: 'linkedin.com/in/matthewbatterson', href: 'https://linkedin.com/in/matthewbatterson', external: true },
]

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 100 }}>

      {/* Hero */}
      <section style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}
        >
          I build GTM systems.<br />
          <span style={{ color: 'var(--accent)' }}>The kind that run while you sleep.</span>
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'var(--text-secondary)',
            maxWidth: 540,
            lineHeight: 1.75,
            margin: '0 0 24px',
          }}
        >
          GTM Engineer based in Lenexa, KS. I wire together AI, automation, and signal detection
          into systems that find, qualify, and engage the right leads — without reps lifting a finger.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '10px 24px',
              borderRadius: 6,
              background: 'var(--accent)',
              color: '#0D1117',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            see the systems →
          </a>
          <a
            href="mailto:battersonsales@gmail.com"
            style={{
              padding: '10px 24px',
              borderRadius: 6,
              border: '1px solid var(--canvas-border)',
              color: 'var(--text-primary)',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            get in touch
          </a>
        </div>
      </section>

      {/* Projects grid */}
      <section id="projects" style={{ marginBottom: 80 }}>
        <SectionLabel>GTM Systems</SectionLabel>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <ContactSplit
          headline="Let's build something that runs while you sleep."
          subtext="I'm open to GTM Engineering, Revenue Operations, and automation consulting roles. If you're building a serious outbound motion, let's talk."
          links={contactLinks}
        />
      </section>

    </div>
  )
}
