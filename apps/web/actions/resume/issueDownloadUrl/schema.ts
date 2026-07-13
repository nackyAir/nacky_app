import { z } from 'zod'

export const schema = z.object({
  id: z.enum([
    'rirekisho-pdf',
    'rirekisho-xlsx',
    'shokumu-keirekisho-pdf',
    'shokumu-keirekisho-xlsx',
  ]),
  expiresInDays: z.enum(['1', '7', '30']),
})
