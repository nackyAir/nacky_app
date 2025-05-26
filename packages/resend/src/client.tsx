import React from 'react'

import { render } from '@react-email/render'
import { Resend as Client } from 'resend'

import AutoReplyEmail from '../emails/contactForm'

type SendEmailProps = {
  userName: string
  companyName?: string | null
  email: string
  phoneNumber: string
  inquiryContent: string
  inquiryType: string
  privacyPolicy: boolean
}

export class Resend {
  public readonly client: Client

  constructor(opts: { apiKey: string }) {
    this.client = new Client(opts.apiKey)
  }

  public async sendEmail(props: SendEmailProps) {
    const html = await render(<AutoReplyEmail {...props} />)

    // 開発環境では onboarding@resend.dev を使用
    const fromAddress = process.env.NODE_ENV === 'production' 
      ? '林田 直樹 <no-reply@nacky.me>'
      : 'Naoki Hayashida <onboarding@resend.dev>'

    try {
      const res = await this.client.emails.send({
        from: fromAddress,
        to: props.email,
        subject: 'お問い合わせありがとうございます',
        html,
      })

      return res
    } catch (error) {
      throw error
    }
  }
}
