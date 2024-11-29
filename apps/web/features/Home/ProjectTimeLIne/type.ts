import { z } from 'zod'

export const timeLineSchema = z.object({
  title: z.string(),
  description: z.string(),
  period: z.string(),
  url: z.string().optional(),
  position: z.enum(['フロントエンド開発', 'バックエンド開発', 'PM']).optional(),
  role: z.enum(['個人開発', '業務委託', 'インターン']),
  skills: z.array(z.string()),
})
export type TimeLineItem = z.infer<typeof timeLineSchema>
