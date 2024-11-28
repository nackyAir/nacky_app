'use server'

import { Resend } from '@repo/resend'
import { z } from 'zod'

import { useSafeActions } from '~/lib/create-safe-action'

const contactEmailSchema = z.object({
  userName: z.string(),
  inquiryContent: z.string(),
  inquiryType: z.string(),
  email: z.string().email(),
})

export async function handler(data: z.infer<typeof contactEmailSchema>) {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || '')

  try {
    await resend.sendEmail(data)

    return {
      data: 'success',
    }
  } catch (e: unknown) {
    return {
      data: 'error',
      error: e instanceof Error ? e.message : '不明なエラーが発生しました',
    }
  }
}

export const sendContactEmail = useSafeActions(
  'sendContactEmail',
  contactEmailSchema,
  handler
)
