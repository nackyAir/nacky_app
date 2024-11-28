'use client'

import { Button } from '@repo/ui/components/button'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { sendContactEmail } from '~/actions/home/sendContactEmail'

export function SendEmailButton() {
  const { execute } = useAction(sendContactEmail, {
    onSuccess: () => {
      toast.success('メールを送信しました')
    },
    onError: (error) => {
      console.log(error)
      toast.error('メール送信に失敗しました', {
        description:
          error instanceof Error ? error.message : '不明なエラーが発生しました',
      })
    },
  })

  const handleClick = () => {
    execute({
      email: 'hmcn3176naoki8086@gmail.com',
      userName: '林田　直樹',
      inquiryContent: 'テストメールです',
      inquiryType: 'お問い合わせ',
    })
  }

  return <Button onClick={handleClick}>メール送信</Button>
}
