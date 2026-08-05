import type { DestinationCode } from '~/features/Home/destination'
import type { ProjectDetail } from '~/features/Home/ProjectTimeLIne/type'

export type FlightStatus = 'active' | 'completed'

export type FlightLogEntry = {
  flightNo: string
  year: string
  project: string
  destination: DestinationCode
  destinationLabel: string
  status: FlightStatus
  period: string
  role: string
  description: string
  skills: ReadonlyArray<string>
  details?: ProjectDetail
  url?: string
}
