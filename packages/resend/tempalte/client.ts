import { Resend } from 'resend'

type Props = {
  company?: string
  fullName: string
  email: string
  message: string
}

export class ResendService {
  private resend: Resend
  constructor(apikey: string) {
    this.resend = new Resend(apikey)
  }

  public async sendContactEmail() {}
}
