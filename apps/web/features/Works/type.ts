export type Engagement = '正社員' | '業務委託' | '個人開発'

export type WorkItem = {
  slug: string
  title: string
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
  period: string
  title: string
  role: string
  stack: Array<string>
  note: string
}
