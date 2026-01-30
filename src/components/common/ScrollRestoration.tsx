import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollRestoration component that scrolls to top when the route changes.
 * This ensures that when navigating to a new page or going back,
 * the page starts from the top instead of maintaining the previous scroll position.
 */
export function ScrollRestoration() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
