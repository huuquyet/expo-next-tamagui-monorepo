import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import { Analytics } from '@vercel/analytics/react'
import { Provider } from 'app/provider'
import Head from 'next/head'
import Script from 'next/script'
import type { SolitoAppProps } from 'solito'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

const APP_TITLE = 'Tamagui Expo Next.js Monorepo App'
const APP_DESCRIPTION = 'Tamagui, Expo, Next.js & Solito monorepo'
const APP_URL = 'https://expo-next-tamagui-monorepo.vercel.app/'
const APP_TWITTER = '@HuuQuyetNg'

export default function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/vercel.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/vercel.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/vercel.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/vercel.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/vercel.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={APP_URL} />
        <meta name="twitter:title" content={APP_TITLE} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image" content="/vercel.svg" />
        <meta name="twitter:creator" content={APP_TWITTER} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={APP_TITLE} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:site_name" content={APP_TITLE} />
        <meta property="og:url" content={APP_URL} />
        <meta property="og:image" content="/vercel.svg" />
        <Script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
    </>
  )
}
