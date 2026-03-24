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

export interface ProjectData {
  slug: string
  title: string
  oneliner: string
  problem: string
  callout?: string
  stack: ToolCardData[]
  tags: string[]
  nodeCount?: number
  workflowCount?: number
  chevronSteps: string[]
  workflows?: WorkflowBlock[]
  diagramType: 'async' | 'waterfall' | 'none'
  asyncPaths?: AsyncPath[]
  waterfallNodes?: WaterfallNode[]
  ruleCards: RuleCardData[]
  stats: StatItem[]
}
