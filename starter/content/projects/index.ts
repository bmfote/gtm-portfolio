import { abmProspectingMachine } from './abm-prospecting-machine'
import { championJobChangeTracker } from './champion-job-change-tracker'
import { icebreakerSDR } from './icebreaker-sdr'
import { nextBestAction } from './next-best-action'
import { inboundICPRouter } from './inbound-icp-router'
import { automatedOutbound } from './automated-outbound'
import { ProjectData } from './types'

export const projects: ProjectData[] = [
  abmProspectingMachine,
  championJobChangeTracker,
  icebreakerSDR,
  nextBestAction,
  inboundICPRouter,
  automatedOutbound,
]

export function getProject(slug: string): ProjectData | undefined {
  return projects.find(p => p.slug === slug)
}

export type { ProjectData }
