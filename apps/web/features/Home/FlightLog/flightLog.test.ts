import { describe, expect, it } from 'vitest'

import { DESTINATION_LABELS } from '~/features/Home/destination'
import {
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne/config'
import type { TimeLineItem } from '~/features/Home/ProjectTimeLIne/type'

import { FALLBACK_DESTINATION, toFlightLog } from './flightLog'

const realProjects: Array<TimeLineItem> = [
  ...clientProjects,
  ...personalProjects,
]

describe('toFlightLog', () => {
  it('assigns zero padded sequential flight numbers starting at FL-001', () => {
    const entries = toFlightLog(realProjects)

    expect(entries).toHaveLength(realProjects.length)
    expect(entries[0]?.flightNo).toBe('FL-001')
    expect(entries.at(-1)?.flightNo).toBe(
      `FL-${String(realProjects.length).padStart(3, '0')}`
    )
  })

  it('orders flights from the most recent start period', () => {
    const entries = toFlightLog(realProjects)

    expect(entries[0]?.project).toBe('Resme(レスミー)プロダクト開発')
    expect(entries.at(-1)?.project).toBe('POS アプリケーション管理サービス開発')
  })

  it('extracts the start year from the period string', () => {
    const [entry] = toFlightLog([
      {
        title: '会計事務所向け AI SaaS',
        description: '',
        period: '2024.06 - 現在',
        role: 'フロントエンドエンジニア',
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
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: '会計事務所の業務改善アプリケーション',
        description: '',
        period: '2024.06 - 2024.12',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: '住宅設備メーカー向け見積もりツール',
        description: '',
        period: '2023.04 - 2023.10',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: '社内勤怠管理サービス',
        description: '',
        period: '2022.09 - 2022.12',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: 'ライブ配信プラットフォーム',
        description: '',
        period: '2021.05 - 2021.11',
        role: 'フロントエンドエンジニア',
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

  it('prefers an explicit destination over the keyword inference', () => {
    const [entry] = toFlightLog([
      {
        title: 'Resme(レスミー)プロダクト開発',
        description: '',
        period: '2025.08 - 2026.04',
        role: 'フルスタックエンジニア(開発責任者)',
        skills: [],
        destination: 'CAR',
      },
    ])

    expect(entry?.destination).toBe('CAR')
    expect(entry?.destinationLabel).toBe(DESTINATION_LABELS.CAR)
  })

  it('overrides a keyword match when an explicit destination is given', () => {
    const [entry] = toFlightLog([
      {
        title: '会計事務所向け AI SaaS 開発',
        description: '',
        period: '2024.06 - 2025.06',
        role: 'フロントエンドエンジニア',
        skills: [],
        destination: 'LAW',
      },
    ])

    expect(entry?.destination).toBe('LAW')
  })

  it('falls back to the keyword inference when no destination is given', () => {
    const [entry] = toFlightLog([
      {
        title: '会計事務所向け AI SaaS 開発',
        description: '',
        period: '2024.06 - 2025.06',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
    ])

    expect(entry?.destination).toBe('ACC')
  })

  it('keeps the original array order for projects that start in the same month', () => {
    const entries = toFlightLog([
      {
        title: '先に並べた案件',
        description: '',
        period: '2025.08 - 2026.04',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: '後に並べた案件',
        description: '',
        period: '2025.08 - 2025.12',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: 'さらに後に並べた案件',
        description: '',
        period: '2025.08 - 2025.10',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
    ])

    expect(entries.map((entry) => entry.project)).toEqual([
      '先に並べた案件',
      '後に並べた案件',
      'さらに後に並べた案件',
    ])
  })

  it('marks a period that has no end date as active', () => {
    const entries = toFlightLog([
      {
        title: '継続案件',
        description: '',
        period: '2024.06 - 現在',
        role: 'フロントエンドエンジニア',
        skills: [],
      },
      {
        title: '終了案件',
        description: '',
        period: '2023.01 - 2023.06',
        role: 'フロントエンドエンジニア',
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
        role: 'フロントエンドエンジニア',
        skills: [],
      },
    ])

    expect(entry?.year).toBe('----')
  })

  it('returns an empty log for an empty project list', () => {
    expect(toFlightLog([])).toEqual([])
  })
})
