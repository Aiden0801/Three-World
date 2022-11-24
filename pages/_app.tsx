import { ColorScheme } from '@mantine/core'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { wrapper } from '../store/store'
import MySession from './_appp'

const root =
   typeof window !== 'undefined' && window?.document?.querySelector('#__next')
function MyApp({
   Component,
   pageProps: { ...pageProps },
}: AppProps<{
   session: Session
}>) {
   const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
   const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
   return (
      <SessionProvider session={pageProps.session}>
         <RecoilRoot>
            <MySession Component={Component} pageProps={{ ...pageProps }} />
         </RecoilRoot>
      </SessionProvider>
   )
}
export default wrapper.withRedux(MyApp)
//export default MyApp
