"use client"

import { Resend } from "@repo/resend"
import { Button } from "@repo/ui/components/button"

import { resendEnv } from "~/lib/env"

export const SendButton = () => {
  const resend = new Resend({ apiKey: "re_PUeBM2wQ_Dd9Lfa2ASF7LdxT9EX5MD8Yr" })

  const handleSendEmail = async () => {
    await resend.sendContactFormEmail({
      userName: "Naoki Hayashida",
      inquiryContent: "Hello",
      inquiryType: "Contact",
      email: "hmcn3176naoki8086@gmail.com",
    })
  }

  return <Button onClick={() => handleSendEmail()}>Send Email</Button>
}
