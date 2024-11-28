import React from 'react'

import { render } from '@react-email/render'
import { Resend as Client } from 'resend'

import AutoReplyEmail from '../emails/contactForm'

type SendEmailProps = {
  userName: string
  inquiryContent: string
  inquiryType: string
  email: string
}

export class Resend {
  public readonly client: Client

  constructor(opts: { apiKey: string }) {
    this.client = new Client(opts.apiKey)
  }

  public async sendEmail(props: SendEmailProps) {
    const html = await render(<AutoReplyEmail {...props} />)

    try {
      const res = await this.client.emails.send({
        from: '林田　直樹 <no-reply@nacky.me>',
        to: props.email,
        subject: 'お問い合わせありがとうございます',
        html,
      })

      if (!res.error) {
        return
      }

      throw res.error
    } catch (error) {
      console.error(error)
    }
  }
}
