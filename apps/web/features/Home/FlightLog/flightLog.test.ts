import { describe, expect, it } from 'vitest'

import {
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne/config'
import type { TimeLineItem } from '~/features/Home/ProjectTimeLIne/type'

import {
  DESTINATION_LABELS,
  FALLBACK_DESTINATION,
  toFlightLog,
} from './flightLog'

const realProjects: Array<TimeLineItem> = [
  ...clientProjects,
  ...personalProjects,
]

describe('toFlightLog', () => {
  it('assigns zero padded sequential flight numbers starting at FL-001', () => {
    const entries = toFlightLog(realProjects)

    expect(entries).toHaveLength(realProjects.length)
    expect(entries.map((entry) => entry.flightNo)).toEqual([
      'FL-001',
      'FL-002',
      'FL-003',
      'FL-004',
      'FL-005',
    ])
  })

  it('orders flights from the most recent start period', () => {
    const entries = toFlightLog(realProjects)

    expect(entries.map((entry) => entry.year)).toEqual([
      '2024',
      '2024',
      '2023',
      '2023',
      '2023',
    ])
    expect(entries[0]?.project).toBe('ポートフォリオサイト')
  })

  it('extracts the start year from the period string', () => {
    const [entry] = toFlightLog([
      {
        title: '会計事務所向け AI SaaS',
        description: '',
        period: '2024.06 - 現在',
        role: 'インターン',
        skills: [],
      },
    ])

    expect(entry?.year).toBe('2024')
  })

  it('maps industry keywords in the title to a destination code', () => {
    const entries = toFlightLog([
      {
        title: '弁護士事務所向け債務整理サービス',
        description: '',
        period: '2025.01 - 現在',
        role: '業務委託',
        skills: [],
      },
      {
        title: '会計事務所の業務改善アプリケーション',
        description: '',
        period: '2024.06 - 2024.12',
        role: 'インターン',
        skills: [],
      },
      {
        title: '住宅設備メーカー向け見積もりツール',
        description: '',
        period: '2023.04 - 2023.10',
        role: '業務委託',
        skills: [],
      },
      {
        title: '社内勤怠管理サービス',
        description: '',
        period: '2022.09 - 2022.12',
        role: '業務委託',
        skills: [],
      },
      {
        title: 'ライブ配信プラットフォーム',
        description: '',
        period: '2021.05 - 2021.11',
        role: '業務委託',
        skills: [],
      },
    ])

    expect(entries.map((entry) => entry.destination)).toEqual([
      'LAW',
      'ACC',
      'EST',
      'CAR',
      'LIV',
    ])
    expect(entries[0]?.destinationLabel).toBe(DESTINATION_LABELS.LAW)
  })

  it('marks a period that has no end date as active', () => {
    const entries = toFlightLog([
      {
        title: '継続案件',
        description: '',
        period: '2024.06 - 現在',
        role: '業務委託',
        skills: [],
      },
      {
        title: '終了案件',
        description: '',
        period: '2023.01 - 2023.06',
        role: '業務委託',
        skills: [],
      },
    ])

    expect(entries.map((entry) => entry.status)).toEqual([
      'active',
      'completed',
    ])
  })

  it('falls back to the generic destination for an unmapped industry', () => {
    const [entry] = toFlightLog([
      {
        title: 'coffee drip Recipe app coffeerepi',
        description: '',
        period: '2023.09 - 2023.11',
        role: '個人開発',
        skills: [],
      },
    ])

    expect(entry?.destination).toBe(FALLBACK_DESTINATION)
    expect(entry?.destinationLabel).toBe(
      DESTINATION_LABELS[FALLBACK_DESTINATION]
    )
  })

  it('falls back to a placeholder year when the period has no four digit year', () => {
    const [entry] = toFlightLog([
      {
        title: '年不明の案件',
        description: '',
        period: '期間非公開',
        role: '業務委託',
        skills: [],
      },
    ])

    expect(entry?.year).toBe('----')
  })

  it('returns an empty log for an empty project list', () => {
    expect(toFlightLog([])).toEqual([])
  })
})
