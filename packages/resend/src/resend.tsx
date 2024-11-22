import React from 'react'

import { render } from '@react-email/render'
import { Resend as Client } from 'resend'

import AutoReplyEmail from '../emails/contactForm'

type ContactFormData = {
  userName: string
  inquiryContent: string
  inquiryType: string
  email: string
}

export class Resend {
  private readonly resend: Client

  constructor() {
    this.resend = new Client(process.env.RESEND_API_KEY)
  }

  public async sendContactFormEmail(formData: ContactFormData) {
    const html = render(<AutoReplyEmail {...formData} />)
    try {
      const result = await this.resend.emails.send({
        to: formData.email,
        from: 'onboarding@resend.dev',
        text: 'お問い合わせいただきありがとうございます',
        subject: 'お問い合わせありがとうございます',
        html,
      })
      if (!result.error) {
        return result
      }
      throw result.error
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
