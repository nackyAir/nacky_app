import { z } from 'zod'
import { APP_CONFIG } from '../constants/app'

// 基本的なバリデーション関数
export const createEmailSchema = (required = true) => {
  const base = z.string().email('有効なメールアドレスを入力してください')
  return required ? base.min(1, 'メールアドレスを入力してください') : base.optional()
}

export const createPhoneSchema = (required = true) => {
  const base = z.string()
    .regex(/^[0-9-+\s()]*$/, '有効な電話番号を入力してください')
    .min(10, '電話番号は10桁以上で入力してください')
    .max(15, '電話番号は15桁以内で入力してください')
  
  return required ? base : base.optional()
}

export const createTextSchema = (
  minLength: number,
  maxLength: number,
  errorMessages?: {
    required?: string
    min?: string
    max?: string
  }
) => {
  return z.string()
    .min(minLength, errorMessages?.min || `${minLength}文字以上で入力してください`)
    .max(maxLength, errorMessages?.max || `${maxLength}文字以内で入力してください`)
}

export const createUserNameSchema = () => {
  return z.string()
    .min(1, '名前を入力してください')
    .max(APP_CONFIG.LIMITS.CONTACT_FORM.USERNAME_MAX, `名前は${APP_CONFIG.LIMITS.CONTACT_FORM.USERNAME_MAX}文字以内で入力してください`)
    .regex(/^[^\d]+$/, '名前に数字を含めることはできません')
}

// 共通スキーマ
export const baseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const inquiryTypeSchema = z.enum(['inquiry', 'recruit', 'other'], {
  required_error: 'お問い合わせ種別を選択してください',
})

export const privacyPolicySchema = z.boolean().refine((val) => val === true, {
  message: 'プライバシーポリシーに同意する必要があります',
})

// フォーム関連の共通スキーマ
export const contactFormBaseSchema = z.object({
  userName: createUserNameSchema(),
  email: createEmailSchema(),
  phoneNumber: createPhoneSchema(),
  inquiryType: inquiryTypeSchema,
  privacyPolicy: privacyPolicySchema,
})

// API レスポンス用スキーマ
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
})

export const apiSuccessSchema = <T>(dataSchema: z.ZodType<T>) => z.object({
  data: dataSchema,
  message: z.string().optional(),
})

export const apiResponseSchema = <T>(dataSchema: z.ZodType<T>) => 
  z.union([
    apiSuccessSchema(dataSchema),
    z.object({ error: apiErrorSchema })
  ])

// 型定義
export type InquiryType = z.infer<typeof inquiryTypeSchema>
export type ApiError = z.infer<typeof apiErrorSchema>
export type ApiSuccess<T> = z.infer<ReturnType<typeof apiSuccessSchema<T>>>
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<T>>>