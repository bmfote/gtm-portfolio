import { abmProspectingMachine } from './abm-prospecting-machine'
import { championJobChangeTracker } from './champion-job-change-tracker'
import { icebreakerSDR } from './icebreaker-sdr'
import { nextBestAction } from './next-best-action'
import { ProjectData } from './types'

export const projects: ProjectData[] = [
  abmProspectingMachine,
  championJobChangeTracker,
  icebreakerSDR,
  nextBestAction,
]

export function getProject(slug: string): ProjectData | undefined {
  return projects.find(p => p.slug === slug)
}

export type { ProjectData }
