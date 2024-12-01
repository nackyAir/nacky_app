import { Resend } from '@repo/resend'
import { Hono } from 'hono'

type Env = {
  RESEND_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/send-email', async (c) => {
  try {
    const resend = new Resend({
      apiKey: c.env.RESEND_API_KEY,
    })

    await resend.sendEmail({
      userName: 'Naoki Hayashida',
      email: 'hmcn3176naoki8086@gmail.com',
      phoneNumber: '090-1234-5678',
      inquiryContent: 'Hello',
      inquiryType: 'inquiry',
      privacyPolicy: true,
    })

    return c.json({ message: 'Email sent' })
  } catch (error) {
    return c.json({ message: 'Email not sent' }, 500)
  }
})

export default app
