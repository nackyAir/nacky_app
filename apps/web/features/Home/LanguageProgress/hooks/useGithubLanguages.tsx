import { useEffect, useState, useCallback } from 'react'
import { APP_CONFIG } from '../../../../lib/constants/app'
import { AppError, NetworkError, handleApiError } from '../../../../lib/utils/errors'
import { createRetry } from '../../../../lib/utils/performance'

export interface Language {
  name: string
  percentage: number
  bytes: number
  color: string
}

interface GitHubApiResponse {
  name: string
  languages_url: string
  private: boolean
}

interface CacheEntry {
  data: Language[]
  timestamp: number
  etag?: string
}

class GitHubLanguagesError extends AppError {
  constructor(
    message: string,
    public status?: number,
    public isRateLimit = false
  ) {
    super(message, 'GITHUB_API_ERROR', status || 500)
    this.name = 'GitHubLanguagesError'
  }
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
  React: '#61dafb',
  Vue: '#4FC08D',
  Rust: '#dea584',
  'C++': '#f34b7d',
  PHP: '#4F5D95',
} as const

interface UseGithubLanguagesConfig {
  username: string
  cacheTimeout?: number
  maxRetries?: number
  rateLimitFallback?: Language[]
}

export const useGithubLanguages = ({
  username,
  cacheTimeout = APP_CONFIG.CACHE.GITHUB_LANGUAGES,
  maxRetries = APP_CONFIG.LIMITS.GITHUB.MAX_RETRIES,
  rateLimitFallback = []
}: UseGithubLanguagesConfig) => {
  const [state, setState] = useState<{
    languages: Language[]
    isLoading: boolean
    error: string | null
    lastUpdated: Date | null
  }>({
    languages: [],
    isLoading: true,
    error: null,
    lastUpdated: null,
  })

  const getLanguageColor = useCallback((language: string): string => {
    return GITHUB_COLORS[language] || '#6e7681'
  }, [])

  const getCacheKey = useCallback((key: string) => `github-languages-${username}-${key}`, [username])

  const getFromCache = useCallback((): CacheEntry | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const cached = localStorage.getItem(getCacheKey('data'))
      if (!cached) return null
      
      return JSON.parse(cached) as CacheEntry
    } catch {
      return null
    }
  }, [getCacheKey])

  const setToCache = useCallback((data: Language[], etag?: string) => {
    if (typeof window === 'undefined') return
    
    const cacheEntry: CacheEntry = {
      data,
      timestamp: Date.now(),
      etag,
    }
    
    try {
      localStorage.setItem(getCacheKey('data'), JSON.stringify(cacheEntry))
    } catch {
      // キャッシュ保存に失敗した場合は無視
    }
  }, [getCacheKey])

  const fetchWithRetry = useCallback(async (url: string): Promise<Response> => {
    return createRetry(
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.LIMITS.GITHUB.REQUEST_TIMEOUT)
        
        try {
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Portfolio-App',
            },
            signal: controller.signal,
          })
          
          clearTimeout(timeoutId)
          
          if (!response.ok) {
            throw new GitHubLanguagesError(
              `GitHub API error: ${response.statusText}`,
              response.status,
              response.status === 403
            )
          }
          
          return response
        } catch (error) {
          clearTimeout(timeoutId)
          if (error instanceof Error && error.name === 'AbortError') {
            throw new NetworkError('リクエストがタイムアウトしました')
          }
          throw error
        }
      },
      {
        maxRetries,
        delay: APP_CONFIG.API.RETRY_DELAY,
        backoff: true,
      }
    )
  }, [maxRetries])

  const fetchLanguages = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const reposResponse = await fetchWithRetry(`https://api.github.com/users/${username}/repos?per_page=${APP_CONFIG.LIMITS.GITHUB.MAX_REPOS}`)
      const repos: GitHubApiResponse[] = await reposResponse.json()
      
      const publicRepos = repos.filter(repo => !repo.private)
      
      const languagePromises = publicRepos.map(async (repo) => {
        try {
          const response = await fetchWithRetry(repo.languages_url)
          return await response.json()
        } catch {
          return {} // 個別のリポジトリで失敗しても継続
        }
      })
      
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
      
      const total = Object.values(combinedLanguages).reduce((a, b) => a + b, 0)
      
      if (total === 0) {
        throw new GitHubLanguagesError('言語データが見つかりませんでした', 404)
      }
      
      const languageStats = Object.entries(combinedLanguages)
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: Math.round((bytes / total) * 100 * 10) / 10, // 小数点1桁で四捨五入
          color: getLanguageColor(name),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 10) // 上位10言語のみ
      
      setToCache(languageStats, reposResponse.headers.get('etag') || undefined)
      
      setState({
        languages: languageStats,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (err) {
      const error = handleApiError(err)
      
      let errorMessage = 'データの取得中にエラーが発生しました'
      
      if (error instanceof GitHubLanguagesError) {
        if (error.isRateLimit) {
          errorMessage = 'GitHub APIのレート制限に達しました。しばらく待ってから再試行してください。'
          // レート制限の場合はフォールバックデータを使用
          if (rateLimitFallback.length > 0) {
            setState({
              languages: rateLimitFallback,
              isLoading: false,
              error: null,
              lastUpdated: null,
            })
            return
          }
        } else if (error.status === 404) {
          errorMessage = 'ユーザーが見つかりませんでした'
        }
      } else if (error instanceof NetworkError) {
        errorMessage = 'ネットワークエラーが発生しました。接続を確認してください。'
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
    }
  }, [username, fetchWithRetry, getLanguageColor, setToCache, rateLimitFallback])

  useEffect(() => {
    const cached = getFromCache()
    
    if (cached && Date.now() - cached.timestamp < cacheTimeout) {
      setState({
        languages: cached.data,
        isLoading: false,
        error: null,
        lastUpdated: new Date(cached.timestamp),
      })
      return
    }
    
    fetchLanguages()
  }, [username, cacheTimeout, getFromCache, fetchLanguages])

  const refetch = useCallback(() => {
    fetchLanguages()
  }, [fetchLanguages])

  const clearCache = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(getCacheKey('data'))
  }, [getCacheKey])

  return {
    ...state,
    refetch,
    clearCache,
  }
}
