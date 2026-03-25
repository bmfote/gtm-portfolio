import { SectionLabel } from '@/components/SectionLabel'
import { ProjectCard } from '@/components/ProjectCard'
import { ContactSplit } from '@/components/ContactSplit'

const projects = [
  {
    slug: 'abm-prospecting-machine',
    title: 'ICP Click-to-CRM',
    oneliner: 'Define your ICP. Click once. Enriched leads land in your CRM.',
    stack: ['n8n', 'Pronto', 'Instantly', 'Claude'],
    tags: [
      { label: 'OUTBOUND', color: 'amber' as const },
      { label: 'PIPELINE GENERATION', color: 'muted' as const },
    ],
    nodeCount: 21,
    workflowCount: 4,
  },
  {
    slug: 'champion-job-change-tracker',
    title: 'Champion Reactivation',
    oneliner: 'Champion moves jobs. Claude scores the fit. Hot ones hit sequence.',
    stack: ['n8n', 'Pronto', 'Airtable', 'Claude'],
    tags: [
      { label: 'OUTBOUND', color: 'amber' as const },
      { label: 'JOB CHANGE SIGNAL', color: 'green' as const },
    ],
    nodeCount: 27,
    workflowCount: 3,
  },
  {
    slug: 'icebreaker-sdr',
    title: 'Growth Triggered Icebreaker',
    oneliner: 'Growth signal detected. Personalized icebreaker written. Zero manual steps.',
    stack: ['n8n', 'Pronto', 'Airtable', 'Claude', 'LaGrowthMachine'],
    tags: [
      { label: 'OUTBOUND', color: 'amber' as const },
      { label: 'GROWTH SIGNAL', color: 'green' as const },
    ],
    nodeCount: 49,
    workflowCount: 4,
  },
  {
    slug: 'next-best-action',
    title: 'Next Best Action',
    oneliner: 'Every account scored across 5 signals. Next action decided. Message pre-written.',
    stack: ['Clay'],
    tags: [
      { label: 'PIPELINE PRIORITY', color: 'muted' as const },
      { label: 'SCORING ENGINE', color: 'muted' as const },
    ],
  },
  {
    slug: 'inbound-icp-router',
    title: 'Inbound ICP Router',
    oneliner: 'Lead arrives. ICP scored. Routed to the right rep with a response already sent.',
    stack: ['Clay'],
    tags: [
      { label: 'INBOUND', color: 'blue' as const },
      { label: 'PIPELINE GENERATION', color: 'muted' as const },
    ],
  },
  {
    slug: 'automated-outbound',
    title: 'Automated Outbound',
    oneliner: 'Signal detected. GTM play written. Lead enrolled in sequence.',
    stack: ['Clay'],
    tags: [
      { label: 'OUTBOUND', color: 'amber' as const },
      { label: 'SIGNAL-TRIGGERED', color: 'green' as const },
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
