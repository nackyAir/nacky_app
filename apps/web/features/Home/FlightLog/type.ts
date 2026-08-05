import type { DestinationCode } from '~/features/Home/destination'

export type FlightStatus = 'active' | 'completed'

export type FlightLogEntry = {
  flightNo: string
  year: string
  project: string
  destination: DestinationCode
  destinationLabel: string
  status: FlightStatus
  url?: string
}
