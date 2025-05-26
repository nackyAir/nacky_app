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
import * as motion from 'framer-motion/client'
import { Send, Plane } from 'lucide-react'

import { sendContactEmail } from '~/actions/home/sendContactEmail'
import {
  ContactFormType,
  contactFormSchema,
} from '~/features/Home/ContactForm/schema'

const RequiredBadge = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
    必須
  </span>
)

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [showPlaneAnimation, setShowPlaneAnimation] = useState(false)

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
      // 飛行機アニメーションを開始
      setShowPlaneAnimation(true)
      
      // 1秒後にトーストを表示（飛行機が飛んだ後）
      setTimeout(() => {
        toast.success('送信が完了しました', {
          description: 'メッセージが正常に送信されました ✈️',
        })
      }, 1000)
      
      form.reset()
      setLoading(false)
      
      // 3秒後にアニメーションを非表示
      setTimeout(() => {
        setShowPlaneAnimation(false)
      }, 3000)
    },
    onError: (error) => {
      const errorMessage = typeof error.error?.serverError === 'string' 
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
        // 送信処理は完了したが、想定と異なるレスポンス
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* 飛行機フライトアニメーション */}
      {showPlaneAnimation && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 飛行機本体 */}
          <motion.div
            className="absolute top-1/2 -left-20"
            initial={{ 
              x: -100, 
              y: 0,
              rotate: -15,
              scale: 0.8,
            }}
            animate={{ 
              x: [0, window.innerWidth + 100],
              y: [0, -50, -30, -80, -40],
              rotate: [-15, -10, -5, 0, 5],
              scale: [0.8, 1, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.3, 0.6, 0.8, 1]
            }}
          >
            <Plane className="w-12 h-12 text-blue-600 drop-shadow-lg" />
          </motion.div>
          
          {/* 飛行機雲効果 */}
          <motion.div
            className="absolute top-1/2 -left-20"
            initial={{ x: -50, opacity: 0 }}
            animate={{ 
              x: [50, window.innerWidth - 100],
              opacity: [0, 0.6, 0.8, 0.4, 0]
            }}
            transition={{
              duration: 2.5,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-2 bg-white/40 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: [0, 1, 0.8, 0.5, 0],
                    opacity: [0, 0.8, 0.6, 0.3, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* キラキラ効果 */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${45 + Math.sin(i) * 10}%`,
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                scale: [0, 1, 0.5, 0],
                opacity: [0, 1, 0.8, 0],
                rotate: [0, 180, 360],
                y: [0, -20, -10, -30]
              }}
              transition={{
                duration: 2,
                delay: 0.3 + i * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            お問い合わせフォーム
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            お気軽にお問い合わせください。通常1-2営業日以内にご返信いたします。
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
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
                        <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                          お名前
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
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
                      <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                        会社名・組織名
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
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
                        <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                          メールアドレス
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="h-12 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
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
                        <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                          メールアドレス（確認用）
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="h-12 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
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
                        <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                          電話番号
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className="h-12 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
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
                        <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                          お問い合わせ種別
                        </FormLabel>
                        <RequiredBadge />
                      </div>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
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

              {/* Message Section */}
              <FormField
                control={form.control}
                name="inquiryContent"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                        お問い合わせ内容
                      </FormLabel>
                      <RequiredBadge />
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[120px] text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 resize-none"
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
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-lg border border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300">
                        個人情報の取り扱いについて
                      </FormLabel>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        お預かりした個人情報は、お問い合わせへの回答および関連するご連絡にのみ使用いたします。
                        第三者への提供は行いません。
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || loading}
                  size="lg"
                  className="w-full sm:w-auto px-12 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ x: -30, opacity: 0 }}
                    animate={loading ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                  <motion.span
                    initial={{ x: 0 }}
                    animate={loading ? { x: 30 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-center gap-2"
                  >
                    {!loading && <Plane className="w-5 h-5" />}
                    {loading ? '送信中...' : '送信する'}
                  </motion.span>
                  {loading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}
