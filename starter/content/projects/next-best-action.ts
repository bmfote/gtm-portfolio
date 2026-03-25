import { ProjectData } from './types'

export const nextBestAction: ProjectData = {
  slug: 'next-best-action',
  title: 'Next Best Action System',
  oneliner:
    'Multi-signal scoring, governance gates, and a ranked daily action queue. Reps work the right accounts, in the right order, every day.',
  problem:
    'Reps get flat lists. No prioritization, no signal weighting — they work what they want and miss what matters.',

  stack: [
    { icon: '🏗️', name: 'Clay', description: 'Multi-signal scoring engine, governance logic, and daily queue generation' },
  ],

  tags: [
    { label: 'PIPELINE PRIORITIZATION', color: 'teal' },
    { label: 'SCORING ENGINE', color: 'green' },
    { label: 'LIVE ICP CONFIG', color: 'red' },
  ],

  chevronSteps: ['Signals Weighted', 'Governance Checked', 'Queue Ranked', 'Rep Notified'],

  diagramType: 'none',

  ruleCards: [
    {
      emoji: '⚖️',
      title: 'Multi-Signal Scoring',
      description:
        'ICP fit, engagement signals, and data staleness weighted and ranked in Clay. Not a flat list.',
    },
    {
      emoji: '🚦',
      title: 'Governance Before Queue',
      description:
        'Hard disqualifiers block out-of-ICP leads before they reach a rep. No manual filtering.',
    },
    {
      emoji: '📈',
      title: 'Calibration Loop',
      description:
        'Signal weighting refines over time based on outcomes. The queue gets smarter.',
    },
    {
      emoji: '⚡',
      title: 'Daily Action Queue',
      description:
        "Reps get one prioritized list. No decisions about what to work — just work it.",
    },
  ],

  stats: [
    { metric: '3', label: 'Signal types weighted' },
    { metric: '1', label: 'Daily action queue' },
    { metric: '0', label: 'Out-of-ICP leads reach reps' },
    { metric: '∞', label: 'Calibration loop refines over time' },
  ],
}
