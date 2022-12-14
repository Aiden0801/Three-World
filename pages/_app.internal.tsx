import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { RouterTransition } from '../components/Layout/RouterTransition'
import { currentUser } from '../utils/recoil/browser'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'

import { SocketContext, socket } from '../utils/context/socket'


/**
 * Actual App component that requires context providers from outside.
 * Renders all the internal contexts providers and the components.
 * TODO: Split the providers into separate files to handle them individually?
 */
function AppWithContexts({ Component, pageProps: { ...pageProps } }: any) {
  const [colorScheme, toggleColorScheme] = useMantineColorScheme()
  const setCurrentUser = useSetRecoilState(currentUser)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      setCurrentUser(session.user.email)
      socket.emit('signIn', { email: session.user.email })
    }
  }, [status])

  if (router.pathname !== '/' && router.pathname !== '/login') {
    if (status === 'loading') {
      return <></>
    }

    if (status === 'unauthenticated') {
      router.push('./')
      return <p>Access Denied</p>
    }
  }

  return (
    <SocketContext.Provider value={socket}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ loader: 'bars', colorScheme }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <RouterTransition />
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SocketContext.Provider>
  )
}
export default AppWithContexts
//export default MyApp

/**
 * Wrapper for mantine hooks color scheme management.
 * Uses local storage to persist color scheme and adds hotkey to toggle it.
 * @returns [ColorScheme, (value?: ColorScheme) => void]
 */
function useMantineColorScheme(): [ColorScheme, (value?: ColorScheme) => void] {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')),
    [colorScheme, setColorScheme]
  )

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return [colorScheme, toggleColorScheme]
}
