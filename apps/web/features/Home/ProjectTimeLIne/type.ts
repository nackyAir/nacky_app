import { z } from 'zod'

import { DESTINATION_CODES } from '~/features/Home/destination'

export const timeLineSchema = z.object({
  title: z.string(),
  description: z.string(),
  period: z.string(),
  url: z.string().optional(),
  position: z.enum(['フロントエンド開発', 'バックエンド開発', 'PM']).optional(),
  role: z.enum([
    '個人開発',
    'フロントエンドエンジニア',
    'フルスタックエンジニア(開発責任者)',
  ]),
  skills: z.array(z.string()),
  destination: z.enum(DESTINATION_CODES).optional(),
})
export type TimeLineItem = z.infer<typeof timeLineSchema>
