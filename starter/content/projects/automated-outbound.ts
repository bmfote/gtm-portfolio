import { ProjectData } from './types'

export const automatedOutbound: ProjectData = {
  slug: 'automated-outbound',
  title: 'Automated Outbound',
  oneliner: 'Signal detected. GTM play written. Lead enrolled in sequence.',
  problem:
    'Outbound teams either miss signals entirely or react too slowly. By the time a rep notices a G2 review or an AI keyword on a prospect\'s site, the moment has passed. This system catches signals the moment they fire, qualifies the account, builds a personalized play, and enrolls the right contact — all in Clay, no n8n required.',
  callout:
    'The GTM Angle isn\'t a template. It\'s generated from the specific signal that triggered the record — the actual trigger notes, type, and weight inform what Claude writes. Two companies with different signals get completely different plays.',

  stack: [
    { icon: '🏗️', name: 'Clay', description: 'Signal intake, enrichment, ICP scoring, GTM angle generation, contact finding, email validation, and sequence enrollment — entirely Clay-native' },
  ],

  tags: [
    { label: 'OUTBOUND', color: 'teal' },
    { label: 'SIGNAL-TRIGGERED', color: 'orange' },
  ],

  chevronSteps: ['Signal Detected', 'ICP Scored', 'GTM Play Built', 'Sequence Enrolled'],

  workflows: [
    {
      id: '1',
      title: 'Stage 1 — Signal Intake',
      description:
        'Any signal type feeds the same table. Each trigger carries a weight value and context notes — not just that a signal fired, but what it means and how strong it is.',
      steps: [
        'Trigger type logged: AI initiative keyword, G2 review, hiring signal, etc.',
        'Trigger Weight Value assigned per signal type',
        'Trigger notes captured: context about what the signal means',
        'Trigger date + source logged',
        'Rep assigned based on signal type or territory',
        '→ Signal Details aggregated for AI context downstream',
      ],
    },
    {
      id: '2',
      title: 'Stage 2 — Company Enrichment + ICP Scoring',
      description:
        'Company must pass fit threshold before anyone is searched for. Zero wasted enrichment credits on bad-fit accounts.',
      steps: [
        'Company enriched: employee count, industry, size, locality, description',
        'Funding stage pulled + normalized',
        'Employee Count Score + Funding Stage Score + Industry Score calculated',
        'Total Fit Score computed',
        'Enrichment Confidence Score assigned',
        'Fit Status: Strong Fit / Borderline / Poor Fit',
        '→ ICP Copy Gate: only strong-fit accounts proceed to play generation',
      ],
    },
    {
      id: '3',
      title: 'Stage 3 — GTM Play Generation',
      description:
        'Claude receives the signal context — type, notes, weight, company details — and generates a signal-specific outbound angle and subject line. Not a template. A play.',
      steps: [
        'Signal context injected: trigger type + notes + weight + company details',
        'GTM Angle generated: signal-specific outbound narrative',
        'Subject Line written: personalized to signal + company',
        '→ Two different signals = two completely different plays',
      ],
    },
    {
      id: '4',
      title: 'Stage 4 — Contact + Enrollment',
      description:
        'Decision-maker found, email dual-validated, contact enrolled. Slack notified. All in Clay — no external workflow tool required.',
      steps: [
        'Decision-maker found via Clay people search',
        'Work email found via Findymail',
        'Email validated via Enrow (second pass)',
        'Both validators must pass before enrollment',
        'Contact added to outbound sequence',
        '→ Slack notification fired via n8n webhook',
      ],
    },
  ],

  diagramType: 'waterfall',
  waterfallNodes: [
    { label: 'Signal fires: AI keyword / G2 review / hiring signal' },
    { label: 'Trigger weighted and logged with context', isIndented: true },
    { label: 'Company enriched: employee count + industry + funding' },
    { label: 'ICP scored across 3 dimensions → Total Fit Score', isIndented: true },
    { label: 'ICP Copy Gate: strong fit only' },
    { label: 'GTM Angle + Subject Line generated from signal context', isIndented: true },
    { label: 'Decision-maker found + email dual-validated' },
    { label: 'Enrolled in sequence + Slack notified', isIndented: true },
  ],

  ruleCards: [
    {
      emoji: '📡',
      title: 'Multi-Source Signal Intake',
      description:
        'G2 reviews, AI initiative keywords, hiring signals — any trigger type feeds the same table with a weighted score. One system handles all signal sources.',
    },
    {
      emoji: '🎯',
      title: 'ICP Scored Before Anyone is Found',
      description:
        'Company must pass fit threshold before a decision-maker is searched for. Zero wasted enrichment credits on accounts that will never convert.',
    },
    {
      emoji: '✍️',
      title: 'Signal-Specific GTM Angle',
      description:
        'Claude writes the outbound angle from the actual trigger notes and signal context — not a template. Every play is unique to the signal that fired it.',
    },
    {
      emoji: '🔒',
      title: 'Dual Email Validation',
      description:
        'Findymail + Enrow both validate before sequence enrollment. Both must pass. Zero bounces reach your domain.',
    },
  ],

  stats: [
    { metric: '3+', label: 'Signal types supported' },
    { metric: '3', label: 'ICP dimensions scored' },
    { metric: '2', label: 'Email validators before enrollment' },
    { metric: '0', label: 'n8n workflows required' },
  ],
}
