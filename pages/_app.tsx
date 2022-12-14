import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps as NextAppProps } from 'next/app'
import { Router } from 'next/router'
import { RecoilRoot } from 'recoil'
import { wrapper } from '../store/store'
import AppWithContexts from './_app.internal'

type AppProps = NextAppProps<{
  session: Session
  router?: Router
}>

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <RecoilRoot>
        <AppWithContexts Component={Component} pageProps={{ ...pageProps }} />
      </RecoilRoot>
    </SessionProvider>
  )
}
export default wrapper.withRedux(MyApp)
//export default MyApp
