import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nacky.me'
  const lastModified = new Date()

  // 静的ページ
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // TODO: データベースからブログ記事等の動的コンテンツを取得
  // const blogs = await getBlogPosts()
  // const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
  //   url: `${baseUrl}/blog/${blog.slug}`,
  //   lastModified: new Date(blog.updatedAt),
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }))

  // TODO: ポートフォリオ作品ページも追加予定
  // const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map((work) => ({
  //   url: `${baseUrl}/portfolio/${work.slug}`,
  //   lastModified: new Date(work.updatedAt),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }))

  return [
    ...staticRoutes,
    // ...blogRoutes,
    // ...portfolioRoutes,
  ]
} 