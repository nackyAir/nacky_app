import { describe, expect, it } from 'vitest'

import { featuredWorks, freelanceTimeline, personalWorks } from './config'
import { createFlightNumber, getFlightYear } from './flightLog'

describe('flight log', () => {
  it('numbers flights in config order', () => {
    expect([0, 1, 9].map(createFlightNumber)).toEqual([
      'FL-001',
      'FL-002',
      'FL-010',
    ])
  })

  it('extracts the departure year from a period', () => {
    expect(getFlightYear('2025.08 - 2026.04')).toBe('2025')
  })

  it('assigns the approved destination codes', () => {
    expect(featuredWorks.map((work) => work.destination)).toEqual([
      { code: 'CAR', label: 'キャリア' },
      { code: 'LAW', label: '法律' },
      { code: 'ACC', label: '会計' },
    ])
    expect(freelanceTimeline[0]?.destination).toEqual({
      code: 'LIV',
      label: '配信',
    })
    expect(personalWorks[0]?.destination).toEqual({
      code: 'EST',
      label: '住宅',
    })
  })
})
