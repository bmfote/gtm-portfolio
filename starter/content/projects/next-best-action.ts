import { ProjectData } from './types'

export const nextBestAction: ProjectData = {
  slug: 'next-best-action',
  title: 'Next Best Action',
  oneliner: 'Every account scored across 5 signals. Next action decided. Message pre-written.',
  problem:
    'Reps get flat CRM lists with no prioritization. They work what they want, miss what matters, and write the same generic messages over and over. The result: stalled deals, missed signals, and pipeline that dies quietly.',
  callout:
    'The rep never decides what to work or what to say. Every account is scored, ranked, and routed before they open Clay. The next action is already decided. The message is already written. Their only job is to execute.',

  stack: [
    { icon: '🏗️', name: 'Clay', description: 'Scoring engine, governance logic, AI action generation, and message writing — all in one table' },
  ],

  tags: [
    { label: 'PIPELINE PRIORITIZATION', color: 'teal' },
    { label: 'SCORING ENGINE', color: 'green' },
  ],

  chevronSteps: ['ICP Scored', 'Priority Ranked', 'Risk Flagged', 'Rep Executes'],

  workflows: [
    {
      id: '1',
      title: 'Stage 1 — ICP Scoring (5 dimensions)',
      description:
        'Every account is scored across five independent dimensions. Each dimension has its own point value. The composite score tells you not just whether a company fits — but why and how much.',
      steps: [
        'Employee Count → Employee Score',
        'ARR → ARR Points',
        'Industry → Industry Score (SaaS, Fintech, AI, etc.)',
        'Tech Stack → Tech Stack Score (HubSpot, Clay, etc.)',
        'Funding Stage → Growth Stage Score (Series B/C weighted higher)',
        'ICP-Weighted Priority Boost applied on top of composite',
        '→ Output: Total ICP Score + ICP Fit Status (✅ Strong ICP, etc.)',
      ],
    },
    {
      id: '2',
      title: 'Stage 2 — Priority Scoring (8 signals)',
      description:
        'ICP score alone doesn\'t tell you who to call first. Priority scoring layers in behavioral and time-based signals to surface accounts that need action right now.',
      steps: [
        'ICP score — base weight',
        'Trigger count (last 14 days) — recent signal activity',
        'CRM stage — where they are in the deal',
        'Days in stage — staleness flag',
        'Days since last touch — rep responsiveness',
        'Email engagement bucket — none / low / high',
        'Risk flag — at-risk deal detection',
        'Confidence score — AI certainty weight',
        '→ Output: priority_score (0–100), determines queue rank',
      ],
    },
    {
      id: '3',
      title: 'Stage 3 — Governance + Routing',
      description:
        'Before any account reaches a rep, it passes through governance. Risk flags and review flags catch edge cases. Routing logic assigns each account to the right rep tier.',
      steps: [
        'Risk flag check — stalled deals, low engagement patterns',
        'Needs Review flag — records requiring human judgement',
        'Review ICP flag — ICP breakdown needs verification',
        'Route To — Senior AE, Mid-Market, SDR, etc.',
        '→ Output: Suggested CRM Task per account',
      ],
    },
    {
      id: '4',
      title: 'Stage 4 — AI Action + Message Generation',
      description:
        'For every account that clears governance, AI generates two things: the next action with full reasoning, and a personalized outbound message ready to send. The rep copies and executes.',
      steps: [
        'Next Action generated — "Call now", "Disqualify or recycle", etc.',
        'Sales Action Reason — brief + full sentence explanation',
        'Outbound message written — personalized to person, account, stage, score, signals',
        'Context injected: ICP score, trigger count, days since touch, engagement, risk',
        '→ Rep opens Clay, sees ranked queue, reads action, sends message',
      ],
    },
  ],

  diagramType: 'waterfall',
  waterfallNodes: [
    { label: 'Account enters Clay table' },
    { label: 'ICP scored across 5 dimensions', isIndented: true },
    { label: 'Priority scored across 8 signals', isIndented: true },
    { label: 'Governance gates: risk + review flags' },
    { label: 'Routed to correct rep tier', isIndented: true },
    { label: 'Next action decided + message pre-written', isIndented: true },
    { label: 'Rep opens queue — everything ready to execute' },
  ],

  ruleCards: [
    {
      emoji: '🎯',
      title: '5-Dimension ICP Scoring',
      description:
        'Employee count, ARR, industry, tech stack, and funding stage each scored independently. The composite tells you not just if a company fits — but why and how much.',
    },
    {
      emoji: '📊',
      title: '8-Signal Priority Stack',
      description:
        'ICP score is just the start. Trigger recency, stage staleness, days since last touch, email engagement, risk flags, and confidence score combine into a single priority rank.',
    },
    {
      emoji: '🚦',
      title: 'Governance Before Queue',
      description:
        'Risk flags, review flags, and ICP verification catches edge cases before they reach a rep. No bad-fit or questionable accounts hit the queue unreviewed.',
    },
    {
      emoji: '✍️',
      title: 'Action + Message Pre-Built',
      description:
        'AI decides the next action with reasoning, and writes the outbound message per account. Rep opens Clay, reads the action, sends the message. Zero authoring required.',
    },
  ],

  stats: [
    { metric: '5', label: 'ICP dimensions scored' },
    { metric: '8', label: 'Signals in priority stack' },
    { metric: '0', label: 'Reps deciding what to work' },
    { metric: '1', label: 'Ranked queue per rep, pre-built daily' },
  ],
}
