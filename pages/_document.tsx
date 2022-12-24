import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="application-name" content="Virtual Pro Galaxy" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Virtual Pro Galaxy" />
        <meta name="description" content="All the virtual tools you need for your modern business." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://virtualprogalaxy.com" />
        <meta name="twitter:title" content="Virtual Pro Galaxy" />
        <meta name="twitter:description" content="All the virtual tools you need for your modern business." />
        <meta name="twitter:image" content="https://virtualprogalaxy.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@dinghino" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Virtual Pro Galaxy" />
        <meta property="og:description" content="All the virtual tools you need for your modern business." />
        <meta property="og:site_name" content="Virtual Pro Galaxy" />
        <meta property="og:url" content="https://virtualprogalaxy.com" />
        <meta property="og:image" content="https://virtualprogalaxy.com/icons/apple-touch-icon.png" />
        {/*
         * @dev we might want to move this to the _app
         * @see {@link https://github.com/shadowwalker/next-pwa}
         */}
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
