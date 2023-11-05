import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="da">
      <Head >
        <link rel="apple-touch-startup-image" href="ios-startup.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
