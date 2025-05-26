'use server'

import { Resend } from '@repo/resend'
import { z } from 'zod'

import { createSafeAction } from '~/lib/create-safe-action'

const contactEmailSchema = z.object({
  userName: z.string(),
  companyName: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string(),
  inquiryContent: z.string(),
  inquiryType: z.string(),
  privacyPolicy: z.boolean(),
})

export async function handler(data: z.infer<typeof contactEmailSchema>) {
  // Server Actionでは通常の環境変数のみを使用（セキュア）
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return {
      error: 'メール送信サービスが設定されていません',
    }
  }

  const cleanApiKey = apiKey.trim().replace(/[\n\r]/g, '')

  const resend = new Resend({
    apiKey: cleanApiKey,
  })

  try {
    const result = await resend.sendEmail(data)
    
    if (result.autoReply.error) {
      return {
        error: `メール送信に失敗しました: ${result.autoReply.error.message || result.autoReply.error}`,
      }
    }

    return {
      data: 'success',
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: `送信エラー: ${e.message}`,
      }
    }
    
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
