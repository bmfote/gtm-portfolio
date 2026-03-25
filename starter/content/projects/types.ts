export interface ToolCardData {
  icon: string
  name: string
  description: string
}

export interface RuleCardData {
  emoji: string
  title: string
  description: string
}

export interface StatItem {
  metric: string
  label: string
  description?: string
}

export interface WaterfallNode {
  label: string
  sublabel?: string
  isIndented?: boolean
}

export interface AsyncPath {
  id: string
  label: string
  nodes: string[]
  trigger?: string
}

export interface WorkflowBlock {
  id: string
  title: string
  description: string
  steps: string[]
}

export type TagColor = 'amber' | 'blue' | 'green' | 'red' | 'muted'

export interface Tag {
  label: string
  color: TagColor
}

export interface ProjectData {
  slug: string
  title: string
  oneliner: string
  problem: string
  callout?: string
  stack: ToolCardData[]
  tags: Tag[]
  nodeCount?: number
  workflowCount?: number
  chevronSteps: string[]
  workflows?: WorkflowBlock[]
  loomId?: string
  loomAspect?: string
  diagramType: 'async' | 'waterfall' | 'none'
  asyncPaths?: AsyncPath[]
  waterfallNodes?: WaterfallNode[]
  ruleCards: RuleCardData[]
  stats: StatItem[]
}
