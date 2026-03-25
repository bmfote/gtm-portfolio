import { ProjectData } from './types'

export const inboundICPRouter: ProjectData = {
  slug: 'inbound-icp-router',
  title: 'Inbound ICP Router',
  oneliner: 'Lead arrives. ICP scored. Routed to the right rep with a response already sent.',
  problem:
    'Inbound leads sit unqualified for hours. Reps get notified without context — just a name and a company. The lead gets a generic "we\'ll be in touch" while your team scrambles to figure out if they\'re worth calling. By then the moment has passed.',
  callout:
    'The rep never receives a lead without knowing exactly what it\'s worth. ICP score, fit category, tier, and routing are all computed before the notification fires. The lead already has a personalized response in their inbox.',

  stack: [
    { icon: '🏗️', name: 'Clay', description: 'End-to-end: enrichment, ICP scoring, routing logic, and automated email response — no n8n required' },
  ],

  tags: [
    { label: 'INBOUND', color: 'teal' },
    { label: 'PIPELINE GENERATION', color: 'blue' },
  ],

  chevronSteps: ['Lead Received', 'Company Enriched', 'ICP Scored', 'Routed + Responded'],

  workflows: [
    {
      id: '1',
      title: 'Stage 1 — Company Enrichment (3 sources)',
      description:
        'The moment a form is submitted, Clay pulls three independent data sources. Score is only as good as the data under it — enrichment runs before a single ICP point is calculated.',
      steps: [
        'Company domain received via webhook',
        'Enrich company profile: size, industry, description, locality',
        'Pull latest fundraising data + funding round details',
        'Get total funding raised + funding activity history',
        'Pull website tech stack',
        '→ All three sources merged before scoring begins',
      ],
    },
    {
      id: '2',
      title: 'Stage 2 — ICP Scoring + Qualification',
      description:
        'Funding stage, company size, and industry each scored independently and summed into a Total ICP Score. A gate fires — only qualified leads move forward.',
      steps: [
        'Funding Stage → Funding Stage Score',
        'Company size → Size Score',
        'Industry → Industry Score',
        'Total ICP Score computed',
        'ICP Fit Category assigned: Strong Fit / Borderline ICP / Poor Fit',
        'ICP Tier assigned: Senior AE — High Priority / Mid-Market AE / etc.',
        'ICP Qualification: Pre-Qualified / Disqualified',
        '→ Send If gate: only qualified leads proceed',
      ],
    },
    {
      id: '3',
      title: 'Stage 3 — Routing',
      description:
        'Routing is tier-based — the ICP Tier determines which rep receives the lead. Table data sent via webhook with full context attached.',
      steps: [
        'ICP Tier maps to rep assignment',
        'Full enrichment + score data packaged',
        'Webhook fires to CRM / Slack with lead context',
        '→ Rep notified with ICP score, fit category, and suggested action',
      ],
    },
    {
      id: '4',
      title: 'Stage 4 — Automated Response Email',
      description:
        'A personalized thank-you email is generated and sent to the lead automatically — before any human opens the CRM. Subject, greeting, body, and closing all personalized to their name and company.',
      steps: [
        'First name + company name injected into email template',
        'Subject line personalized',
        'Body references their specific submission context',
        'Closing sets expectations: "within the hour"',
        '→ Email sent automatically — lead engaged while intent is hot',
      ],
    },
  ],

  diagramSideBySide: true,
  diagramType: 'waterfall',
  waterfallNodes: [
    { label: 'Inbound form submitted' },
    { label: 'Company enriched: funding data + tech stack', isIndented: true },
    { label: 'ICP scored: funding + size + industry' },
    { label: 'Fit category + tier assigned', isIndented: true },
    { label: 'ICP gate: qualified leads only proceed' },
    { label: 'Rep routed via webhook with full context', isIndented: true },
    { label: 'Personalized response email sent to lead' },
  ],

  ruleCards: [
    {
      emoji: '🔍',
      title: 'Enriched Before Scored',
      description:
        '3 data sources pulled before a single ICP point is calculated. Funding data, tech stack, and company profile all merged first.',
    },
    {
      emoji: '🎯',
      title: 'Tier-Based Routing',
      description:
        'Senior AE, Mid-Market AE assigned automatically based on ICP fit. No manual triage, no Slack threads deciding who takes it.',
    },
    {
      emoji: '🚪',
      title: 'ICP Gate Before Notification',
      description:
        'Reps only get notified on leads that clear the ICP threshold. No noise, no wasted calls on companies that will never buy.',
    },
    {
      emoji: '✉️',
      title: 'Instant Personalized Response',
      description:
        'Lead gets a personalized email before a human opens the CRM. Engagement while the intent is hot — sets the tone for the entire relationship.',
    },
  ],

  stats: [
    { metric: '3', label: 'Enrichment sources per lead' },
    { metric: '3', label: 'ICP dimensions scored' },
    { metric: '0', label: 'Manual triage required' },
    { metric: '1', label: 'Automated response sent before rep is notified' },
  ],
}
