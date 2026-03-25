import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { projects, getProject } from '@/content/projects'
import { SectionLabel } from '@/components/SectionLabel'
import { TagPill } from '@/components/TagPill'
import { CalloutBox } from '@/components/CalloutBox'
import { RuleCardGrid } from '@/components/RuleCard'
import { StatBlock } from '@/components/StatBlock'
import { ToolCardGrid } from '@/components/ToolCard'
import { ChevronFlow } from '@/components/ChevronFlow'
import { WaterfallDiagram } from '@/components/WaterfallDiagram'
import { AsyncDiagram } from '@/components/AsyncDiagram'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.oneliner,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const mono = { fontFamily: 'var(--font-mono)' }

  return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 100 }}>

      {/* Back nav */}
      <div style={{ marginBottom: 48 }}>
        <Link
          href="/"
          style={{
            ...mono,
            fontSize: 13,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ← all systems
        </Link>
      </div>

      {/* Header */}
      <section style={{ marginBottom: 64 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {project.tags.map(tag => (
            <TagPill key={tag.label} color={tag.color}>{tag.label}</TagPill>
          ))}
        </div>

        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            margin: '0 0 16px',
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontSize: 17,
            color: 'var(--accent)',
            lineHeight: 1.6,
            margin: '0 0 24px',
            maxWidth: 640,
          }}
        >
          {project.oneliner}
        </p>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {project.nodeCount && (
            <span style={{ ...mono, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{project.nodeCount}</span> nodes
            </span>
          )}
          {project.workflowCount && (
            <span style={{ ...mono, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{project.workflowCount}</span> workflows
            </span>
          )}
          <span style={{ ...mono, fontSize: 13, color: 'var(--text-secondary)' }}>
            {project.stack.map(s => s.name).join(' · ')}
          </span>
          {project.loomId && (
            <a
              href="#walkthrough"
              style={{
                ...mono,
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                borderRadius: 4,
                padding: '4px 12px',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              ▶ watch walkthrough
            </a>
          )}
        </div>
      </section>

      {/* The Problem */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel>The Problem</SectionLabel>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: 680,
            margin: 0,
          }}
        >
          {project.problem}
        </p>
      </section>

      {/* Stack */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel>Stack</SectionLabel>
        <ToolCardGrid tools={project.stack} />
      </section>

      {/* Loom walkthrough */}
      {project.loomId && (
        <section id="walkthrough" style={{ marginBottom: 64 }}>
          <SectionLabel>Walkthrough</SectionLabel>
          <div
            style={{
              position: 'relative',
              paddingBottom: project.loomAspect ?? '56.25%',
              height: 0,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--canvas-border)',
            }}
          >
            <iframe
              src={`https://www.loom.com/embed/${project.loomId}`}
              frameBorder={0}
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </section>
      )}

      {/* How It Works */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel>How It Works</SectionLabel>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 24px',
          }}
        >
          The execution path
        </h2>

        {/* Side-by-side: chevron left, diagram right */}
        {project.diagramSideBySide && project.diagramType === 'waterfall' && project.waterfallNodes ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                background: 'var(--canvas-subtle)',
                border: '1px solid var(--canvas-border)',
                borderRadius: 10,
                padding: '28px 32px',
              }}
            >
              <ChevronFlow steps={project.chevronSteps} />
            </div>
            <div
              style={{
                background: 'var(--canvas-subtle)',
                border: '1px solid var(--canvas-border)',
                borderRadius: 10,
                padding: '28px 32px',
              }}
            >
              <WaterfallDiagram nodes={project.waterfallNodes} title="Execution flow" />
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 40 }}>
              <ChevronFlow steps={project.chevronSteps} />
            </div>

            {project.diagramType === 'async' && project.asyncPaths && (
              <div
                style={{
                  background: 'var(--canvas-subtle)',
                  border: '1px solid var(--canvas-border)',
                  borderRadius: 10,
                  padding: '28px 32px',
                  marginBottom: 40,
                }}
              >
                <AsyncDiagram paths={project.asyncPaths} />
              </div>
            )}

            {project.diagramType === 'waterfall' && project.waterfallNodes && (
              <div
                style={{
                  background: 'var(--canvas-subtle)',
                  border: '1px solid var(--canvas-border)',
                  borderRadius: 10,
                  padding: '28px 32px',
                  marginBottom: 40,
                }}
              >
                <WaterfallDiagram nodes={project.waterfallNodes} title="Execution flow" />
              </div>
            )}
          </>
        )}

        {/* Callout */}
        {project.callout && (
          <div style={{ marginBottom: 40 }}>
            <CalloutBox>{project.callout}</CalloutBox>
          </div>
        )}

        {/* Workflow breakdown */}
        {project.workflows && project.workflows.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {project.workflows.map(wf => (
              <div
                key={wf.id}
                style={{
                  background: 'var(--canvas-subtle)',
                  border: '1px solid var(--canvas-border)',
                  borderRadius: 8,
                  padding: '24px 28px',
                }}
              >
                <div
                  style={{
                    ...mono,
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    marginBottom: 8,
                    letterSpacing: '0.04em',
                  }}
                >
                  {wf.title}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    margin: '0 0 16px',
                  }}
                >
                  {wf.description}
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  {wf.steps.map((step, i) => (
                    <li
                      key={i}
                      style={{
                        ...mono,
                        fontSize: 12,
                        color: step.startsWith('→')
                          ? 'var(--accent)'
                          : 'var(--text-secondary)',
                        paddingLeft: step.startsWith('→') ? 0 : 16,
                        position: 'relative',
                      }}
                    >
                      {!step.startsWith('→') && (
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--canvas-border)',
                          }}
                        >
                          ·
                        </span>
                      )}
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Key Design Decisions */}
      <section style={{ marginBottom: 64 }}>
        <SectionLabel>Key Design Decisions</SectionLabel>
        <RuleCardGrid cards={project.ruleCards} />
      </section>

      {/* By The Numbers */}
      <section style={{ marginBottom: 80 }}>
        <SectionLabel>By The Numbers</SectionLabel>
        <StatBlock stats={project.stats} />
      </section>

      {/* Footer nav */}
      <div
        style={{
          borderTop: '1px solid var(--canvas-border)',
          paddingTop: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            ...mono,
            fontSize: 13,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}
        >
          ← back to all systems
        </Link>
        <span style={{ ...mono, fontSize: 12, color: 'var(--text-secondary)' }}>
          matthew batterson · gtm engineer
        </span>
      </div>

    </div>
  )
}
