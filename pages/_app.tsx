import { ColorScheme } from '@mantine/core'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { wrapper } from '../store/store'
import MySession from './_appp'
import { serverURL } from '../config/urlcontrol'
const root =
   typeof window !== 'undefined' && window?.document?.querySelector('#__next')
function MyApp({
   Component,
   pageProps: { ...pageProps },
}: AppProps<{
   session: Session
   router?: Router
}>) {
   const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
   const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

   return (
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
         <RecoilRoot>
            <MySession Component={Component} pageProps={{ ...pageProps }} />
         </RecoilRoot>
      </SessionProvider>
   )
}
export default wrapper.withRedux(MyApp)
//export default MyApp
