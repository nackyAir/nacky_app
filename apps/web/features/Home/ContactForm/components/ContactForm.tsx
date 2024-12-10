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

import { sendContactEmail } from '~/actions/home/sendContactEmail'
import {
  ContactFormType,
  contactFormSchema,
} from '~/features/Home/ContactForm/schema'

const RequiredBadge = () => (
  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
    必須
  </span>
)

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      userName: '',
      companyName: '',
      email: '',
      confirmEmail: '',
      phoneNumber: '',
      inquiryContent: '',
      inquiryType: 'inquiry',
      privacyPolicy: false,
    },
    mode: 'onBlur',
  })

  const { executeAsync } = useAction(sendContactEmail, {
    onSuccess: () => {
      toast.success('送信が完了しました')
      form.reset()
    },
    onError: () => {
      toast.error('送信に失敗しました。', {
        description: `しばらくしてから再度お試しください。`,
      })
    },
  })

  const onSubmit = async (data: ContactFormType) => {
    setLoading(true)

    toast.promise(
      executeAsync({
        userName: data.userName,
        companyName: data.companyName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        inquiryType: data.inquiryType,
        inquiryContent: data.inquiryContent,
        privacyPolicy: data.privacyPolicy,
      }),
      {
        loading: '送信中...',
      }
    )

    setLoading(false)
  }

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/50 shadow-lg backdrop-blur-sm">
          <div className="px-8 py-6">
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
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            お名前
                          </FormLabel>
                          <RequiredBadge />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-input w-full border bg-white/50"
                            placeholder="山田 太郎"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          会社名
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-input w-full bg-white/50"
                            placeholder="テスト株式会社"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            メールアドレス
                          </FormLabel>
                          <RequiredBadge />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="border-input w-full bg-white/50"
                            placeholder="example@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmEmail"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            メールアドレス（確認用）
                          </FormLabel>
                          <RequiredBadge />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="border-input w-full bg-white/50"
                            placeholder="example@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            電話番号
                          </FormLabel>
                          <RequiredBadge />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="border-input w-full bg-white/50"
                            placeholder="090-1234-5678"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            お問い合わせ種別
                          </FormLabel>
                          <RequiredBadge />
                        </div>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="border-input w-full bg-white/50">
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inquiryContent"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            お問い合わせ内容
                          </FormLabel>
                          <RequiredBadge />
                        </div>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="border-input min-h-[150px] w-full resize-none bg-white/50"
                            placeholder="お問い合わせ内容をご記入ください"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            個人情報に関する同意
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || loading}
                    className="w-full max-w-md rounded-lg bg-gradient-to-r from-blue-500/90 to-blue-600/90 px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 sm:w-auto"
                  >
                    {loading ? '送信中...' : '送信する'}
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
