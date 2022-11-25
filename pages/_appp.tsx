import {
   ColorScheme,
   ColorSchemeProvider,
   MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { RouterTransition } from '../components/Layout/RouterTransition'
import { currentUser } from '../utils/recoil/browser'
function MySession({ Component, pageProps: { ...pageProps } }: any) {
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
               <RouterTransition />
               <Component {...pageProps} />
            </NotificationsProvider>
         </MantineProvider>
      </ColorSchemeProvider>
   )
}
export default MySession
//export default MyApp
