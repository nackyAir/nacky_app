import { z } from 'zod'

export const contactFormSchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: '名前を入力して下さい' })
      .max(50, { message: '名前は50文字以内で入力してください' })
      .regex(/^[^\d]+$/, { message: '名前に数字を含めることはできません' }),

    companyName: z
      .string()
      .max(50, { message: '会社名は50文字以内で入力してください' })
      .optional(),

    email: z
      .string()
      .min(1, { message: 'メールアドレスを入力してください' })
      .email({ message: '有効なメールアドレスを入力してください' })
      .max(100, { message: 'メールアドレスは100文字以内で入力してください' }),

    confirmEmail: z
      .string()
      .min(1, { message: 'メールアドレスを入力してください' })
      .email({ message: '有効なメールアドレスを入力してください' })
      .max(100, { message: 'メールアドレスは100文字以内で入力してください' }),

    phoneNumber: z
      .string()
      .regex(/^[0-9-]*$/, { message: '有効な電話番号を入力してください' })
      .min(10, { message: '電話番号は10桁以上で入力してください' })
      .max(15, { message: '電話番号は15桁以内で入力してください' }),

    inquiryType: z.enum(['inquiry', 'recruit', 'other'], {
      required_error: 'お問い合わせ種別を選択してください',
    }),

    inquiryContent: z
      .string()
      .min(1, { message: '内容は必須項目です' })
      .max(1000, { message: 'メッセージは1000文字以内で入力してください' }),

    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: 'プライバシーポリシーに同意する必要があります',
    }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'メールアドレスが一致しません',
    path: ['confirmEmail'],
  })

export type ContactFormType = z.infer<typeof contactFormSchema>
