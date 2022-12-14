import { Session } from 'next-auth'
import { Router } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import type { AppProps as NextAppProps } from 'next/app'

import { SocketContextProvider } from '@/contexts/socket'
import { RecoilRoot } from 'recoil'
import { wrapper } from '../store/store'
import AppWithContexts from './_app.internal'

type AppProps = NextAppProps<{
  session: Session
  router?: Router
}>

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <RecoilRoot>
        <SocketContextProvider>
          <AppWithContexts Component={Component} pageProps={{ ...pageProps }} />
        </SocketContextProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}
export default wrapper.withRedux(MyApp)
//export default MyApp
