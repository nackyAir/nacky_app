import { z } from 'zod'
import { 
  createUserNameSchema, 
  createEmailSchema, 
  createPhoneSchema, 
  inquiryTypeSchema, 
  privacyPolicySchema,
  createTextSchema
} from '../../../lib/types/schemas'
import { APP_CONFIG } from '../../../lib/constants/app'

export const contactFormSchema = z
  .object({
    userName: createUserNameSchema(),

    companyName: createTextSchema(
      0, 
      APP_CONFIG.LIMITS.CONTACT_FORM.COMPANY_MAX,
      { max: `会社名は${APP_CONFIG.LIMITS.CONTACT_FORM.COMPANY_MAX}文字以内で入力してください` }
    ).optional(),

    email: createEmailSchema(),

    confirmEmail: createEmailSchema(),

    phoneNumber: createPhoneSchema(false),

    inquiryType: inquiryTypeSchema,

    inquiryContent: createTextSchema(
      1,
      APP_CONFIG.LIMITS.CONTACT_FORM.MESSAGE_MAX,
      {
        min: '内容は必須項目です',
        max: `メッセージは${APP_CONFIG.LIMITS.CONTACT_FORM.MESSAGE_MAX}文字以内で入力してください`
      }
    ),

    privacyPolicy: privacyPolicySchema,
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'メールアドレスが一致しません',
    path: ['confirmEmail'],
  })

export type ContactFormType = z.infer<typeof contactFormSchema>

export const contactFormDefaultValues: Partial<ContactFormType> = {
  userName: '',
  companyName: '',
  email: '',
  confirmEmail: '',
  phoneNumber: '',
  inquiryContent: '',
  privacyPolicy: false,
}
