'use client'

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
import { Send } from '@repo/ui/icons/lucide'
import * as motion from 'framer-motion/client'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { sendContactEmail } from '~/actions/home/sendContactEmail'
import {
  type ContactFormType,
  contactFormSchema,
} from '~/features/Home/ContactForm/schema'

const RequiredBadge = () => <span className="text-red-500 ml-1">*</span>

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      userName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      inquiryContent: '',
      inquiryType: 'inquiry',
      privacyPolicy: false,
    },
    mode: 'onTouched',
  })

  const { executeAsync } = useAction(sendContactEmail, {
    onSuccess: () => {
      toast.success('送信が完了しました', {
        description: 'メッセージが正常に送信されました',
      })

      form.reset()
      setLoading(false)
    },
    onError: (error) => {
      const errorMessage =
        typeof error.error?.serverError === 'string'
          ? error.error.serverError
          : 'しばらくしてから再度お試しください。'
      toast.error('送信に失敗しました。', {
        description: errorMessage,
      })
      setLoading(false)
    },
  })

  const onSubmit = async (data: ContactFormType) => {
    setLoading(true)

    try {
      const result = await executeAsync({
        userName: data.userName,
        companyName: data.companyName,
        email: data.email,
        phoneNumber: data.phoneNumber ?? '',
        inquiryType: data.inquiryType,
        inquiryContent: data.inquiryContent,
        privacyPolicy: data.privacyPolicy,
      })

      if (!result?.data) {
        // 送信処理は完了したが、想定と異なるレスポンス
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-[0.95rem] leading-[1.9] text-ink-muted">
          お気軽にお問い合わせください。通常1-2営業日以内にご返信いたします。
        </p>

        {/* Form */}
        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="font-sans text-base font-medium text-ink-faint">
                          お名前
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="name"
                          className="h-12 rounded-md border-rule bg-paper text-base text-ink placeholder:text-ink-faint focus-visible:ring-ink/20"
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
                      <FormLabel className="font-sans text-base font-medium text-ink-faint">
                        会社名・組織名
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="organization"
                          className="h-12 rounded-md border-rule bg-paper text-base text-ink placeholder:text-ink-faint focus-visible:ring-ink/20"
                          placeholder="株式会社サンプル"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="font-sans text-base font-medium text-ink-faint">
                          メールアドレス
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="email"
                          inputMode="email"
                          type="email"
                          className="h-12 rounded-md border-rule bg-paper text-base text-ink placeholder:text-ink-faint focus-visible:ring-ink/20"
                          placeholder="example@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="font-sans text-base font-medium text-ink-faint">
                          電話番号（任意）
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="tel"
                          inputMode="tel"
                          type="tel"
                          className="h-12 rounded-md border-rule bg-paper text-base text-ink placeholder:text-ink-faint focus-visible:ring-ink/20"
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
                        <FormLabel className="font-sans text-base font-medium text-ink-faint">
                          お問い合わせ種別
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-md border-rule bg-paper text-base text-ink data-[placeholder]:text-ink-faint focus:ring-ink/20">
                            <SelectValue placeholder="お問い合わせ種別を選択してください" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-rule bg-paper-raised text-ink">
                          <SelectItem value="inquiry">お問い合わせ</SelectItem>
                          <SelectItem value="recruit">採用について</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message Section */}
              <FormField
                control={form.control}
                name="inquiryContent"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="font-sans text-base font-medium text-ink-faint">
                        お問い合わせ内容
                      </FormLabel>
                      <RequiredBadge />
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[120px] resize-none rounded-md border-rule bg-paper text-base text-ink placeholder:text-ink-faint focus-visible:ring-ink/20"
                        placeholder="お問い合わせ内容をできるだけ詳しくご記入ください"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Privacy Policy */}
              <FormField
                control={form.control}
                name="privacyPolicy"
                render={({ field }) => (
                  <FormItem className="space-y-0 rounded-md border border-rule bg-paper-raised p-6">
                    <FormLabel className="flex min-h-11 cursor-pointer items-start gap-3 py-2 font-sans">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-rule focus-visible:ring-ink/20 data-[state=checked]:border-ink data-[state=checked]:bg-ink data-[state=checked]:text-paper"
                        />
                      </FormControl>
                      <span className="space-y-1">
                        <span className="block text-base font-medium text-ink">
                          個人情報の取り扱いについて
                        </span>
                        <span className="block text-sm font-normal leading-relaxed text-ink-muted">
                          お預かりした個人情報は、お問い合わせへの回答および関連するご連絡にのみ使用いたします。
                          第三者への提供は行いません。
                        </span>
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex pt-4">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  size="lg"
                  className="h-12 w-full rounded-full bg-ink px-12 text-base font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    {!loading && <Send className="w-5 h-5" />}
                    {loading ? '送信中...' : 'この内容で問い合わせる'}
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}
