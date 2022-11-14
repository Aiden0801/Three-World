import { SessionProvider } from 'next-auth/react'
import {
   MantineProvider,
   ColorSchemeProvider,
   ColorScheme,
} from '@mantine/core'
import { wrapper } from '../store/store'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
   const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
   const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
   return (
      <SessionProvider session={pageProps.session}>
         <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
               withGlobalStyles
               withNormalizeCSS
               theme={{ loader: 'bars' }}>
               <Component {...pageProps} />
            </MantineProvider>
         </ColorSchemeProvider>
      </SessionProvider>
   )
}
export default wrapper.withRedux(MyApp)
//export default MyApp
