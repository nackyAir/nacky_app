'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import { Checkbox } from '@repo/ui/components/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'
import { Textarea } from '@repo/ui/components/textarea'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { sendContactEmail } from '~/actions/home/sendContactEmail'

const contactFormSchema = z.object({
  userName: z
    .string()
    .min(1, { message: '名前を入力して下さい' })
    .max(50, { message: '名前は50文字以内で入力してください' })
    .regex(/^[^\d]+$/, { message: '名前に数字を含めることはできません' }),

  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .email({ message: '有効なメールアドレスを入力してください' })
    .max(100, { message: 'メールアドレスは100文字以内で入力してください' }),

  phoneNumber: z
    .string()
    .regex(/^[0-9-]*$/, { message: '有効な電話番号を入力してください' })
    .min(10, { message: '電話番号は10桁以上で入力してください' })
    .max(15, { message: '電話番号は15桁以内で入力してください' }),

  inquiryType: z.string(),

  inquiryContent: z
    .string()
    .min(1, { message: '内容は必須項目です' })
    .max(1000, { message: 'メッセージは1000文字以内で入力してください' }),

  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'プライバシーポリシーに同意する必要があります',
  }),
})

type ContactFormType = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      userName: '',
      email: '',
      phoneNumber: '',
      inquiryContent: '',
      inquiryType: '',
      privacyPolicy: false,
    },
    mode: 'onBlur',
  })

  const { execute } = useAction(sendContactEmail, {
    onSuccess: () => {
      toast.success('送信が完了しました')
    },
    onError: (error) => {
      toast.error(error.error.serverError?.message)
    },
  })

  const onSubmit = async (data: ContactFormType) => {
    setLoading(true)
    execute({
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      inquiryType: data.inquiryType,
      inquiryContent: data.inquiryContent,
      privacyPolicy: data.privacyPolicy,
    })
    setLoading(false)
  }

  return (
    <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white/80 shadow-xl backdrop-blur-lg">
          <div className="border border-white/50 px-8 py-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              お問い合わせフォーム
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              以下のフォームに必要事項をご記入ください。
            </p>
          </div>

          <div className="px-8 py-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          名前
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          メールアドレス
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          電話番号
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          お問い合わせ種別
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="お問い合わせ種別を選択してください" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="inquiry">
                              お問い合わせ
                            </SelectItem>
                            <SelectItem value="recruit">採用</SelectItem>
                            <SelectItem value="other">その他</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inquiryContent"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          お問い合わせ内容
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[150px] w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          プライバシーポリシーに同意する
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || loading}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    送信する
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            お問い合わせの返信には通常1-2営業日ほどお時間をいただいております。
          </p>
        </div>
      </div>
    </div>
  )
}
