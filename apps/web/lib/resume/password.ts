import { createHash, timingSafeEqual } from 'node:crypto'

export function verifyPassword(input: string, expected: string) {
  const inputHash = createHash('sha256').update(input).digest()
  const expectedHash = createHash('sha256').update(expected).digest()

  return timingSafeEqual(inputHash, expectedHash)
}
