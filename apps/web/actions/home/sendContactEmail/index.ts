'use server'

import { Resend } from '@repo/resend'
import { z } from 'zod'

import { createSafeAction } from '~/lib/create-safe-action'

const contactEmailSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  inquiryContent: z.string(),
  inquiryType: z.string(),
  privacyPolicy: z.boolean(),
})

export async function handler(data: z.infer<typeof contactEmailSchema>) {
  const resend = new Resend({
    apiKey: process.env.NEXT_PUBLIC_RESEND_API_KEY as string,
  })

  try {
    await resend.sendEmail(data)

    return {
      data: 'success',
    }
  } catch (e: unknown) {
    return {
      error: '不明なエラーが発生しました',
    }
  }
}

export const sendContactEmail = createSafeAction(
  'sendContactEmail',
  contactEmailSchema,
  handler
)
