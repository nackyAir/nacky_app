type ResumeEnvName =
  | 'RESUME_PASSWORD'
  | 'RESUME_ADMIN_PASSWORD'
  | 'RESUME_SIGNING_SECRET'

export function getRequiredResumeEnv(name: ResumeEnvName) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Resume configuration error: ${name} is not set`)
  }

  return value
}
