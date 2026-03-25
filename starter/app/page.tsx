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
      { label: 'PIPELINE GENERATION', color: 'blue' as const },
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
      { label: 'JOB CHANGE SIGNAL', color: 'blue' as const },
    ],
    nodeCount: 27,
    workflowCount: 3,
  },
  {
    slug: 'icebreaker-sdr',
    title: 'Growth Signal Icebreaker',
    oneliner: 'Growth signal detected. Personalized icebreaker written. Zero manual steps.',
    stack: ['n8n', 'Pronto', 'Airtable', 'Claude', 'LaGrowthMachine'],
    tags: [
      { label: 'OUTBOUND', color: 'amber' as const },
      { label: 'GROWTH SIGNAL', color: 'blue' as const },
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
      { label: 'PIPELINE PRIORITY', color: 'blue' as const },
      { label: 'ICP SCORING', color: 'blue' as const },
    ],
  },
  {
    slug: 'inbound-icp-router',
    title: 'Inbound ICP Router',
    oneliner: 'Lead arrives. ICP scored. Routed to the right rep with a response already sent.',
    stack: ['Clay'],
    tags: [
      { label: 'INBOUND', color: 'teal' as const },
      { label: 'PIPELINE GENERATION', color: 'blue' as const },
    ],
  },
  {
    slug: 'automated-outbound',
    title: 'Automated Outbound',
    oneliner: 'Signal detected. GTM play written. Lead enrolled in sequence.',
    stack: ['Clay'],
    tags: [
      { label: 'OUTBOUND', color: 'amber' as const },
      { label: 'SIGNAL-TRIGGERED', color: 'blue' as const },
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
          I build the system<br />
          <span style={{ color: 'var(--accent)' }}>between your signals and your pipeline.</span>
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
          into systems that find, qualify, and engage the right leads.
        </p>

        <a
          href="mailto:battersonsales@gmail.com"
          style={{
            padding: '10px 24px',
            borderRadius: 6,
            border: '1px solid var(--canvas-border)',
            color: 'var(--text-primary)',
            fontSize: 14,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          get in touch
        </a>
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
          headline="Let's build the GTM system your team actually runs on."
          subtext="Open to GTM Engineering, Revenue Operations, and automation consulting roles. If your team is leaving pipeline on the table because the system isn't built yet — let's talk."
          links={contactLinks}
        />
      </section>

    </div>
  )
}
