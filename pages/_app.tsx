import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import { SocketContextProvider } from '../contexts/socket'
import { RecoilRoot } from 'recoil'
import { wrapper } from '@/store/store'
import AppWithContexts from './_app.internal'
import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* was in _document but was getting a warning from next */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ReduxProvider {...pageProps}>
        <ClerkProvider {...pageProps}>
          <RecoilRoot>
            <SocketContextProvider>
              <AppWithContexts
                Component={Component}
                pageProps={{ ...pageProps }}
              />
            </SocketContextProvider>
          </RecoilRoot>
        </ClerkProvider>
      </ReduxProvider>
    </>
  )
}
// export default wrapper.withRedux(MyApp)
export default MyApp

function ReduxProvider(rest: any) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return <Provider store={store}>{props.children}</Provider>
}
