import { ProjectData } from './types'

export const icebreakerSDR: ProjectData = {
  slug: 'icebreaker-sdr',
  title: 'Growth Triggered Icebreaker',
  oneliner:
    'Detects companies actively growing, finds matching decision-makers, generates a unique icebreaker using 3 layers of context, and enrolls them in a sequence — every Monday, zero manual steps.',
  problem:
    'Generic cold emails get ignored. Truly personalized ones take 10+ minutes each to write. AI SDR tools burn LLM budget on undeliverable emails and template copy. This system detects companies actively growing, finds matching decision-makers, generates a unique icebreaker per lead using 3 layers of context, and enrolls them in outbound. Every Monday. Zero manual steps.',
  callout:
    'The hardest engineering problem: WF4 receives an enriched contact from Pronto — but Pronto has no concept of your internal IDs. The data thread solves this by passing airtable_company_id and airtable_lead_id through Pronto\'s custom field. Pronto echoes them back. WF4 always finds the exact right records.',

  stack: [
    { icon: '⚙️', name: 'n8n', description: 'Orchestrates all 4 decoupled async workflows' },
    { icon: '🔍', name: 'Pronto', description: 'Hiring + growth signal detection, lead search, and bulk enrichment' },
    { icon: '📋', name: 'Airtable', description: 'Shared state store — companies, contacts, settings, and mid-flight inspection' },
    { icon: '🧠', name: 'Claude', description: '3-layer icebreaker generation: lead context + company signal + knowledge base' },
    { icon: '🚀', name: 'LaGrowthMachine', description: 'Outbound sequence enrollment via API' },
  ],

  tags: [
    { label: 'OUTBOUND', color: 'teal' },
    { label: 'GROWTH SIGNAL', color: 'orange' },
  ],
  nodeCount: 49,
  workflowCount: 4,

  chevronSteps: ['Signal Detected', 'Company Enriched', 'Lead Qualified', 'Icebreaker Sent'],

  workflows: [
    {
      id: '1',
      title: 'WF1 — Signal Trigger (Monday 9:00am)',
      description:
        'Reads targeting config from Airtable Settings and fires TWO parallel async calls to Pronto simultaneously — hiring signal and growth signal. Both are fire-and-forget.',
      steps: [
        'Read targeting config from Airtable Settings',
        'Fire async: companies posting sales/revenue roles (hiring signal)',
        'Fire async: companies growing headcount above threshold (growth signal)',
        '→ Both calls deliver results to WF2 via webhook',
      ],
    },
    {
      id: '2',
      title: 'WF2 — Company Reception + Enrichment (webhook)',
      description:
        'Receives company batches and processes one at a time with a 30-second rate limit. Saves each to Airtable, gets the record ID, then submits an async lead search — passing the Airtable ID forward.',
      steps: [
        'Parse and normalize company payload',
        'Loop one company at a time (30s rate limit)',
        'Enrich via Pronto: LinkedIn URL, headcount, industry',
        'Save to Airtable Companies → receive record ID',
        'Look up persona UUID from Airtable Personas table',
        'Submit async lead search scoped to company domain + persona',
        '→ Pass airtable_company_id with the search request',
      ],
    },
    {
      id: '3',
      title: 'WF3 — Lead Reception + Enrichment (webhook)',
      description:
        'Filters leads by ICP title before spending enrichment credits. The critical move: passes both airtable_lead_id and airtable_company_id through Pronto\'s custom field so WF4 can find the right records.',
      steps: [
        'Parse leads array',
        'Filter: CTO, Chief Technology Officer, VP Engineering only',
        'Save qualified leads to Airtable Contacts (linked to company)',
        'Aggregate into bulk enrichment request',
        'Pass airtable_lead_id + airtable_company_id via Pronto custom field',
        '→ Pronto echoes custom field back in enrichment webhook',
      ],
    },
    {
      id: '4',
      title: 'WF4 — Icebreaker Generation + Enrollment (webhook)',
      description:
        'Merges 3 data layers — lead context, company signal, and product knowledge base — before Claude writes. Email is a hard gate: if no deliverable email, Claude never fires. Zero wasted LLM spend.',
      steps: [
        'Receive enriched contact + custom IDs from Pronto',
        'Fetch lead details from Airtable using airtable_lead_id',
        'Fetch company details from Airtable using airtable_company_id',
        'Fetch knowledge base + LGM audience ID from Airtable Settings',
        'Merge: lead context + company signal + knowledge base',
        'Claude writes icebreaker (1–2 sentences, never starts with "I" or lead name)',
        'Update Airtable: icebreaker saved, Enrichment Status = "Enriched"',
        'POST to LaGrowthMachine: enroll in outbound sequence',
        'Update Airtable: LGM Status = "Enrolled", LGM Enrolled At = today',
      ],
    },
  ],

  diagramType: 'waterfall',
  waterfallNodes: [
    { label: 'WF1 fires Monday 9am', sublabel: 'hiring + growth signals' },
    { label: 'Pronto detects signal companies', sublabel: 'async', isIndented: true },
    { label: 'WF2 receives companies → enriches → saves to Airtable' },
    { label: 'Submit lead search with airtable_company_id', isIndented: true },
    { label: 'WF3 receives leads → filters ICP → saves to Airtable' },
    { label: 'Bulk enrich: airtable_lead_id + airtable_company_id in custom field', isIndented: true },
    { label: 'WF4 receives enriched contact → Pronto echoes IDs back' },
    { label: 'Merge 3 layers → Claude writes icebreaker → LGM enrolls', isIndented: true },
  ],

  ruleCards: [
    {
      emoji: '🧵',
      title: 'The Data Thread',
      description:
        'airtable_company_id travels through Pronto\'s custom field across all 4 workflows. WF4 finds the exact right records every time with no shared state.',
    },
    {
      emoji: '🎯',
      title: '3-Layer AI Context',
      description:
        'Lead + company signal + knowledge base, all merged before Claude writes. Every icebreaker is unique. None are templates.',
    },
    {
      emoji: '🚪',
      title: 'Email as Hard Gate',
      description:
        'Claude only fires when a deliverable email exists. Zero wasted LLM spend on unverified contacts.',
    },
    {
      emoji: '🔍',
      title: 'Airtable as Inspection Layer',
      description:
        'Every company, lead, icebreaker, and status is visible mid-flight. Any stage can be re-triggered independently.',
    },
  ],

  stats: [
    { metric: '49', label: 'Nodes' },
    { metric: '4', label: 'Workflows' },
    { metric: '0', label: 'Wasted LLM calls' },
    { metric: '3', label: 'Context layers per icebreaker' },
  ],
}
