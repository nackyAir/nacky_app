export const DESTINATION_CODES = [
  'LAW',
  'ACC',
  'EST',
  'CAR',
  'LIV',
  'GEN',
] as const

export type DestinationCode = (typeof DESTINATION_CODES)[number]

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
