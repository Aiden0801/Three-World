import { SessionProvider } from "next-auth/react"
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { wrapper } from "../store/store";
import type { AppProps } from "next/app";
function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (

    <SessionProvider session={pageProps.session}>
      {/* <ColorSchemeProvider> */}
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ loader: 'bars' }} >
        <Component {...pageProps} />
      </MantineProvider>
      {/* </ColorSchemeProvider> */}


    </SessionProvider>
  )
}
export default wrapper.withRedux(MyApp);
//export default MyApp