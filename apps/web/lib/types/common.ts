export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
  status: 'success' | 'error' | 'loading'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}