export const APP_CONFIG = {
  SITE: {
    NAME: 'Naoki Hayashida Portfolio',
    URL: process.env.NEXT_PUBLIC_APP_URL || 'https://nacky.me',
    DESCRIPTION: 'フロントエンドエンジニア・Webサイト制作のプロフェッショナル',
  },
  CACHE: {
    GITHUB_LANGUAGES: 24 * 60 * 60 * 1000, // 24時間
    ANALYTICS: 5 * 60 * 1000, // 5分
    CONTACT_FORM: 60 * 1000, // 1分
  },
  LIMITS: {
    CONTACT_FORM: {
      USERNAME_MAX: 50,
      COMPANY_MAX: 50,
      EMAIL_MAX: 100,
      PHONE_MAX: 15,
      MESSAGE_MAX: 1000,
    },
    GITHUB: {
      MAX_REPOS: 100,
      REQUEST_TIMEOUT: 10000,
      MAX_RETRIES: 3,
    }
  },
  API: {
    TIMEOUT: 10000,
    RETRY_DELAY: 1000,
    MAX_RETRIES: 3,
  }
} as const

export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 0.15,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_IN_OUT: [0.4, 0, 0.2, 1],
    EASE_OUT: [0, 0, 0.2, 1],
    BOUNCE: [0.68, -0.6, 0.32, 1.6],
  }
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const