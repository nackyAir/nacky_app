import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(1),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  message: z.string().min(1),
})
