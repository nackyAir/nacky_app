import { z } from "zod"

export const resendEnv = () =>
  z
    .object({
      RESEND_API_KEY: z.string(),
    })
    .parse(process.env)
