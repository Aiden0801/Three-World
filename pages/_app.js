import { SessionProvider } from "next-auth/react"
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { wrapper } from "../store/store";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (

    <SessionProvider session={session}>
      <ColorSchemeProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ loader: 'bars' }} >
          <Component {...pageProps} />
        </MantineProvider>

      </ColorSchemeProvider>


    </SessionProvider>
  )
}
export default wrapper.withRedux(MyApp);
//export default MyApp