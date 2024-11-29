import { useEffect, useState } from 'react'

interface Language {
  name: string
  percentage: number
  bytes: number
  color: string
}

interface GitHubApiError extends Error {
  status?: number
}

const GITHUB_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Ruby: '#701516',
  Go: '#00ADD8',
} as const

export const useGithubLanguages = (username: string) => {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getLanguageColor = (language: string): string => {
    return GITHUB_COLORS[language] || '#6e7681'
  }

  useEffect(() => {
    // クライアントサイドでのみlocalStorageにアクセス
    const cachedData =
      typeof window !== 'undefined'
        ? localStorage.getItem(`github-languages-${username}`)
        : null

    if (cachedData) {
      setLanguages(JSON.parse(cachedData))
      setIsLoading(false)
    }

    const lastUpdate =
      typeof window !== 'undefined'
        ? localStorage.getItem(`github-languages-${username}-timestamp`)
        : null

    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        )
        if (!response.ok) {
          const error = new Error() as GitHubApiError
          error.status = response.status
          throw error
        }
        const repos = await response.json()
        const languagePromises = repos.map((repo: { languages_url: string }) =>
          fetch(repo.languages_url).then((res) => res.json())
        )
        const repoLanguages = await Promise.all(languagePromises)
        const combinedLanguages = repoLanguages.reduce(
          (acc: Record<string, number>, curr) => {
            Object.entries(curr).forEach(([lang, bytes]) => {
              acc[lang] = (acc[lang] || 0) + (bytes as number)
            })
            return acc
          },
          {}
        )
        const total = Object.values(combinedLanguages).reduce(
          (a, b) => a + b,
          0
        )
        const languageStats = Object.entries(combinedLanguages)
          .map(([name, bytes]) => ({
            name,
            bytes,
            percentage: (bytes / total) * 100,
            color: getLanguageColor(name),
          }))
          .sort((a, b) => b.percentage - a.percentage)
        // キャッシュを更新
        localStorage.setItem(
          `github-languages-${username}`,
          JSON.stringify(languageStats)
        )
        localStorage.setItem(
          `github-languages-${username}-timestamp`,
          Date.now().toString()
        )
        setLanguages(languageStats)
      } catch (err) {
        const error = err as GitHubApiError
        if (error.status === 403) {
          setError(
            'GitHub APIのレート制限に達しました。しばらく待ってから再試行してください。'
          )
        } else if (error.status === 404) {
          setError('ユーザーが見つかりませんでした。')
        } else {
          setError('データの取得中にエラーが発生しました。')
        }
      } finally {
        setIsLoading(false)
      }
    }

    const cacheTimeout = 24 * 60 * 60 * 1000 // 24時間
    if (
      !languages.length ||
      !lastUpdate ||
      Date.now() - Number(lastUpdate) > cacheTimeout
    ) {
      fetchLanguages()
    }
  }, [username, languages.length])

  return { languages, isLoading, error }
}
