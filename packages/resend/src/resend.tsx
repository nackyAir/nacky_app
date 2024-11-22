import React from "react"

import { render } from "@react-email/render"
import { Resend as Client } from "resend"

import AutoReplyEmail from "../emails/contactForm"

type ContactFormData = {
  userName: string
  inquiryContent: string
  inquiryType: string
  email: string
}

export class Resend {
  private readonly resend: Client

  constructor(opts: { apiKey: string }) {
    this.resend = new Client(opts.apiKey)
  }

  public async sendContactFormEmail(formData: ContactFormData) {
    const html = await render(<AutoReplyEmail {...formData} />)
    try {
      const result = await this.resend.emails.send({
        to: "hmcn3176naoki8086@gmail.com",
        from: "no-reply@nacky.me",
        text: "お問い合わせいただきありがとうございます",
        subject: "お問い合わせありがとうございます",
        html,
      })
      if (!result.error) {
        return
      }
      throw result.error
    } catch (error) {
      console.error(
        "Error occurred sending team-invite email ",
        JSON.stringify(error)
      )
    }
  }
}
