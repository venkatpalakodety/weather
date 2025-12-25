import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as T
    } catch (e) {
      // ignore parse errors
    }
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {
      // ignore storage errors
    }
  }, [key, state])

  return [state, setState] as const
}
