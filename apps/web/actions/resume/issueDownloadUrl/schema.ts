import { z } from 'zod'

export const schema = z.object({
  ids: z
    .array(
      z.enum([
        'mynumber-pdf',
        'rirekisho-pdf',
        'rirekisho-xlsx',
        'shokumu-keirekisho-pdf',
        'shokumu-keirekisho-xlsx',
      ])
    )
    .min(1),
  expiresInDays: z.enum(['1', '7', '30']),
})
