'use client'

import { Button } from '@repo/ui/components/button'
import { useAction } from 'next-safe-action/hooks'

import { sendContactEmail } from '~/actions/home/sendContactEmail'

export function SendEmailButton() {
  const { execute } = useAction(sendContactEmail)

  return (
    <Button
      onClick={() =>
        execute({
          email: 'test@test.com',
          userName: 'test',
          inquiryContent: 'test',
          inquiryType: 'test',
        })
      }
    >
      メール送信
    </Button>
  )
}
