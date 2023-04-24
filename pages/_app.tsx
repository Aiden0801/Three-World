import { Session } from 'next-auth'
import { Router } from 'next/router'
import { Provider } from 'react-redux'
// import { SessionProvider } from 'next-auth/react'
import type { AppProps as NextAppProps } from 'next/app'

import { SocketContextProvider } from '../contexts/socket'
import { RecoilRoot } from 'recoil'
import { wrapper } from '@/store/store'
import AppWithContexts from './_app.internal'
import { ClerkProvider } from '@clerk/nextjs'

type AppProps = NextAppProps<{
  session: Session
  router?: Router
}>

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ReduxProvider {...pageProps}>
      <ClerkProvider {...pageProps}>
        {/* <SessionProvider session={session} refetchInterval={5 * 60}> */}
          <RecoilRoot>
            <SocketContextProvider>
              <AppWithContexts
                Component={Component}
                pageProps={{ ...pageProps }}
              />
            </SocketContextProvider>
          </RecoilRoot>
        {/* </SessionProvider> */}
      </ClerkProvider>
    </ReduxProvider>
  )
}
// export default wrapper.withRedux(MyApp)
export default MyApp

function ReduxProvider(rest: any) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return <Provider store={store}>{props.children}</Provider>
}
