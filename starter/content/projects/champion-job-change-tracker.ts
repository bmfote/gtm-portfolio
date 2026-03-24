import { ProjectData } from './types'

export const championJobChangeTracker: ProjectData = {
  slug: 'champion-job-change-tracker',
  title: 'Champion Job Change Tracker',
  oneliner:
    'Monday morning sync. Real-time detection. AI scores every change. Hot ones go straight to sequence.',
  problem:
    'Former champions are your warmest leads — they already know your product and trust you. But tracking hundreds of past champions for job changes manually is impossible. This system does it automatically and routes the right ones into a sales sequence within hours of detection.',
  callout:
    'Claude replaces rule-based scoring entirely. Instead of manually defining ICP criteria in code, Claude evaluates new company fit, persona match, and expansion potential in natural language — and returns HOT, NURTURE, or NOT_NOW with a reasoning string.',

  stack: [
    { icon: '⚙️', name: 'n8n', description: 'Orchestrates all 3 workflows — scheduling, detection, qualification' },
    { icon: '🔍', name: 'Pronto', description: 'Job change monitoring and contact enrichment at new company' },
    { icon: '📋', name: 'Airtable', description: 'Champions database — tracks submission status, classification, and sequence state' },
    { icon: '🧠', name: 'Claude', description: 'HOT / NURTURE / NOT_NOW scoring with reasoning + first-message draft' },
  ],

  tags: ['JOB CHANGE SIGNAL', 'AI CLASSIFICATION', 'HOT/NURTURE/NOT_NOW'],
  nodeCount: 27,
  workflowCount: 3,

  chevronSteps: ['Champion Synced', 'Change Detected', 'Claude Scores', 'Sequence Launched'],

  workflows: [
    {
      id: '1',
      title: 'WF1 — Sync Champions (Monday 8:00am)',
      description:
        'Runs once a week. Pulls every untracked champion from Airtable and registers them with Pronto\'s job-change monitoring API. Marks each one tracked = TRUE so they\'re never re-submitted.',
      steps: [
        'Pull champions where tracked = FALSE from Airtable',
        'Check Pronto API credit balance',
        'Submit full list to Pronto /intents/leads/track_job_changes',
        'Mark all submitted contacts tracked = TRUE in Airtable',
        '→ Pronto now watches these contacts 24/7',
      ],
    },
    {
      id: '2',
      title: 'WF2 — Job Change Detected (webhook)',
      description:
        'Pronto fires this webhook the moment it detects a job change — not in batch, not on a schedule. Real-time. WF2 validates, enriches, and hands off to WF3.',
      steps: [
        'Validate: new company ≠ old company, not empty',
        'Enrich new company via Pronto: headcount, industry, HQ, tech stack',
        'Enrich contact at new role: updated email, updated title',
        'Merge into single enriched record',
        'Update Airtable: new company, new title, all enrichment data',
        'Trigger WF3 via Execute Workflow — pass full package',
      ],
    },
    {
      id: '3',
      title: 'WF3 — Qualify & Activate (called by WF2)',
      description:
        'Claude receives the full enriched record and returns a classification. A Switch node routes each outcome independently — HOT leads launch into sequence automatically.',
      steps: [
        'Receive: name, old company, new company, title, headcount, industry, HQ, tech stack',
        'Claude returns: HOT / NURTURE / NOT_NOW + reasoning + first message draft',
        'HOT → update Airtable + launch into sales sequence + sequence_sent = TRUE',
        'NURTURE → update Airtable classification for future follow-up',
        'NOT_NOW → update Airtable, no action taken',
      ],
    },
  ],

  diagramType: 'waterfall',
  waterfallNodes: [
    { label: 'Airtable', sublabel: 'champions list' },
    { label: 'WF1 submits to Pronto', sublabel: 'Monday 8am' },
    { label: 'Pronto monitors in background', sublabel: '24/7', isIndented: true },
    { label: 'Pronto detects job change → fires WF2', sublabel: 'real-time webhook' },
    { label: 'WF2 enriches → updates Airtable → fires WF3' },
    { label: 'WF3 AI scores', sublabel: 'Claude classification' },
    { label: 'HOT → sequence tool + Airtable update', isIndented: true },
  ],

  ruleCards: [
    {
      emoji: '🎯',
      title: 'Signal-First, Not Spray-and-Pray',
      description:
        'Only reaches out when a genuine buying trigger fires. Not every job change — only ICP matches that Claude classifies as HOT.',
    },
    {
      emoji: '🧠',
      title: 'HOT / NURTURE / NOT_NOW',
      description:
        'Claude replaces rule-based scoring entirely. Evaluates ICP fit, persona, and expansion potential in natural language.',
    },
    {
      emoji: '🔀',
      title: '3-Workflow Decomposition',
      description:
        'Scheduling, signal detection, and AI qualification are each independently deployable and debuggable.',
    },
    {
      emoji: '⚡',
      title: 'Real-Time Detection',
      description:
        'Pronto fires the webhook the moment a change is detected. Hours, not days.',
    },
  ],

  stats: [
    { metric: '27', label: 'Nodes' },
    { metric: '3', label: 'Workflows' },
    { metric: '0', label: 'Rule-based scoring' },
    { metric: '3', label: 'Outcomes · HOT · NURTURE · NOT_NOW' },
  ],
}
