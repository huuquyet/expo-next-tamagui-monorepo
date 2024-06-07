import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextTamaguiProvider } from './NextTamaguiProvider'

const APP_TITLE = 'Tamagui Expo Next.js Monorepo App'
const APP_TITLE_TEMPLATE = '%s - Tamagui App'
const APP_DESCRIPTION = 'Tamagui, Expo, Next.js & Solito monorepo'
const APP_URL = 'https://expo-next-tamagui-monorepo.vercel.app/'
const APP_TWITTER = '@HuuQuyetNg'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  applicationName: APP_TITLE,
  title: {
    default: APP_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  metadataBase: new URL('https://${process.env.VERCEL_URL}'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_TITLE,
    title: {
      default: APP_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_URL,
    images: ['/vercel.svg'],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    site: APP_TWITTER,
  },
  keywords: ['Tamagui', 'Expo', 'Solito', 'Next.js', 'monorepo'],
}
