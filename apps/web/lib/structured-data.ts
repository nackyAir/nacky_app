import type {
  Article,
  BreadcrumbList,
  Organization,
  WebSite,
  WithContext,
} from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nacky.me'

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Naoki Hayashida',
    alternateName: ['林田直樹', 'Nacky'],
    jobTitle: 'フロントエンドエンジニア',
    description:
      'フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発を提供します。',
    url: baseUrl,
    image: `${baseUrl}/profile-image.jpg`,
    sameAs: [
      'https://github.com/naoki-hayashida',
      'https://twitter.com/nacky_hayashida',
      'https://linkedin.com/in/naoki-hayashida',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'Frontend Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'UI/UX Design',
      'Responsive Web Design',
      'Web Performance Optimization',
    ],
    nationality: {
      '@type': 'Country',
      name: 'Japan',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
  }
}

export function generateProfessionalServiceStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Naoki Hayashida - フロントエンド開発サービス',
    description:
      'モダンなフロントエンド技術を活用したWebサイト制作・開発サービス',
    provider: {
      '@type': 'Person',
      name: 'Naoki Hayashida',
      alternateName: '林田直樹',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    serviceType: [
      'フロントエンド開発',
      'Webサイト制作',
      'React開発',
      'Next.js開発',
      'TypeScript開発',
      'UI/UX実装',
    ],
    url: baseUrl,
  }
}

export function generateWebsiteStructuredData(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Naoki Hayashida Portfolio',
    alternateName: 'nacky.me',
    description:
      'Naoki Hayashida（林田直樹）のポートフォリオサイト。フロントエンドエンジニアとしての実績とスキルを紹介。',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
    },
    author: {
      '@type': 'Person',
      name: 'Naoki Hayashida',
      alternateName: '林田直樹',
    },
    publisher: {
      '@type': 'Person',
      name: 'Naoki Hayashida',
      url: baseUrl,
    },
  }
}

export function generateOrganizationStructuredData(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Naoki Hayashida',
    alternateName: ['林田直樹', 'Nacky'],
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'フロントエンドエンジニア・Webサイト制作のプロフェッショナル',
    foundingDate: '2020',
    founder: {
      '@type': 'Person',
      name: 'Naoki Hayashida',
    },
    sameAs: [
      'https://github.com/naoki-hayashida',
      'https://twitter.com/nacky_hayashida',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'business inquiry',
      availableLanguage: ['Japanese', 'English'],
    },
  }
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  authorName: string
  imageUrl?: string
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName || 'Naoki Hayashida',
      alternateName: '林田直樹',
    },
    publisher: {
      '@type': 'Person',
      name: 'Naoki Hayashida',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  }
}

export function generateStructuredDataScript(data: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}
