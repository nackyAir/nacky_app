import { describe, expect, it } from 'vitest'

import { verifyPassword } from '~/lib/resume/password'

describe('verifyPassword', () => {
  it('accepts the matching password', () => {
    expect(verifyPassword('portfolio-secret', 'portfolio-secret')).toBe(true)
  })

  it('rejects a different password', () => {
    expect(verifyPassword('portfolio-secret', 'different-secret')).toBe(false)
  })

  it('rejects a password with a different length', () => {
    expect(verifyPassword('short', 'a-much-longer-password')).toBe(false)
  })
})
