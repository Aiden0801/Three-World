import { RouterTransition } from '@/layouts/RouterTransition'
import { MantineContexts } from '@/contexts/MantineContexts'

/**
 * Actual App component that requires context providers from outside.
 * Renders all the internal contexts providers and the components.
 */
function AppWithContexts({ Component, pageProps: { ...pageProps } }: any) {
  return (
    <MantineContexts>
      <RouterTransition />
      <Component {...pageProps} />
    </MantineContexts>
  )
}
export default AppWithContexts
