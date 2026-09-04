import { z } from 'zod'

export const schema = z.object({
  password: z.string().min(1),
  ids: z
    .array(
      z.enum([
        'rirekisho-pdf',
        'rirekisho-xlsx',
        'shokumu-keirekisho-pdf',
        'shokumu-keirekisho-docx',
        'skill-sheet-pdf',
        'skill-sheet-xlsx',
      ])
    )
    .min(1),
})
