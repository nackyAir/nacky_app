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
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { sendContactEmail } from '~/actions/home/sendContactEmail'
import {
  type ContactFormType,
  contactFormSchema,
} from '~/features/Home/ContactForm/schema'

const FIELD_CLASS = 'border-hairline bg-surface text-ink h-12 rounded-flat'
const LABEL_CLASS = 'text-ink text-sm font-bold'

const RequiredBadge = () => (
  <span className="text-status-error" aria-hidden="true">
    *
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
        phoneNumber: data.phoneNumber,
        inquiryType: data.inquiryType,
        inquiryContent: data.inquiryContent,
        privacyPolicy: data.privacyPolicy,
      })

      if (!result?.data) {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="border-hairline bg-surface rounded-panel border">
      <div className="border-hairline border-b px-8 py-6">
        <p className="label-mono text-ink-muted">INQUIRY</p>
        <p className="text-ink-muted mt-0.5 text-sm">
          お気軽にお問い合わせください。通常1-2営業日以内にご返信いたします。
        </p>
      </div>

      <div className="px-8 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className={LABEL_CLASS}>お名前</FormLabel>
                      <RequiredBadge />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        className={FIELD_CLASS}
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
                    <FormLabel className={LABEL_CLASS}>
                      会社名・組織名
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={FIELD_CLASS}
                        placeholder="株式会社サンプル"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className={LABEL_CLASS}>
                        メールアドレス
                      </FormLabel>
                      <RequiredBadge />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={FIELD_CLASS}
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
                      <FormLabel className={LABEL_CLASS}>
                        メールアドレス（確認用）
                      </FormLabel>
                      <RequiredBadge />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={FIELD_CLASS}
                        placeholder="example@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className={LABEL_CLASS}>電話番号</FormLabel>
                      <RequiredBadge />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className={FIELD_CLASS}
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
                      <FormLabel className={LABEL_CLASS}>
                        お問い合わせ種別
                      </FormLabel>
                      <RequiredBadge />
                    </div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className={FIELD_CLASS}>
                          <SelectValue placeholder="お問い合わせ種別を選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

            <FormField
              control={form.control}
              name="inquiryContent"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel className={LABEL_CLASS}>
                      お問い合わせ内容
                    </FormLabel>
                    <RequiredBadge />
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="border-hairline bg-surface text-ink min-h-[140px] resize-none rounded-flat"
                      placeholder="お問い合わせ内容をできるだけ詳しくご記入ください"
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
                <FormItem className="border-hairline flex items-start gap-4 space-y-0 rounded-flat border p-6">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className={LABEL_CLASS}>
                      個人情報の取り扱いについて
                    </FormLabel>
                    <p className="text-ink-muted text-sm leading-[1.9]">
                      お預かりした個人情報は、お問い合わせへの回答および関連するご連絡にのみ使用いたします。
                      第三者への提供は行いません。
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!form.formState.isValid || loading}
              className="bg-navy text-surface hover:bg-ink h-12 rounded-flat px-8 text-sm font-bold transition-colors duration-[180ms] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '送信中...' : '送信する'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
