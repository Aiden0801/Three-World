import { SessionProvider } from 'next-auth/react'
import {
   MantineProvider,
   ColorSchemeProvider,
   ColorScheme,
} from '@mantine/core'
import { wrapper } from '../store/store'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingScreen from './loading'
function MySession({ Component, pageProps: { ...pageProps } }: AppProps) {
   const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
   const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
   const router = useRouter()
   const { data: session, status } = useSession()

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
            theme={{ loader: 'bars' }}>
            <Component {...pageProps} curSession={session} />
         </MantineProvider>
      </ColorSchemeProvider>
   )
}
export default MySession
//export default MyApp
