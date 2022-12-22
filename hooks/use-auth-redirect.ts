import { SessionContextValue, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type SessionStatus = SessionContextValue['status']

type UseAuthRedirect = {
  /** if true we'll merge the provided redirect with the provided ones */
  merge?: boolean
  /** Object containing the redirects for each session status */
  redirects: {
    [key in SessionStatus]?: string
  }
}

const defaultRedirects: UseAuthRedirect['redirects'] = {
  authenticated: '/dashboard',
  unauthenticated: '/login',
}
const defaultOptions: UseAuthRedirect = {
  merge: false,
  redirects: defaultRedirects,
}
/**
 * Checks if the user is authenticated and redirects them to the appropriate page.
 * If no redirect is provided, the user will be redirected to the default pages
 *  - authenticated: /dashboard
 *  - unauthenticated: /login
 * @param merge - If true, the default redirects will be merged with the provided redirects
 * @param redirects - Object containing the redirects for each session status
 * @returns loading status of the Auth service
 */
export function useAuthRedirect({
  merge = false,
  redirects = defaultRedirects,
}: UseAuthRedirect = defaultOptions): boolean {
  const options = merge ? { ...defaultRedirects, ...redirects } : redirects
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    switch (status) {
      case 'loading':
        return
      case 'authenticated':
        if (options.authenticated) router.push(options.authenticated)
        break
      case 'unauthenticated':
        if (options.unauthenticated) router.push(options.unauthenticated)
        break
    }
  }, [status])

  return status === 'loading'
}
