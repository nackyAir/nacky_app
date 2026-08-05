export type Engagement = '正社員' | '業務委託' | '個人開発'

export type DestinationCode = 'LAW' | 'ACC' | 'EST' | 'CAR' | 'LIV'

export type Destination =
  | { code: 'LAW'; label: '法律' }
  | { code: 'ACC'; label: '会計' }
  | { code: 'EST'; label: '住宅' }
  | { code: 'CAR'; label: 'キャリア' }
  | { code: 'LIV'; label: '配信' }

export type WorkItem = {
  slug: string
  title: string
  destination: Destination
  summary: string
  period: string
  duration: string
  engagement: Engagement
  role: string
  team: string
  stack: Array<string>
  challenge: string
  actions: Array<string>
  outcome: string
  url?: string
}

export type TimelineItem = {
  slug: string
  period: string
  title: string
  destination?: Destination
  role: string
  stack: Array<string>
  note: string
}

export type PersonalWorkItem = {
  title: string
  period: string
  url: string
  destination?: Destination
  description: string
  stack: Array<string>
}

export type PortfolioWork = WorkItem | TimelineItem
