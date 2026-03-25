import { ProjectData } from './types'

export const abmProspectingMachine: ProjectData = {
  slug: 'abm-prospecting-machine',
  title: 'ICP Click-to-CRM',
  oneliner: 'Define your ICP. Click once. Enriched leads land in your CRM.',
  problem:
    'Sales teams spend hours manually searching LinkedIn and databases for target accounts, tracking down decision-makers, and hunting for verified emails. Slow, expensive, impossible at scale.',
  callout:
    'The workflow is NOT a linear chain — it\'s 4 independent async paths that hand off via Pronto webhook callbacks. Each path fires, does its work, and exits. The next path only starts when Pronto calls back.',

  stack: [
    { icon: '⚙️', name: 'n8n', description: 'Orchestrates all 4 async execution paths' },
    { icon: '🔍', name: 'Pronto', description: 'Company search, lead discovery, email + phone enrichment' },
    { icon: '📧', name: 'Instantly', description: 'Outbound sequence delivery' },
    { icon: '🧠', name: 'Claude', description: 'ICP config evaluation and field normalization logic' },
  ],

  tags: [
    { label: 'OUTBOUND', color: 'teal' },
    { label: 'PIPELINE GENERATION', color: 'green' },
  ],
  nodeCount: 21,
  workflowCount: 4,

  chevronSteps: ['Trigger Fired', 'Companies Received', 'Leads Enriched', 'CRM Delivered'],

  workflows: [
    {
      id: 'A',
      title: 'PATH A — Trigger',
      description: 'Kicks off the entire chain. ICP config lives in a single JS node — industry codes, company size, revenue band, geo IDs, job titles, volume limit. One edit, zero rebuilds.',
      steps: [
        'Click Run',
        'Read ICP config from JS node',
        'Submit company search to Pronto',
        '→ Pronto processes async, calls back to PATH B',
      ],
    },
    {
      id: 'B',
      title: 'PATH B — Companies Received',
      description: 'Pronto calls this webhook when your company results are ready. Loops one-by-one with a 1.5s rate limit between each — Pronto\'s API requires pacing.',
      steps: [
        'Receive company batch from Pronto',
        'Filter against ICP criteria',
        'Loop one company at a time (1.5s rate limit)',
        'Submit decision-maker search per company',
        '→ Pronto calls back to PATH C',
      ],
    },
    {
      id: 'C',
      title: 'PATH C — Leads Received',
      description: 'Filters raw lead results against persona criteria before spending enrichment credits. Only qualified contacts move forward.',
      steps: [
        'Receive lead batch from Pronto',
        'Filter: title match, confidence threshold',
        'Submit bulk email + phone enrichment',
        '→ Pronto calls back to PATH D',
      ],
    },
    {
      id: 'D',
      title: 'PATH D — Enriched Contacts Arrive',
      description: 'Final delivery. The output node is modular — swap in HubSpot, Airtable, Lemlist, LGM, or Google Sheets without touching anything else.',
      steps: [
        'Receive enriched contacts from Pronto',
        'Normalize field variants (firstName / first_name / firstname)',
        'Format for CRM schema',
        'Deliver to CRM output node',
      ],
    },
  ],

  diagramType: 'async',
  asyncPaths: [
    {
      id: 'A',
      label: 'Trigger',
      nodes: ['Click Run', 'Define ICP config', 'Submit company search to Pronto'],
      trigger: 'Pronto calls back with company results',
    },
    {
      id: 'B',
      label: 'Companies Received',
      nodes: ['Receive companies', 'Filter', 'Loop one-by-one (1.5s rate limit)', 'Search for decision-makers'],
      trigger: 'Pronto calls back with lead results',
    },
    {
      id: 'C',
      label: 'Leads Received',
      nodes: ['Receive leads', 'Filter qualified', 'Submit bulk email + phone enrichment'],
      trigger: 'Pronto calls back with enriched contacts',
    },
    {
      id: 'D',
      label: 'Enriched Contacts',
      nodes: ['Normalize fields', 'Format for CRM schema', 'Deliver to CRM'],
    },
  ],

  ruleCards: [
    {
      emoji: '🔀',
      title: '4-Path Async Architecture',
      description:
        'Not a linear chain. 4 independent webhook paths hand off via Pronto callbacks. Non-blocking — runs in the background while you work.',
    },
    {
      emoji: '⚙️',
      title: 'ICP as Config-as-Code',
      description:
        'All targeting logic lives in one JS node. Industry, size, revenue, location, titles — one-node edit, zero rebuilds.',
    },
    {
      emoji: '🔧',
      title: 'Field Normalization Built-In',
      description:
        "Pronto returns firstName, first_name, and firstname across endpoints. Every variant handled — no silent data loss.",
    },
    {
      emoji: '🔌',
      title: 'Modular Output Layer',
      description:
        'Final delivery node is swappable. HubSpot, Airtable, Lemlist, LGM — wire in whatever CRM you use.',
    },
  ],

  stats: [
    { metric: '21', label: 'Nodes' },
    { metric: '4', label: 'Async paths' },
    { metric: '1', label: 'JS node controls all ICP targeting' },
    { metric: '5–20', label: 'Min · click to enriched CRM' },
  ],
}
