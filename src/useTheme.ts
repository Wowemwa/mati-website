import { useCallback, useEffect, useState } from 'react'

// Simple theme (light/dark) management with localStorage persistence.
// Hook returns current theme and a toggle function. It also applies the
// 'dark' class to document.documentElement so Tailwind's dark variants work.
export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored) return stored
    // prefer system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  // Apply class to <html>
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      root.classList.remove('dark')
      document.body.classList.remove('dark')
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  // Listen to system changes if user hasn't explicitly chosen yet
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem('theme')
      if (!stored) setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggleTheme }
}