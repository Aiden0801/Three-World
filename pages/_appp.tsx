import { SessionProvider } from 'next-auth/react'
import {
   MantineProvider,
   ColorSchemeProvider,
   ColorScheme,
} from '@mantine/core'
import { wrapper } from '../store/store'
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingScreen from './loading'
import { NotificationsProvider } from '@mantine/notifications'
import { useSetRecoilState } from 'recoil'
import { currentUser } from '../utils/recoil/browser'
function MySession({ Component, pageProps: { ...pageProps } }: AppProps) {
   const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
   const toggleColorScheme = (value?: ColorScheme) => {
      console.log('_appp', value)
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
   }
   const setCurrentUser = useSetRecoilState(currentUser)
   const router = useRouter()
   const { data: session, status } = useSession()

   useEffect(() => {
      if (status === 'authenticated') {
         setCurrentUser(session.user.email)
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
      <ColorSchemeProvider
         colorScheme={colorScheme}
         toggleColorScheme={toggleColorScheme}>
         <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ loader: 'bars', colorScheme }}>
            <NotificationsProvider>
               <Component {...pageProps} curSession={session} />
            </NotificationsProvider>
         </MantineProvider>
      </ColorSchemeProvider>
   )
}
export default MySession
//export default MyApp
