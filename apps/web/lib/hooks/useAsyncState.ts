import { useState, useCallback } from 'react'
import { LoadingState } from '../types/common'

interface AsyncState<T> {
  data: T | null
  error: string | null
  state: LoadingState
}

interface UseAsyncStateReturn<T> {
  data: T | null
  error: string | null
  state: LoadingState
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  execute: (asyncFunction: () => Promise<T>) => Promise<void>
  reset: () => void
  setData: (data: T) => void
  setError: (error: string) => void
}

export function useAsyncState<T = any>(
  initialData: T | null = null
): UseAsyncStateReturn<T> {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    data: initialData,
    error: null,
    state: 'idle',
  })

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setAsyncState(prev => ({
      ...prev,
      state: 'loading',
      error: null,
    }))

    try {
      const result = await asyncFunction()
      setAsyncState({
        data: result,
        error: null,
        state: 'success',
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setAsyncState({
        data: null,
        error: errorMessage,
        state: 'error',
      })
    }
  }, [])

  const reset = useCallback(() => {
    setAsyncState({
      data: initialData,
      error: null,
      state: 'idle',
    })
  }, [initialData])

  const setData = useCallback((data: T) => {
    setAsyncState(prev => ({
      ...prev,
      data,
      state: 'success',
    }))
  }, [])

  const setError = useCallback((error: string) => {
    setAsyncState(prev => ({
      ...prev,
      error,
      state: 'error',
    }))
  }, [])

  return {
    data: asyncState.data,
    error: asyncState.error,
    state: asyncState.state,
    isLoading: asyncState.state === 'loading',
    isError: asyncState.state === 'error',
    isSuccess: asyncState.state === 'success',
    execute,
    reset,
    setData,
    setError,
  }
}