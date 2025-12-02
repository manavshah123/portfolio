import { useState, useEffect } from 'react'

export const useTheme = (): 'dark' | 'light' => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
  })

  useEffect(() => {
    // Watch for theme changes on the document element
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark'
      setTheme(newTheme)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return theme
}

