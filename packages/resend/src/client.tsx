import React from 'react'

import { render } from '@react-email/render'
import { Resend as Client } from 'resend'

import AutoReplyEmail, { AdminNotificationEmail } from '../emails/contactForm'

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
    // 顧客向け自動返信メールのHTML生成
    const autoReplyHtml = await render(<AutoReplyEmail {...props} />)
    
    // 管理者向け通知メールのHTML生成
    const adminNotificationHtml = await render(<AdminNotificationEmail {...props} />)

    // 開発環境では onboarding@resend.dev を使用
    const fromAddress = process.env.NODE_ENV === 'production' 
      ? '林田 直樹 <no-reply@nacky.me>'
      : 'Naoki Hayashida <onboarding@resend.dev>'

    // 管理者メールアドレス（環境変数から取得、なければデフォルト値）
    const adminEmail = process.env.ADMIN_EMAIL || "nh.nakki0509@gmail.com"

    try {
      // 顧客への自動返信メール送信
      const autoReplyResult = await this.client.emails.send({
        from: fromAddress,
        to: props.email,
        subject: 'お問い合わせありがとうございます',
        html: autoReplyHtml,
      })

      // 管理者への通知メール送信
      const adminNotificationResult = await this.client.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject: `【緊急】新しいお問い合わせ: ${props.companyName ? `${props.companyName} ` : ''}${props.userName}様`,
        html: adminNotificationHtml,
      })

      // 両方のメール送信が成功した場合のレスポンス
      return {
        autoReply: autoReplyResult,
        adminNotification: adminNotificationResult,
        success: true
      }
    } catch (error) {
      throw error
    }
  }
}
