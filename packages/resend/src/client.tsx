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
  private readonly client: Client

  constructor(apiKey: string) {
    this.client = new Client(apiKey)
  }

  public async sendEmail(props: SendEmailProps) {
    const html = await render(<AutoReplyEmail {...props} />)

    try {
      const res = await this.client.emails.send({
        from: 'onboarding@resend.dev',
        to: 'delivered@resend.dev',
        subject: 'Hello world',
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
