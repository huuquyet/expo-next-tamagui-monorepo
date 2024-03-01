import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import '@tamagui/font-inter/css/800.css'
import '@tamagui/font-inter/css/900.css'
import '@tamagui/font-silkscreen/css/400.css'
import { Provider } from 'app/provider'
import Head from 'next/head'
import Script from 'next/script'
import type { SolitoAppProps } from 'solito'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Tamagui Example App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          key="tamagui-animations-mount"
          dangerouslySetInnerHTML={{
            // avoid flash of entered elements before enter animations run:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
